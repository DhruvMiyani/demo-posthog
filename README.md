# Signal Lab
A local browser error demo for PostHog → Capy → Photon notifications.

Run `npm install`, then `npm run dev`. Open http://127.0.0.1:5173.
Paste the public PostHog project token (phc_…) from project settings. Never use a personal API key.
Connect and trigger a synthetic exception. Verify it in PostHog Error Tracking.
Configure a PostHog Issue created HTTP webhook notification using the Capy automation webhook URL privately. This app does not store or call that URL.
The page confirms SDK initialization and exception submission only. PostHog ingestion, webhook execution and iMessage delivery require separate verification.

## Scope of this demo

The current button deliberately throws and captures a synthetic exception. It is not a checkout implementation with a regression to fix. For an error-to-fix-PR demonstration, first add a reproducible application bug and a meaningful check; then let Capy investigate and propose the fix on a separate branch. Do not treat removing the synthetic test button as fixing a production error.

## Build

Run `npm ci` and `npm run build`. Generated output and local credentials are excluded from Git.
