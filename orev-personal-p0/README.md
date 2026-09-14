# OREV® Personal v4.1-P0

OREV® = **Observar · Revelar · Evolucionar · Validar**.

P0 real del circuito:
`captura → mapa provisional → validación → microacción → resultado → aprendizaje → memoria`.

## Estado
- Auth real y sesiones server-side.
- Backend FastAPI.
- SQLAlchemy: SQLite local o Postgres mediante `DATABASE_URL`.
- Aislamiento por `user_id` en consultas y tests A/B.
- Hipótesis separadas de hechos; YES/PARTLY/NO.
- Mapa rechazado no puede crear acción.
- Action → Result → Learning.
- Memoria visible/editable/borrable.
- OpenAI Responses API preparada; sin `OPENAI_API_KEY` devuelve `LLM_NOT_CONFIGURED` y no finge IA.

## Arranque
```bash
pip install -r requirements.txt
python app.py
```
Abrir http://127.0.0.1:8000

## Tests
```bash
PYTHONPATH=. pytest -q
```

## Producción
Usar Postgres gestionado en `DATABASE_URL`, `OREV_SECURE_COOKIE=1`, HTTPS y `OPENAI_API_KEY` server-side. El build no se declara PILOT_READY hasta desplegar esa configuración y ejecutar E2E público multiusuario.
