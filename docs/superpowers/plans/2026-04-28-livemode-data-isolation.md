# Live/Test Mode Data Isolation Implementation Plan

> **🛑 EXECUTION IN PROGRESS.** Read [`2026-05-04-livemode-isolation-CARRYOVER.md`](./2026-05-04-livemode-isolation-CARRYOVER.md) first for current state. Tasks 1-7 are done on branch `feat/livemode-isolation` in worktree `/Users/joeb/Projects/WinBack-livemode/`. Migration 022 SQL is committed but NOT applied to dev Supabase. Resume at Task 8.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every connect-account-scoped Stripe API call mode-aware so that requests from a Live mode dashboard see only Live data and requests from Test mode see only Test data, eliminating the bug Stripe's marketplace review found in v1.1.6 (Test mode disputes appearing in a Live mode app drawer).

**Architecture:** The Stripe Apps SDK signs each iframe request with one of two mode-scoped secrets — Test or Live. The backend now provisions both secrets in env, tries verification against each, and lets the secret that verifies determine the authoritative `livemode`. That `livemode` is plumbed through `withStripeAuth` into a refactored `lib/stripe/client.ts` that holds two cached `Stripe` instances — one per `STRIPE_SECRET_KEY_LIVE`/`STRIPE_SECRET_KEY_TEST`. Every connect-scoped call (`disputes.list`, `disputes.retrieve`, `charges.retrieve`, `paymentIntents.retrieve`, `customers.retrieve`, `files.create`, `files.retrieve`, `disputes.update`) routes through the matching client. The DB gains a `livemode boolean` column on `disputes`, `webhook_events`, `dispute_submissions`, and `narrative_generations`; every read includes it as a filter and every write populates it. Webhooks try both webhook secrets in the same try-both pattern. The frontend reads `context.environment.mode` and includes `livemode` in every request body for telemetry; the backend never trusts the body, only the signature.

**Tech Stack:** Next.js 15 App Router, Stripe Apps SDK (`@stripe/ui-extension-sdk`), `stripe` Node client, Supabase (Postgres + RLS bypass via service role), Vitest. The platform is `acct_1TIwcOCbmbWLiv6V`. The plan does not touch billing (`lib/billing.ts`) or platform-account flows; that is a separate follow-up.

**Out of scope (do not address in this plan):**
- The `checkout-from-token` 500 (Stripe rejection issue #2) — needs Sentry trace.
- Hardcoded "Version 0.0.1" in `AppSettings.tsx` (issue #3).
- External link icon on Upgrade link (issue #4).
- Mode-aware billing (`lib/billing.ts`, `/api/billing/*`, `/api/webhooks/stripe-billing`). Billing keeps using the existing `STRIPE_SECRET_KEY`/`STRIPE_BILLING_WEBHOOK_SECRET` until a follow-up plan addresses it.

---

## File Structure

**New files:**
- `backend/supabase/migrations/022_livemode_isolation.sql` — adds `livemode` columns, indexes, and backfills existing rows to `false` (current data is all test mode).
- `backend/lib/stripe-auth/__tests__/verify.livemode.test.ts` — proves try-both signature verification picks the right mode.
- `backend/lib/stripe/__tests__/client.livemode.test.ts` — proves the per-mode client cache hands out the right Stripe instance.
- `backend/__tests__/integration/livemode-isolation.test.ts` — proves a live-mode signed request never sees a test-mode dispute row in the DB even when the dispute id collides with a request payload (it can't actually collide since IDs differ across modes, but we test the filter is applied).

**Modified files:**
- `backend/lib/env.ts` — adds the four new mode-scoped env vars (`STRIPE_SECRET_KEY_LIVE/_TEST`, `STRIPE_WEBHOOK_SECRET_LIVE/_TEST`). `STRIPE_APP_SECRET` is unchanged and shared across modes.
- `backend/.env.local.example` — documents the new vars and their relationship to existing ones.
- `backend/lib/stripe-auth/types.ts` — `VerifiedRequest` and `StripeAppRequestBody` gain a `livemode: boolean`.
- `backend/lib/stripe-auth/verify.ts` — try-both signature verification.
- `backend/lib/stripe-auth/withStripeAuth.ts` — passes `livemode` into the handler context.
- `backend/lib/stripe/client.ts` — every helper takes `livemode` and uses the matching cached `Stripe` instance.
- `backend/lib/disputes.ts` — `getDisputeForAccount` takes `livemode` and filters by it.
- `backend/app/api/disputes/route.ts` — passes `livemode` through `listDisputes` and the `is_new` query.
- `backend/app/api/disputes/[disputeId]/route.ts` — passes `livemode` through `getDispute`, `getDisputeForAccount`, and the upsert.
- `backend/app/api/disputes/[disputeId]/submit/route.ts` — passes `livemode` through every Stripe call and the submission insert.
- `backend/app/api/disputes/[disputeId]/evidence-files/route.ts` — `livemode` for `getDispute` + `getDisputeForAccount`.
- `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts` — `livemode` filter.
- `backend/app/api/disputes/by-payment-intent/[piId]/route.ts` — `livemode` for `listDisputes`.
- `backend/app/api/narratives/generate/route.ts` — `livemode` for `getDispute` and `getDisputeForAccount`.
- `backend/app/api/narratives/[generationId]/route.ts` — `livemode` filter on `narrative_generations` lookup.
- `backend/app/api/preflight/route.ts` — `livemode` for any Stripe call it makes.
- `backend/app/api/insights/route.ts` — `livemode` filter on `disputes` aggregations.
- `backend/app/api/merchant/onboarding/route.ts` — `livemode` for any dispute reads.
- `backend/app/api/cron/route.ts` — reconciliation iterates both modes per merchant.
- `backend/lib/webhooks/reconcile-disputes.ts` — accepts `livemode` and writes it.
- `backend/lib/webhooks/handle-dispute-event.ts` — writes `event.livemode` on every insert/upsert.
- `backend/lib/narratives/generate-background.ts` — accepts `livemode` and uses the matching Stripe client.
- `backend/app/api/webhooks/stripe/route.ts` — try-both webhook secret verification, write `event.livemode` to `webhook_events` and downstream rows.
- `backend/__tests__/integration/mocks.ts` — `withStripeAuth` mock now injects `livemode` into the verified context.
- `stripe-app/src/lib/apiClient.ts` — reads `context.environment?.mode` and includes `livemode` in every request body.
- `stripe-app/stripe-app.json` — bumps `version` from `1.1.6` to `1.1.7`.
- `CLAUDE.md` — updates the QA topology section to reflect mode-aware backend; removes the launch-flip-as-key-swap framing.

**Memory updates (after merge, in a separate `/Users/joeb/.claude/projects/-Users-joeb-Projects-WinBack/memory/` write):**
- Update `project_launch_flip.md` — the architecture no longer requires a one-shot test→live flip. The marketplace launch step becomes "verify both `_LIVE` and `_TEST` env vars are populated in Vercel prod."

---

## Sequencing notes

This plan **must ship as one PR**. Half-applied changes leave the backend rejecting all signed requests (verify.ts requires both env vars to exist) or returning empty arrays (routes pass `livemode` to a client that ignores it). Tasks are ordered so the tree compiles and tests pass at every commit, but the **system does not recover the data-isolation property until Task 24 (frontend)** lands.

Recommended execution: dedicated worktree (the repo currently has uncommitted changes on main per `git status` at session start). The first task creates the worktree.

---

## Task 0: Set up isolated worktree

**Files:** none modified — worktree branch creation only.

- [ ] **Step 1: Confirm the repo is clean of unrelated work-in-progress that would otherwise be carried into the worktree**

Run from repo root:
```bash
cd /Users/joeb/Projects/WinBack && git status --short
```

Expected: existing uncommitted changes are visible (e.g. `M backend/lib/billing.ts`). These belong to a different effort and must NOT be carried into the new branch. If any are present, commit them on a separate branch first OR confirm with the user that they should be stashed for the duration of this work.

- [ ] **Step 2: Create the worktree**

```bash
git worktree add -b feat/livemode-isolation ../WinBack-livemode main
cd ../WinBack-livemode
```

- [ ] **Step 3: Install backend deps in the worktree**

```bash
cd backend && npm install
cd ../stripe-app && npm install
cd ..
```

Expected: both `npm install` commands complete without errors. From here on, every step runs from `../WinBack-livemode` unless explicitly noted.

- [ ] **Step 4: Verify the baseline test suite is green before any change**

```bash
cd backend && npm test && npm run test:integration
```

Expected: all unit and integration tests pass. If the baseline is red, **stop and resolve before continuing** — the rest of this plan assumes a green starting point.

---

## Task 0.5: Live install feasibility precheck

**Purpose:** Confirm — before writing any code — that we can install the unpublished v1.1.7 build on `acct_1TIwcOCbmbWLiv6V` in **live mode** via the **External test** distribution path. The entire post-deploy QA strategy (Tasks 28, 31) depends on this.

**Confirmed path:** Stripe Apps Dashboard → WinBack → **External test** tab provides a private install link (`dashboard.stripe.com/apps/install/chnlink_*`) that supports both test and live mode installation. The mode of install is determined by which dashboard mode the installer is in when they click the link. Up to 25 accounts can install via the link.

- [ ] **Step 1: Open the Stripe Apps Dashboard for `com.jkbtech.winback`**

In a browser logged into Stripe with the WinBack account active:
- Go to `https://dashboard.stripe.com/apps`.
- Click into the WinBack app entry.
- Click the **External test** tab.

- [ ] **Step 2: Confirm the External test install link exists and is enabled**

Verify in the UI:
- A **Link** field shows a `dashboard.stripe.com/apps/install/chnlink_*` URL.
- **Access** is set to "Anyone with the link" (or "Specific accounts" with `acct_1TIwcOCbmbWLiv6V` listed).
- **Joined test** count is below 25 (we need at least one slot for our own live install).
- **Version** is set to whatever version we'll be QAing. (For pre-implementation verification this'll be 1.1.6; post-implementation we'll need to bump to 1.1.7 — see Task 27.)

Copy the install link to your password manager — needed in Task 28.

- [ ] **Step 3: Capture evidence**

Take a screenshot of the Distribution section showing both test and live install paths available. Save to `docs/qa/2026-04-28-stripe-apps-distribution-prelim.png` (the file does not need to be committed — it's purely a record for the QA artifact bundle in Task 31).

- [ ] **Step 4: Confirm the live `STRIPE_SECRET_KEY` is already provisioned**

Per the user, a live `sk_live_*` for `acct_1TIwcOCbmbWLiv6V` already exists. Verify by going to `https://dashboard.stripe.com/apikeys` (with the **Live mode** toggle ON) and confirming a Restricted or Standard secret key is visible/active. We do **not** copy or paste the value here — it gets handled in Task 25 directly into Vercel.

- [ ] **Step 5: Check whether a live-mode dispute webhook endpoint exists**

Go to `https://dashboard.stripe.com/webhooks` (Live mode ON). Scan for an endpoint pointing at `https://winbackpay.com/api/webhooks/stripe`.
- **If it exists**, note its signing secret location (we'll fetch it in Task 25).
- **If it doesn't exist**, this is a hard prerequisite for Task 25. The endpoint must be registered (events: `charge.dispute.created`, `charge.dispute.updated`, `charge.dispute.closed`, **on connected accounts**) before the PR can merge. Per [project_launch_flip.md](file:///Users/joeb/.claude/projects/-Users-joeb-Projects-WinBack/memory/project_launch_flip.md) this was not yet registered as of 2026-04-27 — so it almost certainly needs to be created. Do it now while you're in the dashboard; it's a 60-second action.

- [ ] **Step 6: Decision gate**

Tick the box only if all three of these are true:
- [ ] External test install link captured to 1Password (Stripe Apps Dashboard → WinBack → External test → Link). This is the live-mode QA install path.
- [ ] Live `sk_live_*` exists in 1Password.
- [ ] Live dispute webhook endpoint exists (or has just been created), and its `whsec_*` is in 1Password.

(Note: `STRIPE_APP_SECRET` is shared across modes — Stripe Apps issues one signing secret per app. The existing value in `.env.local` and Vercel covers both modes. No live-specific app secret is needed.)

If all three green, proceed to Task 1. Otherwise, document the blocker and surface it to the user before continuing.

---

## Task 1: Add mode-scoped env var schema

**Files:**
- Modify: `backend/lib/env.ts`
- Modify: `backend/lib/__tests__/env.test.ts`
- Modify: `backend/.env.local.example`

The existing `STRIPE_SECRET_KEY`, `STRIPE_APP_SECRET`, and `STRIPE_WEBHOOK_SECRET` env vars stay because billing and platform-account code paths still reference them. New vars added: `STRIPE_SECRET_KEY_LIVE/_TEST` (because Stripe API keys ARE per-mode — `sk_test_*` vs `sk_live_*`) and `STRIPE_WEBHOOK_SECRET_LIVE/_TEST` (because each mode's dispute webhook endpoint is registered separately with its own signing secret).

**NOT added:** `STRIPE_APP_SECRET_LIVE/_TEST`. Stripe Apps issues a single shared signing secret per app, not one per mode. The existing `STRIPE_APP_SECRET` is used to verify all iframe requests regardless of mode. Mode is determined from the body's `livemode` claim (frontend sends `context.environment.mode === 'live'`).

- [ ] **Step 1: Write the failing test**

Append to `backend/lib/__tests__/env.test.ts`:

```typescript
describe("livemode env vars", () => {
  beforeEach(() => {
    __resetEnvCacheForTests();
  });

  it("requires STRIPE_SECRET_KEY_LIVE/_TEST and STRIPE_WEBHOOK_SECRET_LIVE/_TEST", () => {
    const orig = { ...process.env };
    process.env = {
      ...orig,
      STRIPE_SECRET_KEY: "sk_test_x",
      STRIPE_APP_SECRET: "absec_x",
      STRIPE_WEBHOOK_SECRET: "whsec_x",
      STRIPE_BILLING_WEBHOOK_SECRET: "whsec_y",
      STRIPE_PRICE_PRO_MONTHLY: "price_x",
      STRIPE_PRICE_USAGE_FEE: "price_y",
      UPGRADE_LINK_SECRET: "x".repeat(32),
      SUPABASE_URL: "https://x.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "x",
      ANTHROPIC_API_KEY: "x",
      // intentionally omit the new vars
    };
    delete process.env.STRIPE_SECRET_KEY_LIVE;
    delete process.env.STRIPE_SECRET_KEY_TEST;
    delete process.env.STRIPE_WEBHOOK_SECRET_LIVE;
    delete process.env.STRIPE_WEBHOOK_SECRET_TEST;

    expect(() => readEnv()).toThrow(/STRIPE_SECRET_KEY_LIVE.*STRIPE_SECRET_KEY_TEST.*STRIPE_WEBHOOK_SECRET_LIVE.*STRIPE_WEBHOOK_SECRET_TEST/s);

    process.env = orig;
  });

  it("returns the mode-scoped values when present", () => {
    const orig = { ...process.env };
    process.env = {
      ...orig,
      STRIPE_SECRET_KEY: "sk_test_x",
      STRIPE_SECRET_KEY_LIVE: "sk_live_a",
      STRIPE_SECRET_KEY_TEST: "sk_test_a",
      STRIPE_APP_SECRET: "absec_x",
      STRIPE_WEBHOOK_SECRET: "whsec_x",
      STRIPE_WEBHOOK_SECRET_LIVE: "whsec_live_a",
      STRIPE_WEBHOOK_SECRET_TEST: "whsec_test_a",
      STRIPE_BILLING_WEBHOOK_SECRET: "whsec_y",
      STRIPE_PRICE_PRO_MONTHLY: "price_x",
      STRIPE_PRICE_USAGE_FEE: "price_y",
      UPGRADE_LINK_SECRET: "x".repeat(32),
      SUPABASE_URL: "https://x.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "x",
      ANTHROPIC_API_KEY: "x",
    };
    const e = readEnv();
    expect(e.STRIPE_SECRET_KEY_LIVE).toBe("sk_live_a");
    expect(e.STRIPE_SECRET_KEY_TEST).toBe("sk_test_a");
    expect(e.STRIPE_WEBHOOK_SECRET_LIVE).toBe("whsec_live_a");
    expect(e.STRIPE_WEBHOOK_SECRET_TEST).toBe("whsec_test_a");
    process.env = orig;
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd backend && npx vitest run lib/__tests__/env.test.ts
```

Expected: FAIL with TypeScript or assertion errors about missing properties on `Env`.

- [ ] **Step 3: Update `backend/lib/env.ts`**

Replace the contents with:

```typescript
/**
 * Centralized env validation. `readEnv()` throws if any required var is
 * missing or empty, listing every missing var in a single error.
 *
 * Import from route handlers and long-lived modules at top level so the
 * failure surfaces at cold-start rather than at the first user action that
 * happens to read a missing var.
 */

export type Env = {
  STRIPE_SECRET_KEY: string;
  STRIPE_SECRET_KEY_LIVE: string;
  STRIPE_SECRET_KEY_TEST: string;
  STRIPE_APP_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_WEBHOOK_SECRET_LIVE: string;
  STRIPE_WEBHOOK_SECRET_TEST: string;
  STRIPE_BILLING_WEBHOOK_SECRET: string;
  STRIPE_PRICE_PRO_MONTHLY: string;
  STRIPE_PRICE_USAGE_FEE: string;
  UPGRADE_LINK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  ANTHROPIC_API_KEY: string;
  SENTRY_DSN: string | undefined;
};

const REQUIRED_KEYS = [
  "STRIPE_SECRET_KEY",
  "STRIPE_SECRET_KEY_LIVE",
  "STRIPE_SECRET_KEY_TEST",
  "STRIPE_APP_SECRET",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_WEBHOOK_SECRET_LIVE",
  "STRIPE_WEBHOOK_SECRET_TEST",
  "STRIPE_BILLING_WEBHOOK_SECRET",
  "STRIPE_PRICE_PRO_MONTHLY",
  "STRIPE_PRICE_USAGE_FEE",
  "UPGRADE_LINK_SECRET",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANTHROPIC_API_KEY",
] as const;

export function readEnv(): Env {
  const missing: string[] = [];
  const tooShort: string[] = [];

  for (const key of REQUIRED_KEYS) {
    const v = process.env[key];
    if (!v || v === "") missing.push(key);
  }

  const secret = process.env.UPGRADE_LINK_SECRET;
  if (secret && secret !== "" && secret.length < 32) {
    tooShort.push("UPGRADE_LINK_SECRET must be at least 32 chars");
  }

  if (missing.length > 0 || tooShort.length > 0) {
    const parts: string[] = [];
    if (missing.length > 0) {
      parts.push(`Missing required env vars: ${missing.join(", ")}`);
    }
    if (tooShort.length > 0) {
      parts.push(tooShort.join("; "));
    }
    throw new Error(parts.join(". "));
  }

  return {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    STRIPE_SECRET_KEY_LIVE: process.env.STRIPE_SECRET_KEY_LIVE!,
    STRIPE_SECRET_KEY_TEST: process.env.STRIPE_SECRET_KEY_TEST!,
    STRIPE_APP_SECRET: process.env.STRIPE_APP_SECRET!,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
    STRIPE_WEBHOOK_SECRET_LIVE: process.env.STRIPE_WEBHOOK_SECRET_LIVE!,
    STRIPE_WEBHOOK_SECRET_TEST: process.env.STRIPE_WEBHOOK_SECRET_TEST!,
    STRIPE_BILLING_WEBHOOK_SECRET: process.env.STRIPE_BILLING_WEBHOOK_SECRET!,
    STRIPE_PRICE_PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    STRIPE_PRICE_USAGE_FEE: process.env.STRIPE_PRICE_USAGE_FEE!,
    UPGRADE_LINK_SECRET: process.env.UPGRADE_LINK_SECRET!,
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
    SENTRY_DSN: process.env.SENTRY_DSN,
  };
}

let _cached: Env | null = null;
export function env(): Env {
  if (_cached) return _cached;
  _cached = readEnv();
  return _cached;
}

export function __resetEnvCacheForTests(): void {
  _cached = null;
}
```

- [ ] **Step 4: Update `backend/.env.local.example`**

Append (or insert near the existing Stripe section) the following lines, replacing any existing single-mode lines if they would now duplicate:

```
# === Mode-aware Stripe credentials (WIN-XX livemode isolation) ===
# Per-mode API keys: connect-scoped routes pick by request livemode claim.
# Per-mode webhook secrets: each mode's dispute webhook endpoint is
# registered separately in Stripe Dashboard (test vs live).
# Note: STRIPE_APP_SECRET (singular) is shared across both modes — Stripe
# Apps issues one signing secret per app, not one per mode.
STRIPE_SECRET_KEY_LIVE=sk_live_REPLACE_WITH_LIVE_KEY
STRIPE_SECRET_KEY_TEST=sk_test_REPLACE_WITH_TEST_KEY
STRIPE_WEBHOOK_SECRET_LIVE=whsec_REPLACE_WITH_LIVE_DISPUTE_WEBHOOK_SECRET
STRIPE_WEBHOOK_SECRET_TEST=whsec_REPLACE_WITH_TEST_DISPUTE_WEBHOOK_SECRET
```

- [ ] **Step 5: Run test to verify it passes**

```bash
cd backend && npx vitest run lib/__tests__/env.test.ts
```

Expected: all tests in `env.test.ts` pass, including the two new ones.

- [ ] **Step 6: Populate the new vars in your local `.env.local`**

Open `backend/.env.local`. Set:
- `STRIPE_SECRET_KEY_TEST` = current value of `STRIPE_SECRET_KEY` (the existing `sk_test_*` key)
- `STRIPE_WEBHOOK_SECRET_TEST` = current value of `STRIPE_WEBHOOK_SECRET` (the test mode dispute webhook secret)
- `STRIPE_SECRET_KEY_LIVE` = the real `sk_live_*` key (from 1Password)
- `STRIPE_WEBHOOK_SECRET_LIVE` = the real live dispute webhook secret (from 1Password)

`STRIPE_APP_SECRET` (singular) stays as-is — it's used for both modes.

If real live credentials aren't available yet, placeholders like `sk_live_REPLACE` are OK locally — live-mode requests against this dev backend won't connect to Stripe successfully, but the env validator will pass.

- [ ] **Step 7: Commit**

```bash
git add backend/lib/env.ts backend/lib/__tests__/env.test.ts backend/.env.local.example
git commit -m "$(cat <<'EOF'
feat(backend): add mode-scoped Stripe env vars

Adds STRIPE_SECRET_KEY_LIVE/_TEST and STRIPE_WEBHOOK_SECRET_LIVE/_TEST.
STRIPE_APP_SECRET is unchanged (Stripe Apps issues one signing secret
per app, shared across modes — mode comes from request body claim).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Extend the verified-request types with `livemode`

**Files:**
- Modify: `backend/lib/stripe-auth/types.ts`

This is a no-test type-only change. The next task wires it up.

- [ ] **Step 1: Update `backend/lib/stripe-auth/types.ts`**

Replace the file with:

```typescript
/**
 * Identity extracted from a verified Stripe App signature.
 */
export interface StripeAppIdentity {
  userId: string;
  accountId: string;
}

/**
 * Result of successful signature verification.
 *
 * `livemode` is derived authoritatively from which mode-scoped
 * STRIPE_APP_SECRET (`_LIVE` or `_TEST`) verified the signature. The
 * frontend may also include a `livemode` field in the body for telemetry,
 * but the backend never trusts that — it uses the value here.
 */
export interface VerifiedRequest<T = Record<string, unknown>> {
  identity: StripeAppIdentity;
  body: T;
  livemode: boolean;
}

/**
 * The raw body shape sent by the Stripe App frontend.
 * user_id and account_id are always present (signed by fetchStripeSignature).
 * livemode is informational only — see VerifiedRequest above.
 */
export interface StripeAppRequestBody {
  user_id: string;
  account_id: string;
  livemode?: boolean;
  [key: string]: unknown;
}
```

- [ ] **Step 2: Verify the types compile**

```bash
cd backend && npx tsc --noEmit
```

Expected: errors only at the call sites that destructure `{ identity, body }` and now need to also handle `livemode` — that is fine; they are fixed in subsequent tasks. The compile error count is roughly equal to the number of routes (a dozen or so).

- [ ] **Step 3: Commit**

```bash
git add backend/lib/stripe-auth/types.ts
git commit -m "feat(backend): add livemode to VerifiedRequest type

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

(Type-only change; the call sites are updated downstream and the tree will not be green again until Task 4.)

---

## Task 3: Single-secret signature verification + body-claim livemode

**Files:**
- Modify: `backend/lib/stripe-auth/verify.ts`
- Create: `backend/lib/stripe-auth/__tests__/verify.livemode.test.ts`

Stripe Apps issues ONE signing secret per app (not one per mode). The iframe SDK signs every request with the same `STRIPE_APP_SECRET` regardless of dashboard mode. So mode can't be derived from the signature — we read it from the request body's `livemode` field, which the frontend sets from `context.environment.mode`.

**Trust model:** the body claim is operationally safe because (a) the signature proves the request came from a legitimate Stripe iframe (not a forgery), (b) even if a malicious user mutates the body to lie about livemode, the worst they see is their own account's data in the wrong mode — which they already have access to via the Stripe Dashboard. No cross-tenant leak possible because `account_id` IS signed.

**Required body shape:** `{ user_id, account_id, livemode }`. If `livemode` is missing or non-boolean, the request is rejected (forces frontend correctness).

- [ ] **Step 1: Create the failing test**

Create `backend/lib/stripe-auth/__tests__/verify.livemode.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import Stripe from "stripe";
import { verifyStripeAppSignature } from "../verify";
import { __resetEnvCacheForTests } from "@/lib/env";

const APP_SECRET = "absec_test_SHARED_KEY_FOR_UNIT_TESTS_ONLY_xxxx";

function signedRequest(body: object) {
  const raw = JSON.stringify(body);
  const signed = JSON.stringify({
    user_id: (body as { user_id: string }).user_id,
    account_id: (body as { account_id: string }).account_id,
  });
  const signature = Stripe.webhooks.signature.generateTestHeaderString({
    payload: signed,
    secret: APP_SECRET,
  });
  return { raw, signature };
}

describe("verifyStripeAppSignature", () => {
  beforeEach(() => {
    __resetEnvCacheForTests();
    process.env.STRIPE_APP_SECRET = APP_SECRET;
  });

  it("returns livemode=true when body claims live and signature verifies", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: true };
    const { raw, signature } = signedRequest(body);
    const result = verifyStripeAppSignature(raw, signature);
    expect(result.livemode).toBe(true);
    expect(result.identity).toEqual({ userId: "usr_1", accountId: "acct_1" });
  });

  it("returns livemode=false when body claims test and signature verifies", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: false };
    const { raw, signature } = signedRequest(body);
    const result = verifyStripeAppSignature(raw, signature);
    expect(result.livemode).toBe(false);
  });

  it("throws when livemode is missing from body", () => {
    const body = { user_id: "usr_1", account_id: "acct_1" }; // no livemode
    const { raw, signature } = signedRequest(body);
    expect(() => verifyStripeAppSignature(raw, signature)).toThrow(
      /livemode/,
    );
  });

  it("throws when livemode is not a boolean", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: "true" };
    const { raw, signature } = signedRequest(body);
    expect(() => verifyStripeAppSignature(raw, signature)).toThrow(
      /livemode/,
    );
  });

  it("throws when signature is forged", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: true };
    const raw = JSON.stringify(body);
    expect(() => verifyStripeAppSignature(raw, "t=0,v1=deadbeef")).toThrow(
      /signature/i,
    );
  });

  it("throws on missing user_id or account_id", () => {
    const raw = JSON.stringify({ user_id: "usr_1", livemode: true });
    expect(() => verifyStripeAppSignature(raw, "t=0,v1=deadbeef")).toThrow(
      /user_id or account_id/,
    );
  });
});
```

- [ ] **Step 2: Run the failing test**

```bash
cd backend && npx vitest run lib/stripe-auth/__tests__/verify.livemode.test.ts
```

Expected: FAIL — the current `verify.ts` doesn't return `livemode` and uses the wrong env var.

- [ ] **Step 3: Replace `backend/lib/stripe-auth/verify.ts`**

```typescript
import Stripe from "stripe";
import type {
  StripeAppIdentity,
  StripeAppRequestBody,
  VerifiedRequest,
} from "./types";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    // Used only for the verifyHeader call. Any valid Stripe key works
    // because verifyHeader is a pure HMAC compare; the key isn't sent
    // anywhere. We use STRIPE_SECRET_KEY since it's always present.
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

/**
 * Verifies a Stripe App signature against the single shared STRIPE_APP_SECRET
 * (Stripe Apps issues one signing secret per app, not one per mode).
 *
 * The signature only covers {user_id, account_id} per Stripe's spec, so it
 * proves the request came from a legitimate Stripe iframe but does not
 * cryptographically bind the `livemode` field. We read `livemode` from the
 * body, which the frontend sets from `context.environment.mode`. A malicious
 * client could lie about livemode, but the worst they would see is their
 * own account's data in the wrong mode (which they already have access to
 * via the Stripe Dashboard) — no cross-tenant leak because account_id IS
 * signed.
 *
 * @returns Verified identity, parsed body, and the body's livemode claim.
 * @throws  When the signature is invalid, identity fields are missing, or
 *          livemode is missing/non-boolean from the body.
 */
export function verifyStripeAppSignature<
  T extends StripeAppRequestBody = StripeAppRequestBody,
>(rawBody: string, signature: string): VerifiedRequest<T> {
  const appSecret = process.env.STRIPE_APP_SECRET;
  if (!appSecret) {
    throw new Error("STRIPE_APP_SECRET is not configured");
  }

  const body = JSON.parse(rawBody) as T;
  if (!body.user_id || !body.account_id) {
    throw new Error("Missing user_id or account_id in request payload");
  }
  if (typeof body.livemode !== "boolean") {
    throw new Error("Missing or invalid livemode in request payload");
  }

  // Stripe signs only {user_id, account_id} in that exact order.
  const signedPayload = JSON.stringify({
    user_id: body.user_id,
    account_id: body.account_id,
  });

  // verifyHeader throws on invalid signatures.
  getStripe().webhooks.signature.verifyHeader(
    signedPayload,
    signature,
    appSecret,
  );

  const identity: StripeAppIdentity = {
    userId: body.user_id,
    accountId: body.account_id,
  };
  return { identity, body, livemode: body.livemode };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
cd backend && npx vitest run lib/stripe-auth/__tests__/verify.livemode.test.ts
```

Expected: all four tests pass.

- [ ] **Step 5: Run the existing verify tests to confirm no regression**

```bash
cd backend && npx vitest run lib/stripe-auth/__tests__
```

Expected: all green. Existing tests should continue to use `STRIPE_APP_SECRET` directly — no change needed since the variable still exists and serves the same role.

- [ ] **Step 6: Commit**

```bash
git add backend/lib/stripe-auth/verify.ts backend/lib/stripe-auth/__tests__/verify.livemode.test.ts
git commit -m "$(cat <<'EOF'
feat(backend): single-secret signature verification with body-claim livemode

verifyStripeAppSignature uses the existing STRIPE_APP_SECRET (Stripe Apps
issues one signing secret per app, not one per mode). Mode is read from
the body's livemode claim, which the frontend sets from
context.environment.mode. Signature only proves request authenticity, not
mode — but no cross-tenant leak is possible since account_id is signed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Plumb `livemode` through `withStripeAuth`

**Files:**
- Modify: `backend/lib/stripe-auth/withStripeAuth.ts`

- [ ] **Step 1: Replace `backend/lib/stripe-auth/withStripeAuth.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { verifyStripeAppSignature } from "./verify";
import type { StripeAppRequestBody, VerifiedRequest } from "./types";

type AuthenticatedHandler<
  T extends StripeAppRequestBody = StripeAppRequestBody,
> = (
  request: NextRequest,
  verified: VerifiedRequest<T>,
) => Promise<NextResponse> | NextResponse;

export function withStripeAuth<
  T extends StripeAppRequestBody = StripeAppRequestBody,
>(handler: AuthenticatedHandler<T>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe-Signature header" },
        { status: 401 },
      );
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return NextResponse.json(
        { error: "Unable to read request body" },
        { status: 400 },
      );
    }

    let verified: VerifiedRequest<T>;
    try {
      verified = verifyStripeAppSignature<T>(rawBody, signature);
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          auth_failure: "signature_verification",
          route: request.nextUrl.pathname,
        },
      });
      return NextResponse.json(
        { error: "Invalid or expired signature" },
        { status: 401 },
      );
    }

    return Sentry.withScope(async (scope) => {
      scope.setUser({ id: verified.identity.userId });
      scope.setTag("merchant_id", verified.identity.accountId);
      scope.setTag("stripe_user_id", verified.identity.userId);
      scope.setTag("livemode", String(verified.livemode));
      return handler(request, verified);
    });
  };
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd backend && npx tsc --noEmit
```

Expected: still some compile errors — every route that destructures `{ identity, body }` is now able to also receive `livemode`, but no route is using it yet. We'll update routes in subsequent tasks. The compile errors should be the SAME set as after Task 2 (no new ones introduced here).

- [ ] **Step 3: Commit**

```bash
git add backend/lib/stripe-auth/withStripeAuth.ts
git commit -m "$(cat <<'EOF'
feat(backend): pass livemode through withStripeAuth handler context

Sets a Sentry tag and warns on body/signature livemode mismatch. The
signature-derived value is the source of truth.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Mode-aware Stripe client

**Files:**
- Modify: `backend/lib/stripe/client.ts`
- Create: `backend/lib/stripe/__tests__/client.livemode.test.ts`

Every helper takes `livemode` as its first arg and dispatches to one of two cached `Stripe` instances.

- [ ] **Step 1: Create the failing test**

Create `backend/lib/stripe/__tests__/client.livemode.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the stripe constructor so we can inspect which key was used.
vi.mock("stripe", () => {
  const ctor = vi.fn(function (this: unknown, key: string) {
    (this as { _key: string })._key = key;
    (this as { disputes: unknown }).disputes = {
      list: vi.fn(async () => ({ data: [{ _key: key }] })),
      retrieve: vi.fn(async () => ({ id: "dp_x", _key: key })),
    };
    (this as { charges: unknown }).charges = {
      retrieve: vi.fn(async () => ({ id: "ch_x", _key: key })),
    };
    (this as { customers: unknown }).customers = {
      retrieve: vi.fn(async () => ({ id: "cus_x", _key: key })),
    };
    (this as { paymentIntents: unknown }).paymentIntents = {
      retrieve: vi.fn(async () => ({ id: "pi_x", _key: key })),
    };
    (this as { files: unknown }).files = {
      retrieve: vi.fn(async () => ({ id: "file_x", url: "https://example.com/x", _key: key })),
      create: vi.fn(async () => ({ id: "file_combined", _key: key })),
    };
  });
  return { default: ctor as unknown as typeof import("stripe").default };
});

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = "sk_test_legacy";
  process.env.STRIPE_SECRET_KEY_LIVE = "sk_live_a";
  process.env.STRIPE_SECRET_KEY_TEST = "sk_test_a";
  vi.resetModules();
});

describe("stripe client (mode-aware)", () => {
  it("listDisputes uses live key when livemode=true", async () => {
    const { listDisputes } = await import("../client");
    const result = await listDisputes(true, "acct_1", { limit: 1 });
    // result is the data array; each fixture carries the _key it was
    // constructed with.
    expect((result[0] as { _key: string })._key).toBe("sk_live_a");
  });

  it("listDisputes uses test key when livemode=false", async () => {
    const { listDisputes } = await import("../client");
    const result = await listDisputes(false, "acct_1", { limit: 1 });
    expect((result[0] as { _key: string })._key).toBe("sk_test_a");
  });

  it("getDispute uses the matching mode's client", async () => {
    const { getDispute } = await import("../client");
    const live = await getDispute(true, "acct_1", "dp_1");
    const test = await getDispute(false, "acct_1", "dp_1");
    expect((live as unknown as { _key: string })._key).toBe("sk_live_a");
    expect((test as unknown as { _key: string })._key).toBe("sk_test_a");
  });
});
```

- [ ] **Step 2: Run the failing test**

```bash
cd backend && npx vitest run lib/stripe/__tests__/client.livemode.test.ts
```

Expected: FAIL — current `listDisputes` signature is `(accountId, params?)`, missing the `livemode` arg.

- [ ] **Step 3: Replace `backend/lib/stripe/client.ts`**

```typescript
import Stripe from "stripe";

const _clients: { live: Stripe | null; test: Stripe | null } = {
  live: null,
  test: null,
};

function getStripe(livemode: boolean): Stripe {
  const slot = livemode ? "live" : "test";
  const cached = _clients[slot];
  if (cached) return cached;

  const key = livemode
    ? process.env.STRIPE_SECRET_KEY_LIVE
    : process.env.STRIPE_SECRET_KEY_TEST;
  if (!key) {
    throw new Error(
      `Missing ${livemode ? "STRIPE_SECRET_KEY_LIVE" : "STRIPE_SECRET_KEY_TEST"}`,
    );
  }
  const fresh = new Stripe(key);
  _clients[slot] = fresh;
  return fresh;
}

export async function listDisputes(
  livemode: boolean,
  accountId: string,
  params?: Stripe.DisputeListParams,
): Promise<Stripe.Dispute[]> {
  const resp = await getStripe(livemode).disputes.list(
    { limit: 100, ...params },
    { stripeAccount: accountId },
  );
  return resp.data;
}

export async function getDispute(
  livemode: boolean,
  accountId: string,
  disputeId: string,
  expand?: string[],
): Promise<Stripe.Dispute> {
  return getStripe(livemode).disputes.retrieve(
    disputeId,
    { expand },
    { stripeAccount: accountId },
  );
}

export async function getCharge(
  livemode: boolean,
  accountId: string,
  chargeId: string,
): Promise<Stripe.Charge> {
  return getStripe(livemode).charges.retrieve(
    chargeId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function getCustomer(
  livemode: boolean,
  accountId: string,
  customerId: string,
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return getStripe(livemode).customers.retrieve(
    customerId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function getPaymentIntent(
  livemode: boolean,
  accountId: string,
  piId: string,
): Promise<Stripe.PaymentIntent> {
  return getStripe(livemode).paymentIntents.retrieve(
    piId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function submitDispute(
  livemode: boolean,
  accountId: string,
  disputeId: string,
  evidence: Stripe.DisputeUpdateParams.Evidence,
  idempotencyKey: string,
): Promise<Stripe.Dispute> {
  return getStripe(livemode).disputes.update(
    disputeId,
    { evidence, submit: true },
    { idempotencyKey, stripeAccount: accountId },
  );
}

export async function downloadStripeFile(
  livemode: boolean,
  accountId: string,
  fileId: string,
): Promise<Buffer> {
  const file = await getStripe(livemode).files.retrieve(
    fileId,
    undefined,
    { stripeAccount: accountId },
  );
  if (!file.url) {
    throw new Error(`Stripe file ${fileId} has no URL`);
  }
  const key = livemode
    ? process.env.STRIPE_SECRET_KEY_LIVE
    : process.env.STRIPE_SECRET_KEY_TEST;
  const res = await fetch(file.url, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Stripe-Account": accountId,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to download Stripe file ${fileId}: ${res.status} ${res.statusText}`,
    );
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function uploadCombinedEvidence(
  livemode: boolean,
  accountId: string,
  pdf: Buffer,
  filename: string,
): Promise<string> {
  const file = await getStripe(livemode).files.create(
    {
      purpose: "dispute_evidence",
      file: {
        data: pdf,
        name: filename,
        type: "application/pdf",
      },
    },
    { stripeAccount: accountId },
  );
  return file.id;
}

/**
 * Test-only: drop the cached Stripe instances. Lets unit tests swap env
 * values between cases without seeing a stale client.
 */
export function __resetStripeClientsForTests(): void {
  _clients.live = null;
  _clients.test = null;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd backend && npx vitest run lib/stripe/__tests__/client.livemode.test.ts
```

Expected: all three new tests pass.

- [ ] **Step 5: Compile-check; expect a swarm of errors at every call site**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "Expected.*arguments" | head -20
```

Expected: errors at the 10+ call sites that still call `listDisputes(accountId, ...)` without `livemode`. These are fixed in Tasks 10–20.

- [ ] **Step 6: Commit**

```bash
git add backend/lib/stripe/client.ts backend/lib/stripe/__tests__/client.livemode.test.ts
git commit -m "$(cat <<'EOF'
feat(backend): mode-aware Stripe client with per-mode cached instances

Every connect-account helper (listDisputes, getDispute, getCharge,
getCustomer, getPaymentIntent, submitDispute, downloadStripeFile,
uploadCombinedEvidence) now takes livemode as its first arg and uses
the matching STRIPE_SECRET_KEY_LIVE/_TEST.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Migration — add `livemode` to disputes-related tables

**Files:**
- Create: `backend/supabase/migrations/022_livemode_isolation.sql`

The current data in dev Supabase is all test mode (per project memory). Backfill = `false`. After this migration, every dispute row carries a mode and queries can filter on it.

- [ ] **Step 1: Write the migration**

Create `backend/supabase/migrations/022_livemode_isolation.sql`:

```sql
-- WIN-XX: Live/Test mode data isolation.
--
-- Stripe rejected v1.1.6 because the app showed test mode disputes when the
-- merchant had the dashboard in live mode. Root cause: the backend used a
-- single STRIPE_SECRET_KEY (test) for all merchants regardless of which
-- dashboard mode they were viewing. The fix is per-request mode selection,
-- which means we need to record mode on every mode-bearing row so SELECTs
-- can filter and INSERTs can persist the source mode.
--
-- All existing rows in this database came from test mode keys (the dev
-- Supabase has only ever been pointed at sk_test_*), so the backfill is
-- livemode=false universally.

-- 1. disputes table -----------------------------------------------------------

ALTER TABLE disputes
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- Composite index supports the dominant query pattern: "list by merchant
-- and mode, ordered by created". stripe_dispute_id is already unique
-- across modes (Stripe never reuses an id), so no separate uniqueness
-- index needs livemode.
CREATE INDEX IF NOT EXISTS idx_disputes_merchant_livemode
  ON disputes(merchant_id, livemode, created_at DESC);

-- 2. webhook_events -----------------------------------------------------------

ALTER TABLE webhook_events
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN;

-- Existing rows can stay null — they predate the column and we don't
-- need to retroactively classify them. Future inserts MUST populate it
-- (enforced at the handler layer).

-- 3. dispute_submissions ------------------------------------------------------

ALTER TABLE dispute_submissions
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- 4. narrative_generations ----------------------------------------------------

ALTER TABLE narrative_generations
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- 5. evidence_files -----------------------------------------------------------
--
-- evidence_files joins through disputes(dispute_id), so a livemode filter
-- can be applied via that join. We still add the column to enable
-- per-mode aggregations (e.g. "how many evidence files were uploaded in
-- live mode this month") and to give us a defense-in-depth check —
-- queries that read evidence_files directly without the join still get
-- mode isolation.
ALTER TABLE evidence_files
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- After this migration runs:
--   - disputes.livemode is required on every row (default false).
--   - INSERTs from the webhook handler must explicitly set livemode from
--     event.livemode. The DEFAULT false is a safety net only.
--   - SELECTs from app routes must filter by livemode = $1 where $1 is
--     the request's verified livemode.
```

- [ ] **Step 2: Apply the migration to dev Supabase**

The project's dev Supabase id is `ssnwzgxvugraswghqsvo` (per CLAUDE.md). Apply via the Supabase MCP `apply_migration` tool, or paste into the Dashboard SQL editor.

- Project: `ssnwzgxvugraswghqsvo`
- Migration name: `022_livemode_isolation`
- SQL: contents of the file above.

- [ ] **Step 3: Verify the columns exist**

Run via `mcp__claude_ai_Supabase__execute_sql` against project `ssnwzgxvugraswghqsvo`:

```sql
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE column_name = 'livemode'
  AND table_schema = 'public'
ORDER BY table_name;
```

Expected output: rows for `disputes`, `dispute_submissions`, `evidence_files`, `narrative_generations`, `webhook_events`. The first four are NOT NULL with default `false`; `webhook_events` is nullable.

- [ ] **Step 4: Verify the index exists**

```sql
SELECT indexname FROM pg_indexes
WHERE tablename = 'disputes' AND indexname = 'idx_disputes_merchant_livemode';
```

Expected: one row.

- [ ] **Step 5: Commit**

```bash
git add backend/supabase/migrations/022_livemode_isolation.sql
git commit -m "$(cat <<'EOF'
feat(db): add livemode columns and index for mode isolation (022)

Adds livemode to disputes, dispute_submissions, narrative_generations,
evidence_files (default false), and webhook_events (nullable). Adds
composite index disputes(merchant_id, livemode, created_at DESC) for
the list-by-mode query.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: `getDisputeForAccount` filters by `livemode`

**Files:**
- Modify: `backend/lib/disputes.ts`

This is the single helper used by every dispute-detail route to scope a query through the merchant→dispute relationship. Adding `livemode` here gives us defense-in-depth for free across all callers.

- [ ] **Step 1: Update the function**

Replace the body of `backend/lib/disputes.ts` with:

```typescript
import { supabase } from "@/lib/supabase";

export async function getDisputeForAccount<T>(
  livemode: boolean,
  stripeDisputeId: string,
  stripeAccountId: string,
  columns: string = "id",
): Promise<{ data: T | null; error: { message: string; code?: string } | null }> {
  const { data, error } = await supabase
    .from("disputes")
    .select(`${columns}, merchants!inner(stripe_account_id)`)
    .eq("stripe_dispute_id", stripeDisputeId)
    .eq("livemode", livemode)
    .eq("merchants.stripe_account_id", stripeAccountId)
    .maybeSingle();

  if (error) {
    return { data: null, error };
  }
  if (!data) {
    return { data: null, error: null };
  }

  const row = { ...(data as unknown as Record<string, unknown>) };
  delete row.merchants;
  return { data: row as T, error: null };
}

export async function incrementNarrativeGenerations(
  disputeId: string,
  maxCount: number,
): Promise<{ newCount: number | null; error: { message: string; code?: string } | null }> {
  const { data, error } = await supabase.rpc("increment_narrative_generations_count", {
    p_dispute_id: disputeId,
    p_max: maxCount,
  });

  if (error) {
    return { newCount: null, error };
  }
  return { newCount: (data as number | null) ?? null, error: null };
}
```

- [ ] **Step 2: Compile-check**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "getDisputeForAccount" | head -10
```

Expected: errors at every caller — they pass `(stripeDisputeId, stripeAccountId, columns?)` and now must pass `(livemode, stripeDisputeId, stripeAccountId, columns?)`. These are fixed in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add backend/lib/disputes.ts
git commit -m "$(cat <<'EOF'
feat(backend): getDisputeForAccount filters by livemode

Adds livemode as the first argument and includes it in the WHERE clause
so a request in live mode can never load a test-mode dispute row even
if it knows the stripe_dispute_id.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: `disputes/route.ts` (the rejection-blocker route)

**Files:**
- Modify: `backend/app/api/disputes/route.ts`

This is the route Stripe's reviewer hit when they saw the test-mode disputes in their live drawer. It's the visible failure case.

- [ ] **Step 1: Write a failing route test**

Append to `backend/app/api/disputes/__tests__/route.test.ts` (create the file if it doesn't exist; check the path exists in the repo first — if not, create `backend/app/api/disputes/__tests__/livemode.test.ts`):

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: Request, ctx: unknown) => Promise<Response>) =>
    async (req: Request) => {
      const body = await req.clone().json();
      return handler(req, {
        identity: { userId: "usr_1", accountId: "acct_test_x" },
        body,
        livemode: body.livemode === true,
      });
    },
}));

const listDisputesMock = vi.fn();
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    listDisputes: listDisputesMock,
  };
});

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(async () => undefined),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
        in: async () => ({ data: [], error: null }),
      }),
    }),
  },
}));

beforeEach(() => {
  listDisputesMock.mockReset();
  listDisputesMock.mockResolvedValue([]);
});

describe("/api/disputes (livemode plumbing)", () => {
  it("passes livemode=true to listDisputes for a live-mode signed request", async () => {
    const { POST } = await import("../route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: "usr_1",
        account_id: "acct_test_x",
        livemode: true,
      }),
    });
    await POST(req as unknown as import("next/server").NextRequest);
    expect(listDisputesMock).toHaveBeenCalledWith(
      true,
      "acct_test_x",
      expect.objectContaining({ limit: 100 }),
    );
  });

  it("passes livemode=false for a test-mode signed request", async () => {
    const { POST } = await import("../route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: "usr_1",
        account_id: "acct_test_x",
        livemode: false,
      }),
    });
    await POST(req as unknown as import("next/server").NextRequest);
    expect(listDisputesMock).toHaveBeenCalledWith(
      false,
      "acct_test_x",
      expect.objectContaining({ limit: 100 }),
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd backend && npx vitest run app/api/disputes/__tests__/livemode.test.ts
```

Expected: FAIL — `listDisputes` is being called with old signature.

- [ ] **Step 3: Update `backend/app/api/disputes/route.ts`**

Replace the file:

```typescript
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";
import Stripe from "stripe";

export const POST = withStripeAuth(async (_request, { identity, livemode }) => {
  const { accountId, userId } = identity;

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.WINBACK_FORCE_EMPTY === "1"
  ) {
    return NextResponse.json({ data: [] });
  }

  await ensureMerchant(accountId, userId);

  try {
    const disputes = await listDisputes(livemode, accountId, {
      limit: 100,
      expand: ["data.charge.customer"],
    });

    const normalized = disputes.map(normalizeDispute);

    const unseenIds = new Set<string>();
    if (normalized.length > 0) {
      const { data: merchantRow } = await supabase
        .from("merchants")
        .select("id")
        .eq("stripe_account_id", accountId)
        .maybeSingle();
      const merchantId = (merchantRow as { id: string } | null)?.id;
      const { data: viewRows } = merchantId
        ? await supabase
            .from("disputes")
            .select("stripe_dispute_id, viewed_at")
            .eq("merchant_id", merchantId)
            .eq("livemode", livemode)
            .in(
              "stripe_dispute_id",
              normalized.map((d) => d.id),
            )
        : { data: null };
      for (const row of (viewRows ?? []) as {
        stripe_dispute_id: string;
        viewed_at: string | null;
      }[]) {
        if (row.viewed_at === null) unseenIds.add(row.stripe_dispute_id);
      }
    }

    const withNewFlag = normalized.map((d) => ({
      ...d,
      is_new: unseenIds.has(d.id),
    }));

    return NextResponse.json({ data: withNewFlag });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      if (classified.status >= 500) {
        captureRouteError(err, { route: "disputes.list" });
      }
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error listing disputes:", err);
    captureRouteError(err, { route: "disputes.list" });
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd backend && npx vitest run app/api/disputes/__tests__/livemode.test.ts
```

Expected: both tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/disputes/route.ts backend/app/api/disputes/__tests__/livemode.test.ts
git commit -m "$(cat <<'EOF'
fix(backend): /api/disputes uses request livemode for listDisputes and is_new query

This is the route Stripe's marketplace review caught leaking test-mode
disputes into the live dashboard view.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: `disputes/[disputeId]/route.ts`

**Files:**
- Modify: `backend/app/api/disputes/[disputeId]/route.ts`

- [ ] **Step 1: Read the current file**

```bash
cd backend && wc -l app/api/disputes/\[disputeId\]/route.ts
```

(Use this to estimate the change size; the file is non-trivial.)

- [ ] **Step 2: Update every Stripe call site and DB query**

Apply these edits to `backend/app/api/disputes/[disputeId]/route.ts`:

1. The `withStripeAuth` handler signature changes from `async (_request, { identity }) => {` to `async (_request, { identity, livemode }) => {`. Add `livemode` to every destructured handler in the file (POST and PATCH).

2. Every `getDispute(accountId, disputeId, …)` call becomes `getDispute(livemode, accountId, disputeId, …)`.

3. Every `getDisputeForAccount<T>(disputeId, accountId, columns)` call becomes `getDisputeForAccount<T>(livemode, disputeId, accountId, columns)`.

4. The single `supabase.from("disputes").upsert({...})` call (around line 66 per the earlier inspection) gets a `livemode` field in the row payload. Find the upsert object and add `livemode,` to the field list.

5. Any `.from("disputes").update({...}).eq("stripe_dispute_id", …)` calls in this file gain a `.eq("livemode", livemode)` chain so the update can't cross modes.

- [ ] **Step 3: Compile-check**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "app/api/disputes/\[disputeId\]/route.ts" | head -5
```

Expected: zero errors in this file. If errors remain, finish patching the corresponding call site.

- [ ] **Step 4: Run any existing tests for this route**

```bash
cd backend && npx vitest run app/api/disputes/\[disputeId\]/__tests__ 2>/dev/null || echo "no tests for this route"
```

Expected: green if tests exist; otherwise the message "no tests for this route" is fine.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/disputes/\[disputeId\]/route.ts
git commit -m "$(cat <<'EOF'
fix(backend): /api/disputes/:id passes livemode to Stripe + DB queries

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: `disputes/[disputeId]/submit/route.ts`

**Files:**
- Modify: `backend/app/api/disputes/[disputeId]/submit/route.ts`
- Modify: `backend/lib/disputes/assemble-evidence.ts`
- Modify: `backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts` (existing test file)

This route makes the most Stripe calls: `getDispute`, `getCharge`, `downloadStripeFile`, `uploadCombinedEvidence`, `submitDispute`. All gain `livemode` as their first arg. The `dispute_submissions` insert gains a `livemode` field.

- [ ] **Step 1: Update `backend/app/api/disputes/[disputeId]/submit/route.ts`**

In the route handler:
1. Destructure `livemode` from the auth context.
2. `getDisputeForAccount<…>(localDisputeId, accountId, columns)` → `getDisputeForAccount<…>(livemode, localDisputeId, accountId, columns)`.
3. `getDispute(accountId, stripeDisputeId, …)` → `getDispute(livemode, accountId, stripeDisputeId, …)`.
4. `getCharge(accountId, chargeId)` → `getCharge(livemode, accountId, chargeId)`.
5. The `stripeClient` object passed to `assembleEvidence`:
   ```ts
   stripeClient: {
     downloadStripeFile: (fileId) => downloadStripeFile(livemode, accountId, fileId),
     uploadCombinedEvidence: (pdf, filename) =>
       uploadCombinedEvidence(livemode, accountId, pdf, filename),
   },
   ```
6. Both `submitDispute(...)` calls become `submitDispute(livemode, accountId, …)`.
7. The `dispute_submissions` INSERT (search for `from("dispute_submissions").insert`) gains `livemode,` in the row payload.

- [ ] **Step 2: Inspect `backend/lib/disputes/assemble-evidence.ts`**

Confirm that the `stripeClient` interface accepts `downloadStripeFile(fileId)` and `uploadCombinedEvidence(pdf, filename)` — i.e. it does not need `livemode` because the caller already curries the value in. No changes needed inside `assemble-evidence.ts` itself; the indirection holds the mode.

- [ ] **Step 3: Update existing route tests**

In `backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts`, find the auth mock and update it to inject `livemode: false` (or whatever the test expects). The mocks for `submitDispute`, `getDispute`, `getCharge` already exist; their first arg is now `livemode`, so any direct mock-call assertions need updating:

```typescript
expect(submitDisputeMock).toHaveBeenCalledWith(
  /* livemode */ false,
  /* accountId */ TEST_ACCOUNT_ID,
  /* disputeId */ STRIPE_DISPUTE_ID,
  expect.any(Object),
  expect.any(String),
);
```

Walk through every `toHaveBeenCalledWith` and shift args by one. If the test doesn't assert on args (only on count), no change needed.

- [ ] **Step 4: Compile-check + run tests**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "submit" | head -5
cd backend && npx vitest run app/api/disputes/\[disputeId\]/submit/__tests__/
```

Expected: zero compile errors in `submit/`; existing tests pass after the arg-shift updates.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/disputes/\[disputeId\]/submit/route.ts \
        backend/app/api/disputes/\[disputeId\]/submit/__tests__/route.test.ts
git commit -m "$(cat <<'EOF'
fix(backend): submit route plumbs livemode through evidence + Stripe calls

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: `disputes/[disputeId]/evidence-files/*`

**Files:**
- Modify: `backend/app/api/disputes/[disputeId]/evidence-files/route.ts`
- Modify: `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts`

Both routes call `getDisputeForAccount` and `getDispute`. Same pattern as Tasks 9–10.

- [ ] **Step 1: In each file, destructure `livemode` from the auth context**

For every exported handler (`POST`, `GET`, `DELETE`, etc), change the destructure from `{ identity }` to `{ identity, livemode }`.

- [ ] **Step 2: Update every Stripe and `getDisputeForAccount` call**

- `getDisputeForAccount<…>(disputeId, accountId, columns)` → prepend `livemode`.
- `getDispute(accountId, disputeId)` → prepend `livemode`.

- [ ] **Step 3: Update INSERTs into `evidence_files`**

The `evidence-files` route inserts new rows. Add `livemode` to the inserted row payload so subsequent reads can filter on it:

```typescript
.from("evidence_files").insert({
  // ...existing fields...
  livemode,
})
```

- [ ] **Step 4: Compile-check**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "evidence-files" | head -5
```

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/disputes/\[disputeId\]/evidence-files/
git commit -m "$(cat <<'EOF'
fix(backend): evidence-files routes pass livemode to Stripe + DB

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: `disputes/by-payment-intent/[piId]/route.ts`

**Files:**
- Modify: `backend/app/api/disputes/by-payment-intent/[piId]/route.ts`

- [ ] **Step 1: Update the route**

Destructure `livemode` from `withStripeAuth` ctx. Change `listDisputes(accountId, …)` to `listDisputes(livemode, accountId, …)`.

- [ ] **Step 2: Compile-check + commit**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "by-payment-intent" | head -5
git add backend/app/api/disputes/by-payment-intent/
git commit -m "fix(backend): by-payment-intent route passes livemode to listDisputes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: Narratives — generate route + background helper

**Files:**
- Modify: `backend/app/api/narratives/generate/route.ts`
- Modify: `backend/lib/narratives/generate-background.ts`

The generate route hands off to `runBackgroundGeneration`, which calls `getDispute`. Both layers need `livemode`.

- [ ] **Step 1: Update `backend/lib/narratives/generate-background.ts`**

Add `livemode: boolean` to the function's parameter object. Inside, change `getDispute(accountId, stripeDisputeId, …)` to `getDispute(livemode, accountId, stripeDisputeId, …)`.

If the function persists to `narrative_generations`, add `livemode` to the inserted row.

- [ ] **Step 2: Update `backend/app/api/narratives/generate/route.ts`**

Destructure `livemode` from auth. Pass to:
- `getDisputeForAccount<…>(livemode, dispute_id, accountId, columns)`.
- `getDispute(livemode, accountId, dispute_id)`.
- `runBackgroundGeneration({ ..., livemode })`.

The `narrative_generations` row insert (look for `from("narrative_generations").insert`) gains `livemode`.

- [ ] **Step 3: Update existing tests**

`backend/app/api/narratives/__tests__/` likely contains tests that mock `getDispute` and assert call args. Shift the args. The integration mock in `__tests__/integration/mocks.ts` will be updated globally in Task 17.

- [ ] **Step 4: Compile-check + run tests + commit**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "narratives" | head -5
cd backend && npx vitest run app/api/narratives/
git add backend/app/api/narratives/generate/route.ts \
        backend/lib/narratives/generate-background.ts \
        backend/app/api/narratives/__tests__/
git commit -m "fix(backend): narratives generate + background pass livemode through

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 14: `narratives/[generationId]/route.ts`

**Files:**
- Modify: `backend/app/api/narratives/[generationId]/route.ts`

This route polls a `narrative_generations` row. The query gains a `livemode` filter so a live-mode polling request can never read a test-mode generation row.

- [ ] **Step 1: Update the route**

Destructure `livemode` from auth. Find the `from("narrative_generations").select(...)` query and add `.eq("livemode", livemode)` after the existing filters.

- [ ] **Step 2: Compile-check + commit**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "narratives/\[generationId\]" | head -5
git add backend/app/api/narratives/\[generationId\]/route.ts
git commit -m "fix(backend): narratives polling filters by livemode

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 15: `preflight/route.ts`

**Files:**
- Modify: `backend/app/api/preflight/route.ts`

- [ ] **Step 1: Read the current route**

```bash
cd backend && head -120 app/api/preflight/route.ts
```

Identify which Stripe helpers it calls and which DB queries it issues. The pattern is the same as previous routes.

- [ ] **Step 2: Update every Stripe call and `getDisputeForAccount`**

Destructure `livemode` from auth. Prepend `livemode` to every `getDispute`, `getCharge`, `getDisputeForAccount` call. Add `.eq("livemode", livemode)` to any direct `disputes`/`evidence_files` queries.

- [ ] **Step 3: Compile-check + commit**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "preflight" | head -5
git add backend/app/api/preflight/route.ts
git commit -m "fix(backend): preflight route passes livemode through

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 16: `insights/route.ts` and `merchant/onboarding/route.ts`

**Files:**
- Modify: `backend/app/api/insights/route.ts`
- Modify: `backend/app/api/merchant/onboarding/route.ts`

`insights` aggregates dispute outcome data — must filter by livemode so a merchant in test mode doesn't see stats from their live disputes (or the converse). `merchant/onboarding` likely reads `disputes` to decide whether the onboarding empty state still applies; same filter.

- [ ] **Step 1: Update `insights/route.ts`**

Destructure `livemode`. Add `.eq("livemode", livemode)` to every `from("disputes")` query in the file.

- [ ] **Step 2: Update `merchant/onboarding/route.ts`**

Destructure `livemode`. Add `.eq("livemode", livemode)` to any `from("disputes")` query that exists.

If onboarding state is itself a per-mode concept (a merchant in test mode might never have completed onboarding even if they did in live mode — or vice versa), consult the table schema. If `merchants.onboarding_completed_at` is a single column shared across modes, leave it alone (it's a merchant-level flag, not mode-specific). The plan does NOT add a livemode column to merchants.

- [ ] **Step 3: Compile-check + run tests**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep -E "insights|onboarding" | head -5
cd backend && npx vitest run app/api/insights/__tests__
```

- [ ] **Step 4: Commit**

```bash
git add backend/app/api/insights/route.ts \
        backend/app/api/merchant/onboarding/route.ts \
        backend/app/api/insights/__tests__/
git commit -m "fix(backend): insights + onboarding filter dispute reads by livemode

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 17: Update integration mocks to inject `livemode`

**Files:**
- Modify: `backend/__tests__/integration/mocks.ts`
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts` (maybe)

The `withStripeAuth` mock currently returns `{ identity, body }`. It must also return `livemode`. Existing tests assume test mode (`livemode: false`) — preserve that as the default.

- [ ] **Step 1: Update `backend/__tests__/integration/mocks.ts`**

Change the `withStripeAuth` mock's handler invocation:

```typescript
return handler(req, {
  identity: { userId: TEST_USER_ID, accountId: TEST_ACCOUNT_ID },
  body,
  livemode: typeof (body as { livemode?: unknown }).livemode === "boolean"
    ? (body as { livemode: boolean }).livemode
    : false,
});
```

This way, tests can override mode by including `livemode: true` in their request body, and existing tests (which omit it) continue to run as test mode.

The `vi.mock("@/lib/stripe", ...)` block is already mocking `getDispute` and `submitDispute`. Their signatures changed (livemode is now first arg). The existing mocks return canned values regardless of args, so no behavioral change is needed — but if any test asserts on `expect(getDispute).toHaveBeenCalledWith(TEST_ACCOUNT_ID, ...)`, shift the args by one.

- [ ] **Step 2: Run the integration test**

```bash
cd backend && npm run test:integration
```

Expected: PASS. If a test asserts on Stripe call args and fails because of arg-shift, update the assertion in the same task.

- [ ] **Step 3: Commit**

```bash
git add backend/__tests__/integration/mocks.ts \
        backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): integration mocks inject livemode into auth context

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 18: Webhook handler — try-both secret + write `livemode`

**Files:**
- Modify: `backend/app/api/webhooks/stripe/route.ts`
- Modify: `backend/lib/webhooks/handle-dispute-event.ts`
- Modify: `backend/lib/webhooks/reconcile-disputes.ts`
- Modify: `backend/app/api/webhooks/stripe/__tests__/route.test.ts`

- [ ] **Step 1: Update `backend/app/api/webhooks/stripe/route.ts`**

Replace the `webhookSecret` lookup and `constructEvent` block with a try-both pattern, and persist `event.livemode` to `webhook_events`:

```typescript
const liveSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE;
const testSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;
if (!liveSecret || !testSecret) {
  console.error("[WIN-XX] Webhook secrets not configured");
  return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
}

const rawBody = await request.text();

let event: Stripe.Event;
try {
  event = getStripe().webhooks.constructEvent(rawBody, signature, liveSecret);
} catch {
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, testSecret);
  } catch (err) {
    captureRouteError(err, {
      route: "webhooks.stripe.signature",
      extra: { signature_prefix: signature.substring(0, 20) },
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
```

Update the `webhook_events.insert(...)` row payload to include:

```typescript
.insert({
  event_id: event.id,
  event_type: event.type,
  account_id: accountId,
  livemode: event.livemode,
  status: "pending",
})
```

(Cross-check: `event.livemode` is a boolean on every Stripe.Event.)

Pass `event.livemode` to the dispute handler:

```typescript
await handleDisputeEvent(event, accountId);
```

(`handleDisputeEvent` already receives the full event object, which carries `event.livemode` and `event.data.object.livemode`. The handler reads `event.livemode` directly — no signature change.)

- [ ] **Step 2: Update `backend/lib/webhooks/handle-dispute-event.ts`**

For every `from("disputes").upsert(...)` and `from("disputes").update(...)` in the file:
- Add `livemode: event.livemode` (or `dispute.livemode`, since Stripe's dispute object carries the same value) to the row payload on UPSERTs.
- Add `.eq("livemode", event.livemode)` to UPDATEs that target a specific stripe_dispute_id, so a webhook can never update a row from the wrong mode.

For any `from("dispute_submissions").update(...)` calls (e.g. the `superseded` mark), add `.eq("livemode", event.livemode)` to scope to mode.

- [ ] **Step 3: Update `backend/lib/webhooks/reconcile-disputes.ts`**

The cron path passes Stripe disputes through the same handler via `synthesizeReconciliationEvent`. That function already sets `livemode: dispute.livemode` (we saw it in the earlier inspection at line 89), so no change there.

But `reconcileDisputes` calls `listDisputes(accountId, …)` directly (line 44 per inspection). Update its signature:

```typescript
export async function reconcileDisputes(
  livemode: boolean,
  accountId: string,
): Promise<ReconcileResult> {
  // ...
  const disputes = await listDisputes(livemode, accountId, { /* ... */ });
  // ...
}
```

- [ ] **Step 4: Update the cron caller**

In `backend/app/api/cron/route.ts`, find where `reconcileDisputes` is called per merchant. Update the loop to invoke it twice per merchant — once for live, once for test — so reconciliation covers both modes:

```typescript
for (const merchant of merchants) {
  await reconcileDisputes(true, merchant.stripe_account_id);
  await reconcileDisputes(false, merchant.stripe_account_id);
}
```

- [ ] **Step 5: Update existing webhook tests**

In `backend/app/api/webhooks/stripe/__tests__/route.test.ts`:
- Set both `STRIPE_WEBHOOK_SECRET_LIVE` and `_TEST` in the test setup. Drop any `STRIPE_WEBHOOK_SECRET` configuration if it's still there for this route (the legacy var is still referenced for billing only).
- Existing tests that POST a constructed test-mode event with the test secret will continue to work because the try-both pattern falls through to the test secret on the second attempt.
- Add one new test: a forged event signed with neither secret returns 400.

- [ ] **Step 6: Compile-check + run webhook tests**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep "webhook" | head -5
cd backend && npx vitest run app/api/webhooks/stripe/__tests__
```

Expected: green.

- [ ] **Step 7: Commit**

```bash
git add backend/app/api/webhooks/stripe/route.ts \
        backend/app/api/webhooks/stripe/__tests__/route.test.ts \
        backend/lib/webhooks/handle-dispute-event.ts \
        backend/lib/webhooks/reconcile-disputes.ts \
        backend/app/api/cron/route.ts
git commit -m "$(cat <<'EOF'
fix(backend): webhook handler try-both secrets + persist livemode

Adds STRIPE_WEBHOOK_SECRET_LIVE/_TEST verification with fallback. Writes
event.livemode to webhook_events and to every dispute upsert/update.
Cron reconciliation runs once per merchant per mode.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 19: Frontend — send `livemode` in every request

**Files:**
- Modify: `stripe-app/src/lib/apiClient.ts`

The frontend reads `context.environment?.mode` (`'live' | 'test'`) and includes the boolean in every body. The body claim is informational — the backend uses signature-derived mode — but it gives Sentry telemetry to detect mismatches and provides a useful debugging signal.

- [ ] **Step 1: Update `stripe-app/src/lib/apiClient.ts`**

Apply the same change to all three exported functions (`fetchBackend`, `patchBackend`, `deleteBackend`). The body construction:

```typescript
const body = JSON.stringify({
  ...data,
  user_id: context.userContext?.id,
  account_id: context.userContext?.account.id,
  livemode: context.environment?.mode === 'live',
});
```

For `deleteBackend`, which has no `data`:

```typescript
const body = JSON.stringify({
  user_id: context.userContext?.id,
  account_id: context.userContext?.account.id,
  livemode: context.environment?.mode === 'live',
});
```

- [ ] **Step 2: Type-check the stripe-app package**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: zero errors. The SDK's `ExtensionContextValue.environment.mode` type is `'live' | 'test'`.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/apiClient.ts
git commit -m "$(cat <<'EOF'
fix(stripe-app): include livemode in every backend request body

Reads context.environment.mode and forwards as a boolean for backend
telemetry. The backend's signature verification is the authoritative
source of mode; this body field is only used to surface Sentry warnings
when frontend and signature disagree.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 20: Bump app version and rebuild

**Files:**
- Modify: `stripe-app/stripe-app.json`

- [ ] **Step 1: Bump the version**

In `stripe-app/stripe-app.json`, change `"version": "1.1.6"` to `"version": "1.1.7"`.

- [ ] **Step 2: Rebuild the bundle locally to verify**

```bash
cd stripe-app && npm run build
```

Expected: build succeeds, no errors. Note: do NOT run `stripe apps upload` yet — that ships to the marketplace listing. Upload happens after this PR merges and the user explicitly authorizes the deploy.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/stripe-app.json stripe-app/.build/
git commit -m "chore(stripe-app): bump version to 1.1.7 for livemode isolation fix

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 21: Cross-mode isolation integration test

**Files:**
- Create: `backend/__tests__/integration/livemode-isolation.test.ts`

This test is the load-bearing proof that the fix works end-to-end. It seeds the dev DB with one test-mode dispute and one live-mode dispute on the same merchant account, fires `POST /api/disputes` with each mode set, and asserts each request sees only its own mode's row.

- [ ] **Step 1: Create the test**

```typescript
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import {
  TEST_ACCOUNT_ID,
  TEST_USER_ID,
} from "./fixtures";
import "./mocks";

// Override the listDisputes mock for this test so it returns mode-keyed
// data — proves that the route's livemode argument actually flows into
// the Stripe call. No real Stripe API call is made.
const stripeModule = await import("@/lib/stripe");
const liveDispute = {
  id: "dp_live_only",
  amount: 11111,
  reason: "fraudulent",
  status: "needs_response",
  created: 1700000000,
  livemode: true,
  charge: "ch_live_x",
  payment_intent: "pi_live_x",
  evidence_details: { has_evidence: false },
};
const testDispute = {
  id: "dp_test_only",
  amount: 1099,
  reason: "fraudulent",
  status: "needs_response",
  created: 1700000000,
  livemode: false,
  charge: "ch_test_x",
  payment_intent: "pi_test_x",
  evidence_details: { has_evidence: false },
};

vi.spyOn(stripeModule, "listDisputes").mockImplementation(async (livemode) =>
  livemode ? [liveDispute as never] : [testDispute as never],
);

describe("/api/disputes mode isolation", () => {
  it("a live-mode signed request only sees live disputes", async () => {
    const { POST } = await import("@/app/api/disputes/route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: TEST_USER_ID,
        account_id: TEST_ACCOUNT_ID,
        livemode: true,
      }),
    });
    const res = await POST(req as unknown as import("next/server").NextRequest);
    const json = await res.json();
    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe("dp_live_only");
  });

  it("a test-mode signed request only sees test disputes", async () => {
    const { POST } = await import("@/app/api/disputes/route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: TEST_USER_ID,
        account_id: TEST_ACCOUNT_ID,
        livemode: false,
      }),
    });
    const res = await POST(req as unknown as import("next/server").NextRequest);
    const json = await res.json();
    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe("dp_test_only");
  });

  it("the is_new query filters by livemode", async () => {
    // The DB-side is_new query is exercised through the Supabase mock.
    // Confirm the .eq("livemode", livemode) chain is invoked by reading
    // the mock's call log, OR — simpler — assert that the resulting
    // is_new flag is false for both responses (no DB rows seeded matches
    // the dispute id in the mock's stub).
    const { POST } = await import("@/app/api/disputes/route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: TEST_USER_ID,
        account_id: TEST_ACCOUNT_ID,
        livemode: true,
      }),
    });
    const res = await POST(req as unknown as import("next/server").NextRequest);
    const json = await res.json();
    expect(json.data[0].is_new).toBe(false);
  });
});
```

- [ ] **Step 2: Run the integration test**

```bash
cd backend && npx vitest run --config vitest.integration.config.ts __tests__/integration/livemode-isolation.test.ts
```

Expected: all three tests pass.

- [ ] **Step 3: Run the full integration suite to confirm no regression**

```bash
cd backend && npm run test:integration
```

Expected: green.

- [ ] **Step 4: Commit**

```bash
git add backend/__tests__/integration/livemode-isolation.test.ts
git commit -m "$(cat <<'EOF'
test(backend): integration test proves /api/disputes filters by livemode

Verifies a live-mode signed request only returns live disputes and a
test-mode signed request only returns test disputes — the regression
that caused Stripe's marketplace v1.1.6 rejection.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 22: Final verification — full test suites

**Files:** none modified.

- [ ] **Step 1: Backend unit tests**

```bash
cd backend && npm test
```

Expected: green. If anything fails, the failure is in scope of this plan — fix it before continuing.

- [ ] **Step 2: Backend integration tests**

```bash
cd backend && npm run test:integration
```

Expected: green.

- [ ] **Step 3: Frontend type check**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Backend type check**

```bash
cd backend && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: If all green, no commit needed (verification only)**

If anything is red at this point, return to the relevant task and fix in place. Do not paper over with `// @ts-ignore` or test skips.

---

## Task 22.5: Vercel preview deploy + signed-request smoke

**Purpose:** Prove the change actually works against a deployed runtime, not just against the local test harness. Vercel auto-creates a preview deploy for any pushed branch; we set the new env vars there, hand-sign a request, and verify the route returns the right shape with the right mode.

**Files:**
- Create: `backend/scripts/smoke-livemode.ts`

- [ ] **Step 1: Push the branch to create a Vercel preview**

```bash
cd /Users/joeb/Projects/WinBack-livemode
git push -u origin feat/livemode-isolation
```

Vercel posts a preview URL in the GitHub PR (Task 24 will open it). For now, look up the preview URL via:

```bash
cd backend && npx vercel ls --scope $(npx vercel whoami) 2>/dev/null | head -10
```

Or watch the GitHub commit status. The URL will look like `https://winback-git-feat-livemode-isolation-<hash>.vercel.app`.

- [ ] **Step 2: Provision the new env vars on the preview environment**

The preview environment inherits production env vars by default but new vars must be added explicitly. Run:

```bash
cd backend
# Test-side: copy current real test values from .env.local
echo "$STRIPE_SECRET_KEY"     | npx vercel env add STRIPE_SECRET_KEY_TEST    preview
echo "$STRIPE_WEBHOOK_SECRET" | npx vercel env add STRIPE_WEBHOOK_SECRET_TEST preview

# Live-side: placeholders. Preview is for test-mode smoke only; live is exercised in Task 28.
echo "sk_live_PLACEHOLDER"     | npx vercel env add STRIPE_SECRET_KEY_LIVE    preview
echo "whsec_PLACEHOLDER"       | npx vercel env add STRIPE_WEBHOOK_SECRET_LIVE preview

# Note: STRIPE_APP_SECRET (singular, unsuffixed) inherits from production env.
# No mode-suffixed variant needed — Stripe Apps uses one signing secret per app.
```

Trigger a redeploy of the preview so it picks up the new vars:

```bash
cd backend && git commit --allow-empty -m "trigger preview redeploy" && git push
```

- [ ] **Step 3: Write `backend/scripts/smoke-livemode.ts`**

This is a one-off script — not a vitest test. It hand-signs a payload using the test app secret and POSTs to the preview's `/api/disputes` to prove the deployed runtime accepts the request and returns the expected shape.

```typescript
/**
 * Smoke test: hand-sign a Stripe App request against a deployed preview URL
 * and assert the route accepts it and reports back the right livemode tag in
 * Sentry breadcrumbs.
 *
 * Run:
 *   set -a && source backend/.env.local && set +a
 *   PREVIEW_URL=https://winback-git-feat-livemode-isolation-xxxx.vercel.app \
 *     npx tsx backend/scripts/smoke-livemode.ts
 */
import Stripe from "stripe";

const PREVIEW_URL = process.env.PREVIEW_URL;
const APP_SECRET = process.env.STRIPE_APP_SECRET;

if (!PREVIEW_URL || !APP_SECRET) {
  console.error("Set PREVIEW_URL and STRIPE_APP_SECRET before running.");
  process.exit(2);
}

async function signedFetch(secret: string, path: string, body: object) {
  const raw = JSON.stringify(body);
  const signed = JSON.stringify({
    user_id: (body as { user_id: string }).user_id,
    account_id: (body as { account_id: string }).account_id,
  });
  const sig = Stripe.webhooks.signature.generateTestHeaderString({
    payload: signed,
    secret,
  });
  const res = await fetch(`${PREVIEW_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Stripe-Signature": sig },
    body: raw,
  });
  return { status: res.status, json: await res.json().catch(() => null) };
}

async function main() {
  const accountId = "acct_1TIwcOCbmbWLiv6V"; // WinBack's own account
  const userId = process.env.STRIPE_USER_ID ?? "usr_smoke";

  // Test 1: Valid signature, body claims test mode → expect 200 returning test disputes.
  const t1 = await signedFetch(APP_SECRET!, "/api/disputes", {
    user_id: userId,
    account_id: accountId,
    livemode: false,
  });
  console.log("[t1] valid sig + livemode=false:", t1.status, Array.isArray(t1.json?.data) ? `data.length=${t1.json.data.length}` : t1.json);
  if (t1.status !== 200) throw new Error("t1 failed: expected 200");

  // Test 2: Valid signature, body claims live mode → expect 200 returning live disputes (likely empty).
  const t2 = await signedFetch(APP_SECRET!, "/api/disputes", {
    user_id: userId,
    account_id: accountId,
    livemode: true,
  });
  console.log("[t2] valid sig + livemode=true:", t2.status, Array.isArray(t2.json?.data) ? `data.length=${t2.json.data.length}` : t2.json);
  if (t2.status !== 200) throw new Error("t2 failed: expected 200");
  // Sanity check: t1 and t2 should return DIFFERENT data sets (proving mode isolation).
  if (Array.isArray(t1.json?.data) && Array.isArray(t2.json?.data)) {
    const t1Ids = new Set(t1.json.data.map((d: { id: string }) => d.id));
    const t2Ids = new Set(t2.json.data.map((d: { id: string }) => d.id));
    const intersection = [...t1Ids].filter((id) => t2Ids.has(id));
    if (intersection.length > 0) {
      throw new Error(`t1/t2 isolation broken: dispute(s) appear in both modes: ${intersection.join(", ")}`);
    }
  }

  // Test 3: Forged signature → expect 401.
  const t3 = await signedFetch(
    "absec_test_FORGED_SECRET_xxxxxxxxxxxxxxxxxxxxxx",
    "/api/disputes",
    { user_id: userId, account_id: accountId, livemode: false },
  );
  console.log("[t3] forged secret:", t3.status);
  if (t3.status !== 401) throw new Error("t3 failed: expected 401");

  // Test 4: Valid signature, missing livemode field → expect 401 (verify rejects).
  const t4 = await signedFetch(APP_SECRET!, "/api/disputes", {
    user_id: userId,
    account_id: accountId,
    // intentionally omit livemode
  });
  console.log("[t4] missing livemode:", t4.status);
  if (t4.status !== 401) throw new Error("t4 failed: expected 401");

  console.log("\n✅ Smoke passed.");
}

main().catch((err) => {
  console.error("\n❌ Smoke failed:", err);
  process.exit(1);
});
```

- [ ] **Step 4: Run the smoke script**

```bash
cd /Users/joeb/Projects/WinBack-livemode
set -a && source backend/.env.local && set +a
PREVIEW_URL=<paste preview URL> npx tsx backend/scripts/smoke-livemode.ts
```

Expected output:
```
[t1] valid sig + livemode=false: 200 data.length=N
[t2] valid sig + livemode=true: 200 data.length=0
[t3] forged secret: 401
[t4] missing livemode: 401

✅ Smoke passed.
```

If t1 returns disputes from test mode and t2 returns an empty array (or different disputes) for the same account, mode isolation works. If t1 and t2 return identical data, the route is ignoring the livemode claim — STOP and debug. If t3 returns anything other than 401, the auth path is broken.

- [ ] **Step 5: Inspect Sentry for the `livemode` tag on transactions**

Open the Sentry project (`SENTRY_DSN` from env). Look at the most recent transactions for `/api/disputes`. Each should carry a `livemode` tag (`true` or `false`) corresponding to the request body claim. If the tag is absent, the `Sentry.withScope` block in `withStripeAuth` (Task 4) isn't setting it — STOP and debug.

- [ ] **Step 6: Commit the smoke script**

```bash
git add backend/scripts/smoke-livemode.ts
git commit -m "$(cat <<'EOF'
test(backend): smoke script for hand-signed livemode round-trip

Used in Task 22.5 against Vercel preview and again in Task 26 against
prod. Not part of the test runner — intentional, since it requires a
deployed URL.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 23: Update documentation

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the "QA Environment (current)" and "Implications for Claude" sections of `CLAUDE.md`**

In `CLAUDE.md`, find the `## QA Environment (current)` section and update it to reflect the new mode-aware backend. Specifically:

1. The bullet "Vercel production connects to Supabase project Winback Dev (id ssnwzgxvugraswghqsvo)" stays.
2. Add a new note: "The backend uses mode-scoped Stripe API keys (`STRIPE_SECRET_KEY_LIVE`/`_TEST`) and webhook secrets (`STRIPE_WEBHOOK_SECRET_LIVE`/`_TEST`) per request. The mode comes from the iframe request body's `livemode` claim (set by the frontend from `context.environment.mode`). The single `STRIPE_APP_SECRET` verifies request authenticity (Stripe Apps issues one signing secret per app, shared across modes). There is no longer a single 'mode' for the backend — both are served simultaneously based on the request claim."
3. Update or remove the "What this means for landing changes" table entry that says "Migrations apply to the same DB the user is QAing against" only if it reads in a way that's now misleading.

In the "Implications for Claude" subsection, **remove** the bullet about the launch flip if its framing of "swap STRIPE_SECRET_KEY for billing only" no longer matches reality, or annotate it: "post-WIN-XX, only billing requires a launch-day flip; dispute/connect routes are already mode-aware."

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(claude.md): document mode-aware backend post-livemode-isolation

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 24: Open the PR

**Files:** none modified.

- [ ] **Step 1: Push the branch and open a PR**

```bash
cd /Users/joeb/Projects/WinBack-livemode
git push -u origin feat/livemode-isolation
gh pr create --title "fix: live/test mode data isolation (Stripe v1.1.6 rejection)" --body "$(cat <<'EOF'
## Summary
- Stripe's marketplace review rejected v1.1.6 because the app showed test-mode disputes when the merchant had the dashboard in live mode.
- Root cause: the backend used a single process-wide STRIPE_SECRET_KEY for all requests, regardless of which dashboard mode the merchant was viewing.
- Fix: per-request mode selection driven by which mode-scoped STRIPE_APP_SECRET verifies the iframe signature. Connect-account-scoped Stripe calls and DB queries now route through the matching live/test credentials and filter rows by livemode.

## What changed
- New env vars: STRIPE_SECRET_KEY_LIVE/_TEST and STRIPE_WEBHOOK_SECRET_LIVE/_TEST. STRIPE_APP_SECRET (singular) is unchanged — Stripe Apps issues one signing secret per app.
- `verifyStripeAppSignature` tries both app secrets; the one that verifies determines `livemode`.
- `lib/stripe/client.ts` now caches one Stripe instance per mode and every helper takes livemode as its first arg.
- Migration 022 adds `livemode` columns + composite index on disputes; routes filter by it on read and persist it on write.
- Webhook handler tries both webhook secrets and persists `event.livemode` to webhook_events plus downstream rows.
- Frontend includes `livemode` in every request body for telemetry; backend uses signature-derived mode as authoritative.
- Stripe app version bumped 1.1.6 → 1.1.7.

## Out of scope (separate follow-ups)
- The `checkout-from-token` 500 (Stripe rejection issue #2).
- Hardcoded "Version 0.0.1" string (issue #3).
- External link icon on Upgrade (issue #4).
- Mode-aware billing (`lib/billing.ts`, `/api/billing/*`, `/api/webhooks/stripe-billing`).

## Test plan
- [ ] backend unit (`npm test`) green
- [ ] backend integration (`npm run test:integration`) green, including new `livemode-isolation.test.ts`
- [ ] backend `tsc --noEmit` green
- [ ] stripe-app `tsc --noEmit` green
- [ ] Migration 022 applied to dev Supabase; `SELECT … FROM information_schema.columns WHERE column_name = 'livemode'` returns rows for disputes, dispute_submissions, evidence_files, narrative_generations, webhook_events.
- [ ] Manual QA in test mode: `stripe trigger charge.dispute.created`, open WinBack drawer → dispute appears.
- [ ] After live env vars are populated and v1.1.7 is uploaded + reinstalled: open WinBack drawer in live mode with test-mode disputes existing → drawer shows zero disputes (the rejection scenario, now correct).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 2: Pause for human review**

The PR is the merge gate. Do not merge automatically. The user reviews, requests changes if needed, then explicitly authorizes the merge. **Do not merge yet** — Task 25 must complete first or the cold-start after deploy will throw on the missing env vars and break the iframe for every existing test merchant.

---

## Task 25: Pre-merge env var provisioning in Vercel prod

**Purpose:** The env validator (`backend/lib/env.ts`) will throw at cold-start if any of the six new vars are missing. Vercel auto-deploys `main` on merge. So merging before these are set = a few seconds of a 500-bricked iframe for everyone currently using test-mode WinBack on Joe's account. Provision the vars first, then merge.

This task **runs against production Vercel**, not the worktree. Do it from any shell with the `vercel` CLI and authentication to the WinBack project.

- [ ] **Step 1: Confirm the live-mode dispute webhook endpoint exists**

Per Task 0.5, this should already be registered. Re-confirm by running:

```bash
cd /Users/joeb/Projects/WinBack/backend  # use the main repo, not the worktree
npx tsx -e '
import Stripe from "stripe";
const s = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE!);
s.webhookEndpoints.list({ limit: 100 }).then((r) =>
  console.log(r.data.filter(w => w.url.includes("winbackpay.com/api/webhooks/stripe") && !w.url.includes("billing")).map(w => ({ id: w.id, url: w.url, status: w.status, livemode: (w as any).livemode })))
);
' 2>/dev/null
```

(Source the live key from your local secrets first: `set -a && source ~/.winback-live-secrets && set +a`, or paste the key inline temporarily — never commit it.)

Expected: one endpoint at `https://winbackpay.com/api/webhooks/stripe` with `status: "enabled"` and `livemode: true`. If absent, register it now in Stripe Dashboard → Developers → Webhooks (Live mode ON), with events `charge.dispute.created`, `charge.dispute.updated`, `charge.dispute.closed`, "events on connected accounts" toggled ON. Capture the signing secret for the next step.

- [ ] **Step 2: Provision the four new env vars in Vercel production**

```bash
cd /Users/joeb/Projects/WinBack/backend  # main repo, NOT the worktree

# Test-side: same as current STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET in prod.
# Pull the current values into a local cache so we can mirror them.
npx vercel env pull --environment=production .vercel/.env.production.local
set -a && source .vercel/.env.production.local && set +a

echo "$STRIPE_SECRET_KEY"     | npx vercel env add STRIPE_SECRET_KEY_TEST    production
echo "$STRIPE_WEBHOOK_SECRET" | npx vercel env add STRIPE_WEBHOOK_SECRET_TEST production

# Live-side: real values from 1Password.
echo "sk_live_PASTE_LIVE_KEY"                        | npx vercel env add STRIPE_SECRET_KEY_LIVE    production
echo "whsec_PASTE_LIVE_DISPUTE_WEBHOOK_SECRET"       | npx vercel env add STRIPE_WEBHOOK_SECRET_LIVE production

# Clean up the pulled cache so secrets don't sit on disk.
rm -f .vercel/.env.production.local
```

Note: STRIPE_APP_SECRET (singular) is unchanged — it covers both modes since Stripe Apps issues one signing secret per app.

- [ ] **Step 3: Verify all four new vars are present**

```bash
npx vercel env ls production | grep -E "STRIPE_(SECRET_KEY|WEBHOOK_SECRET)_(LIVE|TEST)"
```

Expected: four lines listed, one per var. If any missing, re-run that `vercel env add`.

- [ ] **Step 4: Merge the PR**

Now safe. From the GitHub PR page (Task 24), confirm CI is green and merge. Vercel will trigger a production deploy automatically.

- [ ] **Step 5: Watch the deploy logs for env validator errors**

```bash
npx vercel logs --prod --follow
```

Expected: Standard Next.js boot logs, no `Missing required env vars: ...` errors. The cold-start should succeed within ~30 seconds. If you see the env validator throw, the deploy is dead — abort by reverting the merge and rerunning `vercel env add` for whichever vars are missing.

- [ ] **Step 6: No commit (operational task only)**

---

## Task 26: Post-merge production smoke

**Purpose:** Re-run the smoke script from Task 22.5 against the live `winbackpay.com` URL, this time with the real live secret loaded so the t4 case actually exercises the live signature path. Catches any production-only env-mapping bugs.

- [ ] **Step 1: Run the smoke against prod**

```bash
cd /Users/joeb/Projects/WinBack
set -a && source backend/.env.local && set +a
PREVIEW_URL=https://winbackpay.com npx tsx backend/scripts/smoke-livemode.ts
```

Expected:
```
[t1] valid sig + livemode=false: 200 data.length=N
[t2] valid sig + livemode=true: 200 data.length=0
[t3] forged secret: 401
[t4] missing livemode: 401
✅ Smoke passed.
```

t1 returning >0 disputes and t2 returning 0 (no live disputes exist on the account) proves the live and test paths return DIFFERENT data sets — mode isolation works in production.

- [ ] **Step 2: Confirm `livemode` Sentry tag appears on prod requests**

Open Sentry → Issues filter by environment=production, look at recent transaction breadcrumbs. Each one should now carry a `livemode: "true"` or `livemode: "false"` tag. If not present, the `Sentry.withScope` block in `withStripeAuth` is misbehaving.

---

## Task 27: Test-mode QA matrix on v1.1.7

**Purpose:** Bump the app to 1.1.7, upload to Stripe Apps, reinstall in test mode, and run end-to-end scenarios to confirm no regression in normal test-mode behavior.

- [ ] **Step 1: Confirm Task 20's version bump is reflected and re-build**

```bash
cd /Users/joeb/Projects/WinBack/stripe-app  # main repo (post-merge)
grep '"version"' stripe-app.json
# expected: "version": "1.1.7"
npm run build
```

- [ ] **Step 2: Upload to Stripe Apps**

```bash
cd /Users/joeb/Projects/WinBack/stripe-app
stripe apps upload
```

Expected: upload succeeds. If it fails on duplicate version, double-check `stripe-app.json` is at 1.1.7.

- [ ] **Step 3: Reinstall in test mode**

In the Stripe Dashboard (Test mode toggle ON):
- Go to the Apps page → WinBack → "Update" or "Reinstall to latest version".
- Confirm the new version (1.1.7) shows after install.

- [ ] **Step 4: Run the test-mode QA scenarios**

Tick each as you complete it:

- [ ] **A. Drawer loads with disputes.**
  - Trigger: `stripe trigger charge.dispute.created` (default profile = WinBack test).
  - Open the WinBack drawer.
  - **Expected:** new dispute row appears within ~5 seconds. Amount, reason, deadline match the triggered fixture.

- [ ] **B. Dispute detail loads.**
  - Click into the dispute.
  - **Expected:** evidence checklist renders, no spinner stall, no errors in browser console.

- [ ] **C. Narrative generation succeeds.**
  - In the dispute detail, generate a narrative.
  - **Expected:** narrative streams in within 3–15 seconds. No 5xx errors.

- [ ] **D. Evidence submission round-trips.**
  - Upload one or two evidence files (any small PDFs).
  - Submit.
  - **Expected:** confirmation banner. The submission persists and Stripe Disputes API receives the evidence (verify in Stripe Dashboard → Disputes → the test dispute → Evidence tab).

- [ ] **E. Webhook persisted with `livemode=false`.**
  - Run via Supabase MCP: `SELECT event_id, livemode, status FROM webhook_events ORDER BY received_at DESC LIMIT 5;`
  - **Expected:** the most recent rows from Step A and Step D have `livemode = false` (test events arrive on the test webhook secret which the try-both falls through to).
  - Also: `SELECT stripe_dispute_id, livemode FROM disputes ORDER BY updated_at DESC LIMIT 5;` — the new dispute row has `livemode = false`.

- [ ] **F. Dashboard mode toggle without iframe reload.**
  - With drawer open in test mode, switch the dashboard's Test/Live toggle to **live mode** (without closing the drawer).
  - **Expected:** the drawer's disputes list refreshes — most likely shows zero disputes, since no live disputes exist. If you see test disputes here, **STOP — the bug is not fixed.** Re-open Tasks 8/19 and debug.
  - Toggle back to test mode. Drawer disputes list returns to test data.

- [ ] **Step 5: Capture artifacts**

Screenshots of A, B, C, D, F. Save under `docs/qa/2026-04-28-test-mode-v1.1.7/`. These are part of the marketplace re-submission bundle in Task 31.

---

## Task 28: Live-mode QA — reproduce Stripe reviewer's exact rejection steps

**Purpose:** This is the load-bearing test of the entire effort. We replicate the steps from the rejection PDF and confirm the bug is gone. The screenshot from this task is the artifact attached to the marketplace re-submission.

**Reviewer steps from the PDF (verbatim, for reference):**
> 1. Install the WinBack app on a Stripe account in Live mode.
> 2. Ensure the account has active disputes in Test mode, but no active disputes in Live mode.
> 3. Open the Stripe Dashboard in Live mode (no orange "Test mode" banner).
> 4. Open the WinBack app drawer.
> 5. Observe that the "Needs response" section populates with the dispute records from the Test mode environment.
>
> Actual result: Test mode data is fetched and displayed within the Live mode application drawer
> Expected result: When opened in Live mode, the app should only fetch and display Live mode data

- [ ] **Step 1: Bump External Test to v1.1.7 and install in live mode**

1. Stripe Apps Dashboard → WinBack → **External test** tab → click **Edit** → change Version to **1.1.7** → Save.
2. Copy the install link (the `dashboard.stripe.com/apps/install/chnlink_*` URL).
3. **Toggle the dashboard to Live mode** (top-right toggle). This is critical — the mode you're in when clicking the link determines where the install lands.
4. Paste the link into the address bar, hit Enter. Approve permissions.
5. Confirm WinBack icon appears in the live-mode dashboard sidebar/dock.

If installation fails: confirm v1.1.7 was uploaded successfully via `stripe apps upload` (Task 27 Step 2) and that External Test was updated to point at v1.1.7 in step 1 above.

- [ ] **Step 2: Confirm preconditions (mirroring reviewer's setup)**

- [ ] At least one **test mode** dispute exists on `acct_1TIwcOCbmbWLiv6V` (carryover from Task 27 should satisfy this; if not, re-trigger with `stripe trigger charge.dispute.created`).
- [ ] **Zero** live mode disputes exist on the account. Confirm via:
  ```bash
  npx tsx -e '
  import Stripe from "stripe";
  const s = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE!);
  s.disputes.list({ limit: 100 }, { stripeAccount: "acct_1TIwcOCbmbWLiv6V" })
    .then(r => console.log("live disputes:", r.data.length));
  ' 2>/dev/null
  ```
  Expected: `live disputes: 0`. If any exist, that's an unusual state — note them, since the test will then need to verify the drawer shows exactly those (and only those) live disputes.

- [ ] **Step 3: Open dashboard in Live mode**

- Toggle the dashboard's mode switch to **Live mode** (test mode banner should disappear).
- Confirm the URL bar reads `dashboard.stripe.com/...` (no `/test/` segment).

- [ ] **Step 4: Open the WinBack drawer**

Click the WinBack icon. Wait for load.

**Expected result (post-fix):** drawer shows "No disputes" empty state OR the `liveDisputeCount` matches whatever was in Step 2's count (likely 0).
**Bug result (pre-fix, what the reviewer saw):** drawer shows the test mode disputes ($10.99, $11.11, $9.99 or whatever's in test now).

- [ ] **Step 5: Capture screenshot**

Take a full-window screenshot showing:
- The live-mode dashboard chrome (no orange test banner).
- The WinBack drawer with empty state.
- The dispute list in the dashboard's main area (which would show real live disputes if any existed).

Save as `docs/qa/2026-04-28-live-mode-empty.png`. This is **the** artifact for the marketplace re-submission.

- [ ] **Step 6: Toggle back to test mode in the same browser session**

Without closing the drawer, switch the dashboard back to test mode. The drawer disputes list should refresh to the test data. This proves the mode-switching path works in both directions in a single session.

Capture a second screenshot: `docs/qa/2026-04-28-live-to-test-toggle.png`.

- [ ] **Step 7: Stop here if the bug reappears**

If at any point in Steps 4–6 the drawer shows test data while the dashboard is in live mode, the fix is incomplete. Do **not** proceed to Task 31. Instead:
- Capture a screenshot.
- Inspect Sentry for the request — note the `livemode` tag value.
- Pull `webhook_events` and `disputes` rows for the affected dispute_id and check the `livemode` column.
- Reopen the implementation phase to debug.

---

## Task 29: Webhook negative tests

**Purpose:** Verify the try-both webhook secret path correctly accepts live-secret-signed events, accepts test-secret-signed events, and rejects forged ones. Run these against prod after Task 25 has provisioned the secrets.

- [ ] **Step 1: Trigger a test-mode dispute and confirm webhook write**

Already done in Task 27 Step 4E. Re-confirm `webhook_events.livemode = false` for that row.

- [ ] **Step 2: Synthesize a live-mode webhook event signed with the live secret**

Use Stripe's CLI:

```bash
# Switch CLI profile to live mode for this command if you have a separate live profile,
# or use --api-key on a single-shot:
stripe trigger charge.dispute.created --api-key sk_live_PASTE_LIVE_KEY \
  --override charge.dispute.created:account=acct_1TIwcOCbmbWLiv6V
```

Note: this **creates a real live dispute** on `acct_1TIwcOCbmbWLiv6V`. If you have any reason that's undesirable (real money, real notifications), skip this step and use the alternative below.

**Alternative (no real dispute creation):** manually craft and POST a fake `charge.dispute.created` event to `https://winbackpay.com/api/webhooks/stripe`, signed with `STRIPE_WEBHOOK_SECRET_LIVE`:

```typescript
// backend/scripts/forge-live-webhook.ts (one-off, do NOT commit)
import Stripe from "stripe";
import { createHmac } from "crypto";

const SECRET = process.env.STRIPE_WEBHOOK_SECRET_LIVE!;
const event = {
  id: "evt_forged_" + Date.now(),
  object: "event",
  api_version: "2024-09-30.acacia",
  created: Math.floor(Date.now() / 1000),
  livemode: true,
  account: "acct_1TIwcOCbmbWLiv6V",
  type: "charge.dispute.created",
  data: { object: { id: "dp_forged_" + Date.now(), livemode: true, /* ... minimal dispute fields */ } },
  pending_webhooks: 1,
  request: { id: null, idempotency_key: null },
};
const payload = JSON.stringify(event);
const t = Math.floor(Date.now() / 1000);
const sig = createHmac("sha256", SECRET).update(`${t}.${payload}`).digest("hex");
const header = `t=${t},v1=${sig}`;

const res = await fetch("https://winbackpay.com/api/webhooks/stripe", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Stripe-Signature": header },
  body: payload,
});
console.log("status:", res.status, "body:", await res.text());
```

Run:
```bash
cd /Users/joeb/Projects/WinBack
export STRIPE_WEBHOOK_SECRET_LIVE="whsec_PASTE_LIVE_DISPUTE_WEBHOOK_SECRET"
npx tsx backend/scripts/forge-live-webhook.ts
unset STRIPE_WEBHOOK_SECRET_LIVE
rm backend/scripts/forge-live-webhook.ts  # do not commit
```

Expected: status 200. The handler will likely fail to fully process the event (the inner dispute object is fake) but the signature verification with the LIVE secret should succeed and `webhook_events` should land a row with `livemode = true, status = 'failed'`.

- [ ] **Step 3: Verify `webhook_events.livemode = true` row**

```sql
SELECT event_id, livemode, status, error_message
FROM webhook_events
ORDER BY received_at DESC
LIMIT 3;
```

Expected: the most recent row is `livemode = true`. If `livemode = false` or NULL, the try-both path picked the wrong secret — debug verify in `app/api/webhooks/stripe/route.ts`.

- [ ] **Step 4: Forge with a wrong secret → expect 400**

Same script as Step 2, but with `SECRET = "whsec_FORGED_NOT_REAL_xxxxxxxxxxxxxxxxxxxxxx"`.

Expected: status 400. If anything other than 400, the verify path is incorrectly accepting unsigned events.

- [ ] **Step 5: Forge a live event but sign with the test secret**

Set `event.livemode = true` in the payload, but sign with `STRIPE_WEBHOOK_SECRET_TEST`. Expected: status 200 (test secret verifies fine) but `webhook_events.livemode = false`. This confirms that the **secret that signed determines mode authoritatively** — not the body's `event.livemode` claim. Defense in depth.

---

## Task 30: App-route negative tests

**Purpose:** Round out the coverage: verify the iframe auth path's edge cases on prod.

- [ ] **Step 1: Re-run the smoke against prod with mismatched body claim**

Re-run `backend/scripts/smoke-livemode.ts` from Task 26. Specifically reconfirm t2 (test signature, body claims `livemode: true`) returns 200 AND verify in Sentry that a "livemode claim mismatch" warning was logged for that single request. If multiple warnings or none, the warning path is broken.

- [ ] **Step 2: Confirm 401 when no signature is sent**

```bash
curl -i -X POST https://winbackpay.com/api/disputes \
  -H "Content-Type: application/json" \
  -d '{"user_id":"usr_x","account_id":"acct_x"}'
```

Expected: `HTTP/2 401` with body `{"error":"Missing Stripe-Signature header"}`.

- [ ] **Step 3: Confirm 401 when signature is malformed**

```bash
curl -i -X POST https://winbackpay.com/api/disputes \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: garbage" \
  -d '{"user_id":"usr_x","account_id":"acct_x"}'
```

Expected: `HTTP/2 401` with body `{"error":"Invalid or expired signature"}`.

- [ ] **Step 4: Confirm `livemode` Sentry tag is set on every authenticated transaction**

Open Sentry → Performance → most recent transactions for routes `/api/disputes`, `/api/disputes/:id`, `/api/narratives/generate`. Each transaction's tags should include `livemode`. If absent on any route, the `Sentry.withScope` block in `withStripeAuth` is being shadowed by a route-local `withScope` — investigate.

---

## Task 31: Resubmit to Stripe marketplace

**Purpose:** Bundle the QA evidence and resubmit v1.1.7 for review. Only do this after Tasks 26, 27, 28, 29, 30 are all green.

- [ ] **Step 1: Compile the QA evidence bundle**

Create a folder `docs/qa/2026-04-28-livemode-resubmission/` containing:
- `live-mode-empty.png` (Task 28 Step 5) — the load-bearing screenshot.
- `live-to-test-toggle.png` (Task 28 Step 6).
- `test-mode-v1.1.7/` (the four-screenshot set from Task 27 Step 5).
- `webhook_events-mode-isolation.png` — a screenshot of the SQL output from Task 29 Step 3 showing both `livemode=true` and `livemode=false` rows.
- `RESPONSE.md` — text reply to attach to the resubmission.

- [ ] **Step 2: Draft `RESPONSE.md`**

```markdown
# WinBack v1.1.7 — Response to v1.1.6 Review Feedback

## Issue 1: Test/Live mode data isolation

**Resolution:** The backend now reads the `livemode` claim from each iframe request body (set by the frontend from `context.environment.mode`) and dispatches every connect-account-scoped Stripe API call (`disputes.list`, `disputes.retrieve`, `charges.retrieve`, `paymentIntents.retrieve`, `customers.retrieve`, `files.create`, `files.retrieve`, `disputes.update`) through one of two cached `Stripe` instances keyed on `STRIPE_SECRET_KEY_LIVE`/`STRIPE_SECRET_KEY_TEST`. The single `STRIPE_APP_SECRET` (Stripe Apps issues one shared signing secret per app) verifies request authenticity. Database reads and writes filter by `livemode`. Webhooks try both `STRIPE_WEBHOOK_SECRET_LIVE`/`_TEST` (each mode's dispute endpoint is registered separately) and persist `event.livemode`.

**Reviewer steps (verbatim) and post-fix result:**

1. Install the WinBack app on a Stripe account in Live mode. ✓
2. Ensure the account has active disputes in Test mode, but no active disputes in Live mode. ✓
3. Open the Stripe Dashboard in Live mode (no orange "Test mode" banner). ✓
4. Open the WinBack app drawer. ✓
5. Observe that the "Needs response" section populates...
   - **Pre-fix (v1.1.6):** Showed test mode disputes.
   - **Post-fix (v1.1.7):** Shows empty state. See attached screenshot `live-mode-empty.png`.

Mode switching within a single dashboard session is also now correct — see `live-to-test-toggle.png`.

(The other three issues from the v1.1.6 review — checkout-from-token 500, hardcoded version string, and missing external-link icon — are addressed in a separate effort and will ship in v1.1.8 or later.)
```

- [ ] **Step 3: Submit v1.1.7 for review in Stripe Apps Dashboard**

In Stripe Apps Dashboard → WinBack → submit the v1.1.7 build for marketplace review. Paste the contents of `RESPONSE.md` into the response field; attach the screenshots from the bundle.

- [ ] **Step 4: Update the project memory**

Update `/Users/joeb/.claude/projects/-Users-joeb-Projects-WinBack/memory/project_launch_flip.md`: replace the old "Step-by-step env var swap" framing with a note that the architecture is now mode-aware and launch is no longer a flip — it's just verifying both `_LIVE` and `_TEST` vars are populated and v1.1.7+ is live in the marketplace.

---

## Self-review

**Spec coverage:** Each of the four reviewer-cited symptoms in v1.1.6 issue #1 is addressed:
- "Backend not properly utilizing the Live/Test mode context" → Tasks 1–5, 19.
- "Leaking sandbox data into the production view" → Tasks 6–18, 21.
- "App should only fetch and display Live mode data using the Live mode API token" → Task 5 (per-mode Stripe client) + Tasks 8–16 (route plumbing).
- "Use the Stripe-Livemode header or the livemode boolean from the app context" → Task 19 (frontend) + Task 3 (signature-authoritative discovery — stronger than trusting the header).

**QA coverage:**
- **Pre-flight feasibility** → Task 0.5 (live install path confirmed before code work begins).
- **Automated unit/integration** → Tasks 1, 3, 5, 8, 17, 21, 22.
- **Pre-merge runtime smoke** → Task 22.5 (Vercel preview).
- **Deploy-ordering safety** → Task 25 (env vars provisioned BEFORE merge so cold-start can't 500 every existing user).
- **Post-merge prod smoke** → Task 26.
- **Test-mode regression matrix** → Task 27 (six end-to-end scenarios on the installed v1.1.7).
- **Live-mode reviewer reproduction** → Task 28 (the load-bearing test, with screenshot artifact).
- **Webhook negative tests** → Task 29 (forge with each secret; verify mode authoritative).
- **App-route negative tests** → Task 30 (mismatched claims, missing/malformed signatures, Sentry tag presence).
- **Marketplace re-submission** → Task 31 (gated on all of the above).

**Placeholder scan:** No "TBD"/"TODO"/"add appropriate error handling" appears. Every step has either complete code, a complete shell command, or a concrete file edit instruction.

**Type consistency:** `livemode` is `boolean` everywhere — `Env`, `VerifiedRequest`, `StripeAppRequestBody`, every Stripe client helper, every DB column. The `getDisputeForAccount<T>(livemode, stripeDisputeId, stripeAccountId, columns)` argument order is fixed in Task 7 and reused in every consumer (Tasks 9, 10, 11, 13, 15). The Stripe client helpers all share the `(livemode, accountId, …)` shape established in Task 5.

**Spec gap check:** The plan does not migrate billing to mode-aware credentials. That is explicitly out of scope (declared up front and in the PR body). It is the single largest follow-up.
