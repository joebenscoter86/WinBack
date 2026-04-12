# WIN-43: Dispute Wizard Integration Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single local-only integration test that walks the full dispute wizard flow against real dev Supabase with mocked external services, catching the class of cross-route sequencing bugs that WIN-19 QA surfaced.

**Architecture:** One Vitest file at `backend/__tests__/integration/dispute-wizard-flow.test.ts` that imports route handlers directly, calls them with `NextRequest` objects, asserts HTTP responses AND dev-Supabase row state at each step. All external dependencies (Stripe, Anthropic, Stripe App auth, `next/server` `after()`) are mocked via `vi.mock()`. Database isolation achieved by operating exclusively under a fake merchant scope (`acct_WIN43_TEST`) and cascade-deleting it on setup + teardown.

**Tech Stack:** Vitest 4.1.1, Next.js 16 `NextRequest`/`NextResponse`, Supabase JS client, Anthropic SDK (mocked), Stripe SDK types (for fixture typing only).

**Reference:** [docs/superpowers/specs/2026-04-12-win-43-integration-test-design.md](../specs/2026-04-12-win-43-integration-test-design.md)

---

## File structure

Files this plan creates or modifies:

- **Modify:** `backend/vitest.config.ts` — exclude `__tests__/integration/**` from default `npm test`
- **Modify:** `backend/package.json` — add `test:integration` script
- **Create:** `backend/vitest.integration.config.ts` — integration-only Vitest config that loads `.env.local`
- **Create:** `backend/__tests__/integration/fixtures.ts` — canned Stripe dispute, Anthropic response, test IDs
- **Create:** `backend/__tests__/integration/mocks.ts` — `vi.mock()` setup for Stripe, Anthropic, auth, `after()`
- **Create:** `backend/__tests__/integration/dispute-wizard-flow.test.ts` — the test itself

Each file has one responsibility: config sets up the runner, fixtures hold data, mocks hold module-replacement logic, the test file contains only the flow walk.

---

## Important context (read before starting)

### Evidence upload is NOT multipart

`POST /api/disputes/{id}/evidence-files` accepts a **JSON body**, not multipart. The Stripe App frontend uploads the actual file bytes directly to Stripe using Stripe's native file upload (which returns a `file_xxx` ID), then posts the resulting metadata to our backend. This means the integration test does NOT need to construct `FormData` — a simple JSON body with a fake `stripe_file_id` is enough.

### Existing test patterns to reuse

Unit tests at `backend/app/api/narratives/__tests__/generate.test.ts` already use `vi.mock('next/server')` and `vi.mock('@/lib/stripe-auth')`. Reference them for the exact mock shapes.

### Status route is `POST /api/narratives/[generationId]/status`

Yes, POST even though it reads — consistent with the rest of the Stripe App backend which uses POST for everything that requires a request body or header for auth.

### Playbooks route is `POST /api/playbooks` with body `{ network, reason_code }`

Not `GET /api/playbooks/visa/10.4`. The spec says "GET" in one place but the real route is POST with JSON body.

### `getPlaybook` reads from Supabase, not the in-memory playbook data files

`backend/lib/playbooks/index.ts` queries the `playbooks` table. The visa-10.4 playbook is already seeded in dev Supabase (confirmed during WIN-19 QA). The test doesn't need to seed anything.

### `narrative_generations_count` is on the `disputes` table

The generation route increments `disputes.narrative_generations_count`, not a column on narrative_generations itself.

---

## Task 1: Scaffold directories, configs, and npm script

**Files:**
- Create: `backend/__tests__/integration/dispute-wizard-flow.test.ts`
- Create: `backend/vitest.integration.config.ts`
- Modify: `backend/vitest.config.ts`
- Modify: `backend/package.json`

- [ ] **Step 1.1: Create the integration test file with a placeholder**

Create `backend/__tests__/integration/dispute-wizard-flow.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("WIN-43: dispute wizard integration flow", () => {
  it("placeholder — replaced in later tasks", () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 1.2: Create the integration Vitest config**

Create `backend/vitest.integration.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

// Load .env.local so the test can talk to real dev Supabase.
// process.loadEnvFile is built into Node 20.12+, no dotenv dependency needed.
process.loadEnvFile(path.resolve(__dirname, ".env.local"));

export default defineConfig({
  test: {
    globals: true,
    include: ["__tests__/integration/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 1.3: Update the default Vitest config to exclude integration tests**

Modify `backend/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "__tests__/integration/**",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 1.4: Add the `test:integration` npm script**

Modify `backend/package.json` scripts section to add one line:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:integration": "vitest run --config vitest.integration.config.ts",
  "seed:playbooks": "tsx supabase/seed-playbooks.ts"
},
```

- [ ] **Step 1.5: Verify the default test suite still works and excludes integration**

Run: `cd backend && npm test 2>&1 | tail -20`

Expected: existing unit tests all pass. The placeholder integration test should NOT appear in the output.

- [ ] **Step 1.6: Verify the integration suite runs the placeholder**

Run: `cd backend && npm run test:integration 2>&1 | tail -20`

Expected: one test passes ("placeholder — replaced in later tasks"). Output shows `Test Files 1 passed` and `Tests 1 passed`.

If `process.loadEnvFile` throws "is not a function", the Node version is < 20.12. Check with `node --version`. If upgrade is needed, stop and surface this to the user. Per `backend/package.json` engines field, the required Node is 20.x which should include 20.12+.

- [ ] **Step 1.7: Commit the scaffold**

```bash
git add backend/vitest.config.ts backend/vitest.integration.config.ts \
        backend/package.json \
        backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): scaffold integration test runner (WIN-43)

Adds a separate Vitest config for integration tests that loads .env.local
via Node's built-in process.loadEnvFile, a new test:integration npm script,
and excludes __tests__/integration from the default npm test suite so
unit-test runs stay fast and hermetic. Placeholder test file in place.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Fixtures

**Files:**
- Create: `backend/__tests__/integration/fixtures.ts`

- [ ] **Step 2.1: Write the fixtures file**

Create `backend/__tests__/integration/fixtures.ts`:

```ts
import type Stripe from "stripe";
import type { NarrativeOutput } from "@/lib/prompts/types";

// Fake identifiers that nothing else in dev uses. All DB cleanup
// filters on TEST_ACCOUNT_ID cascade.
export const TEST_ACCOUNT_ID = "acct_WIN43_TEST";
export const TEST_USER_ID = "usr_WIN43_TEST";
export const TEST_DISPUTE_ID = "du_WIN43_TEST";
export const TEST_CHARGE_ID = "ch_WIN43_TEST";

// The checklist item key we upload evidence under. Chosen to exactly
// match a real visa-10.4 playbook item so NarrativePreGeneration's
// filesByKey.get(item.item) lookup would find it in a real UI render.
export const TEST_CHECKLIST_ITEM_KEY =
  "Delivery confirmation to cardholder's verified billing address";

// Fake Stripe file ID for the evidence upload metadata row.
export const TEST_STRIPE_FILE_ID = "file_WIN43_TEST_abc";

/**
 * Canned Stripe.Dispute object returned by the mocked `getDispute`.
 * Includes full payment_method_details.card.checks, outcome, and
 * three_d_secure data so this fixture is WIN-44-ready: when WIN-44 lands
 * and threads those fields into the narrative prompt, step 9 of the test
 * will be able to assert on their presence without fixture changes.
 */
export const CANNED_STRIPE_DISPUTE = {
  id: TEST_DISPUTE_ID,
  object: "dispute",
  amount: 14900,
  currency: "usd",
  reason: "fraudulent",
  status: "needs_response",
  evidence_due_by: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  network_reason_code: "10.4",
  payment_intent: null,
  charge: {
    id: TEST_CHARGE_ID,
    object: "charge",
    amount: 14900,
    currency: "usd",
    created: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60,
    description: "Test order #WIN43",
    billing_details: {
      address: {
        line1: "123 Test Street",
        city: "Testville",
        state: "CA",
        postal_code: "94000",
        country: "US",
      },
      email: "test@winback-integration.example",
      name: "Test Customer",
    },
    customer: null,
    outcome: {
      network_status: "approved_by_network",
      reason: null,
      risk_level: "normal",
      seller_message: "Payment complete.",
      type: "authorized",
    },
    payment_method_details: {
      card: {
        brand: "visa",
        last4: "4242",
        checks: {
          address_line1_check: "pass",
          address_postal_code_check: "pass",
          cvc_check: "pass",
        },
        three_d_secure: {
          authentication_flow: "challenge",
          result: "authenticated",
          result_reason: null,
          version: "2.2.0",
        },
      },
      type: "card",
    },
    refunds: { data: [] },
  },
} as unknown as Stripe.Dispute;

/**
 * Canned Anthropic messages.create response. The mock returns this
 * structure verbatim; generateNarrative parses it into NarrativeOutput.
 */
export const CANNED_NARRATIVE_OUTPUT: NarrativeOutput = {
  narrative:
    `**Delivery Confirmation**\n` +
    `We have uploaded the delivery confirmation document (see "${TEST_CHECKLIST_ITEM_KEY}") ` +
    `showing the order was delivered to the cardholder's verified billing address.\n\n` +
    `**Summary**\n` +
    `This transaction is legitimate and should not be treated as fraud.`,
  annotations: [
    {
      section: "Delivery Confirmation",
      reasoning:
        "References the uploaded evidence file for the verified billing address delivery.",
    },
  ],
};

/**
 * Wrapped in the shape Anthropic SDK's messages.create returns.
 * generateNarrative reads response.content[0].text and JSON.parses it.
 */
export const CANNED_ANTHROPIC_RESPONSE = {
  id: "msg_WIN43_TEST",
  type: "message",
  role: "assistant",
  model: "claude-sonnet-4-6",
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(CANNED_NARRATIVE_OUTPUT),
    },
  ],
  stop_reason: "end_turn",
  stop_sequence: null,
  usage: { input_tokens: 100, output_tokens: 200 },
};
```

- [ ] **Step 2.2: Type-check the fixtures**

Run: `cd backend && npx tsc --noEmit 2>&1 | grep -E "fixtures\.ts" | head -10`

Expected: no output (no TypeScript errors involving `fixtures.ts`). If Stripe SDK's strict types complain about the `as unknown as Stripe.Dispute` cast, that's the intentional escape hatch — ignore warnings and proceed. If there's a hard error, the fixture shape needs adjustment.

- [ ] **Step 2.3: Commit**

```bash
git add backend/__tests__/integration/fixtures.ts
git commit -m "$(cat <<'EOF'
test(backend): add fixtures for WIN-43 integration test

Canned Stripe.Dispute with full AVS/CVC/3DS/outcome data (WIN-44-ready),
canned Anthropic response parseable by generateNarrative, and fake
identifiers scoped to acct_WIN43_TEST for DB isolation.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Module mocks

**Files:**
- Create: `backend/__tests__/integration/mocks.ts`

- [ ] **Step 3.1: Write the mocks file**

Create `backend/__tests__/integration/mocks.ts`:

```ts
import { vi } from "vitest";
import {
  CANNED_STRIPE_DISPUTE,
  CANNED_ANTHROPIC_RESPONSE,
  TEST_ACCOUNT_ID,
  TEST_USER_ID,
} from "./fixtures";

// Captures every call to anthropic.messages.create so the test can
// inspect what prompt got built. Reset between test runs by importing
// and clearing this array in beforeEach/afterEach if needed.
export const capturedAnthropicCalls: Array<{
  system: string;
  user: string;
  model: string;
}> = [];

// ---- @/lib/stripe ----
// Mock the Stripe client helpers the routes use. getDispute returns the
// canned fixture; normalizeDispute is the real implementation because
// it's a pure function that operates on the already-canned input.
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    getDispute: vi.fn().mockResolvedValue(CANNED_STRIPE_DISPUTE),
    // normalizeDispute, classifyStripeError stay real
  };
});

// ---- @anthropic-ai/sdk ----
// Capture the messages.create args into capturedAnthropicCalls, then
// return the canned response. Using default-export Anthropic class so
// the lazy Proxy in lib/claude.ts picks it up.
vi.mock("@anthropic-ai/sdk", () => {
  const MessagesCreate = vi.fn(async (params: unknown) => {
    const { system, messages, model } = params as {
      system: string;
      messages: Array<{ role: string; content: string }>;
      model: string;
    };
    const userMessage = messages.find((m) => m.role === "user");
    capturedAnthropicCalls.push({
      system: system ?? "",
      user: userMessage?.content ?? "",
      model: model ?? "",
    });
    return CANNED_ANTHROPIC_RESPONSE;
  });

  class MockAnthropic {
    messages = { create: MessagesCreate };
    constructor(_opts?: unknown) {}
  }

  return { default: MockAnthropic };
});

// ---- @/lib/stripe-auth ----
// Bypass signature verification and inject the test identity. Copies
// the exact shape from backend/app/api/narratives/__tests__/generate.test.ts
// so auth behavior is identical to other route unit tests.
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: unknown, ctx: unknown) => unknown) =>
    async (req: Request) => {
      // Safely parse body: route handlers call request.clone().json() or
      // read query params. If body is absent or not JSON, pass empty object.
      let body: unknown = {};
      try {
        body = await (req as Request & { clone: () => Request })
          .clone()
          .json();
      } catch {
        body = {};
      }
      return handler(req, {
        identity: { userId: TEST_USER_ID, accountId: TEST_ACCOUNT_ID },
        body,
      });
    },
  fetchStripeSignature: vi.fn(),
}));

// ---- next/server after() ----
// The narrative generate route calls after(runBackgroundGeneration(...))
// to fire-and-forget the Claude call. In tests we need the background
// work to complete before the HTTP response resolves, so we replace
// after() to await the promise inline.
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    after: (promise: Promise<unknown>) => promise,
  };
});
```

- [ ] **Step 3.2: Type-check the mocks**

Run: `cd backend && npx tsc --noEmit 2>&1 | grep -E "mocks\.ts" | head -10`

Expected: no output.

- [ ] **Step 3.3: Commit**

```bash
git add backend/__tests__/integration/mocks.ts
git commit -m "$(cat <<'EOF'
test(backend): add module mocks for WIN-43 integration test

Mocks @/lib/stripe (getDispute returns fixture), @anthropic-ai/sdk
(captures call args, returns canned response), @/lib/stripe-auth
(bypasses signature, injects test identity), and next/server (replaces
after() with inline await so background narrative generation completes
before the HTTP response resolves).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Setup, teardown, and a real Supabase client for DB assertions

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 4.1: Replace the placeholder with the setup/teardown skeleton**

Replace the entire contents of `backend/__tests__/integration/dispute-wizard-flow.test.ts` with:

```ts
// IMPORTANT: import mocks BEFORE anything else so vi.mock() hoists apply
// to all subsequent imports of the mocked modules.
import "./mocks";

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient } from "@supabase/supabase-js";
import {
  TEST_ACCOUNT_ID,
  TEST_DISPUTE_ID,
} from "./fixtures";

// Real Supabase client — the test asserts on actual dev DB state.
// Uses service role key to bypass RLS for teardown deletes.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "WIN-43 integration test requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.local"
  );
}

const testDb = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function cleanupTestData(): Promise<void> {
  // Delete every merchants row for the test account. Child rows
  // (disputes, evidence_files, narrative_generations) cascade via FK.
  // If a constraint is ON DELETE RESTRICT instead of CASCADE, delete
  // children explicitly here — see Task 4 Step 4.3.
  const { error: merchantError } = await testDb
    .from("merchants")
    .delete()
    .eq("stripe_account_id", TEST_ACCOUNT_ID);
  if (merchantError) {
    throw new Error(
      `cleanupTestData: failed to delete test merchant rows: ${merchantError.message}`
    );
  }
}

describe("WIN-43: dispute wizard integration flow", () => {
  beforeAll(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  it("sanity: test merchant does not exist after setup", async () => {
    const { data, error } = await testDb
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", TEST_ACCOUNT_ID);
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });
});
```

- [ ] **Step 4.2: Run the integration test**

Run: `cd backend && npm run test:integration 2>&1 | tail -30`

Expected: `Tests 1 passed`. The sanity test confirms cleanup runs successfully and the test DB client works.

- [ ] **Step 4.3: If cleanup fails with a foreign key constraint error**

Expected output on success: a clean pass. If instead you see `update or delete on table "merchants" violates foreign key constraint`, at least one child table's FK is `ON DELETE RESTRICT`. In that case, update `cleanupTestData()` to delete children first in dependency order:

```ts
async function cleanupTestData(): Promise<void> {
  // Find the merchant ID (if it exists) so we can scope child deletes.
  const { data: merchants } = await testDb
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", TEST_ACCOUNT_ID);

  const merchantIds = (merchants ?? []).map((m) => m.id as string);

  if (merchantIds.length > 0) {
    // Find disputes under these merchants
    const { data: disputes } = await testDb
      .from("disputes")
      .select("id")
      .in("merchant_id", merchantIds);
    const disputeIds = (disputes ?? []).map((d) => d.id as string);

    if (disputeIds.length > 0) {
      await testDb.from("narrative_generations").delete().in("dispute_id", disputeIds);
      await testDb.from("evidence_files").delete().in("dispute_id", disputeIds);
      await testDb.from("disputes").delete().in("id", disputeIds);
    }
  }

  const { error: merchantError } = await testDb
    .from("merchants")
    .delete()
    .eq("stripe_account_id", TEST_ACCOUNT_ID);
  if (merchantError) {
    throw new Error(
      `cleanupTestData: failed to delete test merchant rows: ${merchantError.message}`
    );
  }
}
```

- [ ] **Step 4.4: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): add setup/teardown with real dev Supabase (WIN-43)

beforeAll/afterAll run cleanupTestData() which deletes every row under
TEST_ACCOUNT_ID. Uses a real Supabase client with service role key for
the teardown deletes. Sanity test verifies the test merchant is absent
after cleanup. Test DB client is separate from the app's supabase export
so assertions read uncached state.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Step 1 — POST /api/disputes/{id} writes real merchant + dispute rows

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

From this task onward, each task adds one step to the single `it(...)` that walks the wizard. Delete the sanity test from Task 4 in this task — it was a bootstrapping aid only.

- [ ] **Step 5.1: Replace the sanity test with the wizard walk scaffold + step 1**

Edit `backend/__tests__/integration/dispute-wizard-flow.test.ts`. Replace the existing `it("sanity: ...")` block with:

```ts
  it("walks the full dispute wizard end-to-end", async () => {
    // ---- STEP 1: POST /api/disputes/{id} ----
    // Hits the dispute detail route, which normalizes the mocked Stripe
    // dispute and upserts a real row in our disputes table. This is
    // the canonical entry point — the wizard opens on the Review tab
    // which calls this route first.
    const { POST: getDisputePOST } = await import(
      "@/app/api/disputes/[disputeId]/route"
    );
    const { NextRequest } = await import("next/server");

    const step1Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
    );
    const step1Res = await getDisputePOST(step1Req);
    expect(step1Res.status).toBe(200);
    const step1Body = await step1Res.json();
    expect(step1Body.data).toBeDefined();
    expect(step1Body.data.id).toBe(TEST_DISPUTE_ID);

    // DB assertions: merchant row exists, dispute row has real values
    const { data: merchantRow } = await testDb
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", TEST_ACCOUNT_ID)
      .single();
    expect(merchantRow).toBeDefined();
    expect(merchantRow?.id).toBeTruthy();

    const { data: disputeRow } = await testDb
      .from("disputes")
      .select("id, merchant_id, amount, reason_code, network")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeRow).toBeDefined();
    expect(disputeRow?.merchant_id).toBe(merchantRow?.id); // NOT null
    expect(disputeRow?.amount).toBe(14900); // NOT zero — WIN-41 regression check
    expect(disputeRow?.reason_code).toBe("10.4"); // NOT empty string
    expect(disputeRow?.network).toBe("visa");
  });
```

Also update the imports at the top of the file: add `TEST_DISPUTE_ID` to the import from `./fixtures` if it's not already there (it is in the Task 4 skeleton).

- [ ] **Step 5.2: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -40`

Expected: `Tests 1 passed`. If the test fails with "Cannot find module @/app/api/disputes/[disputeId]/route", it means the `@` alias isn't resolving routes in the integration config — verify `vitest.integration.config.ts` has the alias (it does per Task 1). If failure is `Cannot read property 'data' of undefined`, check that the mocked `getDispute` is being called (add a `console.log` inside the mock temporarily).

If `disputeRow.reason_code` comes back empty, `normalizeDispute` might be extracting `reason` instead of `network_reason_code` — check `backend/lib/stripe/normalize.ts` and confirm the fixture's `network_reason_code: "10.4"` is the right field name.

- [ ] **Step 5.3: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): step 1 — POST /api/disputes/{id} writes real rows (WIN-43)

Asserts that the dispute detail route upserts a merchants row and a
disputes row with real values (amount != 0, reason_code != ''), with
merchant_id properly linked. Catches the class of bug fixed by 7948325
(GET dispute was a Stripe proxy that never wrote a row) and f5a3984
(ensureMerchant was writing nonexistent columns).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Step 2 — POST /api/playbooks returns the visa-10.4 playbook

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 6.1: Append step 2 to the wizard walk**

Add this block inside the same `it(...)` block, immediately after the step 1 assertions:

```ts
    // ---- STEP 2: POST /api/playbooks ----
    // Fetches the visa-10.4 playbook from Supabase. Already seeded in
    // dev — see WIN-19 QA. Pure read, no DB writes to assert.
    const { POST: playbooksPOST } = await import("@/app/api/playbooks/route");

    const step2Req = new NextRequest("http://localhost/api/playbooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ network: "visa", reason_code: "10.4" }),
    });
    const step2Res = await playbooksPOST(step2Req);
    expect(step2Res.status).toBe(200);
    const step2Body = await step2Res.json();
    expect(step2Body.data).toBeDefined();
    expect(step2Body.data.network).toBe("visa");
    expect(step2Body.data.reason_code).toBe("10.4");
```

- [ ] **Step 6.2: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -30`

Expected: `Tests 1 passed`. If the test fails with "Playbook not found", the visa-10.4 playbook isn't seeded in dev Supabase — run `npm run seed:playbooks` from `backend/` and retry.

- [ ] **Step 6.3: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): step 2 — playbooks route returns visa-10.4 (WIN-43)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Steps 3 and 4 — Evidence list (empty) and upload

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 7.1: Append steps 3 and 4**

Add this block after step 2. Note: the evidence-files POST route takes a JSON body (NOT multipart) — we pass fake `stripe_file_id` metadata.

```ts
    // ---- STEP 3: GET /api/disputes/{id}/evidence-files (empty) ----
    const { GET: evidenceFilesGET, POST: evidenceFilesPOST } = await import(
      "@/app/api/disputes/[disputeId]/evidence-files/route"
    );

    const step3Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}/evidence-files`,
      { method: "GET" },
    );
    const step3Res = await evidenceFilesGET(step3Req);
    expect(step3Res.status).toBe(200);
    const step3Body = await step3Res.json();
    expect(step3Body.data).toEqual([]);

    // ---- STEP 4: POST /api/disputes/{id}/evidence-files (upload metadata) ----
    // Evidence files are uploaded to Stripe client-side; this route only
    // registers the resulting metadata in our DB. No multipart needed.
    const { TEST_CHECKLIST_ITEM_KEY, TEST_STRIPE_FILE_ID } = await import(
      "./fixtures"
    );

    const step4Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}/evidence-files`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checklist_item_key: TEST_CHECKLIST_ITEM_KEY,
          stripe_file_id: TEST_STRIPE_FILE_ID,
          file_name: "delivery-confirmation.pdf",
          file_size: 4321,
          mime_type: "pdf",
        }),
      },
    );
    const step4Res = await evidenceFilesPOST(step4Req);
    expect(step4Res.status).toBe(200);
    const step4Body = await step4Res.json();
    expect(step4Body.data).toBeDefined();

    // DB assertions: evidence_files row exists, linked to the dispute we
    // wrote in step 1 (NOT a zombie dispute with amount: 0).
    const { data: fileRow } = await testDb
      .from("evidence_files")
      .select("id, dispute_id, checklist_item_key, file_name, stripe_file_id")
      .eq("stripe_file_id", TEST_STRIPE_FILE_ID)
      .single();
    expect(fileRow).toBeDefined();
    expect(fileRow?.dispute_id).toBe(disputeRow?.id); // links to step 1's dispute
    expect(fileRow?.checklist_item_key).toBe(TEST_CHECKLIST_ITEM_KEY);
    expect(fileRow?.file_name).toBe("delivery-confirmation.pdf");

    // Regression check for WIN-41: ensure the dispute row still has
    // real values (amount/reason_code were NOT overwritten by the
    // upload route's fallback upsert).
    const { data: disputeRowAfterUpload } = await testDb
      .from("disputes")
      .select("amount, reason_code")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeRowAfterUpload?.amount).toBe(14900);
    expect(disputeRowAfterUpload?.reason_code).toBe("10.4");
```

- [ ] **Step 7.2: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -40`

Expected: `Tests 1 passed`.

- [ ] **Step 7.3: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): steps 3-4 — evidence list + upload metadata (WIN-43)

Asserts evidence_files row links correctly to the step 1 dispute (not a
zombie dispute with zeros) and that the upload does not overwrite the
dispute's amount/reason_code. Regression check for WIN-41 pattern.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Step 5 — PATCH /api/disputes/{id} persists checklist state

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 8.1: Append step 5**

Add this block after step 4:

```ts
    // ---- STEP 5: PATCH /api/disputes/{id} (checklist toggle) ----
    const { PATCH: disputesPATCH } = await import(
      "@/app/api/disputes/[disputeId]/route"
    );

    const step5Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checklist_state: { [TEST_CHECKLIST_ITEM_KEY]: true },
        }),
      },
    );
    const step5Res = await disputesPATCH(step5Req);
    expect(step5Res.status).toBe(200);

    // DB assertion: checklist_state persisted
    const { data: disputeAfterPatch } = await testDb
      .from("disputes")
      .select("checklist_state")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeAfterPatch?.checklist_state).toEqual({
      [TEST_CHECKLIST_ITEM_KEY]: true,
    });
```

- [ ] **Step 8.2: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -40`

Expected: `Tests 1 passed`.

- [ ] **Step 8.3: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): step 5 — checklist PATCH persists state (WIN-43)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Step 6 — POST /api/narratives/generate runs inline and completes

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

This is the task that exercises the `after()` mock. Because `mocks.ts` replaces `after` with `(promise) => promise`, the background generation (including the mocked Anthropic call and DB writes) runs awaited before the HTTP response resolves. Without that mock, this step would race and fail.

- [ ] **Step 9.1: Append step 6**

Add this block after step 5:

```ts
    // ---- STEP 6: POST /api/narratives/generate ----
    // The generate route kicks off runBackgroundGeneration via after().
    // Our next/server mock replaces after() with an inline await, so the
    // background work (Claude call + DB writes) completes before this
    // response resolves. That makes the whole generation cycle observable
    // in DB state immediately after the POST returns.
    const { POST: generatePOST } = await import(
      "@/app/api/narratives/generate/route"
    );

    const step6Req = new NextRequest(
      "http://localhost/api/narratives/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dispute_id: TEST_DISPUTE_ID,
          reason_code: "10.4",
          network: "visa",
          merchant_feedback: "",
        }),
      },
    );
    const step6Res = await generatePOST(step6Req);
    expect(step6Res.status).toBe(202);
    const step6Body = await step6Res.json();
    expect(step6Body.generation_id).toBeTruthy();
    const generationId = step6Body.generation_id as string;

    // DB assertions: narrative_generations row completed, dispute has
    // narrative_text populated, counter incremented.
    const { data: genRow } = await testDb
      .from("narrative_generations")
      .select("id, status, narrative_output, error")
      .eq("id", generationId)
      .single();
    expect(genRow?.status).toBe("completed");
    expect(genRow?.error).toBeNull();
    expect(genRow?.narrative_output).toBeTruthy();

    const { data: disputeAfterGen } = await testDb
      .from("disputes")
      .select("narrative_text, narrative_generations_count")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeAfterGen?.narrative_text).toContain("Delivery Confirmation");
    expect(disputeAfterGen?.narrative_generations_count).toBe(1);
```

- [ ] **Step 9.2: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -50`

Expected: `Tests 1 passed`. If `genRow.status` comes back as `pending`, the `after()` mock isn't taking effect — check the import order in the test file (mocks MUST be imported first) and the mock shape in `mocks.ts`. If `genRow.error` is populated, read the error string — it's likely a downstream issue like the playbook not being found or the prompt template missing.

- [ ] **Step 9.3: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): step 6 — narrative generation completes inline (WIN-43)

Relies on the after() mock replacing fire-and-forget with inline await.
Asserts the generation row reaches 'completed' status with narrative
output, and that the dispute row receives narrative_text and has its
generation counter incremented.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Step 7 — POST /api/narratives/{gen_id}/status returns completed narrative

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 10.1: Append step 7**

Add this block after step 6:

```ts
    // ---- STEP 7: POST /api/narratives/{gen_id}/status ----
    const { POST: statusPOST } = await import(
      "@/app/api/narratives/[generationId]/status/route"
    );

    const step7Req = new NextRequest(
      `http://localhost/api/narratives/${generationId}/status`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
    );
    const step7Res = await statusPOST(step7Req);
    expect(step7Res.status).toBe(200);
    const step7Body = await step7Res.json();
    expect(step7Body.status).toBe("completed");
    expect(step7Body.narrative).toContain("Delivery Confirmation");
```

- [ ] **Step 10.2: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -30`

Expected: `Tests 1 passed`.

- [ ] **Step 10.3: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): step 7 — narrative status route returns completed (WIN-43)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Steps 8 and 9 — Inspect Anthropic call args and add WIN-44 trip-wire

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 11.1: Append step 8 (prompt references evidence file)**

Add this block after step 7:

```ts
    // ---- STEP 8: inspect captured Anthropic call args ----
    // The mocked messages.create captured its input into capturedAnthropicCalls.
    // Assert that the prompt Claude saw actually referenced the evidence file
    // we uploaded in step 4 — this catches regressions where evidence files
    // silently fail to flow into the prompt context (the pre-WIN-19 state).
    const { capturedAnthropicCalls } = await import("./mocks");
    expect(capturedAnthropicCalls.length).toBe(1);
    const promptUser = capturedAnthropicCalls[0].user;
    expect(promptUser).toContain(TEST_CHECKLIST_ITEM_KEY);
    expect(promptUser).toContain("delivery-confirmation.pdf");
```

- [ ] **Step 11.2: Append step 9 (WIN-44 trip-wire as `it.todo`)**

Add this outside the `it(...)` block but inside the `describe(...)` block, right after the main `it`:

```ts
  it.todo(
    "WIN-44: prompt includes Stripe transaction data (AVS/CVC/3DS/auth_code). " +
      "When WIN-44 lands, flip this to a real `it(...)` that imports " +
      "capturedAnthropicCalls and asserts promptUser contains 'AVS address check: pass', " +
      "'CVC check: pass', '3D Secure: authenticated', and the authorization code.",
  );
```

- [ ] **Step 11.3: Run the test**

Run: `cd backend && npm run test:integration 2>&1 | tail -40`

Expected: `Test Files 1 passed`, `Tests 1 passed | 1 todo`. The `todo` is intentional — it reports as "todo" not "failed" and serves as a visible reminder in test output every time the suite runs.

- [ ] **Step 11.4: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): steps 8-9 — prompt inspection + WIN-44 trip-wire (WIN-43)

Step 8 asserts the captured Anthropic prompt references the evidence file
uploaded in step 4, catching regressions where evidence silently fails to
flow into the prompt context. Step 9 is an it.todo() that serves as the
trip-wire for WIN-44 — when WIN-44 lands and Stripe transaction data is
threaded into the prompt, flip this to a real assertion on AVS/CVC/3DS
values in the captured user prompt.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Verify the test actually catches a bug (idempotence + bug detection)

**Files:**
- None (verification only)

This task is a safety check, not code. Run the test multiple times to confirm idempotence, then deliberately break a fix from the WIN-19 PR and confirm the test fails.

- [ ] **Step 12.1: Verify idempotence — run twice in a row**

Run: `cd backend && npm run test:integration && npm run test:integration 2>&1 | tail -10`

Expected: both runs pass. If the second run fails with a "duplicate key" error, the teardown isn't cleaning something up — investigate and fix `cleanupTestData()`.

- [ ] **Step 12.2: Verify the test catches a real bug — revert the `await` fix temporarily**

In `backend/app/api/narratives/generate/route.ts` line ~32, change:

```ts
await ensureMerchant(accountId, userId);
```

to:

```ts
ensureMerchant(accountId, userId); // intentionally broken for WIN-43 verification
```

Run: `cd backend && npm run test:integration 2>&1 | tail -40`

Expected: the test fails at step 6 (narrative generate) with something like "Merchant not found" or a `genRow` that's null. This proves the integration test catches the exact bug class that WIN-19 QA found by hand.

- [ ] **Step 12.3: Restore the `await`**

Revert the change in `route.ts` back to `await ensureMerchant(...)`.

Run: `cd backend && npm run test:integration 2>&1 | tail -10`

Expected: test passes again.

- [ ] **Step 12.4: No commit**

Nothing to commit — this task is pure verification. Move on to Task 13.

---

## Task 13: File WIN-46 ticket for CI wiring

**Files:**
- None (Linear action only)

- [ ] **Step 13.1: Create WIN-46 via Linear MCP**

Use `mcp__claude_ai_Linear__save_issue` (call the tool from your agent harness). Parameters:

- `team`: `WinBack`
- `title`: `Wire WIN-43 dispute wizard integration test into CI`
- `priority`: `3` (Medium)
- `relatedTo`: `["WIN-43"]`
- `description`: Explain that WIN-43 delivered a local-only integration test runnable via `npm run test:integration`, and WIN-46 is the follow-up to wire it into GitHub Actions. Cover: provisioning `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and any other required env as GitHub secrets; deciding whether CI runs integration tests on every PR or only on backend-touching PRs; a cleanup strategy that's safe for parallel PR runs (either per-run unique test account IDs like `acct_WIN43_TEST_${GITHUB_RUN_ID}`, or serialized-only execution); and documentation in the backend README describing how to run locally. Reference the WIN-43 spec at `docs/superpowers/specs/2026-04-12-win-43-integration-test-design.md`.

- [ ] **Step 13.2: Confirm the ticket was created**

Note the returned URL (`https://linear.app/jkbtech/issue/WIN-46/...`) for the PR body in Task 14.

---

## Task 14: Open the WIN-43 pull request

**Files:**
- None (git + GitHub action)

- [ ] **Step 14.1: Confirm the working tree is clean**

Run: `git status`

Expected: `nothing to commit, working tree clean` OR only unrelated dirty files from prior sessions (`.claude/settings.local.json`, `stripe-app/.build/*`, untracked docs). If you see `backend/__tests__/integration/*` or `backend/vitest.*` as unstaged, something from Tasks 1-11 wasn't committed — go back and commit it.

- [ ] **Step 14.2: Create the feature branch**

Run:

```bash
git checkout -b joebenscoter/win-43-integration-test
git push -u origin joebenscoter/win-43-integration-test
```

Expected: branch created and pushed to origin.

- [ ] **Step 14.3: Open the PR**

Run:

```bash
gh pr create --base main --head joebenscoter/win-43-integration-test \
  --title "WIN-43: Dispute wizard integration test" \
  --body "$(cat <<'EOF'
Closes [WIN-43](https://linear.app/jkbtech/issue/WIN-43).

## Summary

Adds a single local-only integration test at `backend/__tests__/integration/dispute-wizard-flow.test.ts` that walks the full dispute wizard end-to-end against real dev Supabase with mocked Stripe, Anthropic, auth, and `next/server.after()`. Catches the class of cross-route sequencing bug that WIN-19 QA surfaced.

## Run it

```bash
cd backend
npm run test:integration
```

Runs in under 10 seconds. No internet, no API costs, no pollution of dev state (all DB writes are scoped to a fake `acct_WIN43_TEST` merchant and cleaned up on setup + teardown).

## What it catches

- Sequencing bugs between routes (Route A assumes Route B wrote a row)
- `merchant_id: null` regressions in disputes or evidence_files
- Zombie dispute rows with `amount: 0, reason_code: ""` (WIN-41 pattern)
- `ensureMerchant` race conditions (WIN-19 pattern)
- Evidence files silently failing to flow into the narrative prompt
- Background narrative generation completing incorrectly

All four backend bugs fixed during WIN-19 QA would have been caught immediately by this test.

## What it doesn't catch

- Real Stripe API behavior (manual QA against Docket sandbox)
- Real Claude prompt quality (WIN-34's prompt eval suite)
- Real auth signature verification (covered by `stripe-auth` unit tests)

## WIN-44 trip-wire

Step 9 is an `it.todo(...)` that will become a real assertion once [WIN-44](https://linear.app/jkbtech/issue/WIN-44) threads Stripe transaction data into the narrative prompt. The Stripe fixture already carries full AVS/CVC/3DS/outcome data, so flipping the `todo` to a real test requires zero fixture changes.

## Follow-ups

- [WIN-46](<fill in from Task 13>) — wire this test into CI (GitHub Actions + secret provisioning)

## Test plan

- [x] `npm run test:integration` passes on clean main
- [x] Runs idempotently (back-to-back invocations both pass)
- [x] Intentionally reverting the `await ensureMerchant` fix in `generate/route.ts` causes the test to fail at step 6 (verified manually in Task 12)
- [x] `npm test` (default unit tests) still runs cleanly and does NOT pick up integration tests

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Replace `<fill in from Task 13>` with the actual WIN-46 URL from Task 13 Step 13.2 before running the command.

Expected: `gh` prints a PR URL. Capture it and report back to the user.

- [ ] **Step 14.4: Switch back to main locally (do NOT reset main)**

Run: `git checkout main`

Leave local main alone — it will reconcile with origin/main after the PR merges.

---

## Self-review

**Spec coverage check:**
- Architecture (Vitest config, run command, location) → Task 1 ✓
- Mocks (four `vi.mock()` declarations, `capturedAnthropicCalls`) → Task 3 ✓
- Fixtures (canned Stripe dispute WIN-44-ready, canned Anthropic response, test IDs) → Task 2 ✓
- Database isolation (fake account, cascade-delete teardown, idempotent setup) → Task 4 ✓
- Test flow (nine steps) → Tasks 5-11 ✓
- Error handling (crash-loud, teardown runs in afterAll) → Task 4 ✓
- Testing the test (idempotence + bug-catch verification) → Task 12 ✓
- Acceptance criteria (file exists, HTTP+DB assertions, idempotent, WIN-44 todo, WIN-46 filed, spec committed) → Tasks 1-14 cover all ✓

**Placeholder scan:**
- No TBDs, TODOs (outside the explicit `it.todo`), or "fill in later".
- Task 13 Step 13.1 describes the WIN-46 ticket body in prose rather than showing the exact string — acceptable because it's a Linear action with flexible wording, not code.
- Task 14 Step 14.3 has one literal `<fill in from Task 13>` placeholder — intentional, with explicit instructions to replace before running.

**Type / name consistency:**
- `TEST_ACCOUNT_ID`, `TEST_DISPUTE_ID`, `TEST_CHECKLIST_ITEM_KEY`, `TEST_STRIPE_FILE_ID`, `capturedAnthropicCalls` consistent across fixtures, mocks, and test tasks.
- Route imports use full paths (`@/app/api/disputes/[disputeId]/route`, `@/app/api/narratives/generate/route`, etc.) consistently.
- `cleanupTestData` is the function name in both Task 4 versions.

**Scope check:** one test file, one feature, one PR. Self-contained.

No issues found. Plan is ready for execution.
