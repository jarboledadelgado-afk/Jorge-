# OREV Universal v0.9 RC — QA

Estado antes de prueba humana final.

## Cambios principales
- Mapas OREV con campos estructurados: hechos, relatos, observaciones, interpretaciones, hipótesis con certeza e información faltante.
- Validación YES / PARTIAL / NO conservada por mapa.
- Correcciones crean nuevas versiones sin sobrescribir mapas anteriores.
- Rehidratación sintética OREV y foco incluidas en Diagnóstico.
- Tareas permiten edición completa del formulario local.
- Agenda local permite edición y notas.
- Hiperfoco usa timestamps y estados RUNNING / PAUSED / FINISHED.
- Búsqueda escapa HTML y consulta tareas, eventos y sesiones OREV.
- Integraciones externas continúan NOT_CONFIGURED / BACKEND_REQUIRED.

## Evidencia automatizable
- Sintaxis del prototipo fuente preparada sin loader dinámico.
- Red Team local: 1000 tareas, escape HTML, normalización de sesión OREV, historial cerrado y foco rehidratable.
- No se declara BROWSER PASS para v0.9 hasta prueba humana real.

## Pendiente humano mínimo
1. Abrir v0.9 por HTTPS en Samsung Internet.
2. Confirmar navegación.
3. OREV: relato → mapa v1 → EN PARTE → corrección → mapa v2 → Inicio → volver.
4. Si todo persiste, recargar una vez y volver a OREV.
5. Revisión visual rápida en escritorio.

Zary v1.9.0 no se modifica ni se migra en esta fase.