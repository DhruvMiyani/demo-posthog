# Signal Lab

A local checkout demo for PostHog → Capy → Photon error notifications and fix PRs. Demo data only; no payment processing.

## Run

Run `npm ci`, then `npm run dev`. Open http://127.0.0.1:5173.
Paste the public PostHog project token (`phc_…`) from project settings, never a personal API key. Connect the project.

- With an empty cart, click **Calculate total** to reproduce the checkout failure.
- Add one demo item and calculate: the expected total is $12.
- Add another: the expected total is $24.

Failures are captured with their actual exception and stack, demo environment, release, and cart item count. Verify ingestion in PostHog Error Tracking, then the Capy run and iMessage separately. Configure the PostHog Issue created webhook to Capy privately; no webhook URL or credentials belong in this repo. Repeated identical failures may group into one issue and not trigger another Issue created alert.

## Investigation demo

History contains a working checkout baseline followed by a demo regression. The current `checkout-v2` intentionally has a real calculation defect. `npm test` contains product-total, empty-cart, and free-product checks; the empty-cart check currently fails. Ask Capy to inspect the error and Git history, fix the calculation on a new branch, run `npm test` and `npm run build`, then open a draft PR and send its actual link through the existing Photon conversation. Do not remove the error reporting or weaken the assertions to pass the checks.

## Build

`npm run build` builds the browser app. Dependencies, generated files, and local credentials are excluded from Git. Successful build alone does not mean the checkout tests pass.
