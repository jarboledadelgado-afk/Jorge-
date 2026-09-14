from __future__ import annotations
import json
from sqlalchemy.orm import Session as DB
from .core import uid, now_iso
from .models import AuditLog, Memory

def j(v): return json.dumps(v,ensure_ascii=False)
def loads(v):
    try:return json.loads(v or '[]')
    except:return []
def audit(db:DB,user_id:str|None,action:str,object_type:str,object_id:str|None,meta:dict|None=None):
    db.add(AuditLog(id=uid('aud'),user_id=user_id,actor='USER',action=action,object_type=object_type,object_id=object_id,metadata_json=j(meta or {}),timestamp=now_iso()))
def memory(db:DB,user_id:str,typ:str,content:str,source:str='',confidence:str='',status:str='ACTIVE'):
    ts=now_iso(); db.add(Memory(id=uid('mem'),user_id=user_id,type=typ,content=content,source=source,confidence=confidence,status=status,created_at=ts,updated_at=ts))
