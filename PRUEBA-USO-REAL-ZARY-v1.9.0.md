# PRUEBA DE USO REAL — Zary v1.9.0

Fecha objetivo: primera sesión disponible con Zary/Sari.
Objetivo: validar uso real por separado de QA técnico.

## REGLA
No marcar PASS por intuición. Cada punto debe registrar resultado observado.

## RECORRIDO
1. Abrir la URL pública.
2. Confirmar que carga v1.9.0.
3. Ir a Inicio.
4. Abrir “Quiero ordenar lo que me pasa”.
5. Escribir una situación real y guardarla.
6. Volver atrás y entrar de nuevo.
7. Confirmar que el registro sigue allí.
8. Editarlo.
9. Marcarlo terminado y reabrirlo.
10. Probar “Guíame ahora”.
11. Responder preguntas y validar/rechazar el mapa.
12. Abrir “Mi día” y guardar un registro.
13. Abrir “Trabajo” y crear un pendiente.
14. Abrir Agenda y crear/eliminar un evento local.
15. Abrir Hiperfoco y ejecutar prueba corta controlada.
16. Probar Buscar.
17. Abrir Ajustes y exportar copia JSON.
18. Importar esa copia en el mismo dispositivo después de comprobar el archivo.
19. Probar botón Atrás/Adelante de la interfaz.
20. Probar botón Atrás del dispositivo/navegador.
21. Probar teclado físico si está disponible: ← / → / Esc fuera de campos.
22. Probar dictado.
23. Abrir Gmail piloto y registrar exactamente hasta dónde llega OAuth.
24. Cerrar y volver a abrir la app.
25. Registrar incidencias.

## REGISTRO POR PASO
Para cada paso anotar:
- PASS / FAIL / BLOCKED / NOT TESTED
- qué esperaba Zary;
- qué ocurrió;
- si entendió la pantalla sin explicación;
- tiempo/fricción percibida;
- error o confusión;
- severidad: crítica / alta / media / baja.

## PREGUNTAS DE VALIDACIÓN DE USO
- ¿Sabías qué hacer en cada pantalla sin que Jorge te explicara?
- ¿En qué punto dudaste?
- ¿Qué botón esperabas encontrar y no estaba?
- ¿Qué función sí te resultó útil hoy?
- ¿Qué función parecía útil pero no la usarías?
- ¿Qué parte te dio desconfianza?
- ¿Qué guardarías como hábito semanal?
- ¿Qué faltó para que sintieras que la herramienta realmente te acompaña?

## CRITERIO DE SALIDA
Solo después de esta ronda puede registrarse:

**VALIDACIÓN DE USO REAL — RONDA 1 COMPLETADA**

Eso no implica todavía validación de mercado ni universalización. Si aparecen fallos críticos, volver a IMPLEMENTAR → RETEST antes de congelar el piloto.
