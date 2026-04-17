# Sentry — error tracking

**Project:** `jb-technology-llc/winback-backend` (Next.js)

## Local setup

Add to `backend/.env.local`:

```bash
SENTRY_DSN=https://...ingest.us.sentry.io/...
SENTRY_ORG=jb-technology-llc
SENTRY_PROJECT=winback-backend
```

Without `SENTRY_DSN` set, the SDK is disabled and no events are sent — fine for dev.

## Vercel setup

Set the same env vars in the Vercel project for `Production` and `Preview`. Also set:

```bash
SENTRY_AUTH_TOKEN=<sentry org auth token with project:write + project:releases>
```

This token gates **source map upload at build time**. Without it, errors from prod will show minified stack traces. Generate at https://jb-technology-llc.sentry.io/settings/auth-tokens/.

## What gets reported

- **Auth failures** — every Stripe App signature verification failure (`auth_failure: signature_verification` tag).
- **API route errors** — `disputes.list`, `disputes.submit.*`, `narratives.generate.*`. Each event carries `merchant_id`, `stripe_user_id`, and `route` tags. Submission events also carry `dispute_id`, `submission_id`, and `classified_code`.
- **Data drift** — when Stripe accepts a submission but our DB write fails. Tagged `severity: data_drift_after_stripe_success`. These are critical and must be reconciled by hand.
- **Background narrative generation failures** — Claude API timeouts, rate limits, validation errors. Tagged `route: narratives.generate.background` with `dispute_id` and `generation_id`.

User-input validation errors (4xx) are **not** sent — only 5xx and unexpected failures.

## Alert rules to configure (Sentry UI)

These cannot be code-defined; configure in the Sentry web UI under Alerts → Create Alert.

1. **Submission failures** — issue alert on any new error where `tag:route` starts with `disputes.submit.`. Notify: email + Slack.
2. **Auth failures spike** — metric alert on event count where `tag:auth_failure` is present. Threshold: > 10 in 5 minutes (likely a misconfig or attacker probing).
3. **Data drift** — issue alert on any new error tagged `severity:data_drift_after_stripe_success`. **Must page** — these are silent corruption events where Stripe accepted a submission but our DB doesn't reflect it.
4. **Narrative generation failures** — metric alert on event count where `tag:route` is `narratives.generate.background`. Threshold: > 5 in 10 minutes (suggests Claude API outage).

## Testing the integration

Throw a test error from a route to confirm the pipeline works:

```ts
throw new Error("WIN-32 sentry smoke test");
```

You should see it in https://jb-technology-llc.sentry.io/issues/?project=<id> within seconds, tagged with the merchant and route context.
