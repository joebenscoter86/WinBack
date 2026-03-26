# WIN-10: Stripe API Client & Backend Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace mock dispute data with real Stripe API calls so the frontend displays actual merchant disputes.

**Architecture:** Backend Stripe client wraps the `stripe` Node SDK, scoping every call to the merchant's account via `stripeAccount`. Three POST API routes (list, detail, PI lookup) sit behind `withStripeAuth`. A fire-and-forget merchant upsert runs on each request. Frontend views swap mock imports for `fetchBackend` calls.

**Tech Stack:** Stripe Node SDK (`stripe@^20`), Next.js 16 App Router, Supabase (service_role), Vitest

---

## File Structure

| File | Responsibility |
|---|---|
| `backend/lib/stripe/client.ts` | **New** -- Stripe SDK wrapper with account-scoped methods |
| `backend/lib/stripe/errors.ts` | **New** -- Classify Stripe errors into HTTP codes |
| `backend/lib/stripe/normalize.ts` | **New** -- Convert `Stripe.Dispute` to WinBack `Dispute` type |
| `backend/lib/stripe/index.ts` | **New** -- Barrel export |
| `backend/lib/merchants.ts` | **New** -- `ensureMerchant` fire-and-forget upsert |
| `backend/app/api/disputes/route.ts` | **New** -- `POST /api/disputes` list handler |
| `backend/app/api/disputes/[disputeId]/route.ts` | **New** -- `POST /api/disputes/:id` detail handler |
| `backend/app/api/disputes/by-payment-intent/[piId]/route.ts` | **New** -- `POST /api/disputes/by-payment-intent/:piId` |
| `backend/lib/stripe/__tests__/errors.test.ts` | **New** -- Error classification tests |
| `backend/lib/stripe/__tests__/normalize.test.ts` | **New** -- Normalization tests |
| `backend/lib/__tests__/merchants.test.ts` | **New** -- Merchant upsert tests |
| `backend/app/api/disputes/__tests__/route.test.ts` | **New** -- List route tests |
| `stripe-app/src/lib/types.ts` | **Edit** -- Expand `Dispute` interface with new fields |
| `stripe-app/src/views/DisputeListView.tsx` | **Edit** -- Replace mock data with API calls |
| `stripe-app/src/views/PaymentDisputeView.tsx` | **Edit** -- Replace mock data with API calls |

---

### Task 1: Stripe Error Classification

**Files:**
- Create: `backend/lib/stripe/errors.ts`
- Test: `backend/lib/stripe/__tests__/errors.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// backend/lib/stripe/__tests__/errors.test.ts
import { describe, it, expect } from "vitest";
import Stripe from "stripe";
import { classifyStripeError } from "../errors";

describe("classifyStripeError", () => {
  it("should return 429 for rate limit errors", () => {
    const err = new Stripe.errors.StripeRateLimitError({
      message: "Too many requests",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "rate_limit",
      status: 429,
      message: "Too many requests",
    });
  });

  it("should return 404 for resource_missing errors", () => {
    const err = new Stripe.errors.StripeInvalidRequestError({
      message: "No such dispute",
      type: "invalid_request_error",
    });
    err.code = "resource_missing";
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "not_found",
      status: 404,
      message: "No such dispute",
    });
  });

  it("should return 400 for other invalid request errors", () => {
    const err = new Stripe.errors.StripeInvalidRequestError({
      message: "Invalid param",
      type: "invalid_request_error",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "invalid_request",
      status: 400,
      message: "Invalid param",
    });
  });

  it("should return 403 for auth errors", () => {
    const err = new Stripe.errors.StripeAuthenticationError({
      message: "Invalid API Key",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "auth_error",
      status: 403,
      message: "Invalid API Key",
    });
  });

  it("should return 502 for unknown Stripe errors", () => {
    const err = new Stripe.errors.StripeAPIError({
      message: "Internal error",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "stripe_error",
      status: 502,
      message: "Internal error",
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd backend && npx vitest run lib/stripe/__tests__/errors.test.ts`
Expected: FAIL -- module `../errors` not found

- [ ] **Step 3: Implement error classification**

```typescript
// backend/lib/stripe/errors.ts
import Stripe from "stripe";

export interface ClassifiedError {
  code: string;
  status: number;
  message: string;
}

export function classifyStripeError(err: Stripe.errors.StripeError): ClassifiedError {
  if (err instanceof Stripe.errors.StripeRateLimitError) {
    return { code: "rate_limit", status: 429, message: err.message };
  }

  if (err instanceof Stripe.errors.StripeInvalidRequestError) {
    if (err.code === "resource_missing") {
      return { code: "not_found", status: 404, message: err.message };
    }
    return { code: "invalid_request", status: 400, message: err.message };
  }

  if (err instanceof Stripe.errors.StripeAuthenticationError) {
    return { code: "auth_error", status: 403, message: err.message };
  }

  return { code: "stripe_error", status: 502, message: err.message };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd backend && npx vitest run lib/stripe/__tests__/errors.test.ts`
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/stripe/errors.ts backend/lib/stripe/__tests__/errors.test.ts
git commit -m "feat(backend): add Stripe error classification (WIN-10)"
```

---

### Task 2: Dispute Normalization

**Files:**
- Create: `backend/lib/stripe/normalize.ts`
- Test: `backend/lib/stripe/__tests__/normalize.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// backend/lib/stripe/__tests__/normalize.test.ts
import { describe, it, expect } from "vitest";
import type Stripe from "stripe";
import { normalizeDispute } from "../normalize";

const makeStripeDispute = (overrides?: Partial<Stripe.Dispute>): Stripe.Dispute =>
  ({
    id: "dp_test_123",
    object: "dispute",
    amount: 14900,
    currency: "usd",
    reason: "product_not_received",
    status: "needs_response",
    network_reason_code: "13.1",
    payment_intent: "pi_test_456",
    created: 1711324800,
    charge: {
      id: "ch_test_789",
      object: "charge",
      payment_method_details: {
        card: { network: "visa" },
      },
      customer: {
        id: "cus_test_abc",
        name: "Jane Doe",
        email: "jane@example.com",
      },
    },
    evidence_details: {
      due_by: 1712188800,
    },
    ...overrides,
  }) as unknown as Stripe.Dispute;

describe("normalizeDispute", () => {
  it("should normalize a full Stripe dispute into WinBack format", () => {
    const result = normalizeDispute(makeStripeDispute());

    expect(result).toEqual({
      id: "dp_test_123",
      amount: 14900,
      currency: "usd",
      reason: "product_not_received",
      status: "needs_response",
      due_by: "2026-04-04",
      reason_code: "13.1",
      network: "visa",
      payment_intent: "pi_test_456",
      charge_id: "ch_test_789",
      customer_name: "Jane Doe",
      customer_email: "jane@example.com",
      created: 1711324800,
      evidence_due_by: 1712188800,
    });
  });

  it("should handle missing customer gracefully", () => {
    const dispute = makeStripeDispute({
      charge: {
        id: "ch_test_789",
        object: "charge",
        payment_method_details: {
          card: { network: "mastercard" },
        },
        customer: null,
      } as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.customer_name).toBeUndefined();
    expect(result.customer_email).toBeUndefined();
    expect(result.network).toBe("mastercard");
  });

  it("should handle charge as string (unexpanded)", () => {
    const dispute = makeStripeDispute({
      charge: "ch_test_789" as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.charge_id).toBe("ch_test_789");
    expect(result.network).toBe("unknown");
    expect(result.customer_name).toBeUndefined();
  });

  it("should handle null evidence_details.due_by", () => {
    const dispute = makeStripeDispute({
      evidence_details: { due_by: null } as unknown as Stripe.Dispute.EvidenceDetails,
    });
    const result = normalizeDispute(dispute);

    expect(result.due_by).toBe("");
    expect(result.evidence_due_by).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd backend && npx vitest run lib/stripe/__tests__/normalize.test.ts`
Expected: FAIL -- module `../normalize` not found

- [ ] **Step 3: Implement normalization**

```typescript
// backend/lib/stripe/normalize.ts
import type Stripe from "stripe";

export interface WinBackDispute {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  status: string;
  due_by: string;
  reason_code: string;
  network: string;
  payment_intent?: string;
  charge_id: string;
  customer_name?: string;
  customer_email?: string;
  created: number;
  evidence_due_by: number;
}

export function normalizeDispute(d: Stripe.Dispute): WinBackDispute {
  const charge = typeof d.charge === "string" ? null : d.charge;
  const chargeId = typeof d.charge === "string" ? d.charge : d.charge?.id ?? "";
  const customer =
    charge && typeof charge.customer === "object" && charge.customer !== null
      ? charge.customer
      : null;
  const network =
    (charge?.payment_method_details as { card?: { network?: string } })?.card
      ?.network ?? "unknown";

  const dueBySec = d.evidence_details?.due_by ?? 0;
  const dueByDate = dueBySec
    ? new Date(dueBySec * 1000).toISOString().split("T")[0]
    : "";

  return {
    id: d.id,
    amount: d.amount,
    currency: d.currency,
    reason: d.reason,
    status: d.status,
    due_by: dueByDate,
    reason_code: d.network_reason_code ?? "",
    network,
    payment_intent:
      typeof d.payment_intent === "string"
        ? d.payment_intent
        : d.payment_intent?.id,
    charge_id: chargeId,
    customer_name: (customer as { name?: string })?.name ?? undefined,
    customer_email: (customer as { email?: string })?.email ?? undefined,
    created: d.created,
    evidence_due_by: dueBySec,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd backend && npx vitest run lib/stripe/__tests__/normalize.test.ts`
Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/stripe/normalize.ts backend/lib/stripe/__tests__/normalize.test.ts
git commit -m "feat(backend): add Stripe dispute normalization (WIN-10)"
```

---

### Task 3: Stripe API Client

**Files:**
- Create: `backend/lib/stripe/client.ts`
- Create: `backend/lib/stripe/index.ts`

- [ ] **Step 1: Write the Stripe client**

```typescript
// backend/lib/stripe/client.ts
import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("Missing STRIPE_SECRET_KEY");
    }
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export async function listDisputes(
  accountId: string,
  params?: Stripe.DisputeListParams,
): Promise<Stripe.Dispute[]> {
  const resp = await getStripe().disputes.list(
    { limit: 100, ...params },
    { stripeAccount: accountId },
  );
  return resp.data;
}

export async function getDispute(
  accountId: string,
  disputeId: string,
  expand?: string[],
): Promise<Stripe.Dispute> {
  return getStripe().disputes.retrieve(
    disputeId,
    { expand },
    { stripeAccount: accountId },
  );
}

export async function getCharge(
  accountId: string,
  chargeId: string,
): Promise<Stripe.Charge> {
  return getStripe().charges.retrieve(chargeId, {
    stripeAccount: accountId,
  });
}

export async function getCustomer(
  accountId: string,
  customerId: string,
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return getStripe().customers.retrieve(customerId, {
    stripeAccount: accountId,
  });
}

export async function getPaymentIntent(
  accountId: string,
  piId: string,
): Promise<Stripe.PaymentIntent> {
  return getStripe().paymentIntents.retrieve(piId, {
    stripeAccount: accountId,
  });
}
```

- [ ] **Step 2: Write the barrel export**

```typescript
// backend/lib/stripe/index.ts
export {
  listDisputes,
  getDispute,
  getCharge,
  getCustomer,
  getPaymentIntent,
} from "./client";
export { classifyStripeError } from "./errors";
export { normalizeDispute } from "./normalize";
export type { ClassifiedError } from "./errors";
export type { WinBackDispute } from "./normalize";
```

- [ ] **Step 3: Commit**

```bash
git add backend/lib/stripe/client.ts backend/lib/stripe/index.ts
git commit -m "feat(backend): add Stripe API client with account-scoped methods (WIN-10)"
```

---

### Task 4: Merchant Upsert Helper

**Files:**
- Create: `backend/lib/merchants.ts`
- Test: `backend/lib/__tests__/merchants.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// backend/lib/__tests__/merchants.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockUpsert = vi.fn().mockResolvedValue({ error: null });
const mockFrom = vi.fn().mockReturnValue({ upsert: mockUpsert });

vi.mock("@/lib/supabase", () => ({
  supabase: { from: mockFrom },
}));

import { ensureMerchant } from "../merchants";

describe("ensureMerchant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should upsert merchant with stripe_account_id as conflict key", async () => {
    await ensureMerchant("acct_123", "usr_456");

    expect(mockFrom).toHaveBeenCalledWith("merchants");
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        stripe_account_id: "acct_123",
        stripe_user_id: "usr_456",
      }),
      { onConflict: "stripe_account_id" },
    );
  });

  it("should include last_seen_at timestamp", async () => {
    await ensureMerchant("acct_123", "usr_456");

    const upsertArg = mockUpsert.mock.calls[0][0];
    expect(upsertArg.last_seen_at).toBeDefined();
    // Should be a recent ISO string
    const ts = new Date(upsertArg.last_seen_at).getTime();
    expect(Date.now() - ts).toBeLessThan(5000);
  });

  it("should not throw on upsert error", async () => {
    mockUpsert.mockResolvedValueOnce({ error: { message: "db down" } });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(ensureMerchant("acct_123", "usr_456")).resolves.not.toThrow();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd backend && npx vitest run lib/__tests__/merchants.test.ts`
Expected: FAIL -- module `../merchants` not found

- [ ] **Step 3: Implement ensureMerchant**

```typescript
// backend/lib/merchants.ts
import { supabase } from "@/lib/supabase";

export async function ensureMerchant(
  accountId: string,
  userId: string,
): Promise<void> {
  try {
    const { error } = await supabase.from("merchants").upsert(
      {
        stripe_account_id: accountId,
        stripe_user_id: userId,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "stripe_account_id" },
    );

    if (error) {
      console.error("ensureMerchant upsert failed:", error.message);
    }
  } catch (err) {
    console.error("ensureMerchant unexpected error:", err);
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd backend && npx vitest run lib/__tests__/merchants.test.ts`
Expected: All 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/merchants.ts backend/lib/__tests__/merchants.test.ts
git commit -m "feat(backend): add fire-and-forget merchant upsert (WIN-10)"
```

---

### Task 5: List Disputes Route

**Files:**
- Create: `backend/app/api/disputes/route.ts`
- Test: `backend/app/api/disputes/__tests__/route.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// backend/app/api/disputes/__tests__/route.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const TEST_APP_SECRET = "absec_test_secret_for_disputes_test";

process.env.STRIPE_APP_SECRET = TEST_APP_SECRET;
process.env.STRIPE_SECRET_KEY = "sk_test_fake";

const stripe = new Stripe("sk_test_fake");

// Mock the stripe client module
const mockListDisputes = vi.fn();
vi.mock("@/lib/stripe", () => ({
  listDisputes: (...args: unknown[]) => mockListDisputes(...args),
  normalizeDispute: (await import("@/lib/stripe/normalize")).normalizeDispute,
  classifyStripeError: (await import("@/lib/stripe/errors")).classifyStripeError,
}));

// Mock ensureMerchant
vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn().mockResolvedValue(undefined),
}));

import { POST } from "../route";

function makeSignedRequest(body: Record<string, unknown>): NextRequest {
  const bodyStr = JSON.stringify(body);
  const sig = stripe.webhooks.generateTestHeaderString({
    payload: bodyStr,
    secret: TEST_APP_SECRET,
  });
  return new NextRequest("http://localhost:3000/api/disputes", {
    method: "POST",
    body: bodyStr,
    headers: {
      "content-type": "application/json",
      "stripe-signature": sig,
    },
  });
}

describe("POST /api/disputes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return normalized disputes on success", async () => {
    mockListDisputes.mockResolvedValue([
      {
        id: "dp_test_1",
        amount: 14900,
        currency: "usd",
        reason: "product_not_received",
        status: "needs_response",
        network_reason_code: "13.1",
        payment_intent: "pi_test_1",
        created: 1711324800,
        charge: {
          id: "ch_test_1",
          payment_method_details: { card: { network: "visa" } },
          customer: { name: "Jane", email: "jane@test.com" },
        },
        evidence_details: { due_by: 1712188800 },
      },
    ]);

    const request = makeSignedRequest({
      user_id: "usr_123",
      account_id: "acct_456",
    });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe("dp_test_1");
    expect(json.data[0].network).toBe("visa");
    expect(json.data[0].customer_name).toBe("Jane");
  });

  it("should return 401 without signature", async () => {
    const request = new NextRequest("http://localhost:3000/api/disputes", {
      method: "POST",
      body: JSON.stringify({ user_id: "usr_123", account_id: "acct_456" }),
      headers: { "content-type": "application/json" },
    });
    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run app/api/disputes/__tests__/route.test.ts`
Expected: FAIL -- module `../route` not found

- [ ] **Step 3: Implement the route**

```typescript
// backend/app/api/disputes/route.ts
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;

  // Fire-and-forget merchant upsert
  ensureMerchant(accountId, userId);

  try {
    const disputes = await listDisputes(accountId, {
      limit: 100,
      expand: ["data.charge.customer"],
    });

    const normalized = disputes.map(normalizeDispute);

    return NextResponse.json({ data: normalized });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error listing disputes:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd backend && npx vitest run app/api/disputes/__tests__/route.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/disputes/route.ts backend/app/api/disputes/__tests__/route.test.ts
git commit -m "feat(backend): add POST /api/disputes list route (WIN-10)"
```

---

### Task 6: Dispute Detail Route

**Files:**
- Create: `backend/app/api/disputes/[disputeId]/route.ts`

- [ ] **Step 1: Implement the route**

```typescript
// backend/app/api/disputes/[disputeId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getDispute, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const disputeId = request.nextUrl.pathname.split("/").at(-1);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  try {
    const dispute = await getDispute(accountId, disputeId, [
      "charge.customer",
    ]);
    const normalized = normalizeDispute(dispute);

    return NextResponse.json({ data: normalized });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error fetching dispute:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add backend/app/api/disputes/\[disputeId\]/route.ts
git commit -m "feat(backend): add POST /api/disputes/:id detail route (WIN-10)"
```

---

### Task 7: By-Payment-Intent Lookup Route

**Files:**
- Create: `backend/app/api/disputes/by-payment-intent/[piId]/route.ts`

- [ ] **Step 1: Implement the route**

```typescript
// backend/app/api/disputes/by-payment-intent/[piId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const piId = request.nextUrl.pathname.split("/").at(-1);

  if (!piId) {
    return NextResponse.json(
      { error: "Missing payment intent ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  try {
    const disputes = await listDisputes(accountId, {
      payment_intent: piId,
      limit: 1,
      expand: ["data.charge.customer"],
    });

    if (disputes.length === 0) {
      return NextResponse.json(
        { error: "No dispute found for this payment", code: "not_found" },
        { status: 404 },
      );
    }

    const normalized = normalizeDispute(disputes[0]);
    return NextResponse.json({ data: normalized });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error looking up dispute by PI:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add backend/app/api/disputes/by-payment-intent/\[piId\]/route.ts
git commit -m "feat(backend): add POST /api/disputes/by-payment-intent/:piId route (WIN-10)"
```

---

### Task 8: Update Frontend Types

**Files:**
- Modify: `stripe-app/src/lib/types.ts`

- [ ] **Step 1: Expand the Dispute interface**

Replace the contents of `stripe-app/src/lib/types.ts`:

```typescript
export type DisputeStatus =
  | 'needs_response'
  | 'under_review'
  | 'won'
  | 'lost'
  | 'warning_needs_response'
  | 'warning_under_review'
  | 'warning_closed'
  | 'charge_refunded';

export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export type WizardStep = 'review' | 'evidence' | 'narrative' | 'submit';

export const WIZARD_STEPS: WizardStep[] = ['review', 'evidence', 'narrative', 'submit'];

export const WIZARD_STEP_LABELS: Record<WizardStep, string> = {
  review: 'Review',
  evidence: 'Evidence',
  narrative: 'Narrative',
  submit: 'Submit',
};

export interface Dispute {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  status: DisputeStatus;
  due_by: string;
  reason_code: string;
  network: CardNetwork;
  payment_intent?: string;
  charge_id: string;
  customer_name?: string;
  customer_email?: string;
  created: number;
  evidence_due_by: number;
}
```

- [ ] **Step 2: Verify the stripe-app still compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: Compile errors in `mockData.ts` (missing new required fields). This is expected and will be addressed in the next task.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/types.ts
git commit -m "feat(stripe-app): expand Dispute type with real Stripe fields (WIN-10)"
```

---

### Task 9: Wire DisputeListView to Real API

**Files:**
- Modify: `stripe-app/src/views/DisputeListView.tsx`

- [ ] **Step 1: Replace mock data with API calls**

Replace the contents of `stripe-app/src/views/DisputeListView.tsx`:

```typescript
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  ContextView,
  Inline,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Banner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeCard from '../components/DisputeCard';
import DisputeWorkflow from '../components/DisputeWorkflow';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';
import { fetchBackend, ApiError } from '../lib/apiClient';
import type { Dispute } from '../lib/types';

type ViewState = 'loading' | 'error' | 'ready';

const DisputeListView = ({ environment, userContext }: ExtensionContextValue) => {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const loadDisputes = useCallback(async () => {
    setViewState('loading');
    try {
      const result = await fetchBackend<{ data: Dispute[] }>('/api/disputes', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      setDisputes(result.data);
      setViewState('ready');
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to load disputes. Please try again.';
      setErrorMessage(message);
      setViewState('error');
    }
  }, []);

  useEffect(() => {
    loadDisputes();
  }, [loadDisputes]);

  const handleSelectDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowWorkflow(true);
  };

  const handleCloseWorkflow = (shown: boolean) => {
    setShowWorkflow(shown);
    if (!shown) setSelectedDisputeId(null);
  };

  // Sort disputes by deadline (soonest first)
  const sortedDisputes = [...disputes].sort(
    (a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime(),
  );

  const activeDisputes = sortedDisputes.filter(
    (d) => d.status === 'needs_response' || d.status === 'warning_needs_response',
  );

  return (
    <ContextView title="WinBack" description="Guided dispute resolution">
      {viewState === 'loading' && (
        <Box
          css={{
            padding: 'xlarge',
            alignX: 'center',
            alignY: 'center',
          }}
        >
          <Spinner size="large" />
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Loading disputes...
          </Inline>
        </Box>
      )}

      {viewState === 'error' && (
        <ErrorBanner message={errorMessage} />
      )}

      {viewState === 'ready' && (
        <Tabs fitted size="medium">
          <TabList>
            <Tab id="disputes">Disputes</Tab>
            <Tab id="insights">Insights</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="disputes">
              <Box css={{ padding: 'small', stack: 'y', gap: 'small' }}>
                {activeDisputes.length === 0 ? (
                  <EmptyState
                    title="No active disputes"
                    description="No disputes need your response right now. That's a good thing!"
                  />
                ) : (
                  <>
                    <Box css={{ paddingTop: 'small', paddingBottom: 'small' }}>
                      <Inline css={{ font: 'caption', color: 'secondary' }}>
                        {activeDisputes.length} dispute{activeDisputes.length !== 1 ? 's' : ''} need{activeDisputes.length === 1 ? 's' : ''} response
                      </Inline>
                    </Box>
                    {activeDisputes.map((dispute) => (
                      <DisputeCard
                        key={dispute.id}
                        dispute={dispute}
                        onSelect={handleSelectDispute}
                      />
                    ))}
                  </>
                )}
              </Box>
            </TabPanel>
            <TabPanel id="insights">
              <Box css={{ padding: 'medium' }}>
                <Banner
                  type="default"
                  title="Insights"
                  description="Win rate analytics and dispute patterns will appear here."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Coming in WIN-22 and WIN-23.
                </Inline>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {selectedDisputeId && (
        <DisputeWorkflow
          disputeId={selectedDisputeId}
          shown={showWorkflow}
          setShown={handleCloseWorkflow}
        />
      )}
    </ContextView>
  );
};

export default DisputeListView;
```

- [ ] **Step 2: Commit**

```bash
git add stripe-app/src/views/DisputeListView.tsx
git commit -m "feat(stripe-app): wire DisputeListView to real API (WIN-10)"
```

---

### Task 10: Wire PaymentDisputeView to Real API

**Files:**
- Modify: `stripe-app/src/views/PaymentDisputeView.tsx`

- [ ] **Step 1: Replace mock data with API call**

Replace the contents of `stripe-app/src/views/PaymentDisputeView.tsx`:

```typescript
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Badge,
  Button,
  ContextView,
  Inline,
  Spinner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeWorkflow from '../components/DisputeWorkflow';
import { fetchBackend, ApiError } from '../lib/apiClient';
import type { Dispute } from '../lib/types';

function getStatusBadge(status: string): {
  label: string;
  type: 'urgent' | 'warning' | 'positive' | 'negative' | 'info';
} {
  switch (status) {
    case 'needs_response':
    case 'warning_needs_response':
      return { label: 'Needs Response', type: 'urgent' };
    case 'under_review':
    case 'warning_under_review':
      return { label: 'Under Review', type: 'info' };
    case 'won':
      return { label: 'Won', type: 'positive' };
    case 'lost':
    case 'warning_closed':
      return { label: 'Lost', type: 'negative' };
    default:
      return { label: status, type: 'info' };
  }
}

type ViewState = 'loading' | 'no_dispute' | 'error' | 'ready';

const PaymentDisputeView = ({ environment }: ExtensionContextValue) => {
  const paymentIntentId = environment?.objectContext?.id;

  const [viewState, setViewState] = useState<ViewState>('loading');
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const loadDispute = useCallback(async () => {
    if (!paymentIntentId) {
      setViewState('no_dispute');
      return;
    }

    setViewState('loading');
    try {
      const result = await fetchBackend<{ data: Dispute }>(
        `/api/disputes/by-payment-intent/${paymentIntentId}`,
        { method: 'POST', body: JSON.stringify({}) },
      );
      setDispute(result.data);
      setViewState('ready');
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setViewState('no_dispute');
      } else {
        setViewState('error');
      }
    }
  }, [paymentIntentId]);

  useEffect(() => {
    loadDispute();
  }, [loadDispute]);

  if (viewState === 'loading') {
    return (
      <ContextView title="WinBack">
        <Box css={{ padding: 'medium', alignX: 'center' }}>
          <Spinner size="large" />
        </Box>
      </ContextView>
    );
  }

  if (viewState === 'no_dispute' || viewState === 'error' || !dispute) {
    return (
      <ContextView title="WinBack">
        <Box css={{ padding: 'medium', alignX: 'center' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            No dispute on this payment.
          </Inline>
        </Box>
      </ContextView>
    );
  }

  const statusBadge = getStatusBadge(dispute.status);

  return (
    <ContextView title="WinBack">
      <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
        <Box
          css={{
            stack: 'x',
            gap: 'small',
            distribute: 'space-between',
            alignY: 'center',
          }}
        >
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Dispute
          </Inline>
          <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
        </Box>

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'body' }}>
            {dispute.network.charAt(0).toUpperCase() +
              dispute.network.slice(1)}{' '}
            {dispute.reason_code}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {dispute.reason.replace(/_/g, ' ')}
          </Inline>
        </Box>

        {(dispute.status === 'needs_response' ||
          dispute.status === 'warning_needs_response') && (
          <Button
            type="primary"
            css={{ width: 'fill' }}
            onPress={() => setShowWorkflow(true)}
          >
            Open in WinBack
          </Button>
        )}
      </Box>

      <DisputeWorkflow
        disputeId={dispute.id}
        shown={showWorkflow}
        setShown={setShowWorkflow}
      />
    </ContextView>
  );
};

export default PaymentDisputeView;
```

- [ ] **Step 2: Remove mock data import dependency**

Delete `stripe-app/src/lib/mockData.ts` or keep it but remove the imports from both views. Since `DisputeCard` and other components don't import it directly, deleting is clean.

Run: `rm stripe-app/src/lib/mockData.ts` (only if no other files import it)

Check first: `grep -r "mockData" stripe-app/src/ --include="*.ts" --include="*.tsx"`

If only the two views imported it (which we've already replaced), delete it.

- [ ] **Step 3: Verify compilation**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors (all views now use API calls, types are compatible)

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/views/PaymentDisputeView.tsx
git rm stripe-app/src/lib/mockData.ts  # if deleted
git commit -m "feat(stripe-app): wire PaymentDisputeView to real API, remove mock data (WIN-10)"
```

---

### Task 11: Run Full Test Suite & Build Verification

- [ ] **Step 1: Run all backend tests**

Run: `cd backend && npx vitest run`
Expected: All tests pass (existing withStripeAuth tests + new tests)

- [ ] **Step 2: Run backend build**

Run: `cd backend && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Run stripe-app type check**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(backend): address test/build issues from WIN-10"
```

Only create this commit if fixes were needed. If everything passed, skip.

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] `cd backend && npx vitest run` -- all tests pass
- [ ] `cd backend && npm run build` -- builds without errors
- [ ] `cd stripe-app && npx tsc --noEmit` -- no type errors
- [ ] All 3 API routes exist: `/api/disputes`, `/api/disputes/[disputeId]`, `/api/disputes/by-payment-intent/[piId]`
- [ ] No mock data imports remain in view files
- [ ] `fetchBackend` calls use `method: 'POST'` (required for signature verification)
