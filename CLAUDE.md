# Project: WinBack

> **Stripe App — Guided dispute resolution for small merchants**

## Project Overview

WinBack is a Stripe App that guides small merchants through winning payment disputes using reason-code-specific playbooks and AI-generated narratives. It runs inside the Stripe Dashboard. Hybrid pricing: 15% success fee (Pay-Per-Win, $0/mo) or $79/month flat (Pro, zero success fee); see `.taskmaster/docs/pricing-strategy.md` for details.

**Key Documents:**
- PRD: `.taskmaster/docs/prd.md` - Comprehensive product requirements (original baseline)
- Tasks: `.taskmaster/tasks/tasks.json` - Task breakdown (35 tasks: 29 original + 6 from review)
- Review: `.claude/plans/memoized-wandering-melody.md` - Full autoplan review with findings
- Research: `.taskmaster/docs/` - SDK constraints, billing research, playbooks
- Linear: WinBack team — WIN-1 through WIN-35

---

## Tech Stack

- **Frontend:** Stripe Apps SDK (React-based, runs in Stripe Dashboard iframe)
- **Backend:** Next.js 15+ (App Router) on Vercel
- **Database:** Supabase (PostgreSQL + RLS) — metadata only, no evidence file storage
- **AI:** Claude API (Anthropic) for narrative generation
- **Billing:** Stripe App Marketplace billing or Stripe Billing (TBD per research)
- **Monitoring:** Sentry for error tracking

## Architecture Overview

```
Stripe Dashboard (iframe) → Vercel API Routes → Supabase + Claude API + Stripe API
```

- Stripe App frontend communicates with Vercel backend via **Stripe App signature verification**
- Backend handles: Stripe API calls, Claude API narrative generation, Supabase operations
- Supabase: playbooks, dispute tracking, evidence file metadata (Stripe file IDs + filename/size/mime). Evidence file bytes are NEVER stored on our infrastructure -- merchants upload files directly from the browser to Stripe via the Files API, and the backend only persists the returned file ID.
- No PCI-scoped data stored outside Stripe; no customer-uploaded files stored on our servers

### Critical Architecture Decisions (from /autoplan review)

- **Monorepo with two packages** — `stripe-app/` (Stripe App frontend, UI extensions) and `backend/` (Next.js API on Vercel). Stripe CLI expects `stripe-app.json` at its project root; Next.js expects `app/` at its root. Separate directories avoid config conflicts (competing tsconfig, package.json, build systems). Each is independently deployable: Vercel deploys from `backend/`, `stripe apps upload` runs from `stripe-app/`. No monorepo tooling (Turborepo/Nx) needed at this scale.
- **Auth middleware is mandatory** — Every Vercel API route (except webhooks) MUST verify the Stripe App signature via `fetchStripeSignature()`. Without this, the backend is an open API. See WIN-31.
- **Background AI generation** — Claude API calls take 3-15 seconds. Don't block in the iframe. Use async generation with polling: POST returns a `generation_id`, client polls for completion. See WIN-18.
- **Evidence submission is irrevocable** — Stripe's `submit: true` on the Disputes API is final. No undo. Must implement partial-failure handling and idempotency. See WIN-20.
- **No evidence file storage** — files go browser-direct to Stripe via the Files API; the backend only stores the returned `stripe_file_id` plus metadata in the `evidence_files` table. The original "30-day Supabase Storage TTL" plan (WIN-33, migrations 003/004) was torn down in migration 018 -- nothing ever wrote to the bucket once the architecture pivoted to direct upload. Do not reintroduce a server-side evidence storage path without explicit discussion.
- **Stripe App Marketplace review takes 4-8 weeks** — Submit earliest possible version during Phase 1-2, not Phase 3. See WIN-29.

## Key Dependencies

- `@stripe/ui-extension-sdk` — Stripe Apps SDK
- `stripe` — Stripe Node.js client
- `@supabase/supabase-js` — Supabase client
- `@anthropic-ai/sdk` — Claude API client
- `next` — Next.js framework

## Testing

- **Primary:** Stripe test mode dispute simulation
- **Secondary:** Self-filed disputes on Joe's Stripe account
- **Framework:** Vitest (backend). The `stripe-app/` package has no test runner; verification is `npx tsc --noEmit` plus manual QA in the iframe.
- **Run tests:** `npm test` (backend unit), `npm run test:integration` (backend integration)

## QA Environment (current)

QA is **no longer driven through `stripe apps start` / a local backend**. The setup is:

- The WinBack Stripe App is **installed in test mode** on WinBack's own Stripe account (`acct_1TIwcOCbmbWLiv6V`). The installed app version is whatever was last published via `stripe apps upload`.
- The installed app's frontend calls the **Vercel production deployment** of the Next.js backend.
- Vercel production connects to **Supabase project `Winback Dev`** (id `ssnwzgxvugraswghqsvo`) — currently the only Supabase project. There is no separate prod Supabase yet (planned at marketplace launch per WIN-47).
- Test disputes are generated on WinBack's account via `stripe trigger charge.dispute.created` — the default Stripe CLI profile is already set to WinBack.

### What this means for landing changes

| Change type | Deploy path |
|---|---|
| Backend code (`backend/**`) | `git push origin main` → Vercel auto-deploys in ~1-2 min. |
| Stripe app frontend (`stripe-app/**`) | bump version in `stripe-app/stripe-app.json`, run `stripe apps upload` from `stripe-app/`, then reinstall in the Stripe test dashboard to pick up the new version. |
| DB migrations | Apply via the Supabase MCP `apply_migration` tool against `ssnwzgxvugraswghqsvo` (or the Supabase Dashboard SQL editor). The same DB serves both the dev Vercel preview and Vercel prod. |

### Implications for Claude

- **Don't suggest `cd stripe-app && stripe apps start` as the QA path.** That mode is for active source-edit feedback loops, not for the user's QA workflow.
- **Pushing to `main` is a deploy action.** Treat it as risky/visible per the executing-actions-with-care guidance — confirm before pushing, even for "ready to ship" PRs, unless the user has just explicitly authorized the push for this batch.
- **`stripe apps upload` requires a version bump first** (the upload fails on duplicate versions). Match the bump style of recent commits (`6d8bc64` bumped to 1.1.1; the next would be 1.1.2 or 1.2.0 depending on whether changes are user-visible).
- **Migrations apply to the same DB the user is QAing against.** That's currently safe pre-launch, but post-WIN-47 prod cut-over the answer changes — re-read this section then.

## Development Environment

- Node.js 20+
- Stripe CLI for local webhook testing and one-off triggers (default profile = WinBack: `acct_1TIwcOCbmbWLiv6V`).
- Vercel CLI for deployment introspection.
- Environment variables: `STRIPE_SECRET_KEY`, `STRIPE_APP_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`

---

## Development Workflow

### Task Execution

1. **Check Linear first** -- query the WinBack team in Linear (`list_issues` with `team: "WinBack"`) to get current issue statuses, priorities, and phase assignments. Linear is the source of truth for what's done, in progress, and next.
2. Check dependencies in Linear -- ensure dependent issues are complete
3. Reference relevant PRD sections in `.taskmaster/docs/prd.md` and the Linear issue description for implementation details
4. Implement the task
5. Test thoroughly
6. Create feature branch, commit, and mark task complete

### Branch Strategy

- `main` — stable, tested code
- `task-{id}-{slug}` — feature branch per task
- Merge to main after task validation

### Commit Message Format

```
<type>(<scope>): <short description>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`
Scopes: `stripe-app`, `backend`, or omit for cross-cutting changes

### Pre-PR Checklist (backend changes)

Before opening any PR that touches `backend/**`, run the integration test suite:

```bash
cd backend && npm run test:integration
```

This walks the full dispute wizard end-to-end against real dev Supabase with mocked Stripe/Anthropic/auth. It catches cross-route sequencing bugs that unit tests with mocked Supabase miss — the exact class of bug that surfaced during WIN-19 QA. Runs in ~3 seconds.

If it fails, diagnose and fix before landing the PR. Do not merge backend changes with a red integration test. See `docs/superpowers/plans/2026-04-12-win-43-integration-test.md` for what the test covers and known limitations.

Frontend-only PRs (stripe-app/**) do not need this check.

### Playbook edits require a DB reseed

The playbook data in `backend/lib/playbooks/data/*.ts` is the authoring source, but runtime code reads playbooks from the Supabase `playbooks` table via `getPlaybook()` -- NOT from the TS modules. Any time you edit a playbook data file you must reseed the dev DB:

```bash
cd backend && set -a && source .env.local && set +a && npm run seed:playbooks
```

QA caught this during WIN-20: the plan backfilled `stripe_evidence_field` on every checklist item in the TS source, but the route kept pulling stale rows from Postgres where the field was missing, producing `evidence[undefined]` errors from Stripe. Always reseed after touching `lib/playbooks/data/`.

---

## Important Constraints

- **Stripe Apps SDK runs in an iframe** — cannot make external API calls from the frontend, with one exception: file uploads go directly to Stripe's Files API from the browser (so file bytes never traverse our backend). All other external calls (Claude API, Supabase) must go through Vercel backend routes. SDK components only: Box, Button, TextField, TextArea, Select, Checkbox, Badge, Banner, Icon, Link, Spinner, Tabs, Table, Accordion. No custom HTML, no drag-and-drop, no rich text editor, no modals (use FocusView for fullscreen).
- **Auth middleware on every route** — Verify Stripe App signature on all API routes. Webhook routes use separate Stripe webhook signature verification.
- **No PCI data** — cardholder data stays in Stripe. We only store dispute metadata and Stripe file IDs; we never store the evidence file bytes themselves.
- **Evidence files are not on our servers** — uploaded browser-direct to Stripe; we keep the returned file ID in `evidence_files`, nothing else. If a feature seems to need server-side file access, raise it before building.
- **Evidence submission is irrevocable** — `submit: true` on Stripe Disputes API is final. Implement idempotency keys and partial-failure handling.
- **AI cost guardrail** — 5 narrative generations per dispute maximum.
- **AI hallucination validation** — After generating a narrative, verify all referenced evidence actually exists in uploaded files. Strip fabricated references.
- **Never block submission** — warn about incomplete evidence, but always allow the merchant to submit.
- **Empowerment over automation** — show reasoning, explain why, teach the merchant. This is a guide, not a black box.
- **Double-click prevention** — All submission buttons must be disabled on click + server-side idempotency.
- **Loading/error/empty states** — Every API-dependent view needs all three states. Empty states are features.
- **Timeline** — Realistic build: 4-5 weeks. Stripe marketplace review: 4-8 weeks on top of that. Submit for review as early as possible.

## Positioning

"TurboTax for disputes" — guided self-service, not outsourced automation. Merchants keep every dollar they recover. The playbooks (built from 10+ years of issuer-side experience) are the moat. The AI narrative is the cherry on top.

---

## Quick Reference

```bash
# View tasks
cat .taskmaster/tasks/tasks.json | python3 -m json.tool

# Track time
python3 .taskmaster/scripts/track-time.py start <task_id>
python3 .taskmaster/scripts/track-time.py complete <task_id>

# Execution state
python3 .taskmaster/scripts/execution-state.py start <task_id>
python3 .taskmaster/scripts/execution-state.py complete <task_id>

# Rollback to checkpoint
bash .taskmaster/scripts/rollback.sh <task_id>

# Development (run from repo root)
cd stripe-app && stripe apps start   # Stripe App frontend
cd backend && npm run dev            # Next.js API backend

# Deployment
# Vercel: set Root Directory to "backend/" in project settings
# Stripe: cd stripe-app && stripe apps upload
```
