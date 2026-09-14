# QA REPORT — OREV® Centro de Control Universal v0.10 RC

## Resultado ejecutivo

- **GitHub Actions OREV QA:** PASS
- **Playwright E2E:** 54/54 PASS
- **Unexpected:** 0
- **Skipped:** 0
- **Flaky:** 0
- **Último lote E2E verificado:** ~36.4 s
- **JS syntax check:** PASS (`app.js` + `service-worker.js`)
- **Frontend secret grep:** PASS básico
- **PWA technical smoke:** PASS automatizado
- **Accessibility smoke:** PASS básico; auditoría formal sigue PARTIAL
- **Samsung Internet físico v0.10:** HUMAN / BROWSER PASS — `Paso 12/12 — PRUEBA COMPLETA`
- **Samsung Internet físico v0.9:** HUMAN / BROWSER PASS registrado por separado

## Matriz de prueba automatizada

Se ejecutan 6 viewports Chromium:

- 360 × 800
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1440 × 900

Cada viewport ejecuta 9 escenarios:

1. `USER_ACCEPTANCE_JOURNEY_01` — tarea, edición, agenda, Mi día, saturación, hiperfoco, búsqueda, OREV MAP v1 → EN PARTE → MAP v2, continuidad por navegación, reload, técnica, microacción, cierre e historial.
2. Perfil/tarea sobreviven `page.reload()`.
3. Entrada con HTML/script se trata como texto y no ejecuta JavaScript.
4. No existe overflow horizontal en el viewport probado.
5. Backup export → mutación → restore → recuperación del estado.
6. Fixture sintético v0.9 → migración/normalización v0.10 conservando tarea y sesión OREV compatible.
7. Manifest PWA enlazado, parseable y con requisitos técnicos básicos verificados.
8. `service-worker.js` disponible y arranque de app sin errores de página en el smoke test.
9. Accesibilidad básica: controles visibles con nombre accesible y foco programático.

Total: **6 × 9 = 54 ejecuciones E2E**.

## Evidencia humana v0.10

- **Evidence ID:** `HUMAN_LINEAR_FLOW_002`
- **Level:** HUMAN / BROWSER
- **Device:** Samsung Android
- **Browser:** Samsung Internet
- **Terminal state:** `Paso 12/12 — PRUEBA COMPLETA`
- **Status:** PASS

Este PASS cierra el gate humano físico del recorrido lineal definido para v0.10 RC. No demuestra por sí solo Gmail, Google Calendar, Drive privado, PAI/Excel backend, backend clínico, IA remota, sincronización multidispositivo ni otras capacidades externas.

## Fallos encontrados y reparados durante este ciclo

1. Una ejecución previa falló porque el proyecto tablet heredó WebKit del perfil iPad mientras CI solo instalaba Chromium. Se corrigió fijando `browserName: chromium` para todos los proyectos.
2. La primera prueba PWA del service worker construía una URL desde `about:blank` antes de navegar. Se reprodujo como 6 fallos idénticos, se corrigió navegando primero y construyendo después la URL, y la regresión completa quedó verde.

## GATES

| Gate | Estado |
|---|---|
| BOOT | PASS automatizado |
| ROUTING | PASS automatizado |
| STORAGE | PASS automatizado + reload E2E |
| ONBOARDING | PASS E2E |
| TASKS | PASS E2E núcleo |
| AGENDA LOCAL | PASS E2E núcleo |
| TODAY | PASS E2E |
| SATURATION | PASS E2E |
| FOCUS | PASS E2E |
| SEARCH | PASS E2E |
| OREV BASIC | PASS E2E |
| OREV SEMANTIC UPDATE LOCAL | PASS para fixtures soportados; motor general IA no conectado |
| OREV CONTINUITY | PASS E2E por navegación + reload |
| OREV CLOSE/HISTORY | PASS E2E |
| BACKUP | PASS E2E |
| RESTORE | PASS E2E |
| MIGRATION UNIVERSAL v0.9 fixture | PASS E2E |
| MIGRATION ZARY REAL | NOT READY / NO EJECUTADA |
| SECURITY SMOKE | PASS básico |
| RESPONSIVE TECHNICAL | PASS E2E 6 viewports |
| PWA TECHNICAL | PASS automatizado |
| ACCESSIBILITY SMOKE | PASS básico |
| ACCESSIBILITY FORMAL | PARTIAL |
| SAMSUNG INTERNET v0.10 | PASS HUMAN / BROWSER |
| HUMAN FINAL ACCEPTANCE | PASS para el recorrido lineal definido de v0.10 RC |

## Externos

- Correo: `EXTERNAL / NOT_CONFIGURED`
- Calendar: `EXTERNAL / NOT_CONFIGURED`
- Drive: `EXTERNAL / NOT_CONFIGURED`
- PAI/Excel: `BACKEND_REQUIRED`
- Clínica: `BACKEND_REQUIRED`
- IA semántica general: `NOT_CONFIGURED / BACKEND_REQUIRED`

## Criterio de salida de esta RC

No existen FAIL críticos automatizados abiertos en el lote actual y el recorrido humano físico definido para Samsung Internet terminó en `Paso 12/12 — PRUEBA COMPLETA`. Universal v0.10 RC queda aceptada como snapshot del núcleo local para el alcance probado.

Los servicios externos, sincronización multidispositivo y backends privados permanecen deliberadamente fuera de este PASS y no se presentan como funcionales.
