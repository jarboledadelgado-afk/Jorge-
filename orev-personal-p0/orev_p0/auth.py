from __future__ import annotations
import secrets, time
from fastapi import Cookie, Depends, HTTPException, Response
from sqlalchemy import select, delete
from sqlalchemy.orm import Session as DB
from .core import COOKIE, SESSION_TTL, SECURE_COOKIE, hash_password, verify_password, token_hash, uid, now_iso
from .db import get_db
from .models import User, Session
from .schemas import AuthIn

def current_user(token:str|None=Cookie(default=None,alias=COOKIE), db:DB=Depends(get_db)) -> User:
    if not token: raise HTTPException(401,'No autenticado')
    s=db.get(Session,token_hash(token))
    if not s or s.expires_at<int(time.time()): raise HTTPException(401,'Sesión inválida o expirada')
    u=db.get(User,s.user_id)
    if not u: raise HTTPException(401,'Usuario inexistente')
    return u

def issue(db:DB,user_id:str,response:Response):
    token=secrets.token_urlsafe(36); db.add(Session(token_hash=token_hash(token),user_id=user_id,expires_at=int(time.time())+SESSION_TTL,created_at=now_iso())); db.commit(); response.set_cookie(COOKIE,token,max_age=SESSION_TTL,httponly=True,samesite='lax',secure=SECURE_COOKIE); return token

def register(payload:AuthIn,response:Response,db:DB):
    email=str(payload.email).lower()
    if db.scalar(select(User).where(User.email==email)): raise HTTPException(409,'Correo ya registrado')
    ph,salt=hash_password(payload.password); u=User(id=uid('usr'),email=email,password_hash=ph,salt=salt,created_at=now_iso()); db.add(u); db.commit(); issue(db,u.id,response); return {'id':u.id,'email':u.email,'name':payload.name}

def login(payload:AuthIn,response:Response,db:DB):
    u=db.scalar(select(User).where(User.email==str(payload.email).lower()))
    if not u or not verify_password(payload.password,u.password_hash,u.salt): raise HTTPException(401,'Credenciales inválidas')
    issue(db,u.id,response); return {'id':u.id,'email':u.email}

def logout(token:str|None,response:Response,db:DB):
    if token: db.execute(delete(Session).where(Session.token_hash==token_hash(token))); db.commit()
    response.delete_cookie(COOKIE); return {'ok':True}
