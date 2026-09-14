from __future__ import annotations
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from .core import APP_VERSION, OPENAI_API_KEY
from .db import Base, engine
from .routes_account import r as account_routes
from .routes_orev import r as orev_routes

BASE=Path(__file__).resolve().parents[1]
@asynccontextmanager
async def lifespan(app:FastAPI):
    Base.metadata.create_all(engine); yield
app=FastAPI(title='OREV Personal',version=APP_VERSION,lifespan=lifespan)
app.include_router(account_routes); app.include_router(orev_routes)
app.mount('/static',StaticFiles(directory=BASE/'static'),name='static')
@app.get('/health')
def health():
    try:
        with engine.connect() as c:c.execute(text('SELECT 1'))
        db='ok'
    except Exception: db='error'
    return {'status':'ok' if db=='ok' else 'degraded','version':APP_VERSION,'database':engine.url.get_backend_name(),'llm':'configured' if OPENAI_API_KEY else 'not_configured','pilot_ready':False}
@app.get('/')
def root(): return FileResponse(BASE/'static'/'index.html')
