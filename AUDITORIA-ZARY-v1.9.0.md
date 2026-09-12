# Centro de Control Zary — Auditoría v1.9.0

Fecha: 2026-09-13

## Resultado ejecutivo

El v1.9.0 ya es un piloto funcional local, pero todavía no es un producto conectado ni apto para procesar datos clínicos reales. La prioridad deja de ser añadir pantallas y pasa a cerrar continuidad, automatizar QA y construir las integraciones seguras.

## Matriz de estado

| Función | Estado | Riesgo | Solución | Prioridad | Gate |
|---|---|---|---|---|---|
| Inicio/navegación | FUNCIONAL REAL | Bajo | Mantener + QA automático | P1 | Navegar todas las rutas sin error |
| Pendientes | FUNCIONAL REAL | Bajo | Añadir estados Ahora/Hoy/Semana/Espera/Terminado | P1 | Persistencia tras recarga |
| Agenda local | FUNCIONAL REAL | Medio | Mantener; después Calendar OAuth | P1 | Crear/recargar/eliminar evento |
| Voz | FUNCIONAL PARCIAL | Medio | Fallback escrito; no bloquear producto | P2 | Funciona o informa permiso sin romper flujo |
| OREV Claridad | FUNCIONAL PARCIAL | Alto | Persistir sesión, preguntas adaptativas, mapa v2+ y cierre | P0 | Reabrir y continuar después de segundo mapa |
| Gmail | REQUIERE INTEGRACIÓN EXTERNA | Alto | OAuth oficial, mínimo privilegio, primero lectura | P0 | Leer inbox autorizado sin secretos |
| PAI/Excel | BLOQUEADO para análisis real | Alto | Procesamiento seguro del .xlsx original | P0 | Analizar archivo real de prueba sin datos sensibles |
| Auditoría clínica | BLOQUEADO | Crítico | Backend privado; nunca GitHub/localStorage | P0 seguridad | Evidencia/página/fecha sin exponer PHI |
| Exportar/importar JSON | FUNCIONAL REAL a validar | Medio | QA de ida y vuelta | P1 | Export→borrar copia de prueba→import→igualdad |
| Datos multidispositivo | NO IMPLEMENTADO | Alto | Backend privado con autenticación | P1 | Misma cuenta, dos dispositivos, datos coherentes |
| Estado del piloto | FUNCIONAL | Bajo | Separar vista técnica de vista Zary | P2 | Zary no ve ruido técnico |

## Hallazgos técnicos confirmados en código

1. El estado principal se conserva en `localStorage`; por tanto no existe sincronización real entre dispositivos.
2. Los adjuntos actuales guardan metadatos (nombre, tipo y tamaño), no el archivo.
3. La guía OREV actual mantiene `sessionText`, `sessionAnswers`, `sessionStep`, `mapVersion` y `mapValidation` en memoria de la página; esa arquitectura explica el riesgo de perder continuidad al recargar/salir y debe migrarse al estado persistente.
4. Las preguntas OREV se seleccionan principalmente por reglas/expresiones regulares y un máximo de pasos; todavía no constituyen razonamiento dinámico suficiente para una Sesión de Claridad completa.
5. El micrófono no debe ser dependencia crítica: los equipos corporativos pueden bloquearlo aunque la interfaz funcione.
6. La web pública no debe recibir ni persistir historias clínicas reales.

## Orden de ejecución

### Gate 1 — Continuidad OREV
Persistir sesión completa: motivo inicial, preguntas, respuestas, mapas, validaciones, correcciones, hipótesis y siguiente pregunta. Permitir cerrar y reabrir sin empezar de cero. No generar cierre si falta información esencial.

### Gate 2 — QA automático
Pruebas de rutas, botones, formularios, persistencia, estados vacíos, datos existentes, permisos negados y responsive. La piloto solo valida experiencia, no errores básicos.

### Gate 3 — Motor universal
Separar motor, perfil, módulos, integraciones y reglas personales. Zary pasa a ser perfil piloto, no código específico del producto.

### Gate 4 — Integraciones de productividad
OAuth de correo con solo lectura primero. Calendar después. Nunca contraseñas, códigos ni client secret en frontend.

### Gate 5 — PAI/Excel
Procesar únicamente archivo original. Separar dato, cálculo, posible inconsistencia, dato faltante y hallazgo propuesto.

### Gate 6 — Clínica privada
Backend privado, control de acceso, minimización y trazabilidad. Salidas: pregunta puntual, resumen, RETINA/Red Team y presentación. Regla: si no está documentado, no se afirma.

## Definición de PASS del producto utilizable

No se declara PASS porque una pantalla abra. PASS exige que la función produzca el resultado prometido, persista cuando corresponda, falle de forma segura y haya sido probada con un caso representativo.

## Siguiente mejor acción

Cerrar Gate 1: continuidad real de la Sesión de Claridad OREV antes de añadir más módulos visibles.
