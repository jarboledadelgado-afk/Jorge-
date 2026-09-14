# OREV® Personal v4.1-P0 — Build Report

Fecha: 2026-09-14
Estado: **P0_INCOMPLETE / backend funcional probado / demo HTTPS publicada**

## Qué es real hoy

- Backend FastAPI real ejecutable.
- Autenticación propia con contraseña derivada mediante scrypt y cookie HttpOnly.
- Sesiones server-side.
- Aislamiento lógico por `user_id` comprobado con dos usuarios.
- Persistencia server-side SQLite comprobada en proceso servidor real.
- Capturas, mapas OREV, hipótesis, evidencia, validación, acciones, resultados, aprendizajes, memoria, cierre diario, exportación y borrado.
- Gate: un mapa REJECTED no puede generar una acción.
- Endpoint de IA real preparado para OpenAI Responses API; si no hay `OPENAI_API_KEY`, responde explícitamente `LLM_NOT_CONFIGURED` y no simula IA.
- Demo HTTPS pública desplegada en Vercel para recorrer la experiencia sin datos sensibles.

## Pruebas ejecutadas en esta build

### Pytest
`PYTHONPATH=. pytest -q`

Resultado: **5 passed**.

Incluye:
- aislamiento usuario A/B;
- rechazo de hipótesis;
- ciclo mapa→validación→acción→resultado→aprendizaje;
- persistencia tras nuevo login;
- ausencia de IA fingida si no existe API key;
- cierre/revisión sin diagnóstico;
- exportación/borrado.

### Smoke HTTP real
`PYTHONPATH=. python tests/http_smoke.py`

Resultado:
- auth=PASS
- isolation=PASS
- persistence_server=PASS
- map_validation=PASS
- action_result_learning=PASS

### Navegador
La nueva prueba browser→localhost no pudo ejecutarse en el sandbox porque Chromium bloqueó `localhost` (`ERR_BLOCKED_BY_ADMINISTRATOR`). Esto se registra como **BLOCKED**, no PASS.

El frontend local anterior Universal v0.10 sí conserva su evidencia separada de 54/54 E2E + PASS humano Samsung; esa evidencia no se reutiliza para afirmar que el backend P0 nuevo pasó E2E navegador.

## Qué NO es real todavía

- La demo Vercel pública usa localStorage deliberadamente y está etiquetada como demo.
- El backend P0 completo no quedó desplegado en Vercel: el canal de deployment bloqueó la carga inline del código de autenticación.
- La base SQLite local no es apta como persistencia multi-instancia en Vercel/serverless.
- Falta Postgres gestionado + políticas/RLS equivalentes para declarar persistencia cloud.
- OpenAI remoto no está activo hasta completar configuración segura de API key.
- Gmail y Calendar están fuera de P0 y no se presentan como implementados.
- Verificación post-deploy mediante el conector Vercel quedó bloqueada por 403 de scope; la herramienta de deployment sí reportó READY.

## Demo HTTPS
Producción demo reportada READY por Vercel:
`https://orev-personal-p0-demo-jarboledadelgado-9961.vercel.app`

Deployment id: `dpl_BFjqbHs8bZf7gPNJ4z8EL2ii9jQd`

## Gate restante para PILOT_READY

1. Conectar Postgres cloud con aislamiento por usuario.
2. Migrar persistencia SQLite a Postgres.
3. Completar OpenAI API key y configurar `OPENAI_API_KEY` en backend desplegado.
4. Desplegar backend completo.
5. E2E navegador sobre URL pública: dos usuarios + ciclo OREV completo + logout/login + segundo dispositivo/browser.
6. Red Team de endpoint IA y multi-tenant sobre deployment final.

## Regla de estado
Hasta pasar esos gates, el estado correcto es **P0_INCOMPLETE**, no PILOT_READY.
