# QA — OREV® Centro de Control Universal v0.2

## Estado
- Producción Zary v1.9.0: SIN CAMBIOS.
- Universal v0.2: publicado en paralelo.

## Verificación ejecutada
- JavaScript extraído y validado con `node --check`: PASS.
- Referencias de handlers `onclick/onchange` contra funciones definidas: PASS.
- Referencias de rutas contra `routes`: PASS.
- Arquitectura de persistencia: localStorage con migración desde v0.1.

## Gates locales implementados
1. Onboarding persistente + edición de perfil.
2. Captura con área, bucket, prioridad, fecha, responsable, origen y nota.
3. CRUD: terminar, reabrir, editar, eliminar.
4. Priorización: 1 imprescindible, 2 importantes, puede esperar y esperando a terceros.
5. Estado vacío útil cuando no hay tareas.
6. Sesiones OREV persistentes: preguntas, respuestas, mapas versionados, validaciones, correcciones, técnica, microacción y cierre.
7. Reapertura de sesiones OREV desde estado guardado.
8. Técnicas iniciales y registro de recursos que funcionaron.
9. Respaldo JSON con versión de esquema y validación básica de importación.
10. Diagnóstico local con PASS/PARTIAL/BLOCKED/FAIL.
11. Voz con mensajes diferenciados y fallback de escritura/dictado.
12. Módulos externos marcados explícitamente como BLOCKED o REQUIERE INTEGRACIÓN EXTERNA.

## Red Team realizado
- 0 datos: manejo previsto con estados vacíos.
- texto largo / emojis / caracteres especiales: escapado HTML aplicado en salidas dinámicas.
- recarga: estado persistente en localStorage.
- sesión OREV incompleta: persiste y puede reabrirse.
- validación NO / EN PARTE: crea fase de corrección y nuevo mapa versionado.
- JSON corrupto: importación rechazada sin reemplazar estado actual.
- micrófono no soportado o bloqueado: fallback sin bloquear el producto.

## No declarado PASS todavía
- Runtime real en Chrome/Edge.
- 1000 elementos y estrés de almacenamiento.
- pruebas offline reales.
- Gmail OAuth.
- Google Calendar.
- Drive privado.
- procesamiento Excel real.
- backend clínico privado.
- RETINA clínica real.

## Siguiente gate
Prueba runtime del Universal v0.2 en navegador sin reemplazar v1.9.0 de Zary. Solo después de PASS se considera candidata a migración.