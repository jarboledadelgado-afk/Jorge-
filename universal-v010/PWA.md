# OREV® Universal v0.10 — PWA status

v0.10 includes a web app manifest, versioned service worker and install icons. The application remains fully usable as a normal HTTPS web app when installation is unavailable.

## Update strategy

The service worker uses a versioned cache and network-first requests for same-origin GET resources. This keeps the installed/offline shell recoverable without intentionally pinning an old RC when the network is available. Old v0.10 caches are deleted during activation.

## Scope

- Start URL and scope are limited to `universal-v010/`.
- No other OREV version is controlled by this service worker.
- v0.9 and Zary production remain outside its scope.
- Service worker registration is attempted only on HTTPS.

## Current evidence

Automated tests validate that the manifest is linked, parseable and declares 192/512 icon entries; they also verify that the service-worker asset exists and that the app still boots without page errors.

Physical browser promotion/installation is still a browser-level acceptance check. It must not be marked HUMAN/BROWSER PASS until observed on the target browser.
