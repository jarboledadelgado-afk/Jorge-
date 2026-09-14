from __future__ import annotations
from fastapi import APIRouter, Cookie, Depends, Response
from sqlalchemy import select, delete
from sqlalchemy.orm import Session as DB
from .auth import current_user, register, login, logout
from .core import COOKIE
from .db import get_db
from .models import User, Capture, ClarityMap, Hypothesis, Evidence, Validation, Task, Action, Result, Learning, Memory, DailyClosure, AuditLog
from .schemas import AuthIn, ClosureIn
from .core import uid, now_iso
r=APIRouter(prefix='/api')
@r.post('/register')
def reg(p:AuthIn,response:Response,db:DB=Depends(get_db)): return register(p,response,db)
@r.post('/login')
def log(p:AuthIn,response:Response,db:DB=Depends(get_db)): return login(p,response,db)
@r.post('/logout')
def out(response:Response,token:str|None=Cookie(default=None,alias=COOKIE),db:DB=Depends(get_db)): return logout(token,response,db)
@r.get('/me')
def me(u:User=Depends(current_user)): return {'id':u.id,'email':u.email,'status':u.status}
@r.post('/closures')
def closure(p:ClosureIn,u:User=Depends(current_user),db:DB=Depends(get_db)):
    c=db.scalar(select(DailyClosure).where(DailyClosure.user_id==u.id,DailyClosure.date==p.date)); ts=now_iso()
    if not c: c=DailyClosure(id=uid('cls'),user_id=u.id,date=p.date,created_at=ts,updated_at=ts); db.add(c)
    c.closed=p.closed;c.open=p.open;c.reason_open=p.reason_open;c.mental_load=p.mental_load;c.energy=p.energy;c.frustration=p.frustration;c.win=p.win;c.updated_at=ts; db.commit(); return {'id':c.id,'date':c.date}
@r.get('/review')
def review(u:User=Depends(current_user),db:DB=Depends(get_db)):
    tasks=db.scalars(select(Task).where(Task.user_id==u.id)).all(); maps=db.scalars(select(ClarityMap).where(ClarityMap.user_id==u.id)).all(); closures=db.scalars(select(DailyClosure).where(DailyClosure.user_id==u.id).order_by(DailyClosure.date.desc()).limit(7)).all(); done=sum(t.status=='DONE' for t in tasks); deferred=sum(t.defer_count>0 for t in tasks); facts=[f'Tareas cerradas: {done} de {len(tasks)}.',f'Tareas aplazadas al menos una vez: {deferred}.']; patterns=[f'Mapas rechazados/corregidos por el usuario: {sum(m.validation_status=="REJECTED" for m in maps)} de {len(maps)}.'] if maps else []; unknown=[] if len(closures)>=3 else ['Hay pocos cierres diarios para relacionar carga mental con ejecución.']; return {'facts':facts,'patterns_observed':patterns,'unknown':unknown,'can_try':['Definir “terminado” antes de iniciar tres tareas esta semana.'],'diagnosis':None}
@r.get('/export')
def export(u:User=Depends(current_user),db:DB=Depends(get_db)):
    data={}
    for cls,name in [(Capture,'captures'),(ClarityMap,'maps'),(Hypothesis,'hypotheses'),(Evidence,'evidence'),(Validation,'validations'),(Task,'tasks'),(Action,'actions'),(Result,'results'),(Learning,'learnings'),(Memory,'memories'),(DailyClosure,'closures'),(AuditLog,'audit')]:
        rows=db.scalars(select(cls).where(cls.user_id==u.id)).all(); data[name]=[{c.name:getattr(row,c.name) for c in row.__table__.columns} for row in rows]
    return {'user_id':u.id,'exported_at':now_iso(),'data':data}
@r.delete('/account')
def delete_account(response:Response,u:User=Depends(current_user),db:DB=Depends(get_db)):
    uid_=u.id; db.delete(u); db.commit(); response.delete_cookie(COOKIE); return {'deleted':True,'user_id':uid_}
