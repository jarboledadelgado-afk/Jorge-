# AUDITORÍA TÉCNICA — Centro de Control Zary v1.9.0

Fecha: 2026-09-11
Repositorio: jarboledadelgado-afk/Jorge-
Estado epistemológico: la evidencia manda sobre el porcentaje.

## VEREDICTO ACTUAL

**ZARY/SARI EN QA — NO ES TODAVÍA PILOTO DEFINITIVO VALIDADO EN USO REAL.**

Esta versión mejora y cierra varios huecos funcionales del frontend, pero aún existen pruebas reales pendientes y bloqueos de infraestructura externa.

## IMPLEMENTADO EN v1.9.0

- Navegación interna con Inicio / Atrás / Adelante.
- Estado de ruta visible mediante hash.
- Navegación por teclado: Flecha izquierda, Flecha derecha y Escape fuera de campos de edición.
- Focus visible para controles interactivos.
- Registro local por áreas: captura, trabajo, niña, casa, pareja, yo, diario.
- Crear, editar, marcar terminado/reabrir y eliminar registros.
- Búsqueda local.
- Agenda local con crear y eliminar eventos.
- Mis 3 prioridades.
- Temporizador de hiperfoco con 25/45 minutos y detener.
- Modo saturación.
- Guía OREV local con separación HECHOS / INTERPRETACIONES / HIPÓTESIS / NECESIDADES y validación del mapa.
- Exportación JSON.
- Importación JSON.
- Borrado explícito de datos locales.
- Página interna “Estado del piloto”.
- Acceso desde Trabajo al piloto Gmail separado.
- Botones clínicos antes decorativos ahora comunican explícitamente el bloqueo en lugar de simular procesamiento.
- Aviso visible de que los adjuntos NO se suben: solo se registra nombre/tipo/tamaño como referencia.

## EVIDENCIA REAL DE USO

### PASS REAL
- Zary/Sari abrió correctamente la aplicación publicada y visualizó `Centro de Control · v1.9.0`.
- Zary/Sari navegó realmente hasta `#settings` y la pantalla de Ajustes renderizó exportación, importación y borrado de datos locales.

### FAIL REAL — Gmail OAuth
Se ejecutó una prueba real desde el dispositivo de Zary/Sari. Google devolvió:

- `Acceso bloqueado: Error de autorización`
- `The OAuth client was not found.`
- `Error 401: invalid_client`

Interpretación técnica: el OAuth Client ID usado por el frontend no correspondía a un cliente OAuth válido disponible para Google.

Acción correctiva ejecutada:
- se retiró el Client ID inválido del código;
- `zary-v1.5.html` fue actualizado internamente a Gmail v1.6.0;
- ahora el OAuth Client ID se configura explícitamente desde la pantalla y se almacena solo en `localStorage`;
- el frontend muestra el origen JavaScript exacto que debe autorizarse;
- no se declara “OAuth activado” si falta un Client ID válido;
- scope actual reducido a `gmail.readonly`;
- no se implementa envío automático ni guardado de borradores.

Estado actual del OAuth: **BLOQUEADO POR CREDENCIAL EXTERNA DE GOOGLE CLOUD**.

## PROBADO

### PASS — revisión estática
- El HTML generado contiene estructura válida suficiente para publicación estática.
- El JavaScript de la versión candidata pasó revisión sintáctica antes de publicación.
- `index.html` fue actualizado en `main` y recuperado nuevamente desde GitHub con versión v1.9.0.
- El frontend Gmail fue actualizado para eliminar la credencial inválida hardcodeada.

### NO PROBADO / NO DEBE MARCARSE PASS
- Flujo OAuth con un Client ID nuevo y válido.
- Lectura real del Inbox después de OAuth correcto.
- Web Speech API real en el dispositivo objetivo.
- Política de audio real del navegador móvil.
- Google Calendar bidireccional.
- Google Drive automático.
- Persistencia entre dispositivos.
- Backend privado.
- Procesamiento privado de historias clínicas.
- Automatización con la app cerrada.

## HALLAZGOS CRÍTICOS

### 1. GitHub Pages es frontend estático
Estado: **BLOQUEADO POR ARQUITECTURA** para funciones que necesitan servidor seguro.

No puede considerarse suficiente por sí solo para:
- procesamiento clínico privado;
- automatización 24/7;
- almacenamiento central multi-dispositivo;
- aislamiento multiusuario real;
- secretos de servidor;
- sincronización robusta de Google Drive/Calendar/Gmail;
- acceso remoto persistente de un copiloto a Gmail.

### 2. Adjuntos
Estado previo: **SIMULADO / AMBIGUO**.

El código guardaba únicamente metadatos del archivo (nombre, tipo y tamaño). v1.9.0 lo declara de forma visible para evitar que el usuario crea que el archivo fue almacenado.

### 3. Auditoría clínica
Estado previo: **BOTONES DECORATIVOS / NO IMPLEMENTADOS**.

Los cuatro botones visuales no ejecutaban ninguna acción. v1.9.0 los convierte en acciones informativas explícitas que indican que el procesamiento privado está bloqueado hasta disponer de backend seguro.

### 4. Gmail
Existe un frontend separado `zary-v1.5.html`, actualmente actualizado a Gmail v1.6.0. Su primer E2E OAuth real falló por `401 invalid_client`. El código ya fue corregido para exigir un Client ID válido configurable. La siguiente prueba requiere crear el cliente OAuth real en Google Cloud.

### 5. Navegación
La versión anterior manejaba una pila interna, pero no reflejaba la ruta en URL/hash y no tenía navegación de teclado global. v1.9.0 añade hash y atajos seguros fuera de campos de edición.

## MATRIZ QA RESUMIDA

| ID | Área | Estado |
|---|---|---|
| QA-001 | JS parse / sintaxis | PASS |
| QA-002 | Publicación index v1.9.0 en main | PASS |
| QA-003 | Recuperación del archivo publicado en repo | PASS |
| QA-004 | Abrir app real en dispositivo de Zary | PASS REAL |
| QA-005 | Navegar a Ajustes | PASS REAL |
| QA-006 | Crear registro local | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-007 | Editar registro | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-008 | Eliminar registro | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-009 | Buscar | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-010 | Atrás/adelante interno | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-011 | Hash/deep-link | PARCIALMENTE PROBADO: #settings PASS REAL |
| QA-012 | Teclado ←/→/Esc | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-013 | Temporizador | IMPLEMENTADO / AUDIO REAL PENDIENTE |
| QA-014 | Exportar JSON | IMPLEMENTADO / DISPOSITIVO REAL PENDIENTE |
| QA-015 | Importar JSON | IMPLEMENTADO / DISPOSITIVO REAL PENDIENTE |
| QA-016 | Gmail OAuth con Client ID anterior | FAIL REAL — 401 invalid_client |
| QA-017 | Gmail OAuth con Client ID nuevo | BLOCKED — CREDENCIAL GOOGLE CLOUD PENDIENTE |
| QA-018 | Lectura Gmail real | BLOCKED HASTA QA-017 |
| QA-019 | Calendar bidireccional | BLOCKED |
| QA-020 | Drive automático | BLOCKED |
| QA-021 | Backend privado | BLOCKED |
| QA-022 | Procesamiento clínico real | BLOCKED |
| QA-023 | Multiusuario/multicliente | NOT IMPLEMENTED |
| QA-024 | Uso real integral con Zary/Sari | IN PROGRESS |

## GATE DEL PILOTO

- [x] Frontend base implementado
- [x] Botones principales no clínicos conectados
- [x] Persistencia local implementada
- [x] Exportación/importación local implementada
- [x] Estado real visible dentro de la app
- [x] No se simula almacenamiento de adjuntos
- [x] No se simula procesamiento clínico
- [x] Apertura real de v1.9.0 en dispositivo de Zary/Sari
- [x] Navegación real a Ajustes
- [x] Primer intento OAuth real ejecutado y fallo identificado
- [x] Client ID inválido retirado del código
- [ ] Crear OAuth Client ID válido en Google Cloud
- [ ] Repetir OAuth real sin 401
- [ ] Sincronizar Inbox real
- [ ] Dictado real probado
- [ ] Audio real probado
- [ ] Backend privado para funciones sensibles
- [ ] Persistencia central / multi-dispositivo si forma parte del alcance definitivo

## DISTINCIÓN DE VALIDACIÓN

### Validación técnica
Podrá afirmarse únicamente para los criterios que hayan sido ejecutados y documentados con PASS.

### Validación de uso real
Requiere que Zary/Sari utilice la aplicación en condiciones reales y que se registren por separado:
- incidencias;
- comprensión;
- utilidad;
- fricción;
- errores;
- funciones no utilizadas;
- funciones faltantes.

No debe confundirse una con la otra.

## PRÓXIMO GATE

El siguiente paso no es volver a intentar con el Client ID anterior. Es crear un **OAuth 2.0 Client ID de tipo Web application** en Google Cloud, autorizar el origen `https://jarboledadelgado-afk.github.io`, configurar el piloto y repetir la prueba real.

Después de superar OAuth + lectura real del Inbox, continúa la ronda E2E y solo entonces se puede evaluar el congelamiento de `SARI/ZARY — PILOTO DEFINITIVO V1.0`.