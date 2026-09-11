# Centro de Control Zary — configuración Gmail OAuth

## Estado real actual

La integración Gmail del frontend está publicada en `zary-v1.5.html`, pero el contenido fue actualizado a **Gmail v1.6.0** después de una prueba real que devolvió:

- `401 invalid_client`
- `The OAuth client was not found`

Ese fallo demuestra que el Client ID anterior no era utilizable. Fue retirado del código.

## Qué está implementado

- Google Identity Services cargado en el navegador.
- OAuth Client ID configurable desde la propia pantalla.
- El Client ID se guarda solo en `localStorage` del navegador donde se configure.
- No se solicita ni se almacena `client_secret`.
- Scope actual: `https://www.googleapis.com/auth/gmail.readonly`.
- El token de acceso queda solo en memoria de la sesión.
- Lectura de hasta 15 mensajes recientes del Inbox de los últimos 30 días.
- Clasificación heurística ATENCIÓN / REVISAR.
- Preparación local de respuestas y estructura de auditoría.
- No existe envío automático.
- No existe guardado automático de borradores en Gmail en esta versión.
- No existe automatización 24/7 cuando la app está cerrada.
- La pantalla muestra el origen JavaScript que debe autorizarse en Google Cloud.

## Bloqueo externo pendiente

Crear un **OAuth 2.0 Client ID válido** dentro de una cuenta Google Cloud autorizada.

Este dato no puede ser inventado ni sustituido por una clave cualquiera. Debe generarse en Google Cloud.

## Configuración exacta en Google Cloud

1. Abrir Google Cloud Console con la cuenta que administrará la integración.
2. Crear o seleccionar un proyecto, por ejemplo `Centro de Control Zary - TEST`.
3. Habilitar **Gmail API**.
4. Abrir **Google Auth Platform**.
5. Configurar Branding / Audience para uso externo si la cuenta de Zary pertenece a otra organización o es Gmail personal.
6. Mantener la aplicación en modo de prueba durante el piloto.
7. Añadir la cuenta de Zary como **test user** si Google lo solicita para el modo de prueba.
8. Ir a **Clients** → **Create client**.
9. Elegir **Web application**.
10. En **Authorized JavaScript origins**, añadir exactamente:

   `https://jarboledadelgado-afk.github.io`

11. Crear el cliente.
12. Copiar únicamente el **Client ID**, que termina en `.apps.googleusercontent.com`.
13. No copiar ni publicar ningún `client_secret`.
14. Abrir la página Gmail de Zary.
15. Pegar el Client ID en `OAuth Client ID`.
16. Pulsar `Guardar Client ID`.
17. Pulsar `Conectar mi Gmail`.
18. Autorizar desde la pantalla oficial de Google.

## Gate de prueba

PASS solo si se demuestra en el dispositivo real de Zary:

1. Google abre el flujo OAuth sin `invalid_client`.
2. La cuenta autorizada es la cuenta elegida por Zary.
3. `Sincronizar` devuelve mensajes reales del Inbox.
4. La app muestra remitente, asunto, fecha y snippet de mensajes reales.
5. Ningún mensaje es enviado automáticamente.
6. Al recargar la página, el token desaparece y se requiere nueva autorización, salvo que se implemente posteriormente un backend seguro.

## Qué NO significa esta integración

Que el navegador de Zary pueda leer Gmail después de su consentimiento **no significa que ChatGPT tenga acceso automático a ese correo**.

Para que un copiloto remoto pueda trabajar de forma persistente sobre Gmail, Calendar, Drive y entregables con la app cerrada, hace falta una capa privada de servidor con OAuth server-side, almacenamiento seguro de refresh tokens, aislamiento de datos, permisos y auditoría.

## Siguiente fase

Después de superar el Gate OAuth de lectura:

- prueba real de clasificación;
- diseño de tareas/pendientes a partir de correo;
- integración Calendar/Drive con permisos mínimos;
- backend privado para persistencia y automatización;
- solo después, funciones de copiloto persistente y procesamiento de entregables.