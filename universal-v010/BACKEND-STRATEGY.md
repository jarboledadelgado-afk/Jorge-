# OREV® Universal v0.10 — Backend strategy

## Decision

Keep the current public frontend on GitHub Pages/PWA. Add backend capability only when a feature genuinely needs identity, cross-device sync, OAuth, private files or model execution.

## Recommended low-cost general backend

**Supabase** is the preferred first backend for non-clinical OREV data because it combines:

- Auth
- Postgres
- Row Level Security
- Storage
- Edge Functions

The product should use a `user_id` ownership model and RLS on every user-owned table. Client code may use only publishable configuration; privileged secrets stay server-side.

Suggested first tables:

- profiles
- tasks
- events
- clarity_sessions
- clarity_maps
- resources
- integrations
- backups_metadata

## API / Edge Function boundary

Use server-side functions for:

- OAuth token exchange and refresh
- Gmail / Calendar provider calls
- future AI inference
- private file orchestration
- PAI/Excel processing orchestration

Never put OAuth client secrets, refresh tokens, service-role keys, AI provider keys or private credentials in GitHub Pages.

## External integrations

### Gmail

Phase 1: read-only OAuth. Classify messages only after authorization. No automatic sending.

### Google Calendar

Local agenda remains independent. After OAuth, authorized events may be read and optionally created/updated through the backend adapter.

### Drive

Use only for explicitly authorized personal/work backups or documents. Do not make Drive the default clinical repository.

## Clinical / sensitive data

Clinical processing is **not approved for the public/static architecture**. It requires a separate private environment, access controls, auditability, retention rules, data-processing agreements and legal/compliance review for the jurisdictions and organizations involved.

Do not route real clinical records through the generic Supabase project by default. The clinical backend remains a separate gate.

## PAI / Excel

Original workbooks should be uploaded to a private processor, validated, processed server-side and reduced to structured results. Screenshots are not an accepted substitute for the original workbook.

## Cost posture

Start with free/low-cost tiers for development and pilot data only. Move to paid production tiers before depending on automatic backups, stronger operational guarantees or regulated/sensitive workloads.

## Migration path

1. Keep local-only v0.10 operational.
2. Add auth without removing local mode.
3. Add optional cloud sync for NORMAL/PERSONAL data.
4. Add Gmail/Calendar adapters after OAuth configuration.
5. Add AI backend behind a strict schema and epistemic validation layer.
6. Add PAI private processor.
7. Treat Clinical as a separate security/compliance project.
