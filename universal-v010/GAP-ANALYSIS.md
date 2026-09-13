# GAP Analysis — OREV® Centro de Control Universal v0.10 RC

## Decisiones técnicas aplicadas

| Necesidad | Estándar aplicado | Estado v0.10 | Gap restante | Riesgo | Prioridad |
|---|---|---|---|---|---|
| Navegación/estado | Router y eventos deterministas | Implementado | Historial URL real no necesario aún | Bajo | P2 |
| Persistencia local | Normalización + localStorage + reload E2E | Implementado para núcleo | localStorage es síncrono y no es almacén de datos sensibles | Medio | P1 |
| QA navegador | Playwright con interacción DOM real | Implementado | Samsung Internet queda como aceptación humana | Bajo | P1 |
| Responsive | 360/390/430/768/1024/1440 | Automatizado | Percepción visual final humana | Bajo | P2 |
| CI | GitHub Actions: sintaxis, security grep, E2E, report | Implementado | Puede ampliarse con lint/a11y dedicado | Bajo | P2 |
| Backup/restore | Export + restore transaccional lógico + E2E | Implementado | Nube privada futura | Medio | P1 |
| Migración | Fallback de esquema + fixture E2E | Implementado para Universal anterior | Zary real no migrada | Alto si se migra prematuramente | P0 antes de migración real |
| OREV local | Motor estructurado y mapas versionados | Implementado | Semántica general limitada | Medio | P1 |
| OREV IA | Contrato de backend | Diseñado, no conectado | Backend/modelo/validación real | Alto si se simula | P0 futuro |
| Correo/Calendar/Drive | Adaptadores futuros | NOT_CONFIGURED | OAuth/provider | Externo | P2 |
| PAI/Excel | Backend privado requerido | BACKEND_REQUIRED | Procesador seguro de XLSX | Alto | P1 futuro |
| Clínica | Backend privado obligatorio | BACKEND_REQUIRED | Seguridad/compliance/indexación | Crítico | P0 futuro |
| Seguridad frontend | Escape HTML + secret scan + sin datos clínicos | Implementado básico | CSP/headers y revisión más amplia futura | Medio | P1 |
| Accesibilidad | labels/touch targets/reduced motion básicos | Parcial | auditoría a11y formal | Medio | P2 |
| Offline | degradación local parcial | Parcial | Service Worker solo si se justifica y con kill-switch | Medio | P3 |

## Fundamentos

- Playwright se usa para pruebas de navegador de verdad, emulación de dispositivo y CI reproducible.
- En CI se usa un solo worker para estabilidad.
- localStorage se mantiene solo para el núcleo no sensible del prototipo; no se considera almacenamiento seguro para secretos ni datos clínicos.
- La futura capa de IA se ejecutará detrás de backend privado y respuestas estructuradas validadas.
- Las integraciones externas permanecen explícitamente NOT_CONFIGURED/BACKEND_REQUIRED hasta existir autorización o infraestructura real.
