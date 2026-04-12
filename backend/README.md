# WinBack Backend

Next.js 15 API routes on Vercel. Serves the Stripe App frontend in `stripe-app/`.

## Local development

```bash
npm install
npm run dev        # Next.js dev server
npm test           # unit tests (Vitest, fast, mocked Supabase)
npm run lint
```

Environment variables go in `backend/.env.local`. See the project root `CLAUDE.md` for the full list.

## Integration test

`backend/__tests__/integration/dispute-wizard-flow.test.ts` walks the full dispute wizard end-to-end: create dispute, start wizard, upload evidence, generate narrative, fetch final state. It hits **real dev Supabase** and mocks Stripe, Anthropic, auth, and `next/server` `after()`.

### Run locally

```bash
npm run test:integration
```

Requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env.local`. The service role key bypasses RLS so the test can clean up its own rows — only ever point this at the dev Supabase project, never prod. See [WIN-47](https://linear.app/jkbtech/issue/WIN-47) for the launch-time prod cut-over plan.

Runs in ~3 seconds.

### Pre-PR checklist

Per the project root `CLAUDE.md`, run `npm run test:integration` locally before opening any PR that touches `backend/**`. CI also runs it automatically (see below), but catching failures locally is faster than waiting on a CI round-trip.

### CI

`.github/workflows/backend-ci.yml` runs both `npm test` (unit) and `npm run test:integration` on every PR that touches `backend/**` or the workflow file itself. The integration job is serialized via a `concurrency:` group so parallel PRs don't collide on the hardcoded `acct_WIN43_TEST` merchant ID in dev Supabase.

Required GitHub repository secrets:

| Secret | Value |
|---|---|
| `SUPABASE_URL` | `https://ssnwzgxvugraswghqsvo.supabase.co` (Winback Dev) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key from the Winback Dev Supabase project |

Add these in GitHub → Settings → Secrets and variables → Actions → New repository secret. Both must match the values in your local `backend/.env.local`.

### Failure modes

- **"SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required"** — env vars missing. Locally, check `.env.local`. In CI, check the repo secrets are set.
- **FK constraint errors during cleanup** — a previous run left orphaned rows. The test's `cleanupTestData` is FK-aware, but a new child table added without updating cleanup will break this. Add the missing `.delete().eq('merchant_id', ...)` call.
- **Anthropic or Stripe API errors** — the mocks in `__tests__/integration/mocks.ts` should intercept all outbound calls. If you see a real API error, a mock is missing or a new code path is bypassing it.
- **Flakes on timing** — vitest timeout is 30s in `vitest.integration.config.ts`. If it's actually slow, profile the specific step, don't just raise the timeout.

## Deployment

Vercel deploys from `backend/` (Root Directory set in project settings). Preview deploys on every PR; production deploys on merge to `main`.
