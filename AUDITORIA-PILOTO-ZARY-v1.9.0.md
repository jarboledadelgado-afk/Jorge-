# AUDITORÍA TÉCNICA — Centro de Control Zary v1.9.0

Fecha: 2026-09-10
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

## PROBADO

### PASS — revisión estática
- El HTML generado contiene estructura válida suficiente para publicación estática.
- El JavaScript de la versión candidata pasó `node --check` sin errores de sintaxis antes de publicar.
- `index.html` fue actualizado en `main` y recuperado nuevamente desde GitHub con versión v1.9.0.

### NO PROBADO / NO DEBE MARCARSE PASS
- Prueba E2E real desde el teléfono de Zary/Sari.
- Safari/iPhone específico.
- Web Speech API real en su dispositivo.
- Política de audio real del navegador móvil.
- OAuth Gmail con la cuenta real.
- Google Calendar bidireccional.
- Google Drive automático.
- Persistencia entre dispositivos.
- Backend privado.
- Procesamiento privado de historias clínicas.
- Automatización con la app cerrada.

## HALLAZGOS CRÍTICOS DE LA AUDITORÍA

### 1. GitHub Pages es frontend estático
Estado: **BLOQUEADO POR ARQUITECTURA** para funciones que necesitan servidor seguro.

No puede considerarse suficiente por sí solo para:
- procesamiento clínico privado;
- automatización 24/7;
- almacenamiento central multi-dispositivo;
- aislamiento multiusuario real;
- secretos de servidor;
- sincronización robusta de Google Drive/Calendar/Gmail.

### 2. Adjuntos
Estado previo: **SIMULADO / AMBIGUO**.

El código guardaba únicamente metadatos del archivo (nombre, tipo y tamaño). v1.9.0 lo declara de forma visible para evitar que el usuario crea que el archivo fue almacenado.

### 3. Auditoría clínica
Estado previo: **BOTONES DECORATIVOS / NO IMPLEMENTADOS**.

Los cuatro botones visuales no ejecutaban ninguna acción. v1.9.0 los convierte en acciones informativas explícitas que indican que el procesamiento privado está bloqueado hasta disponer de backend seguro.

### 4. Gmail
Existe un piloto separado `zary-v1.5.html` con Gmail de solo lectura y OAuth. Su E2E real no está demostrado en esta auditoría.

### 5. Navegación
La versión anterior manejaba una pila interna, pero no reflejaba la ruta en URL/hash y no tenía navegación de teclado global. v1.9.0 añade hash y atajos seguros fuera de campos de edición.

## MATRIZ QA RESUMIDA

| ID | Área | Estado |
|---|---|---|
| QA-001 | JS parse / sintaxis | PASS |
| QA-002 | Publicación index v1.9.0 en main | PASS |
| QA-003 | Recuperación del archivo publicado en repo | PASS |
| QA-004 | Crear registro local | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-005 | Editar registro | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-006 | Eliminar registro | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-007 | Buscar | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-008 | Atrás/adelante interno | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-009 | Hash/deep-link | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-010 | Teclado ←/→/Esc | IMPLEMENTADO / E2E REAL PENDIENTE |
| QA-011 | Temporizador | IMPLEMENTADO / AUDIO REAL PENDIENTE |
| QA-012 | Exportar JSON | IMPLEMENTADO / DISPOSITIVO REAL PENDIENTE |
| QA-013 | Importar JSON | IMPLEMENTADO / DISPOSITIVO REAL PENDIENTE |
| QA-014 | Gmail OAuth | IMPLEMENTADO SEPARADO / BLOCKED-PENDING REAL CONSENT |
| QA-015 | Calendar bidireccional | BLOCKED |
| QA-016 | Drive automático | BLOCKED |
| QA-017 | Backend privado | BLOCKED |
| QA-018 | Procesamiento clínico real | BLOCKED |
| QA-019 | Multiusuario/multicliente | NOT IMPLEMENTED |
| QA-020 | Uso real con Zary/Sari | NOT TESTED |

## GATE DEL PILOTO

- [x] Frontend base implementado
- [x] Botones principales no clínicos conectados
- [x] Persistencia local implementada
- [x] Exportación/importación local implementada
- [x] Estado real visible dentro de la app
- [x] No se simula almacenamiento de adjuntos
- [x] No se simula procesamiento clínico
- [ ] E2E real con Zary/Sari
- [ ] Safari/iPhone o dispositivo real objetivo
- [ ] Dictado real probado
- [ ] Audio real probado
- [ ] Gmail real probado con consentimiento
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

Para declarar **SARI/ZARY — PILOTO DEFINITIVO V1.0 TÉCNICAMENTE VALIDADO** todavía falta como mínimo ejecutar el recorrido E2E real en su dispositivo objetivo y resolver o excluir formalmente del alcance las funciones bloqueadas por backend/OAuth.

Después de eso debe realizarse una ronda de **VALIDACIÓN DE USO REAL — RONDA 1** antes de extraer el CORE UNIVERSAL.
