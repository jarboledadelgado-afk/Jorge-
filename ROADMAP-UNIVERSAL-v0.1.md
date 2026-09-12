# OREV® Centro de Control — Roadmap universal v0.1

## Regla de estado
Cada módulo se clasifica como:
1. FUNCIONAL REAL
2. FUNCIONAL PARCIAL
3. DEMO
4. BLOQUEADO
5. REQUIERE INTEGRACIÓN EXTERNA

No se declara PASS sin prueba verificable.

## Estado actual

| Función | Estado | Riesgo principal | Solución | Prioridad | Prueba de aceptación |
|---|---|---|---|---|---|
| Navegación base | FUNCIONAL REAL | Historial inconsistente | Mantener rutas simples y QA | Alta | Ir/volver/inicio sin bloqueo |
| Onboarding universal | FUNCIONAL REAL local | No sincroniza entre dispositivos | Backend futuro | Alta | Crear perfil y reabrir navegador |
| Captura de tareas | FUNCIONAL REAL local | Solo navegador actual | Persistencia privada futura | Alta | Crear/cerrar/reabrir tareas |
| Priorización AHORA/HOY/SEMANA | FUNCIONAL REAL local | Heurística simple | Motor inteligente futuro | Alta | Ordenar y mostrar 1+2 prioridades |
| Sesión OREV persistente | FUNCIONAL PARCIAL | Reglas locales, no IA | Conectar motor IA privado | Muy alta | Salir y reabrir sin perder sesión |
| Mapas OREV revisables | FUNCIONAL REAL local | Hipótesis simples | IA + validación longitudinal | Muy alta | Mapa1→En parte→Mapa2→Sí |
| Respaldo JSON | FUNCIONAL REAL | Manual | Drive privado futuro | Media | Exportar/importar y recuperar estado |
| Diagnóstico automático | FUNCIONAL REAL local | No prueba OAuth/backend | Añadir pruebas E2E | Alta | Mostrar PASS solo donde hay evidencia |
| Voz | FUNCIONAL PARCIAL | Equipos corporativos bloquean SpeechRecognition | Fallback de dictado/entrada manual | Media | Fallo de voz no bloquea uso |
| Archivos reales | REQUIERE INTEGRACIÓN EXTERNA | Privacidad y persistencia | Drive/backend privado | Muy alta | Subir/abrir/eliminar archivo real |
| Gmail | REQUIERE INTEGRACIÓN EXTERNA | OAuth/políticas corporativas | OAuth oficial, mínimo privilegio | Muy alta | Leer correo real autorizado |
| Calendar | REQUIERE INTEGRACIÓN EXTERNA | OAuth | OAuth oficial | Alta | Leer y crear evento de prueba |
| PAI / Excel | BLOQUEADO para análisis real | Procesamiento de archivos | Backend seguro + parser XLSX | Muy alta | Excel→hallazgos→resumen trazable |
| Auditoría clínica | BLOQUEADO | Datos sensibles | Backend privado y trazabilidad | Crítica | Documento→evidencia→RETINA→cierre |
| Presentación Premium | BLOQUEADO | Depende de análisis real | Generación privada de PPTX | Alta | PPTX trazable desde evidencia |

## Gates

### Gate 1 — Núcleo local universal
- Onboarding
- Captura
- Priorización
- Sesión OREV persistente
- Mapas revisables
- Respaldo
- Diagnóstico

### Gate 2 — Conexiones Google
- Gmail solo lectura
- Calendar
- Drive privado
- Panel de conexión con estados reales

### Gate 3 — Trabajo profesional
- Correo → petición → responsable → fecha → acción → borrador → pendiente
- PAI/Excel real
- Informes y seguimientos

### Gate 4 — Clínica privada
- Subida privada
- Pregunta puntual
- Cronología
- RETINA + Red Team
- Resumen 1 hoja
- Presentación Premium

### Gate 5 — Producto multiusuario
- Autenticación
- Datos separados por usuario
- Módulos activables
- Reglas personales
- Sin secretos en frontend
- Auditoría de acciones

## Red Team obligatorio
Antes de cerrar un gate probar:
- sin datos
- muchos datos
- recarga
- cambio de dispositivo
- offline
- permiso denegado
- navegador corporativo
- entrada inesperada
- caída de integración
- interpretación incorrecta

## Siguiente mejor acción
Validar `universal-v0.1.html` sin reemplazar todavía la instancia productiva de Zary. Si el Gate 1 pasa, migrar el núcleo universal a una nueva versión de Zary conservando sus datos.