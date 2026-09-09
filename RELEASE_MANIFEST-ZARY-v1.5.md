# RELEASE_MANIFEST — Centro de Control Personal Zary v1.5

- version: v1.5
- previous_version: v1.4
- date: 2026-09-09
- changes: Gmail OAuth browser integration; Inbox sync; priority heuristic; Gmail draft creation; local OAuth Client ID configuration; no auto-send.
- files_changed: zary-v1.5.html; SETUP-GMAIL-ZARY-v1.5.md; RELEASE_MANIFEST-ZARY-v1.5.md
- tests_run: static code review only
- tests_passed: architecture/scope safety review
- tests_failed: none executed against live Gmail
- dependencies: Google Identity Services; Gmail REST API; GitHub Pages HTTPS
- providers: Google; GitHub Pages
- secrets_required: none in frontend
- privacy_impact: Gmail message metadata/snippets are fetched into the browser session after explicit Zary OAuth consent. Access token is memory-only. OAuth Client ID may be stored in localStorage; it is not a secret.
- risks: gmail.modify is a sensitive scope; test-user configuration required; browser token expires; heuristic prioritization may misclassify; no background processing.
- known_gaps: Google Cloud OAuth Client ID not yet created/configured; no real-account E2E; no background automation; no AI drafting backend.
- technical_status: BUILT_ON_BRANCH / NOT_CONNECTED
- E2E_status: NOT_RUN
- rollback_reference: main/index.html v1.4 remains untouched
