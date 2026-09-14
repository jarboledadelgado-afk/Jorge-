# OREV® Personal v4.1-P0

Backend real y demostrable del circuito mínimo OREV®:

`captura → observar → revelar → validar mapa → evolucionar → acción → resultado → aprendizaje → memoria`

## Qué es real en este build

- Autenticación por cuenta con contraseña scrypt y sesión server-side.
- SQLite server-side para el P0 local.
- Aislamiento por `user_id` en todas las consultas.
- Capturas persistentes.
- Mapas de claridad persistentes.
- Hipótesis separadas de hechos.
- Evidencia a favor/en contra/desconocida.
- Validación `YES / PARTLY / NO`.
- Hipótesis rechazada pasa a `DISCARDED` y no puede generar una acción.
- Action → Result → Learning.
- Memoria visible/editable/eliminable.
- Cierre diario y revisión basada en datos.
- Exportación y eliminación de cuenta.
- Audit log básico.
- Integración OpenAI real preparada mediante `OPENAI_API_KEY`; si falta, el endpoint devuelve `LLM_NOT_CONFIGURED` y no simula IA.

## Ejecutar

```bash
python app.py
```

Abrir `http://127.0.0.1:8000`.

## Tests

```bash
pytest -q
```

## Límite importante del P0 actual

SQLite demuestra backend/auth/persistencia/aislamiento en un servidor real local, pero no es la base de datos final para un deploy serverless multi-instancia. Producción debe usar Postgres con aislamiento equivalente (por ejemplo RLS) y HTTPS. El código mantiene la frontera explícita: este build no llama “producción” a lo que todavía no está desplegado.
