# Carryover: WinBack v1.1.7 livemode isolation

**Read this first.** Then read the main plan: [`2026-04-28-livemode-data-isolation.md`](./2026-04-28-livemode-data-isolation.md). The plan is the source of truth for HOW; this doc is the source of truth for STATE.

**As of:** 2026-05-04. **Branch:** `feat/livemode-isolation` in worktree `/Users/joeb/Projects/WinBack-livemode/`.

---

## Why this exists

Stripe rejected WinBack v1.1.6 because the backend served test-mode disputes when the merchant viewed the app in live-mode dashboard. Root cause: single `STRIPE_SECRET_KEY` at boot. Plan refactors to per-request mode selection.

**Architectural decision (already settled):** Stripe Apps issues ONE signing secret per app (not one per mode). So there's a single `STRIPE_APP_SECRET`, and mode comes from the request body's `livemode` claim (which the frontend sets from `context.environment.mode`). API keys (`sk_live_*`/`sk_test_*`) and webhook secrets ARE per-mode. See plan Task 3 for full reasoning.

**Earlier confusion to avoid:** Don't try to add `STRIPE_APP_SECRET_LIVE`/`_TEST`. They don't exist. The plan was originally written assuming they did, then revised after empirically confirming Stripe shows the same `absec_*` regardless of mode toggle.

---

## What's done (10 commits on `feat/livemode-isolation`)

Tasks 1-7 complete. Branch builds for the touched files. Cascading tsc errors in routes that haven't been updated yet are expected.

```
06dfc8d feat(backend): getDisputeForAccount filters by livemode      [Task 7]
98b5367 feat(db): add livemode columns and index (022)               [Task 6]
f37bf73 feat(backend): mode-aware Stripe client                       [Task 5]
980befd feat(backend): pass livemode Sentry tag through withStripeAuth [Task 4]
30095f3 feat(backend): single-secret signature verification           [Task 3]
2563fd1 feat(backend): add livemode to VerifiedRequest type           [Task 2]
eb1e504 chore(env): drop /s regex flag (ES2017 incompat) + de-dash    [Task 1 polish]
e82457d chore(env): restore JSDoc + minor test polish                 [Task 1 polish]
3a89667 test(backend): unstub livemode env vars in billing helpers    [Task 1 followup]
6e63d0f feat(backend): add mode-scoped Stripe env vars                [Task 1]
```

**Test state at end of Task 7:** 481/481 unit pass. 7/7 integration pass (still works because integration test routes use `getDispute` mock that ignores args — once routes are updated in Task 8+, integration test will hit real Supabase queries and need the migration applied).

---

## What's blocked

### 1. Migration 022 NOT yet applied to dev Supabase

The SQL is committed (`98b5367`, file at `backend/supabase/migrations/022_livemode_isolation.sql`) but the migration has NOT been applied to the dev DB (`ssnwzgxvugraswghqsvo`). MCP `apply_migration` was denied by the harness; user needs to apply via Supabase Dashboard SQL editor OR re-grant MCP permission.

**Until applied:** integration tests (Task 21) and the smoke script (Task 22.5/26) will fail at runtime when querying the `livemode` column. Unit tests with mocked supabase are unaffected. Tasks 8-20 can proceed without the migration applied — only Tasks 21+ need it.

**Apply via dashboard:** https://supabase.com/dashboard/project/ssnwzgxvugraswghqsvo/sql/new → paste contents of `backend/supabase/migrations/022_livemode_isolation.sql` → run.

### 2. Live-mode QA install path is org-level blocked

Stripe Apps publisher restriction: WinBack is published from the JB Technology LLC org, so NO account in that org (WinBack, Docket, etc.) can install via the External Test link. Error: *"You can't install an app that's been published on this account."*

**Status:** user emailed the Stripe reviewing engineer asking for a recommended QA path. Awaiting response. Drafted email is in the conversation history (concise version, "asking for advice").

**Fallback if no response:** ship the fix on test-mode confidence + integration test coverage. The smoke script (Task 22.5/26) exercises both modes via body claim — proves the architecture even without a live install. Marketplace reviewer becomes the live verification step. Plan Task 28 was already updated to acknowledge this.

### 3. Push to main blocked

The plan commit (`e52ce13` on local main) wasn't pushed to origin/main — the harness denied the push without explicit user authorization. Same likely applies to subsequent pushes. User should authorize push when ready.

---

## Open items the user should handle (not the next agent)

1. **Apply migration 022** to dev Supabase (see above).
2. **Push to origin/main** — the plan commit (`e52ce13`) and any plan revisions, plus eventually the worktree branch (`feat/livemode-isolation` → push as `git push -u origin feat/livemode-isolation`).
3. **Watch for Stripe reviewer reply** about live-mode QA.
4. **Plan revisions on main are uncommitted** — `/Users/joeb/Projects/WinBack/docs/superpowers/plans/2026-04-28-livemode-data-isolation.md` has architectural revisions (single-absec model) that aren't committed. User should commit these to main before pushing.
5. **`.env.local` on main is up to date** — has the 4 new vars (`STRIPE_SECRET_KEY_LIVE/_TEST`, `STRIPE_WEBHOOK_SECRET_LIVE/_TEST`) populated. Worktree has its own copy (gitignored). Both files are good.
6. **Vercel prod env vars provisioned** by user during the session. The 4 new vars (`STRIPE_SECRET_KEY_LIVE/_TEST`, `STRIPE_WEBHOOK_SECRET_LIVE/_TEST`) should be live in prod env. `STRIPE_APP_SECRET` was unchanged. Verify with `npx vercel env ls production | grep STRIPE_` before merging.

---

## Where to resume (Tasks 8-21)

Next agent picks up at **Task 8**. Plan source of truth: `docs/superpowers/plans/2026-04-28-livemode-data-isolation.md`. Use `superpowers:subagent-driven-development` skill but with these efficiency rules learned this session:

### Batching strategy

- **Tasks 8-9** (disputes list + detail routes): single subagent. They share patterns.
- **Tasks 10-12** (submit, evidence-files×2, by-payment-intent): single subagent.
- **Tasks 13-14** (narratives generate + polling): single subagent.
- **Tasks 15-16** (preflight, insights, onboarding): single subagent.
- **Task 17** (integration mocks): controller-driven, ~5 lines.
- **Task 18** (webhook handler): single subagent. Substantive change.
- **Task 19** (frontend apiClient): controller-driven, 3-line change in 3 functions.
- **Task 20** (version bump): controller-driven. Edit `stripe-app/stripe-app.json` to `"version": "1.1.7"`, run `npm run build` in stripe-app/.
- **Task 21** (integration test): single subagent. New test file, exercises real Supabase if migration applied.

### Review policy

Skip formal spec/code-quality review for mechanical batches (route updates that just add `livemode` to function calls). Use review for:
- Task 18 (webhook — has try-both pattern + DB writes, real complexity)
- Task 21 (integration test — load-bearing proof of correctness)
- Final review at end of all tasks.

For unreviewed tasks, controller verifies via `npm test` + targeted `tsc --noEmit` after the implementer reports DONE.

### Task pattern (for routes 8-16)

Every route follows the same shape:
1. Destructure `livemode` from `withStripeAuth` context: `async (request, { identity, livemode }) => {`
2. Pass `livemode` as first arg to every `getDispute(...)`, `getCharge(...)`, `submitDispute(...)`, `downloadStripeFile(...)`, `uploadCombinedEvidence(...)`, `listDisputes(...)`, `getCustomer(...)`, `getPaymentIntent(...)` call.
3. Pass `livemode` as first arg to every `getDisputeForAccount(...)` call.
4. Add `.eq("livemode", livemode)` to any direct supabase query against `disputes`, `dispute_submissions`, `narrative_generations`, `evidence_files` tables.
5. Add `livemode` field to any `.insert(...)` or `.upsert(...)` payload writing to those tables.
6. Existing route tests likely break (mock signatures changed). Update them in the same commit.

### Final phase (Tasks 22-31 in plan)

These are mostly user-driven QA, doc updates, and PR creation. Plan has them detailed. Highlights:
- Task 22.5: smoke script exists at `backend/scripts/smoke-livemode.ts` — already in plan, will need writing during this phase.
- Task 25: pre-merge env var provisioning — already done by user during this session.
- Task 28: live-mode QA — blocked unless Stripe reviewer unlocks. Plan acknowledges fallback.
- Task 31: marketplace resubmission with cover letter.

---

## Things to remember (project conventions + session-learned gotchas)

- **No em dashes** anywhere in copy/code. The user's memory has this rule. (Em dash policy is per the user's MEMORY.md.) Use periods, commas, or hyphens. Caught this on the JSDoc restoration in Task 1 polish.
- **Filename is `.env.example`**, not `.env.local.example` (plan said the latter).
- **`tsconfig.json` targets ES2017** — don't use ES2018+ regex flags like `/s` (dotall). Caught this on the Task 1 polish that introduced `/s`, then reverted.
- **`STRIPE_APP_SECRET` value is `absec_YwTG96GFgN4VmtO6nySM6tYLO1yx4hjL`** in both local and Vercel prod. The older `absec_prjz...` value was a stale artifact from when WinBack was installed on the Docket account before the WinBack Stripe account existed. User cleaned this up.
- **Stripe SDK static method `Stripe.webhooks.signature.generateTestHeaderString` doesn't exist** — use the instance method on a throwaway Stripe client. Pattern is in `verify.test.ts` and `withStripeAuth.test.ts`.
- **The `getStripe()` constructor in `verify.ts`** needs `STRIPE_SECRET_KEY` set (any non-empty value works since verifyHeader is HMAC-only). Tests must set this in beforeEach.
- **Multiple billing test files have `setRequiredEnvVars()` helpers** that need updating whenever new vars are added to `REQUIRED_KEYS` in env.ts — don't centralize as a refactor in this PR (out of scope), just keep them in sync.
- **Auto mode is active** — execute autonomously, prefer action over planning, but ask for explicit auth on shared-system writes (migrations, prod env, push to main).
- **The user prefers tight responses** and dislikes verbose summaries.

---

## Resume command for next agent

When the user starts the next session, kick off with this message to the agent (or paste this whole carryover into the first prompt):

> Continue the WinBack v1.1.7 livemode-isolation implementation. Read `docs/superpowers/plans/2026-05-04-livemode-isolation-CARRYOVER.md` first for current state, then `docs/superpowers/plans/2026-04-28-livemode-data-isolation.md` for the plan. The branch `feat/livemode-isolation` is at `/Users/joeb/Projects/WinBack-livemode/` with Tasks 1-7 done. Pick up at Task 8 using subagent-driven-development with the batching strategy in the carryover doc.

The next agent should:
1. Read the carryover doc.
2. Confirm migration 022 is applied (ask user, or check via Supabase MCP `execute_sql` listing columns).
3. If applied, proceed with Task 8+. If not, can still do Tasks 8-20 (unit-test only, mocked supabase) but flag at end.
4. Use TodoWrite to track per-batch progress.
5. After all 21 tasks, run final verification (npm test + npx tsc --noEmit + `npm run test:integration`) and dispatch the final code-reviewer subagent before opening the PR.
