# Centro de Control Zary v1.6.2 — Estado real

## IMPLEMENTADO
- Navegación principal simplificada: Inicio, Trabajo, Mi niña, Casa, Yo.
- Pareja dentro del espacio personal.
- Captura “Necesito ordenar mi cabeza”.
- Dictado por voz cuando el navegador expone Web Speech API; fallback al micrófono del teclado.
- Mis 3 de hoy.
- Modo Hiperfoco 25/45/60 min con señal sonora y cierre del bloque.
- Modo “Estoy saturada”.
- Pendientes con antigüedad visible y estados terminado/abierto.
- Revisión semanal automática basada solo en datos registrados.
- Registro de energía y descanso informado por Zary.
- Agenda local y creación asistida de eventos en Google Calendar mediante enlace de evento.
- Trabajo: correo, auditoría clínica, PAI/Excel, agenda y pendientes.
- Auditoría clínica: interfaz de preparación de expediente, protocolo de cierre blindado, RETINA/Red Team y salidas previstas.
- Privacidad clínica: no se almacena contenido de expedientes en GitHub ni localStorage.
- Exportación de copia privada JSON y revisión semanal TXT.

## PROBADO A NIVEL DE CÓDIGO / PUBLICACIÓN
- Archivo index.html actualizado en main.
- GitHub Pages continúa siendo el canal de publicación.
- Persistencia local usa fallback seguro cuando localStorage falla.
- No se ha ejecutado una prueba E2E real completa en iPhone para esta revisión.

## PENDIENTE DE VALIDAR
- Dictado Web Speech en Safari/iPhone específico de Zary.
- Sonido del temporizador con políticas de audio de Safari.
- Flujo completo de creación de evento en Google Calendar desde iPhone.

## BLOQUEADO POR AUTORIZACIÓN / INFRAESTRUCTURA EXTERNA
- Lectura real de Gmail: OAuth Client ID válido y consentimiento real de Zary.
- Lectura/sincronización bidireccional de Google Calendar: OAuth y scopes mínimos.
- Creación y guardado automático en Google Drive: OAuth Drive y definición de permisos mínimos.
- Procesamiento automático de historias clínicas, resumen ejecutivo, auditoría RETINA y PowerPoint Premium: requiere capa privada de procesamiento. No debe ejecutarse contra un repositorio público o localStorage.
- Automatización 24/7 con la app cerrada: requiere backend seguro, no solo GitHub Pages.

## REGLA DE CIERRE BLINDADO
Antes de afirmar el desenlace de un paciente, verificar explícitamente: egreso, traslado, fallecimiento, continuidad hospitalaria, fecha/hora y documento fuente. Separar siempre HECHO DOCUMENTADO / INTERPRETACIÓN / INFORMACIÓN FALTANTE. Si no consta, decir que no consta.
