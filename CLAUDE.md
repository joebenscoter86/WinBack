# Project: WinBack

> **Stripe App — Guided dispute resolution for small merchants**

## Project Overview

WinBack is a $29/month flat-rate Stripe App that guides small merchants through winning payment disputes using reason-code-specific playbooks and AI-generated narratives. It runs inside the Stripe Dashboard.

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
- **Database:** Supabase (PostgreSQL + Storage + RLS)
- **AI:** Claude API (Anthropic) for narrative generation
- **Billing:** Stripe App Marketplace billing or Stripe Billing (TBD per research)
- **Monitoring:** Sentry for error tracking

## Architecture Overview

```
Stripe Dashboard (iframe) → Vercel API Routes → Supabase + Claude API + Stripe API
```

- Stripe App frontend communicates with Vercel backend via **Stripe App signature verification**
- Backend handles: Stripe API calls, Claude API narrative generation, Supabase operations
- Supabase: playbooks, dispute tracking, temporary evidence storage (30-day TTL via cron)
- No PCI-scoped data stored outside Stripe

### Critical Architecture Decisions (from /autoplan review)

- **Monorepo with two packages** — `stripe-app/` (Stripe App frontend, UI extensions) and `backend/` (Next.js API on Vercel). Stripe CLI expects `stripe-app.json` at its project root; Next.js expects `app/` at its root. Separate directories avoid config conflicts (competing tsconfig, package.json, build systems). Each is independently deployable: Vercel deploys from `backend/`, `stripe apps upload` runs from `stripe-app/`. No monorepo tooling (Turborepo/Nx) needed at this scale.
- **Auth middleware is mandatory** — Every Vercel API route (except webhooks) MUST verify the Stripe App signature via `fetchStripeSignature()`. Without this, the backend is an open API. See WIN-31.
- **Background AI generation** — Claude API calls take 3-15 seconds. Don't block in the iframe. Use async generation with polling: POST returns a `generation_id`, client polls for completion. See WIN-18.
- **Evidence submission is irrevocable** — Stripe's `submit: true` on the Disputes API is final. No undo. Must implement partial-failure handling and idempotency. See WIN-20.
- **Supabase Storage has no native TTL** — 30-day evidence cleanup requires a cron job (Edge Function or pg_cron). See WIN-33.
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
- **Framework:** Vitest or Jest (TBD based on Stripe App SDK recommendations)
- **Run tests:** `npm test`

## Development Environment

- Node.js 20+
- Stripe CLI for local development and webhook testing
- Vercel CLI for deployment
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

---

## Important Constraints

- **Stripe Apps SDK runs in an iframe** — cannot make external API calls from the frontend. All external calls (Claude API, Supabase) must go through Vercel backend routes. SDK components only: Box, Button, TextField, TextArea, Select, Checkbox, Badge, Banner, Icon, Link, Spinner, Tabs, Table, Accordion. No custom HTML, no drag-and-drop, no rich text editor, no modals (use FocusView for fullscreen).
- **Auth middleware on every route** — Verify Stripe App signature on all API routes. Webhook routes use separate Stripe webhook signature verification.
- **No PCI data** — cardholder data stays in Stripe. We only store evidence files and dispute metadata.
- **Evidence file TTL** — 30-day auto-deletion in Supabase Storage (requires cron — no native TTL).
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
