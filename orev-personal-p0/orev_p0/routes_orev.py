from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session as DB
from .auth import current_user
from .core import uid, now_iso
from .db import get_db
from .helpers import audit, j, loads, memory
from .llm import analyze
from .models import User, Capture, ClarityMap, Hypothesis, Evidence, Validation, Task, Action, Result, Learning, Memory
from .schemas import CaptureIn, MapIn, ValidateIn, ActionIn, ResultIn, AnalyzeIn, MemoryPatch
r=APIRouter(prefix='/api')

def map_out(m:ClarityMap):
    return {'id':m.id,'situation':m.situation,'facts':loads(m.facts),'story':m.story,'emotion':m.emotion,'need':m.need,'missing':loads(m.missing),'observed':loads(m.observed),'hypothesis':m.hypothesis,'confidence':m.confidence,'evidence_for':loads(m.evidence_for),'evidence_against':loads(m.evidence_against),'unknown':loads(m.unknown),'test_method':m.test_method,'validation_status':m.validation_status,'validation_correction':m.validation_correction,'ai_generated':bool(m.ai_generated),'created_at':m.created_at}
@r.post('/captures')
def add_capture(p:CaptureIn,u:User=Depends(current_user),db:DB=Depends(get_db)):
    c=Capture(id=uid('cap'),user_id=u.id,text=p.text,created_at=now_iso()); db.add(c); memory(db,u.id,'DECLARED',p.text,f'CAPTURE:{c.id}'); audit(db,u.id,'CREATE_CAPTURE','CAPTURE',c.id); db.commit(); return {'id':c.id,'text':c.text}
@r.get('/captures')
def captures(u:User=Depends(current_user),db:DB=Depends(get_db)):
    xs=db.scalars(select(Capture).where(Capture.user_id==u.id).order_by(Capture.created_at.desc())).all(); return [{'id':x.id,'text':x.text,'created_at':x.created_at} for x in xs]
@r.post('/orev/analyze')
def ai_analyze(p:AnalyzeIn,u:User=Depends(current_user)):
    return analyze(p.model_dump())
@r.post('/maps')
def create_map(p:MapIn,u:User=Depends(current_user),db:DB=Depends(get_db)):
    conf=p.confidence if p.confidence in ('LOW','MEDIUM','HIGH') else 'LOW'; ts=now_iso(); m=ClarityMap(id=uid('map'),user_id=u.id,situation=p.situation,facts=j(p.facts),story=p.story,emotion=p.emotion,need=p.need,missing=j(p.missing),observed=j(p.observed),hypothesis=p.hypothesis,confidence=conf,evidence_for=j(p.evidence_for),evidence_against=j(p.evidence_against),unknown=j(p.unknown),test_method=p.test_method,validation_status='PENDING',validation_correction='',ai_generated=0,created_at=ts,updated_at=ts); db.add(m)
    if p.hypothesis:
        h=Hypothesis(id=uid('hyp'),user_id=u.id,map_id=m.id,statement=p.hypothesis,confidence=conf,status='PENDING',created_at=ts); db.add(h)
        for direction,vals in [('FOR',p.evidence_for),('AGAINST',p.evidence_against),('UNKNOWN',p.unknown)]:
            for text in vals: db.add(Evidence(id=uid('ev'),user_id=u.id,hypothesis_id=h.id,direction=direction,statement=text,created_at=ts))
        memory(db,u.id,'INFERRED',p.hypothesis,f'MAP:{m.id}',conf)
    audit(db,u.id,'CREATE_MAP','CLARITY_MAP',m.id); db.commit(); return map_out(m)
@r.get('/maps')
def maps(u:User=Depends(current_user),db:DB=Depends(get_db)):
    return [map_out(m) for m in db.scalars(select(ClarityMap).where(ClarityMap.user_id==u.id).order_by(ClarityMap.created_at.desc())).all()]
@r.post('/maps/{mid}/validate')
def validate(mid:str,p:ValidateIn,u:User=Depends(current_user),db:DB=Depends(get_db)):
    m=db.scalar(select(ClarityMap).where(ClarityMap.id==mid,ClarityMap.user_id==u.id));
    if not m: raise HTTPException(404,'Mapa no encontrado')
    status={'YES':'VALIDATED','PARTLY':'PARTLY_VALIDATED','NO':'REJECTED'}.get(p.response.upper())
    if not status: raise HTTPException(400,'Usa YES/PARTLY/NO')
    m.validation_status=status; m.validation_correction=p.correction; m.updated_at=now_iso(); db.add(Validation(id=uid('val'),user_id=u.id,object_type='MAP',object_id=m.id,response=p.response.upper(),correction=p.correction,created_at=now_iso()))
    h=db.scalar(select(Hypothesis).where(Hypothesis.map_id==m.id,Hypothesis.user_id==u.id));
    if h: h.status=status; h.validated_at=now_iso(); memory(db,u.id,'DISCARDED' if status=='REJECTED' else 'VALIDATED',h.statement,f'HYPOTHESIS:{h.id}',h.confidence,status='DISCARDED' if status=='REJECTED' else 'ACTIVE')
    audit(db,u.id,'VALIDATE_MAP','CLARITY_MAP',m.id,{'status':status}); db.commit(); return {'validation_status':status,'correction':p.correction}
@r.post('/maps/{mid}/actions')
def create_action(mid:str,p:ActionIn,u:User=Depends(current_user),db:DB=Depends(get_db)):
    m=db.scalar(select(ClarityMap).where(ClarityMap.id==mid,ClarityMap.user_id==u.id));
    if not m: raise HTTPException(404,'Mapa no encontrado')
    if m.validation_status=='REJECTED': raise HTTPException(409,'Un mapa rechazado no puede generar una acción')
    ts=now_iso(); t=Task(id=uid('tsk'),user_id=u.id,source_id=mid,text=p.description,next_action=p.description,done_definition=p.done_definition,status='OPEN',defer_count=0,created_at=ts); a=Action(id=uid('act'),user_id=u.id,source_map_id=mid,task_id=t.id,description=p.description,done_definition=p.done_definition,status='OPEN',started_at=ts); db.add_all([t,a]); memory(db,u.id,'CONFIGURED',f'Acción acordada: {p.description}',f'ACTION:{a.id}'); audit(db,u.id,'CREATE_ACTION','ACTION',a.id,{'map_id':mid}); db.commit(); return {'action_id':a.id,'task_id':t.id,'status':'OPEN'}
@r.get('/actions')
def actions(u:User=Depends(current_user),db:DB=Depends(get_db)):
    xs=db.scalars(select(Action).where(Action.user_id==u.id).order_by(Action.started_at.desc())).all(); return [{'id':a.id,'source_map_id':a.source_map_id,'task_id':a.task_id,'description':a.description,'done_definition':a.done_definition,'status':a.status,'started_at':a.started_at} for a in xs]
@r.post('/actions/{aid}/result')
def result(aid:str,p:ResultIn,u:User=Depends(current_user),db:DB=Depends(get_db)):
    a=db.scalar(select(Action).where(Action.id==aid,Action.user_id==u.id));
    if not a: raise HTTPException(404,'Acción no encontrada')
    ts=now_iso(); res=Result(id=uid('res'),user_id=u.id,action_id=a.id,outcome=p.outcome,user_rating=p.user_rating,completed_at=ts); learn=Learning(id=uid('lrn'),user_id=u.id,action_id=a.id,statement=p.learning,created_at=ts); a.status='DONE'; t=db.get(Task,a.task_id) if a.task_id else None
    if t and t.user_id==u.id: t.status='DONE'; t.completed_at=ts
    db.add_all([res,learn]); memory(db,u.id,'RESULT',p.outcome,f'RESULT:{res.id}'); memory(db,u.id,'LEARNING',p.learning,f'LEARNING:{learn.id}'); audit(db,u.id,'RECORD_RESULT','ACTION',a.id,{'result_id':res.id}); db.commit(); return {'result_id':res.id,'learning_id':learn.id,'action_status':'DONE'}
@r.get('/memory')
def memories(u:User=Depends(current_user),db:DB=Depends(get_db)):
    xs=db.scalars(select(Memory).where(Memory.user_id==u.id).order_by(Memory.created_at.desc())).all(); return [{'id':m.id,'type':m.type,'content':m.content,'source':m.source,'confidence':m.confidence,'status':m.status,'created_at':m.created_at} for m in xs]
@r.patch('/memory/{mid}')
def patch_memory(mid:str,p:MemoryPatch,u:User=Depends(current_user),db:DB=Depends(get_db)):
    m=db.scalar(select(Memory).where(Memory.id==mid,Memory.user_id==u.id));
    if not m: raise HTTPException(404,'Memoria no encontrada')
    m.content=p.content; m.status=p.status; m.updated_at=now_iso(); audit(db,u.id,'EDIT_MEMORY','MEMORY',m.id); db.commit(); return {'ok':True}
@r.delete('/memory/{mid}')
def delete_memory(mid:str,u:User=Depends(current_user),db:DB=Depends(get_db)):
    m=db.scalar(select(Memory).where(Memory.id==mid,Memory.user_id==u.id));
    if not m: raise HTTPException(404,'Memoria no encontrada')
    db.delete(m); audit(db,u.id,'DELETE_MEMORY','MEMORY',mid); db.commit(); return {'ok':True}
