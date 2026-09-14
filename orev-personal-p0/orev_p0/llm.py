from __future__ import annotations
import json, requests
from fastapi import HTTPException
from .core import OPENAI_API_KEY, OPENAI_MODEL

SYSTEM='''Eres el motor OREV® Personal. OREV significa Observar, Revelar, Evolucionar y Validar. No diagnostiques. No atribuyas intenciones a terceros. No conviertas correlación en causalidad. Separa lo declarado por el usuario de hechos observables y de hipótesis. Devuelve JSON con: observed (lista), hypothesis (string), confidence LOW/MEDIUM/HIGH, evidence_for (lista), evidence_against (lista), unknown (lista), test_method (string). Si la evidencia es insuficiente usa LOW y dilo en unknown.'''
def analyze(payload:dict)->dict:
    if not OPENAI_API_KEY: raise HTTPException(503,'LLM_NOT_CONFIGURED: falta OPENAI_API_KEY; no se simula una respuesta')
    r=requests.post('https://api.openai.com/v1/responses',headers={'Authorization':f'Bearer {OPENAI_API_KEY}','Content-Type':'application/json'},json={'model':OPENAI_MODEL,'input':[{'role':'system','content':SYSTEM},{'role':'user','content':json.dumps(payload,ensure_ascii=False)}]},timeout=45)
    if not r.ok: raise HTTPException(502,f'LLM_PROVIDER_ERROR:{r.status_code}')
    data=r.json(); text=data.get('output_text','')
    if not text:
        for o in data.get('output',[]):
            for c in o.get('content',[]):
                if c.get('type') in ('output_text','text'): text+=c.get('text','')
    try: out=json.loads(text)
    except Exception: raise HTTPException(502,'LLM_INVALID_JSON')
    out['confidence']=out.get('confidence') if out.get('confidence') in ('LOW','MEDIUM','HIGH') else 'LOW'
    return out
