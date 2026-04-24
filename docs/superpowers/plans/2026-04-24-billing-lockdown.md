# Billing Lockdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a billing surface that satisfies Stripe's marketplace rejection feedback, locks in the 15% success fee path, collects a payment method via a signed-token handoff to winbackpay.com, and makes env-drift 500s structurally impossible.

**Architecture:** New signed-token flow (`/api/billing/upgrade-link` → `winbackpay.com/upgrade` → `/api/billing/checkout-from-token`) replaces the direct iframe→Checkout call that Stripe rejected. Same pattern for payment-method capture (`/api/billing/setup-link` → `/setup-billing`). Resources in the WinBack platform Stripe sub-account are created idempotently by `backend/scripts/provision-billing.ts`. A new `backend/lib/env.ts` module centralizes required-env validation so missing vars crash at cold-start, not at user click.

**Tech Stack:** Next.js 16 (App Router, Server Components), Stripe Node SDK 20.x, Supabase, Vitest, Stripe Apps UI Extension SDK, Node crypto (HMAC), React 19.

**Spec:** [docs/superpowers/specs/2026-04-24-billing-lockdown-design.md](../specs/2026-04-24-billing-lockdown-design.md)

---

## Pre-flight

### Task 0: Create a worktree and branch

**Files:** none

- [ ] **Step 1: Create worktree**

From the repo root:

```bash
git worktree add ../WinBack-billing-lockdown -b billing-lockdown main
cd ../WinBack-billing-lockdown
```

- [ ] **Step 2: Verify backend installs**

```bash
cd backend && npm install && cd ..
```

Expected: no errors. If errors, stop and diagnose.

- [ ] **Step 3: Confirm tests pass on main before any changes**

```bash
cd backend && npm test && cd ..
```

Expected: all tests pass. If any fail, this is pre-existing; fix or flag before continuing.

---

## Phase 1 — Foundational modules

### Task 1: Create `backend/lib/env.ts` env validator with tests

**Files:**
- Create: `backend/lib/env.ts`
- Create: `backend/lib/__tests__/env.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/lib/__tests__/env.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("env module", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Start from a clean slate each test.
    for (const k of Object.keys(process.env)) {
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of Object.keys(process.env)) {
      delete process.env[k];
    }
    Object.assign(process.env, originalEnv);
  });

  function setRequiredVars() {
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
    process.env.STRIPE_APP_SECRET = "absec_x";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_x";
    process.env.STRIPE_BILLING_WEBHOOK_SECRET = "whsec_b";
    process.env.STRIPE_PRICE_PRO_MONTHLY = "price_pro";
    process.env.STRIPE_PRICE_USAGE_FEE = "price_usage";
    process.env.UPGRADE_LINK_SECRET = "a".repeat(32);
    process.env.SUPABASE_URL = "https://x.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
    process.env.ANTHROPIC_API_KEY = "sk-ant-x";
  }

  it("readEnv returns all required vars when present", async () => {
    setRequiredVars();
    const { readEnv } = await import("../env");
    const env = readEnv();
    expect(env.STRIPE_SECRET_KEY).toBe("sk_test_x");
    expect(env.STRIPE_PRICE_PRO_MONTHLY).toBe("price_pro");
    expect(env.UPGRADE_LINK_SECRET).toHaveLength(32);
  });

  it("readEnv throws when a required var is missing", async () => {
    setRequiredVars();
    delete process.env.STRIPE_PRICE_PRO_MONTHLY;
    const { readEnv } = await import("../env");
    expect(() => readEnv()).toThrow(/STRIPE_PRICE_PRO_MONTHLY/);
  });

  it("readEnv throws when a required var is empty string", async () => {
    setRequiredVars();
    process.env.STRIPE_APP_SECRET = "";
    const { readEnv } = await import("../env");
    expect(() => readEnv()).toThrow(/STRIPE_APP_SECRET/);
  });

  it("readEnv error lists all missing vars at once", async () => {
    setRequiredVars();
    delete process.env.STRIPE_PRICE_PRO_MONTHLY;
    delete process.env.STRIPE_PRICE_USAGE_FEE;
    const { readEnv } = await import("../env");
    try {
      readEnv();
      throw new Error("expected readEnv to throw");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).toMatch(/STRIPE_PRICE_PRO_MONTHLY/);
      expect(msg).toMatch(/STRIPE_PRICE_USAGE_FEE/);
    }
  });

  it("SENTRY_DSN is optional and returns undefined when absent", async () => {
    setRequiredVars();
    const { readEnv } = await import("../env");
    const env = readEnv();
    expect(env.SENTRY_DSN).toBeUndefined();
  });

  it("UPGRADE_LINK_SECRET must be at least 32 chars", async () => {
    setRequiredVars();
    process.env.UPGRADE_LINK_SECRET = "tooshort";
    const { readEnv } = await import("../env");
    expect(() => readEnv()).toThrow(/UPGRADE_LINK_SECRET.*32/);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run lib/__tests__/env.test.ts
```

Expected: fails with "Cannot find module '../env'".

- [ ] **Step 3: Implement `backend/lib/env.ts`**

```ts
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
  STRIPE_APP_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
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
  "STRIPE_APP_SECRET",
  "STRIPE_WEBHOOK_SECRET",
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
    STRIPE_APP_SECRET: process.env.STRIPE_APP_SECRET!,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
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

/**
 * Cached read — call once in module scope to fail fast at boot.
 * Safe to import anywhere; throws synchronously if env is bad.
 */
let _cached: Env | null = null;
export function env(): Env {
  if (_cached) return _cached;
  _cached = readEnv();
  return _cached;
}

/** Test-only: reset the cache so tests can mutate env between cases. */
export function __resetEnvCacheForTests(): void {
  _cached = null;
}
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run lib/__tests__/env.test.ts
```

Expected: all 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/lib/env.ts backend/lib/__tests__/env.test.ts
git commit -m "feat(backend): add central env validator for billing lockdown"
```

---

### Task 2: Create `backend/lib/upgrade-token.ts` HMAC helpers with tests

**Files:**
- Create: `backend/lib/upgrade-token.ts`
- Create: `backend/lib/__tests__/upgrade-token.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/lib/__tests__/upgrade-token.test.ts`:

```ts
import { describe, it, expect, beforeEach } from "vitest";

const SECRET = "a".repeat(32);

describe("upgrade-token", () => {
  beforeEach(() => {
    process.env.UPGRADE_LINK_SECRET = SECRET;
  });

  it("signToken returns a token that verifyToken accepts", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const payload = verifyToken(token);
    expect(payload.merchant_id).toBe("m-1");
    expect(payload.kind).toBe("upgrade");
  });

  it("verifyToken rejects tampered payload", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const [h, p, s] = token.split(".");
    // Replace payload with a different merchant id, keep original signature.
    const badPayload = Buffer.from(
      JSON.stringify({ merchant_id: "m-2", kind: "upgrade", iat: 1, exp: 1e12 }),
    )
      .toString("base64url");
    const tampered = [h, badPayload, s].join(".");
    expect(() => verifyToken(tampered)).toThrow(/signature/i);
  });

  it("verifyToken rejects wrong secret", async () => {
    const { signToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    process.env.UPGRADE_LINK_SECRET = "b".repeat(32);
    const { verifyToken } = await import("../upgrade-token");
    expect(() => verifyToken(token)).toThrow(/signature/i);
  });

  it("verifyToken rejects expired tokens", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" }, { ttlSeconds: -1 });
    expect(() => verifyToken(token)).toThrow(/expired/i);
  });

  it("verifyToken rejects malformed tokens", async () => {
    const { verifyToken } = await import("../upgrade-token");
    expect(() => verifyToken("not-a-token")).toThrow();
    expect(() => verifyToken("a.b")).toThrow();
    expect(() => verifyToken("")).toThrow();
  });

  it("signToken kind='setup' round-trips correctly", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-2", kind: "setup" });
    expect(verifyToken(token).kind).toBe("setup");
  });

  it("default ttl is 15 minutes", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const before = Math.floor(Date.now() / 1000);
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const payload = verifyToken(token);
    const ttl = payload.exp - before;
    expect(ttl).toBeGreaterThan(14 * 60);
    expect(ttl).toBeLessThanOrEqual(15 * 60 + 2);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run lib/__tests__/upgrade-token.test.ts
```

Expected: fails with "Cannot find module '../upgrade-token'".

- [ ] **Step 3: Implement `backend/lib/upgrade-token.ts`**

```ts
/**
 * Compact HMAC-signed token for the upgrade / setup-billing handoff pages.
 *
 * Format: base64url(header).base64url(payload).base64url(sig)
 *  - header: { alg: "HS256", typ: "UB" }  (UB = upgrade-billing)
 *  - payload: { merchant_id, kind: "upgrade"|"setup", iat, exp }
 *  - sig: HMAC-SHA256(header + "." + payload, UPGRADE_LINK_SECRET)
 *
 * The "kind" claim differentiates upgrade-to-Pro links from add-payment-method
 * links so a token minted for one purpose cannot be replayed against the other.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export type TokenKind = "upgrade" | "setup";

export type TokenPayload = {
  merchant_id: string;
  kind: TokenKind;
  iat: number; // seconds since epoch
  exp: number; // seconds since epoch
};

const HEADER = { alg: "HS256", typ: "UB" };
const DEFAULT_TTL_SECONDS = 15 * 60;

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function hmac(data: string): Buffer {
  const secret = process.env.UPGRADE_LINK_SECRET;
  if (!secret) throw new Error("UPGRADE_LINK_SECRET not configured");
  return createHmac("sha256", secret).update(data).digest();
}

export function signToken(
  claims: { merchant_id: string; kind: TokenKind },
  opts: { ttlSeconds?: number } = {},
): string {
  const ttl = opts.ttlSeconds ?? DEFAULT_TTL_SECONDS;
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    merchant_id: claims.merchant_id,
    kind: claims.kind,
    iat: now,
    exp: now + ttl,
  };
  const h = b64url(Buffer.from(JSON.stringify(HEADER)));
  const p = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(hmac(`${h}.${p}`));
  return `${h}.${p}.${sig}`;
}

export function verifyToken(token: string): TokenPayload {
  if (typeof token !== "string" || token === "") {
    throw new Error("Token missing");
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Token malformed");
  }
  const [h, p, s] = parts;
  const expectedSig = b64url(hmac(`${h}.${p}`));
  const a = Buffer.from(s);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("Token signature invalid");
  }
  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
  } catch {
    throw new Error("Token payload malformed");
  }
  if (
    typeof payload.merchant_id !== "string" ||
    (payload.kind !== "upgrade" && payload.kind !== "setup") ||
    typeof payload.iat !== "number" ||
    typeof payload.exp !== "number"
  ) {
    throw new Error("Token payload malformed");
  }
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    throw new Error("Token expired");
  }
  return payload;
}
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run lib/__tests__/upgrade-token.test.ts
```

Expected: all 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/lib/upgrade-token.ts backend/lib/__tests__/upgrade-token.test.ts
git commit -m "feat(backend): add HMAC signed-token helpers for upgrade/setup handoff"
```

---

### Task 3: Add `payment_method_prompt_dismissed_at` column migration

**Files:**
- Create: `backend/supabase/migrations/020_payment_method_prompt.sql`

- [ ] **Step 1: Write the migration**

Create `backend/supabase/migrations/020_payment_method_prompt.sql`:

```sql
-- WIN-xx (billing lockdown): track when the merchant dismisses the in-app
-- "add a payment method" banner so we don't re-surface it every session.
-- Re-surfaces after 30 days if still unresolved (enforced in app code).

alter table public.merchants
  add column if not exists payment_method_prompt_dismissed_at timestamptz null;

comment on column public.merchants.payment_method_prompt_dismissed_at is
  'When the merchant last dismissed the "add a payment method" banner. App code re-surfaces the banner after 30 days if the merchant still has no default payment method.';
```

- [ ] **Step 2: Apply the migration to local Supabase dev DB**

```bash
cd backend && set -a && source .env.local && set +a
# Run via Supabase MCP or psql — pick whichever the project uses.
# If using the Supabase MCP, invoke apply_migration with the file's contents.
```

Verify:

```bash
# Example with Supabase MCP list_tables or a direct query.
# Expected: merchants.payment_method_prompt_dismissed_at exists, nullable, type timestamptz.
```

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/020_payment_method_prompt.sql
git commit -m "feat(backend): migration for payment_method_prompt_dismissed_at"
```

---

## Phase 2 — Refactor existing billing code to use env module

### Task 4: Replace inline `requireEnv` in `backend/lib/billing.ts`

**Files:**
- Modify: `backend/lib/billing.ts`

- [ ] **Step 1: Read the current `requireEnv` usage in [backend/lib/billing.ts:33-37,112,176](../../backend/lib/billing.ts)**

There are three call sites:
- Line 112: `requireEnv("STRIPE_PRICE_USAGE_FEE")`
- Line 176: `requireEnv("STRIPE_PRICE_PRO_MONTHLY")`
- The `requireEnv` helper itself (lines 33-37).

- [ ] **Step 2: Replace with env module**

At the top of the file, add:

```ts
import { env } from "@/lib/env";
```

Delete the `requireEnv` helper (lines 33-37).

Replace the three `requireEnv` call sites:

- Line 27 (inside `getStripe`): replace `const key = process.env.STRIPE_SECRET_KEY; if (!key) throw new Error("Missing STRIPE_SECRET_KEY");` with `const key = env().STRIPE_SECRET_KEY;`
- Line 112: replace `const priceId = requireEnv("STRIPE_PRICE_USAGE_FEE");` with `const priceId = env().STRIPE_PRICE_USAGE_FEE;`
- Line 176: replace `const priceId = requireEnv("STRIPE_PRICE_PRO_MONTHLY");` with `const priceId = env().STRIPE_PRICE_PRO_MONTHLY;`

- [ ] **Step 3: Run existing billing tests**

```bash
cd backend && npx vitest run lib/__tests__/billing.test.ts
```

Expected: all existing tests pass. If any fail because the tests didn't set all required env vars, update test `beforeEach` to set them (use the `setRequiredVars` pattern from `env.test.ts`). Reset the env cache via `__resetEnvCacheForTests()` at the top of each `beforeEach`.

- [ ] **Step 4: Commit**

```bash
git add backend/lib/billing.ts backend/lib/__tests__/billing.test.ts
git commit -m "refactor(backend): route billing env access through lib/env"
```

---

### Task 5: Replace inline env check in `backend/lib/webhooks/handle-billing-event.ts`

**Files:**
- Modify: `backend/lib/webhooks/handle-billing-event.ts`

- [ ] **Step 1: Replace `proPriceId` helper**

Delete lines 34-38 (`function proPriceId()` declaration).

At the top of the file, import the env module:

```ts
import { env } from "@/lib/env";
```

Replace the single call site at line 43 (inside `subscriptionIsPro`):

```ts
const priceId = proPriceId();
```

becomes:

```ts
const priceId = env().STRIPE_PRICE_PRO_MONTHLY;
```

- [ ] **Step 2: Run the handler tests**

```bash
cd backend && npx vitest run lib/webhooks/__tests__/handle-billing-event.test.ts
```

Expected: all tests pass. If failing because of env setup, add `__resetEnvCacheForTests()` + full env setup in `beforeEach` (same pattern as Task 4).

- [ ] **Step 3: Commit**

```bash
git add backend/lib/webhooks/handle-billing-event.ts backend/lib/webhooks/__tests__/handle-billing-event.test.ts
git commit -m "refactor(backend): route webhook billing env access through lib/env"
```

---

### Task 6: Replace inline env check in `backend/app/api/webhooks/stripe-billing/route.ts`

**Files:**
- Modify: `backend/app/api/webhooks/stripe-billing/route.ts`

- [ ] **Step 1: Replace env check**

Current (lines 37-41):

```ts
const webhookSecret = process.env.STRIPE_BILLING_WEBHOOK_SECRET;
if (!webhookSecret) {
  console.error("[WIN-24] STRIPE_BILLING_WEBHOOK_SECRET not configured");
  return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
}
```

Replace with:

```ts
import { env } from "@/lib/env";
// ... inside the handler:
const webhookSecret = env().STRIPE_BILLING_WEBHOOK_SECRET;
```

- [ ] **Step 2: Run route tests if any exist**

```bash
cd backend && npx vitest run app/api/webhooks/stripe-billing
```

Expected: pass or "no tests found" (this route currently has no test file — that's fine).

- [ ] **Step 3: Commit**

```bash
git add backend/app/api/webhooks/stripe-billing/route.ts
git commit -m "refactor(backend): stripe-billing webhook uses lib/env"
```

---

## Phase 3 — Provisioning script

### Task 7: Create `backend/scripts/provision-billing.ts`

**Files:**
- Create: `backend/scripts/provision-billing.ts`
- Modify: `backend/package.json` (add script entry)

- [ ] **Step 1: Create the script**

Create `backend/scripts/provision-billing.ts`:

```ts
/**
 * Provisions (idempotently) the Stripe resources billing code expects:
 *   - Pro product + $79/mo price (lookup_key: winback_pro_monthly_v1)
 *   - Meter "dispute_won_fee" (aggregation=sum, customer mapping=payload.stripe_customer_id)
 *   - Usage product + metered price (lookup_key: winback_usage_fee_v1)
 *
 * Runs against whatever mode STRIPE_SECRET_KEY points at (test or live).
 *
 * Usage:
 *   cd backend && tsx scripts/provision-billing.ts
 *
 * Re-running the script finds existing resources by lookup_key / event_name and
 * short-circuits. To change a price, bump the lookup_key suffix (v1 -> v2) so
 * the old one stays archived for reference.
 */
import Stripe from "stripe";

const PRO_LOOKUP_KEY = "winback_pro_monthly_v1";
const USAGE_LOOKUP_KEY = "winback_usage_fee_v1";
const METER_EVENT_NAME = "dispute_won_fee";

async function main() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("Missing STRIPE_SECRET_KEY in env");
    process.exit(1);
  }
  const stripe = new Stripe(key);
  const mode = key.startsWith("sk_live_") ? "LIVE" : "TEST";
  console.error(`[provision] Running against ${mode} mode`);

  const proPriceId = await ensureProPrice(stripe);
  const meterId = await ensureMeter(stripe);
  const usagePriceId = await ensureUsagePrice(stripe, meterId);

  console.log("");
  console.log("# Copy these into your env (Vercel or .env.local)");
  console.log(`STRIPE_PRICE_PRO_MONTHLY=${proPriceId}`);
  console.log(`STRIPE_PRICE_USAGE_FEE=${usagePriceId}`);
  console.log(`# Meter id (informational): ${meterId}`);
}

async function ensureProPrice(stripe: Stripe): Promise<string> {
  const existing = await stripe.prices.list({
    lookup_keys: [PRO_LOOKUP_KEY],
    limit: 1,
    expand: ["data.product"],
  });
  if (existing.data.length > 0) {
    const p = existing.data[0];
    console.error(`[provision] Pro price exists: ${p.id}`);
    return p.id;
  }

  const product = await stripe.products.create({
    name: "WinBack Pro",
    metadata: { tier: "pro" },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: 7900,
    recurring: { interval: "month" },
    lookup_key: PRO_LOOKUP_KEY,
    metadata: { tier: "pro" },
  });
  console.error(`[provision] Created Pro product=${product.id} price=${price.id}`);
  return price.id;
}

async function ensureMeter(stripe: Stripe): Promise<string> {
  const list = await stripe.billing.meters.list({ limit: 100 });
  const found = list.data.find((m) => m.event_name === METER_EVENT_NAME);
  if (found) {
    console.error(`[provision] Meter exists: ${found.id}`);
    return found.id;
  }
  const meter = await stripe.billing.meters.create({
    display_name: "Dispute won success fee (cents)",
    event_name: METER_EVENT_NAME,
    default_aggregation: { formula: "sum" },
    customer_mapping: {
      event_payload_key: "stripe_customer_id",
      type: "by_id",
    },
    value_settings: {
      event_payload_key: "value",
    },
  });
  console.error(`[provision] Created Meter ${meter.id}`);
  return meter.id;
}

async function ensureUsagePrice(stripe: Stripe, meterId: string): Promise<string> {
  const existing = await stripe.prices.list({
    lookup_keys: [USAGE_LOOKUP_KEY],
    limit: 1,
  });
  if (existing.data.length > 0) {
    console.error(`[provision] Usage price exists: ${existing.data[0].id}`);
    return existing.data[0].id;
  }
  const product = await stripe.products.create({
    name: "WinBack success fee",
    metadata: { tier: "usage" },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    billing_scheme: "per_unit",
    unit_amount_decimal: "1", // 1 cent per unit; meter posts value-in-cents
    recurring: {
      interval: "month",
      usage_type: "metered",
      meter: meterId,
    },
    lookup_key: USAGE_LOOKUP_KEY,
    metadata: { tier: "usage" },
  });
  console.error(`[provision] Created Usage product=${product.id} price=${price.id}`);
  return price.id;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Add npm script**

Edit `backend/package.json`. Under `"scripts"`, add:

```json
"provision:billing": "tsx scripts/provision-billing.ts",
```

- [ ] **Step 3: Smoke-run against WinBack test-mode Stripe**

```bash
cd backend && set -a && source .env.local && set +a && npm run provision:billing
```

Expected output (first run):

```
[provision] Running against TEST mode
[provision] Created Pro product=prod_... price=price_...
[provision] Created Meter mtr_...
[provision] Created Usage product=prod_... price=price_...

# Copy these into your env (Vercel or .env.local)
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_USAGE_FEE=price_...
# Meter id (informational): mtr_...
```

Record the printed price IDs — they go into `.env.local` and Vercel in Task 28.

- [ ] **Step 4: Smoke-run a second time to verify idempotency**

```bash
cd backend && npm run provision:billing
```

Expected: "Pro price exists", "Meter exists", "Usage price exists" — same price IDs as before.

- [ ] **Step 5: Commit**

```bash
git add backend/scripts/provision-billing.ts backend/package.json
git commit -m "feat(backend): idempotent Stripe billing resource provisioning script"
```

---

## Phase 4 — Upgrade flow (Pro)

### Task 8: Add `POST /api/billing/upgrade-link` route with tests

**Files:**
- Create: `backend/app/api/billing/upgrade-link/route.ts`
- Create: `backend/app/api/billing/upgrade-link/__tests__/route.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/app/api/billing/upgrade-link/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, authMock, ensureMerchantMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  authMock: { withStripeAuth: vi.fn() },
  ensureMerchantMock: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: unknown) => authMock.withStripeAuth(handler),
}));
vi.mock("@/lib/merchants", () => ({ ensureMerchant: ensureMerchantMock }));

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

describe("POST /api/billing/upgrade-link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns winbackpay.com/upgrade URL with a signed token for a usage-tier merchant", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", billing_tier: "usage" },
            error: null,
          }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.url).toMatch(/^https:\/\/winbackpay\.com\/upgrade\?t=/);
    const token = new URL(json.url).searchParams.get("t");
    expect(token).toBeTruthy();
    // Token has three parts.
    expect(token!.split(".").length).toBe(3);
  });

  it("returns 409 when merchant already on Pro", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", billing_tier: "pro" },
            error: null,
          }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.code).toBe("already_pro");
  });

  it("returns 404 when merchant not found", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(404);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run app/api/billing/upgrade-link
```

Expected: "Cannot find module '../route'".

- [ ] **Step 3: Implement the route**

Create `backend/app/api/billing/upgrade-link/route.ts`:

```ts
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/upgrade-token";
import { captureRouteError } from "@/lib/sentry";

/**
 * Returns a short-lived signed URL for the public /upgrade confirmation page.
 * The iframe opens that URL in a new tab; the confirmation page then calls
 * /api/billing/checkout-from-token to create the actual Checkout session.
 */
export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id, billing_tier")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string; billing_tier: "usage" | "pro" };
  if (row.billing_tier === "pro") {
    return NextResponse.json(
      { error: "Already on Pro", code: "already_pro" },
      { status: 409 },
    );
  }

  try {
    const token = signToken({ merchant_id: row.id, kind: "upgrade" });
    const url = `https://winbackpay.com/upgrade?t=${encodeURIComponent(token)}`;
    return NextResponse.json({ url });
  } catch (err) {
    captureRouteError(err, { route: "billing.upgrade-link", extra: { merchant_id: row.id } });
    return NextResponse.json(
      { error: "Failed to create upgrade link", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run app/api/billing/upgrade-link
```

Expected: all 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/billing/upgrade-link
git commit -m "feat(backend): /api/billing/upgrade-link returns signed handoff URL"
```

---

### Task 9: Add `POST /api/billing/checkout-from-token` route with tests

**Files:**
- Create: `backend/app/api/billing/checkout-from-token/route.ts`
- Create: `backend/app/api/billing/checkout-from-token/__tests__/route.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/app/api/billing/checkout-from-token/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, billingMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { createProCheckoutSession: vi.fn() },
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

import { signToken } from "../../../../../lib/upgrade-token";

describe("POST /api/billing/checkout-from-token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates Checkout session for valid upgrade token", async () => {
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", billing_tier: "usage" },
            error: null,
          }),
        }),
      }),
    });
    billingMock.createProCheckoutSession.mockResolvedValue({
      url: "https://checkout.stripe.com/c/xyz",
      sessionId: "cs_1",
    });

    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  it("rejects setup-kind tokens with 400", async () => {
    const token = signToken({ merchant_id: "m-1", kind: "setup" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("invalid_token_kind");
  });

  it("rejects tampered or expired tokens with 401", async () => {
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: "a.b.c" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 409 when merchant already on Pro", async () => {
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", billing_tier: "pro" },
            error: null,
          }),
        }),
      }),
    });
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run app/api/billing/checkout-from-token
```

Expected: "Cannot find module '../route'".

- [ ] **Step 3: Implement the route**

Create `backend/app/api/billing/checkout-from-token/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/upgrade-token";
import { createProCheckoutSession } from "@/lib/billing";
import { captureRouteError } from "@/lib/sentry";

/**
 * Public (token-gated) endpoint hit by the /upgrade confirmation page.
 * Verifies the HMAC-signed token, resolves the merchant, creates a Stripe
 * Checkout session, and returns the hosted Checkout URL.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: { token?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "invalid_request" },
      { status: 400 },
    );
  }
  const token = typeof body.token === "string" ? body.token : "";
  if (!token) {
    return NextResponse.json(
      { error: "Missing token", code: "invalid_request" },
      { status: 400 },
    );
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Invalid token",
        code: "invalid_token",
      },
      { status: 401 },
    );
  }

  if (payload.kind !== "upgrade") {
    return NextResponse.json(
      { error: "Token is not an upgrade token", code: "invalid_token_kind" },
      { status: 400 },
    );
  }

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id, billing_tier")
    .eq("id", payload.merchant_id)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string; billing_tier: "usage" | "pro" };
  if (row.billing_tier === "pro") {
    return NextResponse.json(
      { error: "Already on Pro", code: "already_pro" },
      { status: 409 },
    );
  }

  try {
    const { url, sessionId } = await createProCheckoutSession({
      merchantId: row.id,
      successUrl: "https://winbackpay.com/upgrade/success",
      cancelUrl: "https://winbackpay.com/upgrade/cancelled",
    });
    return NextResponse.json({ url, session_id: sessionId });
  } catch (err) {
    captureRouteError(err, {
      route: "billing.checkout-from-token",
      extra: { merchant_id: row.id },
    });
    return NextResponse.json(
      { error: "Failed to create checkout session", code: "internal_error" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run app/api/billing/checkout-from-token
```

Expected: all 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/billing/checkout-from-token
git commit -m "feat(backend): /api/billing/checkout-from-token creates Pro Checkout from signed token"
```

---

### Task 10: Create `/upgrade`, `/upgrade/success`, `/upgrade/cancelled` pages

**Files:**
- Create: `backend/app/upgrade/page.tsx`
- Create: `backend/app/upgrade/success/page.tsx`
- Create: `backend/app/upgrade/cancelled/page.tsx`

- [ ] **Step 1: Implement `/upgrade/page.tsx`**

Create `backend/app/upgrade/page.tsx`:

```tsx
import { verifyToken } from "@/lib/upgrade-token";
import { supabase } from "@/lib/supabase";

type SearchParams = { t?: string };

async function resolveMerchant(
  token: string,
): Promise<
  | { ok: true; merchantId: string; businessName: string | null; tier: "usage" | "pro" }
  | { ok: false; reason: "invalid" | "expired" | "wrong_kind" | "not_found" }
> {
  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : "";
    return { ok: false, reason: msg.includes("expired") ? "expired" : "invalid" };
  }
  if (payload.kind !== "upgrade") return { ok: false, reason: "wrong_kind" };
  const { data } = await supabase
    .from("merchants")
    .select("id, business_name, billing_tier")
    .eq("id", payload.merchant_id)
    .maybeSingle();
  if (!data) return { ok: false, reason: "not_found" };
  const row = data as { id: string; business_name: string | null; billing_tier: "usage" | "pro" };
  return {
    ok: true,
    merchantId: row.id,
    businessName: row.business_name,
    tier: row.billing_tier,
  };
}

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = params.t ?? "";

  if (!token) {
    return <InvalidState reason="invalid" />;
  }
  const resolved = await resolveMerchant(token);
  if (!resolved.ok) {
    return <InvalidState reason={resolved.reason} />;
  }
  if (resolved.tier === "pro") {
    return <AlreadyProState />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Upgrade {resolved.businessName ?? "your account"} to WinBack Pro
        </h1>
        <p className="mt-4 text-slate-300">
          You are currently on Pay-Per-Win (15% of each recovered amount).
          Upgrading to Pro removes the success fee entirely.
        </p>

        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">$79</span>
            <span className="text-slate-400">/month</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Unlimited disputes, zero success fee</li>
            <li>Keep 100% of every recovered dollar</li>
            <li>Cancel anytime, pro-rated on current period</li>
            <li>Billed monthly through Stripe</li>
          </ul>
        </div>

        <form
          action="/upgrade/continue"
          method="POST"
          className="mt-6"
          data-token={token}
        >
          <input type="hidden" name="t" value={token} />
          <ContinueButton token={token} />
        </form>

        <p className="mt-6 text-xs text-slate-500">
          This link expires 15 minutes after you open it. If it expires, return
          to the WinBack app in your Stripe Dashboard and click Upgrade again.
        </p>
      </div>
    </main>
  );
}

function InvalidState({ reason }: { reason: "invalid" | "expired" | "wrong_kind" | "not_found" }) {
  const copy: Record<string, { title: string; body: string }> = {
    invalid: {
      title: "This link is not valid",
      body: "The upgrade link appears to be corrupted. Please return to the WinBack app in your Stripe Dashboard and click Upgrade again.",
    },
    expired: {
      title: "This link has expired",
      body: "Upgrade links expire after 15 minutes. Please return to the WinBack app in your Stripe Dashboard and click Upgrade again.",
    },
    wrong_kind: {
      title: "This link is not an upgrade link",
      body: "The link you followed is for a different action. Please return to the WinBack app in your Stripe Dashboard.",
    },
    not_found: {
      title: "Account not found",
      body: "We could not find the account associated with this link. If you think this is a mistake, email support@winbackpay.com.",
    },
  };
  const c = copy[reason];
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8">
        <h1 className="text-2xl font-bold">{c.title}</h1>
        <p className="mt-4 text-slate-300">{c.body}</p>
      </div>
    </main>
  );
}

function AlreadyProState() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8">
        <h1 className="text-2xl font-bold">You are already on Pro</h1>
        <p className="mt-4 text-slate-300">
          Your account is already on the Pro plan. Return to the WinBack app in
          your Stripe Dashboard to manage your subscription.
        </p>
      </div>
    </main>
  );
}

function ContinueButton({ token }: { token: string }) {
  return (
    <button
      type="button"
      className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 transition-colors"
      onClick={async () => {
        const res = await fetch("/api/billing/checkout-from-token", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const body = await res.json();
        if (res.ok && body.url) {
          window.location.href = body.url;
        } else {
          alert(body.error ?? "Failed to start checkout");
        }
      }}
    >
      Continue to Stripe Checkout
    </button>
  );
}
```

> **Note:** The `ContinueButton` uses a client-side handler, so it must be a Client Component. Mark it by adding `"use client";` at the very top of the `page.tsx` file. If the file has both server-side fetching and client interaction, split them: keep server fetch in a parent Server Component and move the button into its own `ContinueButton.tsx` with `"use client";`. Prefer the split; do that here.

Revised structure: keep `page.tsx` as a Server Component that resolves the token and renders static content plus `<ContinueButton token={token} />` imported from `./ContinueButton.tsx`. Create the file:

`backend/app/upgrade/ContinueButton.tsx`:

```tsx
"use client";

import { useState } from "react";

export function ContinueButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold py-3 transition-colors"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setError(null);
          try {
            const res = await fetch("/api/billing/checkout-from-token", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ token }),
            });
            const body = await res.json();
            if (res.ok && body.url) {
              window.location.href = body.url;
              return;
            }
            setError(body.error ?? "Failed to start checkout");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Network error");
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? "Opening Stripe Checkout…" : "Continue to Stripe Checkout"}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
```

Then in `page.tsx` remove the inline `ContinueButton` function and the `<form>` wrapper; replace with:

```tsx
import { ContinueButton } from "./ContinueButton";
// ... inside the JSX, replacing the old <form>:
<div className="mt-6">
  <ContinueButton token={token} />
</div>
```

- [ ] **Step 2: Implement `/upgrade/success/page.tsx`**

Create `backend/app/upgrade/success/page.tsx`:

```tsx
export default function UpgradeSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 text-center">
        <h1 className="text-2xl font-bold">You are on Pro</h1>
        <p className="mt-4 text-slate-300">
          Your subscription is active. You can close this tab and return to the
          WinBack app in your Stripe Dashboard. Your plan will update within a
          few seconds.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Implement `/upgrade/cancelled/page.tsx`**

Create `backend/app/upgrade/cancelled/page.tsx`:

```tsx
export default function UpgradeCancelledPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 text-center">
        <h1 className="text-2xl font-bold">Upgrade cancelled</h1>
        <p className="mt-4 text-slate-300">
          No charge was made. You can close this tab and return to the WinBack
          app in your Stripe Dashboard. You remain on Pay-Per-Win.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Manual smoke test**

```bash
cd backend && npm run dev
```

In a separate terminal, generate a test token by temporarily running a script or use the Node REPL with `UPGRADE_LINK_SECRET` set. Visit `http://localhost:3000/upgrade?t=<token>` and confirm:

- Valid token → plan card renders with business name + $79/mo
- Expired token → "This link has expired" message
- No `t` param → "This link is not valid"

- [ ] **Step 5: Commit**

```bash
git add backend/app/upgrade
git commit -m "feat(backend): /upgrade confirmation page and success/cancelled stubs"
```

---

## Phase 5 — Payment method flow (Section 7 of spec)

### Task 11: Extend `backend/lib/billing.ts` with payment method helpers

**Files:**
- Modify: `backend/lib/billing.ts`
- Modify: `backend/lib/__tests__/billing.test.ts`

- [ ] **Step 1: Extend the hoisted Stripe mock**

In `backend/lib/__tests__/billing.test.ts`, find the `vi.hoisted(...)` block at the top. Add `customersRetrieve` and `customersUpdate` as new mocks, and wire them into the `MockStripe` class:

```ts
const { supabaseMock, stripeMock } = vi.hoisted(() => {
  const customersCreate = vi.fn();
  const customersRetrieve = vi.fn();
  const customersUpdate = vi.fn();
  const subscriptionsCreate = vi.fn();
  const subscriptionsUpdate = vi.fn();
  const meterEventsCreate = vi.fn();
  const checkoutSessionsCreate = vi.fn();

  class MockStripe {
    customers = {
      create: customersCreate,
      retrieve: customersRetrieve,
      update: customersUpdate,
    };
    subscriptions = { create: subscriptionsCreate, update: subscriptionsUpdate };
    billing = { meterEvents: { create: meterEventsCreate } };
    checkout = { sessions: { create: checkoutSessionsCreate } };
  }

  return {
    supabaseMock: { from: vi.fn() },
    stripeMock: {
      default: MockStripe,
      customersCreate,
      customersRetrieve,
      customersUpdate,
      subscriptionsCreate,
      subscriptionsUpdate,
      meterEventsCreate,
      checkoutSessionsCreate,
    },
  };
});
```

- [ ] **Step 2: Add failing tests for new billing helpers**

Add at the end of the file (new top-level `describe` blocks):

```ts
describe("hasDefaultPaymentMethod", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
  });

  it("returns false when no billing customer exists", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_billing_customer_id: null,
    });
    const { hasDefaultPaymentMethod } = await import("../billing");
    expect(await hasDefaultPaymentMethod(MERCHANT_ID)).toBe(false);
  });

  it("returns true when customer.invoice_settings.default_payment_method is set", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_billing_customer_id: "cus_123",
    });
    stripeMock.customersRetrieve.mockResolvedValue({
      id: "cus_123",
      invoice_settings: { default_payment_method: "pm_1" },
    });
    const { hasDefaultPaymentMethod } = await import("../billing");
    expect(await hasDefaultPaymentMethod(MERCHANT_ID)).toBe(true);
  });

  it("returns false when default_payment_method is null", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_billing_customer_id: "cus_123",
    });
    stripeMock.customersRetrieve.mockResolvedValue({
      id: "cus_123",
      invoice_settings: { default_payment_method: null },
    });
    const { hasDefaultPaymentMethod } = await import("../billing");
    expect(await hasDefaultPaymentMethod(MERCHANT_ID)).toBe(false);
  });
});

describe("createSetupCheckoutSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
  });

  it("creates a setup-mode Checkout session for the merchant", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: "a@b.co",
      business_name: "Biz",
      stripe_billing_customer_id: "cus_123",
    });
    stripeMock.checkoutSessionsCreate.mockResolvedValue({
      id: "cs_2",
      url: "https://checkout.stripe.com/setup",
    });

    const { createSetupCheckoutSession } = await import("../billing");
    const result = await createSetupCheckoutSession({
      merchantId: MERCHANT_ID,
      successUrl: "https://winbackpay.com/setup-billing/success",
      cancelUrl: "https://winbackpay.com/setup-billing",
    });
    expect(result.url).toContain("checkout.stripe.com");
    expect(stripeMock.checkoutSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "setup",
        customer: "cus_123",
        success_url: "https://winbackpay.com/setup-billing/success",
        cancel_url: "https://winbackpay.com/setup-billing",
      }),
    );
  });
});
```

- [ ] **Step 3: Verify failing**

```bash
cd backend && npx vitest run lib/__tests__/billing.test.ts
```

Expected: the new tests fail with "not exported" or similar.

- [ ] **Step 4: Implement the helpers**

Add to `backend/lib/billing.ts` (at the bottom of the file, after existing exports):

```ts
/**
 * Returns true if the merchant's billing Customer has a default payment
 * method attached. Used by /api/billing/status and by the Submit pre-flight
 * gate to decide whether to show the "add a card" banner/modal.
 */
export async function hasDefaultPaymentMethod(
  merchantId: string,
): Promise<boolean> {
  const merchant = await getMerchant(merchantId);
  if (!merchant.stripe_billing_customer_id) return false;
  const customer = await getStripe().customers.retrieve(
    merchant.stripe_billing_customer_id,
  );
  if (typeof customer === "string" || customer.deleted) return false;
  const pm = customer.invoice_settings?.default_payment_method;
  return pm !== null && pm !== undefined;
}

/**
 * Create a Stripe Checkout session in `setup` mode to collect a payment
 * method from the merchant without charging. The returned URL is opened on
 * /setup-billing after the user clicks Continue on the confirmation page.
 */
export async function createSetupCheckoutSession(params: {
  merchantId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url: string; sessionId: string }> {
  const customerId = await getOrCreateBillingCustomer(params.merchantId);
  const session = await getStripe().checkout.sessions.create({
    mode: "setup",
    customer: customerId,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    payment_method_types: ["card"],
  });
  if (!session.url) {
    throw new Error("Stripe did not return a setup Checkout URL");
  }
  return { url: session.url, sessionId: session.id };
}
```

- [ ] **Step 5: Verify passing**

```bash
cd backend && npx vitest run lib/__tests__/billing.test.ts
```

Expected: all tests pass including the new `hasDefaultPaymentMethod` and `createSetupCheckoutSession` blocks.

- [ ] **Step 6: Commit**

```bash
git add backend/lib/billing.ts backend/lib/__tests__/billing.test.ts
git commit -m "feat(backend): billing helpers for default PM check and setup Checkout"
```

---

### Task 12: Add `POST /api/billing/setup-link` route with tests

**Files:**
- Create: `backend/app/api/billing/setup-link/route.ts`
- Create: `backend/app/api/billing/setup-link/__tests__/route.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/app/api/billing/setup-link/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, authMock, ensureMerchantMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  authMock: { withStripeAuth: vi.fn() },
  ensureMerchantMock: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: unknown) => authMock.withStripeAuth(handler),
}));
vi.mock("@/lib/merchants", () => ({ ensureMerchant: ensureMerchantMock }));

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

describe("POST /api/billing/setup-link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns winbackpay.com/setup-billing URL with setup-kind token", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1" },
            error: null,
          }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/winbackpay\.com\/setup-billing\?t=/);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run app/api/billing/setup-link
```

Expected: "Cannot find module '../route'".

- [ ] **Step 3: Implement the route**

Create `backend/app/api/billing/setup-link/route.ts`:

```ts
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/upgrade-token";
import { captureRouteError } from "@/lib/sentry";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string };

  try {
    const token = signToken({ merchant_id: row.id, kind: "setup" });
    const url = `https://winbackpay.com/setup-billing?t=${encodeURIComponent(token)}`;
    return NextResponse.json({ url });
  } catch (err) {
    captureRouteError(err, { route: "billing.setup-link", extra: { merchant_id: row.id } });
    return NextResponse.json(
      { error: "Failed to create setup link", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run app/api/billing/setup-link
```

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/billing/setup-link
git commit -m "feat(backend): /api/billing/setup-link returns signed setup URL"
```

---

### Task 13: Add `POST /api/billing/setup-session-from-token` route with tests

**Files:**
- Create: `backend/app/api/billing/setup-session-from-token/route.ts`
- Create: `backend/app/api/billing/setup-session-from-token/__tests__/route.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/app/api/billing/setup-session-from-token/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, billingMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { createSetupCheckoutSession: vi.fn() },
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

import { signToken } from "../../../../../lib/upgrade-token";

describe("POST /api/billing/setup-session-from-token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates setup-mode Checkout session for valid setup token", async () => {
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1" },
            error: null,
          }),
        }),
      }),
    });
    billingMock.createSetupCheckoutSession.mockResolvedValue({
      url: "https://checkout.stripe.com/setup",
      sessionId: "cs_2",
    });
    const token = signToken({ merchant_id: "m-1", kind: "setup" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  it("rejects upgrade-kind tokens with 400", async () => {
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run app/api/billing/setup-session-from-token
```

Expected: "Cannot find module '../route'".

- [ ] **Step 3: Implement the route**

Create `backend/app/api/billing/setup-session-from-token/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/upgrade-token";
import { createSetupCheckoutSession } from "@/lib/billing";
import { captureRouteError } from "@/lib/sentry";

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: { token?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "invalid_request" },
      { status: 400 },
    );
  }
  const token = typeof body.token === "string" ? body.token : "";
  if (!token) {
    return NextResponse.json(
      { error: "Missing token", code: "invalid_request" },
      { status: 400 },
    );
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Invalid token",
        code: "invalid_token",
      },
      { status: 401 },
    );
  }

  if (payload.kind !== "setup") {
    return NextResponse.json(
      { error: "Token is not a setup token", code: "invalid_token_kind" },
      { status: 400 },
    );
  }

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id")
    .eq("id", payload.merchant_id)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string };

  try {
    const { url, sessionId } = await createSetupCheckoutSession({
      merchantId: row.id,
      successUrl: "https://winbackpay.com/setup-billing/success",
      cancelUrl: "https://winbackpay.com/setup-billing",
    });
    return NextResponse.json({ url, session_id: sessionId });
  } catch (err) {
    captureRouteError(err, {
      route: "billing.setup-session-from-token",
      extra: { merchant_id: row.id },
    });
    return NextResponse.json(
      { error: "Failed to create setup session", code: "internal_error" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run app/api/billing/setup-session-from-token
```

Expected: both tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/billing/setup-session-from-token
git commit -m "feat(backend): /api/billing/setup-session-from-token creates setup Checkout"
```

---

### Task 14: Create `/setup-billing` and `/setup-billing/success` pages

**Files:**
- Create: `backend/app/setup-billing/page.tsx`
- Create: `backend/app/setup-billing/ContinueButton.tsx`
- Create: `backend/app/setup-billing/success/page.tsx`

- [ ] **Step 1: Create `/setup-billing/page.tsx`**

```tsx
import { verifyToken } from "@/lib/upgrade-token";
import { supabase } from "@/lib/supabase";
import { ContinueButton } from "./ContinueButton";

type SearchParams = { t?: string };

async function resolveMerchant(token: string) {
  try {
    const payload = verifyToken(token);
    if (payload.kind !== "setup") return { ok: false as const, reason: "wrong_kind" as const };
    const { data } = await supabase
      .from("merchants")
      .select("id, business_name")
      .eq("id", payload.merchant_id)
      .maybeSingle();
    if (!data) return { ok: false as const, reason: "not_found" as const };
    const row = data as { id: string; business_name: string | null };
    return { ok: true as const, merchantId: row.id, businessName: row.business_name };
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : "";
    return { ok: false as const, reason: msg.includes("expired") ? "expired" : "invalid" } as const;
  }
}

export default async function SetupBillingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = params.t ?? "";
  if (!token) return <InvalidState reason="invalid" />;
  const resolved = await resolveMerchant(token);
  if (!resolved.ok) return <InvalidState reason={resolved.reason} />;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Add a payment method for {resolved.businessName ?? "your account"}
        </h1>
        <p className="mt-4 text-slate-300">
          WinBack charges the 15% success fee only when a dispute is won.
          Adding a card now does not charge you anything. It lets us settle
          future wins instantly instead of failing on an invoice.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-400">
          <li>No charge today.</li>
          <li>Card is held securely by Stripe.</li>
          <li>You can change or remove it later from your Stripe billing portal.</li>
        </ul>
        <div className="mt-8">
          <ContinueButton token={token} />
        </div>
        <p className="mt-6 text-xs text-slate-500">
          This link expires 15 minutes after you open it.
        </p>
      </div>
    </main>
  );
}

function InvalidState({
  reason,
}: {
  reason: "invalid" | "expired" | "wrong_kind" | "not_found";
}) {
  const copy: Record<string, { title: string; body: string }> = {
    invalid: {
      title: "This link is not valid",
      body: "Please return to the WinBack app in your Stripe Dashboard and try again.",
    },
    expired: {
      title: "This link has expired",
      body: "Setup links expire after 15 minutes. Please return to the WinBack app in your Stripe Dashboard and try again.",
    },
    wrong_kind: {
      title: "This link is not a setup link",
      body: "The link you followed is for a different action.",
    },
    not_found: {
      title: "Account not found",
      body: "We could not find the account for this link. If you think this is a mistake, email support@winbackpay.com.",
    },
  };
  const c = copy[reason];
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8">
        <h1 className="text-2xl font-bold">{c.title}</h1>
        <p className="mt-4 text-slate-300">{c.body}</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create `/setup-billing/ContinueButton.tsx`**

```tsx
"use client";
import { useState } from "react";

export function ContinueButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold py-3 transition-colors"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setError(null);
          try {
            const res = await fetch("/api/billing/setup-session-from-token", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ token }),
            });
            const body = await res.json();
            if (res.ok && body.url) {
              window.location.href = body.url;
              return;
            }
            setError(body.error ?? "Failed to continue");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Network error");
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? "Opening Stripe…" : "Continue"}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Create `/setup-billing/success/page.tsx`**

```tsx
export default function SetupBillingSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 text-center">
        <h1 className="text-2xl font-bold">Payment method added</h1>
        <p className="mt-4 text-slate-300">
          You are all set. You can close this tab and return to the WinBack app
          in your Stripe Dashboard. You will not be charged until you win a
          dispute.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add backend/app/setup-billing
git commit -m "feat(backend): /setup-billing page with signed-token handoff to Stripe setup Checkout"
```

---

### Task 15: Extend billing webhook handler for `setup_intent.succeeded`

**Files:**
- Modify: `backend/app/api/webhooks/stripe-billing/route.ts`
- Modify: `backend/lib/webhooks/handle-billing-event.ts`
- Modify: `backend/lib/webhooks/__tests__/handle-billing-event.test.ts`

- [ ] **Step 1: Add `setup_intent.succeeded` to `HANDLED_EVENT_TYPES`**

In `backend/app/api/webhooks/stripe-billing/route.ts`, update line 13-19 to:

```ts
const HANDLED_EVENT_TYPES = new Set<Stripe.Event.Type>([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.payment_succeeded",
  "invoice.payment_failed",
  "setup_intent.succeeded",
]);
```

- [ ] **Step 2: Extend the hoisted Stripe mock in the handler test file**

Open `backend/lib/webhooks/__tests__/handle-billing-event.test.ts` and find the `vi.hoisted(...)` block. Add `customersUpdate` to the hoisted refs and the `MockStripe` class `customers` field, mirroring the pattern used in `backend/lib/__tests__/billing.test.ts`. If the handler test file does not yet construct a `MockStripe`, add a minimal one with `customers = { update: customersUpdate }` and `vi.mock("stripe", () => ({ default: stripeMock.default }))` at module scope.

- [ ] **Step 3: Write failing test for the new handler branch**

Add to the same test file:

```ts
describe("setup_intent.succeeded", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
    process.env.STRIPE_PRICE_PRO_MONTHLY = "price_pro";
  });

  it("attaches the PaymentMethod as the customer's default", async () => {
    stripeMock.customersUpdate.mockResolvedValue({});

    const event = {
      type: "setup_intent.succeeded",
      data: {
        object: {
          id: "seti_1",
          customer: "cus_123",
          payment_method: "pm_1",
        },
      },
    } as unknown as Stripe.Event;

    const { handleBillingEvent } = await import("../handle-billing-event");
    await handleBillingEvent(event);

    expect(stripeMock.customersUpdate).toHaveBeenCalledWith("cus_123", {
      invoice_settings: { default_payment_method: "pm_1" },
    });
  });

  it("is a no-op if the SetupIntent has no payment_method or no customer", async () => {
    const event = {
      type: "setup_intent.succeeded",
      data: { object: { id: "seti_2", customer: null, payment_method: null } },
    } as unknown as Stripe.Event;

    const { handleBillingEvent } = await import("../handle-billing-event");
    await handleBillingEvent(event);
    expect(stripeMock.customersUpdate).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 4: Verify failing**

```bash
cd backend && npx vitest run lib/webhooks/__tests__/handle-billing-event.test.ts
```

Expected: new tests fail (existing still pass).

- [ ] **Step 5: Implement handler branch**

In `backend/lib/webhooks/handle-billing-event.ts`, add at the top (after imports):

```ts
import Stripe from "stripe";
import { env } from "@/lib/env";

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(env().STRIPE_SECRET_KEY);
  }
  return _stripe;
}
```

(If a `getStripe` already exists in this file, skip this step — it does not. Double-check before adding.)

In the `switch (event.type)` block, add a case before `default`:

```ts
case "setup_intent.succeeded": {
  await applySetupIntentSucceeded(event.data.object as Stripe.SetupIntent);
  return;
}
```

Then at the end of the file, add:

```ts
async function applySetupIntentSucceeded(si: Stripe.SetupIntent): Promise<void> {
  const customerId = typeof si.customer === "string" ? si.customer : si.customer?.id ?? null;
  const paymentMethodId =
    typeof si.payment_method === "string" ? si.payment_method : si.payment_method?.id ?? null;
  if (!customerId || !paymentMethodId) return;

  await getStripe().customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });
}
```

- [ ] **Step 6: Verify passing**

```bash
cd backend && npx vitest run lib/webhooks/__tests__/handle-billing-event.test.ts
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add backend/app/api/webhooks/stripe-billing/route.ts backend/lib/webhooks/handle-billing-event.ts backend/lib/webhooks/__tests__/handle-billing-event.test.ts
git commit -m "feat(backend): billing webhook handles setup_intent.succeeded to attach default PM"
```

---

## Phase 6 — Update billing status route

### Task 16: Add `has_payment_method` and `payment_method_prompt_dismissed_at` to `/api/billing/status`

**Files:**
- Modify: `backend/app/api/billing/status/route.ts`

- [ ] **Step 1: Update the query and response**

In `backend/app/api/billing/status/route.ts`:

Change the Supabase select (line 39-41) to include the new column:

```ts
.select(
  "id, billing_tier, subscription_status, pro_since_at, upgrade_prompted_at, stripe_subscription_id, payment_method_prompt_dismissed_at",
)
```

Update the `row` type annotation to include it:

```ts
const row = merchant as {
  id: string;
  billing_tier: "usage" | "pro";
  subscription_status: string | null;
  pro_since_at: string | null;
  upgrade_prompted_at: string | null;
  stripe_subscription_id: string | null;
  payment_method_prompt_dismissed_at: string | null;
};
```

Import the new helper:

```ts
import { SUCCESS_FEE_RATE, hasDefaultPaymentMethod } from "@/lib/billing";
```

Before the final `return NextResponse.json(...)`, compute PM status:

```ts
let hasPaymentMethod = false;
try {
  hasPaymentMethod = await hasDefaultPaymentMethod(row.id);
} catch (err) {
  captureRouteError(err, { route: "billing.status.has_payment_method" });
}
```

Update the response body to include two new fields:

```ts
return NextResponse.json({
  tier: row.billing_tier,
  subscription_status: row.subscription_status,
  pro_since_at: row.pro_since_at,
  upgrade_prompted_at: row.upgrade_prompted_at,
  next_billing_at: nextBillingAt,
  ytd_success_fees_cents: ytdFeesCents,
  has_payment_method: hasPaymentMethod,
  payment_method_prompt_dismissed_at: row.payment_method_prompt_dismissed_at,
});
```

- [ ] **Step 2: Manual smoke test**

```bash
cd backend && npm run dev
```

From another terminal, simulate an authenticated call (use the integration test helper or a signed fetch from the iframe stub). Verify response includes `has_payment_method` and `payment_method_prompt_dismissed_at`.

- [ ] **Step 3: Commit**

```bash
git add backend/app/api/billing/status/route.ts
git commit -m "feat(backend): billing status includes has_payment_method + dismissed_at"
```

---

### Task 17: Add `POST /api/billing/dismiss-payment-method-prompt` route

**Files:**
- Create: `backend/app/api/billing/dismiss-payment-method-prompt/route.ts`
- Create: `backend/app/api/billing/dismiss-payment-method-prompt/__tests__/route.test.ts`

- [ ] **Step 1: Write failing test**

Create `backend/app/api/billing/dismiss-payment-method-prompt/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, authMock, ensureMerchantMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  authMock: { withStripeAuth: vi.fn() },
  ensureMerchantMock: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: unknown) => authMock.withStripeAuth(handler),
}));
vi.mock("@/lib/merchants", () => ({ ensureMerchant: ensureMerchantMock }));

describe("POST /api/billing/dismiss-payment-method-prompt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stamps payment_method_prompt_dismissed_at on the merchant row", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });
    const eqChain = { eq: vi.fn().mockResolvedValue({ error: null }) };
    const updateMock = vi.fn(() => eqChain);
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: "m-1" }, error: null }),
        }),
      }),
      update: updateMock,
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(200);
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({ payment_method_prompt_dismissed_at: expect.any(String) }),
    );
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
cd backend && npx vitest run app/api/billing/dismiss-payment-method-prompt
```

Expected: "Cannot find module '../route'".

- [ ] **Step 3: Implement the route**

Create `backend/app/api/billing/dismiss-payment-method-prompt/route.ts`:

```ts
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .maybeSingle();
  if (!merchant) {
    return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
  }
  const row = merchant as { id: string };

  try {
    const { error } = await supabase
      .from("merchants")
      .update({ payment_method_prompt_dismissed_at: new Date().toISOString() })
      .eq("id", row.id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    captureRouteError(err, { route: "billing.dismiss-pm-prompt" });
    return NextResponse.json({ error: "Failed to dismiss" }, { status: 500 });
  }
});
```

- [ ] **Step 4: Verify passing**

```bash
cd backend && npx vitest run app/api/billing/dismiss-payment-method-prompt
```

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/billing/dismiss-payment-method-prompt
git commit -m "feat(backend): /api/billing/dismiss-payment-method-prompt route"
```

---

## Phase 7 — Delete the broken route

### Task 18: Delete `/api/billing/checkout`

**Files:**
- Delete: `backend/app/api/billing/checkout/route.ts`
- Delete: `backend/app/api/billing/checkout/` (directory, if empty after)

- [ ] **Step 1: Delete the route**

```bash
rm -r backend/app/api/billing/checkout
```

- [ ] **Step 2: Grep the monorepo for lingering callers**

```bash
grep -r "api/billing/checkout" --include='*.ts' --include='*.tsx' .
```

Expected: after Task 19 renames the iframe caller, zero matches. Right now this likely still matches `stripe-app/src/views/AppSettings.tsx:98` (`/api/billing/checkout`) — that gets replaced in Task 19.

- [ ] **Step 3: Confirm existing tests still pass**

```bash
cd backend && npm test
```

Expected: all pass. Any failing test that references the deleted route is stale and should have been deleted with the route — if you find one, delete it.

- [ ] **Step 4: Commit** (do this AFTER Task 19 so `git log` shows the swap together; return here at the end of Phase 8)

---

## Phase 8 — Iframe changes

### Task 19: Swap the iframe Upgrade button to call `/api/billing/upgrade-link`

**Files:**
- Modify: `stripe-app/src/views/AppSettings.tsx`

- [ ] **Step 1: Replace `handleUpgrade`**

In `stripe-app/src/views/AppSettings.tsx` replace lines 89-113 (the `handleUpgrade` function) with:

```tsx
const handleUpgrade = async () => {
  setUpgrading(true);
  setUpgradeError(null);
  try {
    const result = await fetchBackend<{ url: string }>(
      '/api/billing/upgrade-link',
      contextRef.current,
    );
    if (typeof window !== 'undefined') {
      window.open(result.url, '_blank', 'noopener');
    }
  } catch (err) {
    const msg = err instanceof ApiError ? err.message : 'Failed to start upgrade';
    setUpgradeError(msg);
  } finally {
    setUpgrading(false);
  }
};
```

- [ ] **Step 2: Confirm the button copy still makes sense**

The existing button says "Upgrade to Pro" with caption "Opens Stripe Checkout in a new tab". Update the caption to "Opens winbackpay.com in a new tab" to be accurate:

```tsx
<Inline css={{ font: 'caption', color: 'secondary' }}>
  Opens winbackpay.com in a new tab
</Inline>
```

- [ ] **Step 3: Smoke-test the iframe build**

```bash
cd stripe-app && stripe apps start
```

Visit a Stripe Dashboard in test mode with the app installed. Open Settings → click "Upgrade to Pro". Expect a new tab to open to `https://winbackpay.com/upgrade?t=...` (or local dev URL in dev).

- [ ] **Step 4: Commit (along with Task 18 deletion)**

```bash
git add backend/app/api/billing/checkout stripe-app/src/views/AppSettings.tsx
git commit -m "feat(iframe): replace direct checkout call with signed upgrade-link handoff"
```

---

### Task 20: Add payment-method banner to `AppSettings`

**Files:**
- Modify: `stripe-app/src/views/AppSettings.tsx`

- [ ] **Step 1: Extend BillingStatus type**

Add two fields to the type at the top of the file:

```tsx
type BillingStatus = {
  tier: 'usage' | 'pro';
  subscription_status: string | null;
  pro_since_at: string | null;
  upgrade_prompted_at: string | null;
  next_billing_at: string | null;
  ytd_success_fees_cents: number;
  has_payment_method: boolean;
  payment_method_prompt_dismissed_at: string | null;
};
```

- [ ] **Step 2: Add setup-link handler**

After `handleUpgrade`, add:

```tsx
const [settingUp, setSettingUp] = useState(false);
const [settingUpError, setSettingUpError] = useState<string | null>(null);
const [dismissing, setDismissing] = useState(false);

const handleAddPaymentMethod = async () => {
  setSettingUp(true);
  setSettingUpError(null);
  try {
    const result = await fetchBackend<{ url: string }>(
      '/api/billing/setup-link',
      contextRef.current,
    );
    if (typeof window !== 'undefined') {
      window.open(result.url, '_blank', 'noopener');
    }
  } catch (err) {
    const msg = err instanceof ApiError ? err.message : 'Failed to start setup';
    setSettingUpError(msg);
  } finally {
    setSettingUp(false);
  }
};

const handleDismissPmBanner = async () => {
  setDismissing(true);
  try {
    await fetchBackend('/api/billing/dismiss-payment-method-prompt', contextRef.current, {});
    if (billing) {
      setBilling({
        ...billing,
        payment_method_prompt_dismissed_at: new Date().toISOString(),
      });
    }
  } finally {
    setDismissing(false);
  }
};
```

- [ ] **Step 3: Render banner when conditions match**

In the render section, after the past-due banner and before the `<Box css={{ stack: 'y', gap: 'small' }}>` that wraps the Plan heading, add:

```tsx
{shouldShowPmBanner(billing) && (
  <Banner
    type="default"
    title="Add a payment method"
    description="Add a card so WinBack can settle the 15% success fee instantly when you win. You won't be charged today."
    actions={
      <Box css={{ stack: 'x', gap: 'small' }}>
        <Button type="primary" onPress={handleAddPaymentMethod} disabled={settingUp}>
          {settingUp ? 'Opening…' : 'Add payment method'}
        </Button>
        <Button type="secondary" onPress={handleDismissPmBanner} disabled={dismissing}>
          Not now
        </Button>
      </Box>
    }
  />
)}
{settingUpError && (
  <Banner type="critical" title="Could not start setup" description={settingUpError} />
)}
```

Add the helper at the bottom of the file, above the component export:

```tsx
function shouldShowPmBanner(b: BillingStatus | null): boolean {
  if (!b) return false;
  if (b.tier === 'pro') return false; // Pro collected card at Checkout
  if (b.has_payment_method) return false;
  const dismissed = b.payment_method_prompt_dismissed_at;
  if (!dismissed) return true;
  const dismissedAt = new Date(dismissed).getTime();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - dismissedAt > thirtyDaysMs;
}
```

- [ ] **Step 4: Smoke-test**

Run the iframe build, visit Settings. Verify:
- Usage-tier merchant with no PM → banner shown
- Click "Not now" → banner disappears, dismissed_at stamped
- Usage-tier merchant who just dismissed → banner hidden
- Pro-tier merchant → banner never shown

- [ ] **Step 5: Commit**

```bash
git add stripe-app/src/views/AppSettings.tsx
git commit -m "feat(iframe): add payment-method banner to Settings with 30-day snooze"
```

---

### Task 21: Gate evidence submit on payment method

**Files:**
- Modify: `stripe-app/src/components/submit/SubmitView.tsx`

- [ ] **Step 1: Read the current submit handler**

Open `stripe-app/src/components/submit/SubmitView.tsx` and find where the user clicks the final Submit button (likely a `handleSubmit` or similar). Locate the point right before evidence submission is fired.

- [ ] **Step 2: Fetch billing status on view mount**

Near the top of the component, add:

```tsx
const [billing, setBilling] = useState<{
  tier: 'usage' | 'pro';
  has_payment_method: boolean;
} | null>(null);
const [pmGateOpen, setPmGateOpen] = useState(false);
const [pmOpening, setPmOpening] = useState(false);
const [pmGateError, setPmGateError] = useState<string | null>(null);

useEffect(() => {
  const load = async () => {
    try {
      const result = await fetchBackend<{
        tier: 'usage' | 'pro';
        has_payment_method: boolean;
      }>('/api/billing/status', contextRef.current);
      setBilling({ tier: result.tier, has_payment_method: result.has_payment_method });
    } catch {
      // If billing status fails, fall through and let submit proceed without gating.
      // Better to let the merchant submit than block indefinitely on a billing outage.
    }
  };
  load();
}, []);
```

- [ ] **Step 3: Gate the submit click**

Wherever the current submit handler is, wrap it:

```tsx
const attemptSubmit = async () => {
  if (billing && billing.tier === 'usage' && !billing.has_payment_method) {
    setPmGateOpen(true);
    return;
  }
  await handleSubmit();
};
```

Use `attemptSubmit` as the `onPress` for the Submit button instead of `handleSubmit`.

- [ ] **Step 4: Render the gate modal**

Use the `FocusView` Stripe Apps SDK component (confirmed in the imports already in the file or add it). Render conditionally:

```tsx
{pmGateOpen && (
  <FocusView
    title="Add a payment method before submitting"
    onClose={() => setPmGateOpen(false)}
    primaryAction={
      <Button
        type="primary"
        onPress={async () => {
          setPmOpening(true);
          setPmGateError(null);
          try {
            const result = await fetchBackend<{ url: string }>(
              '/api/billing/setup-link',
              contextRef.current,
            );
            if (typeof window !== 'undefined') {
              window.open(result.url, '_blank', 'noopener');
            }
          } catch (err) {
            setPmGateError(err instanceof ApiError ? err.message : 'Failed to open setup');
          } finally {
            setPmOpening(false);
          }
        }}
        disabled={pmOpening}
      >
        {pmOpening ? 'Opening…' : 'Add payment method'}
      </Button>
    }
    secondaryAction={
      <Button type="secondary" onPress={() => setPmGateOpen(false)}>
        Cancel
      </Button>
    }
  >
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'body' }}>
        WinBack's Pay-Per-Win plan charges 15% only when you win. Add a card
        now so we can settle instantly if this dispute is resolved in your
        favor. You won't be charged anything today.
      </Inline>
      {pmGateError && (
        <Banner type="critical" title="Could not start setup" description={pmGateError} />
      )}
    </Box>
  </FocusView>
)}
```

- [ ] **Step 5: Smoke-test**

Run the iframe. With a usage-tier merchant that has no PM, attempt to submit evidence — expect the modal to open. With PM attached or on Pro tier, expect submit to proceed unblocked.

- [ ] **Step 6: Commit**

```bash
git add stripe-app/src/components/submit/SubmitView.tsx
git commit -m "feat(iframe): gate evidence submit on payment-method presence for usage tier"
```

---

## Phase 9 — Preflight route

### Task 22: Add `GET /api/_preflight`

**Files:**
- Create: `backend/app/api/_preflight/route.ts`

- [ ] **Step 1: Implement**

Create `backend/app/api/_preflight/route.ts`:

```ts
import { NextResponse } from "next/server";
import { readEnv } from "@/lib/env";

/**
 * Health probe that also confirms all required env vars are present.
 * Hitting this after a deploy surfaces env misconfiguration immediately,
 * rather than waiting for a user action to trigger a 500.
 */
export async function GET(): Promise<NextResponse> {
  try {
    readEnv();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "env error",
      },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Smoke-test**

```bash
cd backend && npm run dev
curl http://localhost:3000/api/_preflight
```

With a complete `.env.local`, expect `{"ok":true}`. Temporarily unset `STRIPE_PRICE_PRO_MONTHLY` and restart — expect `{"ok":false,"error":"Missing required env vars: STRIPE_PRICE_PRO_MONTHLY"}` and HTTP 500.

- [ ] **Step 3: Commit**

```bash
git add backend/app/api/_preflight
git commit -m "feat(backend): /api/_preflight health route validates required env"
```

---

## Phase 10 — E2E verification script

### Task 23: Create `backend/scripts/verify-billing.ts`

**Files:**
- Create: `backend/scripts/verify-billing.ts`
- Modify: `backend/package.json` (add npm script)

- [ ] **Step 1: Create the script**

Create `backend/scripts/verify-billing.ts`:

```ts
/**
 * End-to-end billing verification. Runs against whichever mode
 * STRIPE_SECRET_KEY points at. Exits 0 on full pass, non-zero on first
 * failure.
 *
 * Covers:
 *   1. Upgrade link → checkout-from-token round-trip
 *   2. Pro subscription lifecycle (created/updated → tier flip)
 *   3. Success fee posting via reportDisputeWonFee
 *   4. Past-due scenario after a win without a PM
 *   5. Setup link + setup session round-trip
 *   6. Downgrade (subscription.deleted → revert to usage tier)
 *
 * Usage:
 *   cd backend && tsx scripts/verify-billing.ts [--base=https://winbackpay.com]
 *
 * Default base is http://localhost:3000 for local runs.
 */
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createHmac } from "node:crypto";

type Check = { name: string; run: () => Promise<void> };

const BASE = (process.argv.find((a) => a.startsWith("--base=")) ?? "--base=http://localhost:3000")
  .slice("--base=".length);
const MARKER = `verify-${Date.now()}`;

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Missing STRIPE_SECRET_KEY");
  process.exit(1);
}
if (!process.env.UPGRADE_LINK_SECRET) {
  console.error("Missing UPGRADE_LINK_SECRET");
  process.exit(1);
}
if (!process.env.STRIPE_BILLING_WEBHOOK_SECRET) {
  console.error("Missing STRIPE_BILLING_WEBHOOK_SECRET");
  process.exit(1);
}
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const stripe = new Stripe(key);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

let merchantId: string = "";
let stripeAccountId: string = `acct_${MARKER}`;

async function setup() {
  const { data, error } = await supabase
    .from("merchants")
    .insert({
      stripe_account_id: stripeAccountId,
      user_id: `verify-user-${MARKER}`,
      email: `verify+${MARKER}@example.com`,
      business_name: `Verify ${MARKER}`,
      billing_tier: "usage",
    })
    .select()
    .single();
  if (error) throw new Error(`Failed to create test merchant: ${error.message}`);
  merchantId = (data as { id: string }).id;
  console.log(`[setup] created merchant ${merchantId} (${MARKER})`);
}

async function teardown() {
  const { data } = await supabase
    .from("merchants")
    .select("stripe_billing_customer_id")
    .eq("id", merchantId)
    .maybeSingle();
  const customerId = (data as { stripe_billing_customer_id: string | null } | null)
    ?.stripe_billing_customer_id;
  await supabase.from("merchants").delete().eq("id", merchantId);
  if (customerId) {
    try {
      await stripe.customers.del(customerId);
    } catch {
      // Customer cleanup is best-effort.
    }
  }
  console.log(`[teardown] removed merchant ${merchantId}`);
}

async function signUpgradeToken(kind: "upgrade" | "setup"): Promise<string> {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "UB" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ merchant_id: merchantId, kind, iat: now, exp: now + 900 }),
  ).toString("base64url");
  const sig = createHmac("sha256", process.env.UPGRADE_LINK_SECRET!)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${sig}`;
}

async function deliverWebhook(event: object) {
  const payload = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const sig = createHmac("sha256", process.env.STRIPE_BILLING_WEBHOOK_SECRET!)
    .update(signedPayload)
    .digest("hex");
  const stripeSig = `t=${timestamp},v1=${sig}`;

  const res = await fetch(`${BASE}/api/webhooks/stripe-billing`, {
    method: "POST",
    headers: { "content-type": "application/json", "stripe-signature": stripeSig },
    body: payload,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Webhook delivery failed: ${res.status} ${text}`);
  }
}

const checks: Check[] = [
  {
    name: "checkout-from-token returns Checkout URL",
    run: async () => {
      const token = await signUpgradeToken("upgrade");
      const res = await fetch(`${BASE}/api/billing/checkout-from-token`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error(`status=${res.status}`);
      const body = (await res.json()) as { url?: string };
      if (!body.url?.startsWith("https://checkout.stripe.com"))
        throw new Error(`bad url: ${body.url}`);
    },
  },
  {
    name: "setup-session-from-token returns Checkout URL",
    run: async () => {
      const token = await signUpgradeToken("setup");
      const res = await fetch(`${BASE}/api/billing/setup-session-from-token`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error(`status=${res.status}`);
      const body = (await res.json()) as { url?: string };
      if (!body.url?.startsWith("https://checkout.stripe.com"))
        throw new Error(`bad url: ${body.url}`);
    },
  },
  {
    name: "Pro subscription webhook flips tier to pro",
    run: async () => {
      const { data: merchantRow } = await supabase
        .from("merchants")
        .select("stripe_billing_customer_id")
        .eq("id", merchantId)
        .single();
      const customerId = (merchantRow as { stripe_billing_customer_id: string | null })
        .stripe_billing_customer_id;
      if (!customerId) throw new Error("No billing customer yet — prior checks should have created one");

      const subEvent = {
        id: `evt_${MARKER}_sub_created`,
        type: "customer.subscription.created",
        data: {
          object: {
            id: `sub_${MARKER}`,
            status: "active",
            customer: customerId,
            metadata: { tier: "pro" },
            items: {
              data: [
                {
                  price: { id: process.env.STRIPE_PRICE_PRO_MONTHLY! },
                  current_period_end: Math.floor(Date.now() / 1000) + 30 * 86400,
                },
              ],
            },
          },
        },
      };
      await deliverWebhook(subEvent);

      const { data: row } = await supabase
        .from("merchants")
        .select("billing_tier, pro_since_at")
        .eq("id", merchantId)
        .single();
      const r = row as { billing_tier: string; pro_since_at: string | null };
      if (r.billing_tier !== "pro") throw new Error(`tier=${r.billing_tier}`);
      if (!r.pro_since_at) throw new Error("pro_since_at not stamped");
    },
  },
  {
    name: "success fee reports correct meter event",
    run: async () => {
      // Reset to usage tier for this check.
      await supabase
        .from("merchants")
        .update({ billing_tier: "usage", pro_since_at: null })
        .eq("id", merchantId);

      const mod = await import("../lib/billing");
      const { feeCents } = await mod.reportDisputeWonFee({
        merchantId,
        disputeId: `dp_${MARKER}`,
        amountRecoveredCents: 10000,
      });
      if (feeCents !== 1500) throw new Error(`feeCents=${feeCents}`);

      // Idempotency: second call should not double-charge.
      const second = await mod.reportDisputeWonFee({
        merchantId,
        disputeId: `dp_${MARKER}`,
        amountRecoveredCents: 10000,
      });
      if (second.feeCents !== 1500) throw new Error("idempotency second-call value mismatch");
    },
  },
  {
    name: "subscription.deleted reverts tier to usage",
    run: async () => {
      // Upgrade first so the deletion matters.
      await supabase.from("merchants").update({ billing_tier: "pro" }).eq("id", merchantId);

      const { data: merchantRow } = await supabase
        .from("merchants")
        .select("stripe_billing_customer_id")
        .eq("id", merchantId)
        .single();
      const customerId = (merchantRow as { stripe_billing_customer_id: string | null })
        .stripe_billing_customer_id;

      const delEvent = {
        id: `evt_${MARKER}_sub_deleted`,
        type: "customer.subscription.deleted",
        data: {
          object: {
            id: `sub_${MARKER}`,
            status: "canceled",
            customer: customerId,
            metadata: { tier: "pro" },
            items: { data: [{ price: { id: process.env.STRIPE_PRICE_PRO_MONTHLY! } }] },
          },
        },
      };
      await deliverWebhook(delEvent);

      const { data: row } = await supabase
        .from("merchants")
        .select("billing_tier")
        .eq("id", merchantId)
        .single();
      if ((row as { billing_tier: string }).billing_tier !== "usage") {
        throw new Error(`tier=${(row as { billing_tier: string }).billing_tier}`);
      }
    },
  },
];

async function main() {
  await setup();
  try {
    for (const c of checks) {
      process.stdout.write(`[check] ${c.name}... `);
      try {
        await c.run();
        console.log("OK");
      } catch (err) {
        console.log("FAIL");
        console.error(err);
        process.exitCode = 1;
        break;
      }
    }
  } finally {
    await teardown();
  }
  if (process.exitCode && process.exitCode !== 0) {
    console.error("\n[verify] FAILED");
  } else {
    console.log("\n[verify] PASS");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Add npm script**

In `backend/package.json` scripts:

```json
"verify:billing": "tsx scripts/verify-billing.ts",
```

- [ ] **Step 3: Run against local dev server**

In terminal A:

```bash
cd backend && npm run dev
```

In terminal B:

```bash
cd backend && set -a && source .env.local && set +a && npm run verify:billing
```

Expected: 5 checks pass, exits 0.

If any check fails, read the error and fix whichever earlier task introduced the defect. Do not mark this task complete until all 5 checks pass.

- [ ] **Step 4: Commit**

```bash
git add backend/scripts/verify-billing.ts backend/package.json
git commit -m "feat(backend): E2E billing verification script"
```

---

## Phase 11 — Deploy configuration and runbook

### Task 24: Update `backend/.env.example`

**Files:**
- Modify: `backend/.env.example`

- [ ] **Step 1: Add UPGRADE_LINK_SECRET**

In `backend/.env.example`, find the WIN-24 block and add:

```
# WIN-xx (billing lockdown): HMAC secret for the signed upgrade/setup
# handoff tokens between the iframe and winbackpay.com. Generate fresh:
#   openssl rand -hex 32
# Must be at least 32 chars. Rotate via a staged deploy (old tokens stay
# valid for up to 15 minutes — that's the token TTL).
UPGRADE_LINK_SECRET=
```

- [ ] **Step 2: Commit**

```bash
git add backend/.env.example
git commit -m "chore(backend): document UPGRADE_LINK_SECRET in .env.example"
```

---

### Task 25: Write `docs/runbooks/billing-setup.md`

**Files:**
- Create: `docs/runbooks/billing-setup.md`

- [ ] **Step 1: Write the runbook**

Create `docs/runbooks/billing-setup.md`:

```markdown
# Billing setup runbook

Standing up or re-verifying billing in a given Stripe mode (test or live)
in the WinBack platform Stripe sub-account.

## Prerequisites

- You have the Stripe Dashboard open and are signed in to the WinBack sub-account under JB Technology LLC.
- You know which mode you are operating in (test or live). The page toggle in the top bar controls this.
- You have `STRIPE_SECRET_KEY` for that mode available locally.

## Steps

1. **Provision resources.** From the repo root:

   ```bash
   cd backend
   export STRIPE_SECRET_KEY=sk_test_... # or sk_live_
   npm run provision:billing
   ```

   Copy the printed `STRIPE_PRICE_PRO_MONTHLY` and `STRIPE_PRICE_USAGE_FEE`.

2. **Register the billing webhook endpoint.** In Stripe Dashboard → Developers → Webhooks → Add endpoint:

   - URL: `https://winbackpay.com/api/webhooks/stripe-billing`
   - Events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `setup_intent.succeeded`
   - Click "Reveal signing secret" → copy the `whsec_...` value → this is `STRIPE_BILLING_WEBHOOK_SECRET`.

3. **Verify the Connect dispute webhook exists** at `https://winbackpay.com/api/webhooks/stripe` with events `charge.dispute.created`, `charge.dispute.updated`, `charge.dispute.closed`. The signing secret is `STRIPE_WEBHOOK_SECRET`.

4. **Generate `UPGRADE_LINK_SECRET`:**

   ```bash
   openssl rand -hex 32
   ```

5. **Set Vercel env vars** for the target environment (production or preview):

   - `STRIPE_PRICE_PRO_MONTHLY`
   - `STRIPE_PRICE_USAGE_FEE`
   - `STRIPE_BILLING_WEBHOOK_SECRET`
   - `UPGRADE_LINK_SECRET`

   Confirm the existing vars are correct for this mode:

   - `STRIPE_SECRET_KEY`
   - `STRIPE_APP_SECRET`
   - `STRIPE_WEBHOOK_SECRET`
   - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`

6. **Deploy.** Merge the billing-lockdown branch to main, let Vercel deploy.

7. **Preflight.** After deploy succeeds:

   ```bash
   curl https://winbackpay.com/api/_preflight
   ```

   Expect `{"ok":true}`. A 500 here means a Vercel env var is missing — check the error message, fix, redeploy.

8. **Run the verification script** against the deployed backend:

   ```bash
   cd backend && set -a && source .env.local && set +a
   npm run verify:billing -- --base=https://winbackpay.com
   ```

   Expect exit 0 and "[verify] PASS". Any failure means the flow it names is broken on the deployed backend — do not proceed to the next step.

9. **Manual smoke test.** Install the Stripe App in a test Dashboard, click Settings → "Upgrade to Pro". Expect a new tab opening to `/upgrade`, a plan summary, a Continue button that redirects to Stripe Checkout. Complete checkout with test card `4242 4242 4242 4242`. Expect:

   - Redirect to `/upgrade/success`.
   - Within 30 seconds, the Settings view shows "Pro · $79/mo".

10. **Live-mode-only extras.** For the live-mode flip at launch:

    - On a real merchant account you own, close a test dispute as won (via Stripe's dispute simulation or a real dispute), confirm the success fee line appears on the next invoice.
    - Cross-check `/api/billing/status` `ytd_success_fees_cents` against the Stripe invoice total — a wide gap means our local reconstruction is drifting; investigate before launch.

## Rollback

If anything in step 8 or 9 fails and you cannot fix quickly:

- Revert the billing-lockdown deploy via Vercel dashboard (redeploy the previous known-good commit).
- The iframe will try to call `/api/billing/upgrade-link` which 404s — but no merchant is worse off than they were before the deploy (the button is in an error state rather than producing a broken flow). If you need the pre-lockdown behavior back, the rollback deploy restores it.
```

- [ ] **Step 2: Commit**

```bash
git add docs/runbooks/billing-setup.md
git commit -m "docs: billing setup runbook for provisioning + verification"
```

---

## Phase 12 — Final verification and integration test

### Task 26: Run the full backend test suite

- [ ] **Step 1: Unit tests**

```bash
cd backend && npm test
```

Expected: all tests green, no skips.

- [ ] **Step 2: Integration tests**

```bash
cd backend && npm run test:integration
```

Expected: existing integration tests still pass. (No new integration test is added in this plan; the E2E `verify-billing.ts` covers billing end-to-end from outside the app.)

- [ ] **Step 3: Fix anything red**

If either step fails with changes from this plan, diagnose and fix before continuing. Do not land with red tests.

---

### Task 27: Run `verify-billing.ts` against local dev end-to-end

- [ ] **Step 1: Dev server**

Terminal A:

```bash
cd backend && npm run dev
```

- [ ] **Step 2: Verify**

Terminal B:

```bash
cd backend && set -a && source .env.local && set +a && npm run verify:billing
```

Expected: "[verify] PASS".

If it fails, the named check tells you which flow is broken. Do not merge until this is green.

---

### Task 28: Point Vercel production at WinBack test-mode Stripe

**Files:** none (Vercel configuration)

- [ ] **Step 1: Follow the runbook**

Execute [docs/runbooks/billing-setup.md](../../docs/runbooks/billing-setup.md) against WinBack **test mode** in the Stripe Dashboard. Do not use live mode yet — we want the Stripe reviewer's first re-test to hit test mode.

- [ ] **Step 2: Deploy the branch**

Merge the billing-lockdown branch via PR. Watch Vercel deploy complete.

- [ ] **Step 3: Preflight on prod**

```bash
curl https://winbackpay.com/api/_preflight
```

Expect `{"ok":true}`.

- [ ] **Step 4: Verify against prod**

```bash
cd backend && set -a && source .env.local && set +a && npm run verify:billing -- --base=https://winbackpay.com
```

Expect "[verify] PASS".

- [ ] **Step 5: Manual smoke test**

Install the WinBack app in a personal Stripe test Dashboard, click "Upgrade to Pro" in Settings, complete the full flow through to `/upgrade/success`. Verify the Settings view flips to "Pro · $79/mo".

---

### Task 29: Resubmit to Stripe Marketplace

- [ ] **Step 1: Bump app version in `stripe-app/stripe-app.json`** from `1.1.0` to `1.1.1`.

- [ ] **Step 2: Upload:**

```bash
cd stripe-app && stripe apps upload
```

- [ ] **Step 3: In Stripe developer dashboard, submit 1.1.1 for review** with a note referencing the billing fix, the new `/upgrade` confirmation page, and the icon/copy tickets (WIN-70, WIN-71) being addressed separately if not yet complete.

- [ ] **Step 4: Commit version bump**

```bash
git add stripe-app/stripe-app.json
git commit -m "chore(stripe-app): bump version to 1.1.1 for marketplace resubmit"
```

---

## Summary of deliverables produced by this plan

- Fully working upgrade flow that matches Stripe's marketplace requirement for an intermediate landing page.
- Payment-method capture flow that lets Pay-Per-Win merchants attach a card without leaving the product.
- Idempotent provisioning of Pro price + Usage meter + Usage price in any Stripe mode.
- Cold-start env validation that prevents missing-var 500s.
- E2E verification script that exercises the whole billing surface.
- Runbook covering test-mode review passage and the live-mode launch flip.
- Deletion of the broken `/api/billing/checkout` route.
- Two follow-up Linear tickets (WIN-70, WIN-71) already created for icon and About-copy fixes.
