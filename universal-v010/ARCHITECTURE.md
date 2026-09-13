# OREV® Centro de Control Universal v0.10 RC — Arquitectura

## Propósito

v0.10 separa el núcleo local verificable de las capacidades que requieren servicios externos o backend privado. La aplicación pública no debe fingir correo, calendario, Drive, PAI/Excel ni procesamiento clínico.

## Capas

1. **UI / Router** — `index.html`, `styles.css`, delegación de eventos y rutas en `app.js`.
2. **State / Storage** — estado normalizado, persistencia local por origen, migración compatible desde claves Universal anteriores.
3. **Core** — onboarding, tareas, agenda local, Mi día, saturación, hiperfoco, búsqueda, backup/restore.
4. **OREV Local Structured Engine** — sesión, preguntas básicas, mapas versionados, validación SÍ/EN PARTE/NO, correcciones, técnicas deterministas, microacciones e historial.
5. **QA** — pruebas internas y Playwright E2E sobre seis viewports, ejecutadas por GitHub Actions.
6. **External adapters futuros** — correo, calendario y almacenamiento privado: `NOT_CONFIGURED` hasta autorización real.
7. **Backend privado futuro** — PAI/Excel y Clínica: `BACKEND_REQUIRED`.
8. **OREV Intelligence Engine futuro** — semántica avanzada mediante backend privado; no existe todavía como IA conectada.

## Principio epistemológico OREV®

El motor mantiene separados HECHO, RELATO, OBSERVACIÓN, INTERPRETACIÓN, HIPÓTESIS e INFORMACIÓN FALTANTE. Las hipótesis tienen certeza BAJA/MEDIA/ALTA. La capa local no diagnostica ni convierte inferencias en hechos.

## Seguridad

- Sin API keys, Client Secrets ni tokens en frontend.
- Sin historias clínicas en GitHub/localStorage público.
- Datos clínicos: backend privado obligatorio.
- Correo/Calendar/Drive: OAuth oficial y mínimo privilegio cuando se implementen.
- Errores técnicos no deben registrar relatos personales completos.

## Estado de IA

La v0.10 contiene orientación estructurada local y reglas semánticas limitadas, explícitas y deterministas. No debe describirse como análisis de IA. La inteligencia semántica general queda reservada para un servicio privado validado por esquema y Red Team.
