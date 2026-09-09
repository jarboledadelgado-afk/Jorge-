# Centro de Control Zary v1.5 — configuración Gmail

## Estado
La integración está implementada en `zary-v1.5.html` sobre la rama `zary-gmail-v1.5e`. Usa Google Identity Services y Gmail API directamente desde el navegador. No contiene `client_secret`, no almacena contraseña y no envía correos automáticamente.

## Alcance actual
- Zary autoriza su propia cuenta Google mediante OAuth oficial.
- El token de acceso queda solo en memoria y desaparece al cerrar o recargar.
- La app lee hasta 15 correos recientes de Inbox de los últimos 30 días.
- Clasifica de forma heurística `ATENCIÓN` / `REVISAR`.
- Permite preparar una respuesta y guardarla como borrador en el Gmail de Zary.
- No existe envío automático.
- No existe automatización en segundo plano cuando la app está cerrada.

## ÚNICO BLOQUEO EXTERNO
Crear el OAuth Client ID de Google. Este dato solo puede generarse dentro de una cuenta Google Cloud autorizada.

### Pasos en Google Cloud
1. Abre Google Cloud Console con la cuenta que administrará el proyecto.
2. Crea o selecciona un proyecto, recomendado: `Centro de Control Zary - TEST`.
3. Activa **Gmail API**.
4. En **Google Auth Platform**, configura Branding/Audience como **External** y mantén el proyecto en modo de prueba.
5. Añade como **test user** la cuenta Gmail de Zary.
6. En **Clients**, crea un OAuth Client ID de tipo **Web application**.
7. En **Authorized JavaScript origins**, añade exactamente: `https://jarboledadelgado-afk.github.io`
8. No hace falta `client_secret` en el frontend y no debe copiarse al repositorio.
9. Copia únicamente el **Client ID** terminado en `.apps.googleusercontent.com`.
10. En la app v1.5, pega ese Client ID en Configuración y pulsa `Guardar Client ID`.
11. Zary pulsa `Conectar Gmail de Zary`, inicia sesión en su propia cuenta y acepta el permiso solicitado.

## Permiso solicitado
`https://www.googleapis.com/auth/gmail.modify`

Este scope permite ver y modificar correo sin eliminarlo; la app lo usa para leer Inbox y crear borradores. El código no implementa envío automático.

## Gate de prueba
PASS solo si se confirma en el iPhone de Zary:
1. OAuth abre la pantalla oficial de Google.
2. La cuenta autorizada es la de Zary.
3. `Sincronizar` devuelve mensajes reales de su Inbox.
4. `Guardar como borrador` crea un draft real en Gmail.
5. Ningún mensaje se envía automáticamente.

## Siguiente fase (NO incluida en v1.5)
Para automatización 24/7 con la app cerrada hace falta backend seguro con refresh token / webhook / scheduler. No debe implementarse en GitHub Pages porque requeriría almacenar credenciales sensibles en un entorno público.
