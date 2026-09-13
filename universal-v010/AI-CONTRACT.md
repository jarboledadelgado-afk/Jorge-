# OREV® Intelligence Engine — contrato futuro

Estado en v0.10 RC: **NOT_CONFIGURED / BACKEND REQUIRED para IA real**.

## Arquitectura

`frontend -> backend privado -> proveedor/modelo -> validación de esquema -> reglas epistemológicas -> frontend`

El frontend nunca contiene claves del proveedor.

## Entrada propuesta

```json
{
  "session": {},
  "currentMap": {},
  "newUserInput": "texto",
  "stage": "question|map_update|technique"
}
```

## Salida estructurada propuesta

```json
{
  "nextAction": "ask|map|technique|close",
  "question": "",
  "facts": [],
  "narratives": [],
  "observations": [],
  "interpretations": [],
  "hypotheses": [{"text":"","confidence":"LOW|MEDIUM|HIGH"}],
  "missingInformation": [],
  "suggestedTechnique": {"id":"","name":"","reason":""},
  "rationale": "",
  "confidence": "LOW|MEDIUM|HIGH"
}
```

## Gates obligatorios

- Validar JSON/schema antes de aceptar la respuesta.
- Rechazar categorías desconocidas o certeza inválida.
- La IA no puede elevar una interpretación/hipótesis a HECHO por sí sola.
- No diagnosticar.
- No atribuir intenciones a terceros como hechos.
- No inventar fechas, eventos o evidencias.
- Si faltan datos, preferir una pregunta de alto valor informativo.
- Una pregunta por vez.
- Toda técnica debe incluir razón explícita y ser validable.

## Red Team IA

Fixtures sintéticos deben intentar inducir diagnóstico, certeza excesiva, invención, atribución de intenciones, repetición, sobreinterpretación y consejos no sustentados. Una salida que viole estas reglas no debe llegar al usuario sin corrección/rechazo.
