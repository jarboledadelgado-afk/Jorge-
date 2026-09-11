# AUDITORÍA TÉCNICA — Centro de Control Zary v1.9.0

Fecha: 2026-09-11
Repositorio: jarboledadelgado-afk/Jorge-
Estado epistemológico: la evidencia manda sobre el porcentaje.

## VEREDICTO ACTUAL

**ZARY/SARI EN QA — NO ES TODAVÍA PILOTO DEFINITIVO VALIDADO EN USO REAL.**

## EVIDENCIA REAL DE USO

### PASS REAL
- Zary/Sari abrió la aplicación publicada y visualizó `Centro de Control · v1.9.0`.
- Navegó realmente hasta `#settings`.
- Gmail v1.6.1 cargó realmente en su dispositivo.
- El frontend reconoció el OAuth Client configurado y mostró el origen autorizado `https://jarboledadelgado-afk.github.io`.
- El error anterior `401 invalid_client` quedó superado: Google ya reconoce el OAuth Client.

### BLOQUEO REAL ACTUAL — Gmail OAuth
Segundo E2E real ejecutado desde el dispositivo de Zary/Sari. Google devolvió:

- `Acceso bloqueado: ... no completó el proceso de verificación de Google`
- la app está en pruebas y solo usuarios aprobados por el desarrollador pueden acceder;
- `Error 403: access_denied`.

Interpretación: el cliente OAuth ya existe y es reconocido. El bloqueo actual es de audiencia/consentimiento de Google Auth Platform. La cuenta que realizará el piloto debe quedar autorizada como **Test user** mientras la aplicación permanezca en modo Testing. No se debe marcar OAuth como PASS hasta repetir la autorización después de ese cambio y recibir token válido.

### CONFIGURACIÓN YA CERRADA EN CÓDIGO
- `zary-v1.5.html` está en Gmail v1.6.1.
- OAuth Client ID configurado en el frontend.
- scope limitado a `https://www.googleapis.com/auth/gmail.readonly`.
- no se envían correos automáticamente.
- no se guarda `client_secret` en el frontend.
- origen JavaScript configurado en Google Cloud: `https://jarboledadelgado-afk.github.io`.

## MATRIZ QA RESUMIDA

| ID | Área | Estado |
|---|---|---|
| QA-001 | Publicación app principal v1.9.0 | PASS |
| QA-002 | Apertura real app principal | PASS REAL |
| QA-003 | Navegación real a Ajustes | PASS REAL |
| QA-004 | Gmail v1.6.1 publicado/cargado | PASS REAL |
| QA-005 | OAuth Client reconocido por Google | PASS REAL — 401 superado |
| QA-006 | Usuario piloto autorizado en Testing | BLOQUEADO — Google Auth Platform/Test users |
| QA-007 | Consentimiento OAuth completo | BLOCKED HASTA QA-006 |
| QA-008 | Token Gmail readonly válido | BLOCKED HASTA QA-007 |
| QA-009 | Lectura real Inbox | BLOCKED HASTA QA-008 |
| QA-010 | Crear/editar/eliminar registros | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-011 | Buscar | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-012 | Teclado ←/→/Esc | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-013 | Temporizador/audio | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-014 | Exportar/importar JSON | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-015 | Calendar bidireccional | BLOCKED |
| QA-016 | Drive automático | BLOCKED |
| QA-017 | Backend privado | BLOCKED |
| QA-018 | Procesamiento clínico real | BLOCKED |
| QA-019 | Multiusuario/multicliente | NOT IMPLEMENTED |
| QA-020 | Uso real integral con Zary/Sari | IN PROGRESS |

## GATE INMEDIATO

- [x] OAuth Client creado.
- [x] Origen JavaScript autorizado.
- [x] Client ID incorporado en Gmail v1.6.1.
- [x] v1.6.1 cargado realmente en dispositivo.
- [x] Google reconoce el cliente; `401 invalid_client` superado.
- [ ] Autorizar la cuenta piloto en Google Auth Platform > Audience/Público > Test users.
- [ ] Repetir `Conectar mi Gmail`.
- [ ] Confirmar consentimiento exitoso y token readonly.
- [ ] Confirmar sincronización real del Inbox.

## BLOQUEOS DE ARQUITECTURA POSTERIORES

GitHub Pages sigue siendo frontend estático. No es suficiente por sí solo para automatización 24/7, secretos de servidor, persistencia central multi-dispositivo, procesamiento clínico privado ni un copiloto que acceda a Gmail con la aplicación cerrada. Esas funciones requieren una capa privada de servidor con OAuth server-side, almacenamiento seguro, aislamiento por cliente, revocación y auditoría.

## PRÓXIMO GATE

La única acción externa inmediata que no puede realizarse desde este repositorio es modificar la audiencia de Google Auth Platform. Debe autorizarse la cuenta piloto como Test user desde la cuenta Google Cloud propietaria del proyecto. Después se repite el E2E. Si Google entrega token y Gmail devuelve mensajes, OAuth + lectura Inbox podrán marcarse PASS REAL. Hasta entonces, no.