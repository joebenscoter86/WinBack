# WIN-25: Empty State and Onboarding Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a first-run onboarding block and persistent reassurance banner that renders in the dispute list view when a merchant has zero disputes, with a "reopen guide" path from Settings.

**Architecture:** Server-side onboarding state lives on `merchants.onboarding_completed_at` (TIMESTAMPTZ, nullable). A single POST endpoint `/api/merchant/onboarding` reads state; a second POST `/api/merchant/onboarding/update` sets or clears the timestamp (`completed: true` → `NOW()`; `completed: false` → `NULL` for reopen from Settings). The dispute list view fetches onboarding state in parallel with disputes, and when dispute count is zero renders (a) a persistent reassurance banner that promises in-app alerts (matching WIN-26's in-app-only scope) and (b) the rich onboarding panel if `onboarding_completed_at IS NULL`. Dismissing the panel calls the update endpoint with `completed: true`. Settings gains a "Show getting started guide" link that calls it with `completed: false`.

**Tech Stack:** Next.js App Router (backend), Supabase (Postgres), Vitest (tests), Stripe Apps SDK (frontend), React hooks.

---

## File Structure

**Create:**
- `backend/supabase/migrations/016_merchant_onboarding.sql` — adds `onboarding_completed_at TIMESTAMPTZ` column to `merchants`
- `backend/app/api/merchant/onboarding/route.ts` — POST handler that reads onboarding state for the authenticated merchant
- `backend/app/api/merchant/onboarding/__tests__/route.test.ts` — unit tests for the read endpoint
- `backend/app/api/merchant/onboarding/update/route.ts` — POST handler that sets/clears `onboarding_completed_at`
- `backend/app/api/merchant/onboarding/update/__tests__/route.test.ts` — unit tests for the update endpoint
- `stripe-app/src/components/OnboardingPanel.tsx` — rich first-run block with the 3-step "how it works" + dismiss button
- `stripe-app/src/components/EmptyDisputesState.tsx` — composite empty-state view (reassurance banner + optional OnboardingPanel). Replaces the current single-line empty state for the disputes tab only.

**Modify:**
- `stripe-app/src/views/DisputeListView.tsx` — fetch onboarding state alongside disputes, render `EmptyDisputesState` in the zero-dispute branch
- `stripe-app/src/views/AppSettings.tsx` — add a "Show getting started guide" Link that calls the update endpoint with `completed: false`

**Do not touch:**
- The existing `stripe-app/src/components/EmptyState.tsx` — keep as a reusable generic for other views (e.g., "no disputes match filter"). Only the zero-disputes-total case gets the new richer view.

---

## Task 1: Add `onboarding_completed_at` column to `merchants`

**Files:**
- Create: `backend/supabase/migrations/016_merchant_onboarding.sql`

- [ ] **Step 1: Write the migration**

Create `backend/supabase/migrations/016_merchant_onboarding.sql` with:

```sql
-- WIN-25: First-run onboarding state.
-- NULL = merchant has not dismissed the onboarding panel yet (or reopened it
-- from Settings). A timestamp means the merchant has seen and dismissed the
-- "How WinBack works" panel. Keyed by stripe_account_id on the existing
-- merchants table from migration 001.

ALTER TABLE merchants
  ADD COLUMN onboarding_completed_at TIMESTAMPTZ;
```

- [ ] **Step 2: Apply the migration to dev Supabase**

Run from repo root:

```bash
cd backend && set -a && source .env.local && set +a && \
  npx supabase db push --include-all
```

Expected: migration `016_merchant_onboarding.sql` reported as applied. If the CLI reports it as already present, re-check the filename numbering (next free index is 016 because 014 and 015 are taken).

- [ ] **Step 3: Verify the column exists**

```bash
cd backend && set -a && source .env.local && set +a && \
  npx supabase db query "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='merchants' AND column_name='onboarding_completed_at';"
```

Expected: one row with `data_type = 'timestamp with time zone'`, `is_nullable = 'YES'`.

- [ ] **Step 4: Commit**

```bash
git add backend/supabase/migrations/016_merchant_onboarding.sql
git commit -m "feat(WIN-25): add merchants.onboarding_completed_at column"
```

---

## Task 2: Build read endpoint `POST /api/merchant/onboarding`

**Files:**
- Create: `backend/app/api/merchant/onboarding/route.ts`
- Test: `backend/app/api/merchant/onboarding/__tests__/route.test.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/app/api/merchant/onboarding/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json();
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

const maybeSingleMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: maybeSingleMock,
        })),
      })),
    })),
  },
}));

function makeRequest(): NextRequest {
  return new NextRequest("http://localhost/api/merchant/onboarding", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
}

describe("POST /api/merchant/onboarding", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns completed:false when onboarding_completed_at is null", async () => {
    maybeSingleMock.mockResolvedValue({
      data: { onboarding_completed_at: null },
      error: null,
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ completed: false, completed_at: null });
  });

  it("returns completed:true when onboarding_completed_at is set", async () => {
    maybeSingleMock.mockResolvedValue({
      data: { onboarding_completed_at: "2026-04-18T12:00:00Z" },
      error: null,
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({
      completed: true,
      completed_at: "2026-04-18T12:00:00Z",
    });
  });

  it("returns 404 when merchant row is missing", async () => {
    maybeSingleMock.mockResolvedValue({ data: null, error: null });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json).toEqual({ error: "Merchant not found", code: "not_found" });
  });

  it("returns 500 on database error", async () => {
    maybeSingleMock.mockResolvedValue({
      data: null,
      error: { message: "connection reset" },
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: "Internal server error", code: "internal_error" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run app/api/merchant/onboarding/__tests__/route.test.ts`
Expected: FAIL with "Cannot find module '../route'" (or similar — file does not yet exist).

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/api/merchant/onboarding/route.ts`:

```ts
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-25: Read onboarding state for the authenticated merchant.
 *
 * Response:
 *   completed: boolean
 *   completed_at: ISO timestamp | null
 *
 * POST (not GET) because the iframe's fetchBackend helper signs a JSON body
 * and a GET can't carry a Stripe App signature payload.
 */
export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;

  try {
    await ensureMerchant(accountId, userId);

    const { data, error } = await supabase
      .from("merchants")
      .select("onboarding_completed_at")
      .eq("stripe_account_id", accountId)
      .maybeSingle();

    if (error) {
      captureRouteError(error, { route: "merchant.onboarding.read" });
      return NextResponse.json(
        { error: "Internal server error", code: "internal_error" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Merchant not found", code: "not_found" },
        { status: 404 },
      );
    }

    const row = data as { onboarding_completed_at: string | null };
    return NextResponse.json({
      completed: row.onboarding_completed_at !== null,
      completed_at: row.onboarding_completed_at,
    });
  } catch (err) {
    captureRouteError(err, { route: "merchant.onboarding.read" });
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run app/api/merchant/onboarding/__tests__/route.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/merchant/onboarding/route.ts backend/app/api/merchant/onboarding/__tests__/route.test.ts
git commit -m "feat(WIN-25): add read endpoint for merchant onboarding state"
```

---

## Task 3: Build update endpoint `POST /api/merchant/onboarding/update`

**Files:**
- Create: `backend/app/api/merchant/onboarding/update/route.ts`
- Test: `backend/app/api/merchant/onboarding/update/__tests__/route.test.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/app/api/merchant/onboarding/update/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json();
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

const updateMock = vi.fn();
const eqMock = vi.fn(() => ({ select: vi.fn(() => ({ maybeSingle: vi.fn(() => ({ data: { onboarding_completed_at: null }, error: null })) })) }));
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      update: updateMock,
    })),
  },
}));

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/merchant/onboarding/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/merchant/onboarding/update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    updateMock.mockReturnValue({
      eq: vi.fn(() => Promise.resolve({ error: null })),
    });
  });

  it("sets onboarding_completed_at to NOW() when completed=true", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: true }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ completed: true });
    expect(updateMock).toHaveBeenCalledTimes(1);
    const updateArg = updateMock.mock.calls[0][0];
    expect(updateArg.onboarding_completed_at).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });

  it("sets onboarding_completed_at to NULL when completed=false", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: false }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ completed: false });
    expect(updateMock).toHaveBeenCalledWith({
      onboarding_completed_at: null,
      updated_at: expect.any(String),
    });
  });

  it("returns 400 when completed is missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({}));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "Missing completed flag", code: "invalid_request" });
    expect(updateMock).not.toHaveBeenCalled();
  });

  it("returns 400 when completed is not a boolean", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: "yes" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "Missing completed flag", code: "invalid_request" });
  });

  it("returns 500 when update fails", async () => {
    updateMock.mockReturnValue({
      eq: vi.fn(() => Promise.resolve({ error: { message: "update failed" } })),
    });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: true }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: "Internal server error", code: "internal_error" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run app/api/merchant/onboarding/update/__tests__/route.test.ts`
Expected: FAIL — route module does not yet exist.

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/api/merchant/onboarding/update/route.ts`:

```ts
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-25: Set or clear the merchant's onboarding_completed_at timestamp.
 *
 * Body:
 *   completed: boolean
 *     true  -> onboarding_completed_at = NOW() (dismissal from disputes view)
 *     false -> onboarding_completed_at = NULL (reopen from Settings)
 *
 * Response:
 *   completed: boolean (echo)
 */
export const POST = withStripeAuth(async (_request, { identity, body }) => {
  const { accountId, userId } = identity;
  const completed = (body as { completed?: unknown } | undefined)?.completed;

  if (typeof completed !== "boolean") {
    return NextResponse.json(
      { error: "Missing completed flag", code: "invalid_request" },
      { status: 400 },
    );
  }

  try {
    await ensureMerchant(accountId, userId);

    const now = new Date().toISOString();
    const { error } = await supabase
      .from("merchants")
      .update({
        onboarding_completed_at: completed ? now : null,
        updated_at: now,
      })
      .eq("stripe_account_id", accountId);

    if (error) {
      captureRouteError(error, { route: "merchant.onboarding.update" });
      return NextResponse.json(
        { error: "Internal server error", code: "internal_error" },
        { status: 500 },
      );
    }

    return NextResponse.json({ completed });
  } catch (err) {
    captureRouteError(err, { route: "merchant.onboarding.update" });
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run app/api/merchant/onboarding/update/__tests__/route.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Run backend integration test (pre-PR checklist)**

Run: `cd backend && npm run test:integration`
Expected: PASS — adding these routes must not break the existing dispute-wizard flow.

- [ ] **Step 6: Commit**

```bash
git add backend/app/api/merchant/onboarding/update/route.ts backend/app/api/merchant/onboarding/update/__tests__/route.test.ts
git commit -m "feat(WIN-25): add update endpoint for merchant onboarding state"
```

---

## Task 4: Build `OnboardingPanel` component

**Files:**
- Create: `stripe-app/src/components/OnboardingPanel.tsx`

- [ ] **Step 1: Write the component**

Create `stripe-app/src/components/OnboardingPanel.tsx`:

```tsx
// stripe-app/src/components/OnboardingPanel.tsx
//
// WIN-25: First-run onboarding block shown in the disputes tab when a merchant
// has zero disputes AND has not yet dismissed the guide. Explains what WinBack
// does, how it works, and what happens when a dispute arrives.

import { useState } from 'react';
import { Box, Button, Divider, Inline } from '@stripe/ui-extension-sdk/ui';

interface OnboardingPanelProps {
  onDismiss: () => Promise<void>;
}

const STEPS: { title: string; description: string }[] = [
  {
    title: '1. A new dispute arrives',
    description:
      "When a customer disputes a charge, it shows up here with an alert. No email rules or Slack integrations to configure.",
  },
  {
    title: '2. We walk you through the evidence',
    description:
      "WinBack gives you a reason-code-specific checklist of exactly what to gather — receipts, shipping records, customer communication, whatever fits that dispute type.",
  },
  {
    title: '3. AI drafts your response',
    description:
      "Once your evidence is in, we draft a narrative that ties it all together. You review, edit, and submit when ready.",
  },
];

const OnboardingPanel = ({ onDismiss }: OnboardingPanelProps) => {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = async () => {
    setDismissing(true);
    try {
      await onDismiss();
    } finally {
      setDismissing(false);
    }
  };

  return (
    <Box
      css={{
        padding: 'large',
        stack: 'y',
        gap: 'medium',
        background: 'container',
        borderRadius: 'medium',
      }}
    >
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          How WinBack works
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          Guided dispute resolution for Stripe merchants. You keep 100% of what you recover.
        </Inline>
      </Box>

      <Divider />

      {STEPS.map((step) => (
        <Box key={step.title} css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            {step.title}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {step.description}
          </Inline>
        </Box>
      ))}

      <Box css={{ stack: 'x', alignX: 'end' }}>
        <Button
          type="secondary"
          onPress={handleDismiss}
          disabled={dismissing}
        >
          {dismissing ? 'Saving…' : 'Got it'}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingPanel;
```

- [ ] **Step 2: Typecheck the stripe-app package**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: PASS — no type errors. If `background: 'container'` or `borderRadius: 'medium'` are not valid SDK css tokens on this SDK version, downgrade to the closest supported tokens (the SDK is strict about css keys). If TS complains, drop the `background`/`borderRadius` entries and keep the layout; the dismiss button and copy are what matter.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/OnboardingPanel.tsx
git commit -m "feat(WIN-25): add OnboardingPanel component"
```

---

## Task 5: Build `EmptyDisputesState` composite component

**Files:**
- Create: `stripe-app/src/components/EmptyDisputesState.tsx`

- [ ] **Step 1: Write the component**

Create `stripe-app/src/components/EmptyDisputesState.tsx`:

```tsx
// stripe-app/src/components/EmptyDisputesState.tsx
//
// WIN-25: Zero-disputes view for the disputes tab. Composes:
//   - A persistent reassurance banner ("we'll alert you when disputes arrive")
//     that stays visible regardless of onboarding state.
//   - An optional OnboardingPanel, shown only when the merchant has not yet
//     dismissed the first-run guide.
//
// Distinct from src/components/EmptyState.tsx, which remains a generic
// one-liner used for things like "no disputes match this filter".

import { Banner, Box } from '@stripe/ui-extension-sdk/ui';
import OnboardingPanel from './OnboardingPanel';

interface EmptyDisputesStateProps {
  onboardingCompleted: boolean;
  onDismissOnboarding: () => Promise<void>;
}

const EmptyDisputesState = ({
  onboardingCompleted,
  onDismissOnboarding,
}: EmptyDisputesStateProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'medium', padding: 'small' }}>
      <Banner
        type="default"
        title="You're all set"
        description="When a new dispute arrives, you'll see it here with an alert. No setup needed."
      />
      {!onboardingCompleted && (
        <OnboardingPanel onDismiss={onDismissOnboarding} />
      )}
    </Box>
  );
};

export default EmptyDisputesState;
```

- [ ] **Step 2: Typecheck**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/EmptyDisputesState.tsx
git commit -m "feat(WIN-25): add EmptyDisputesState composite"
```

---

## Task 6: Wire onboarding state into `DisputeListView`

**Files:**
- Modify: `stripe-app/src/views/DisputeListView.tsx`

- [ ] **Step 1: Update imports**

In `stripe-app/src/views/DisputeListView.tsx`, replace the line:

```tsx
import EmptyState from '../components/EmptyState';
```

with:

```tsx
import EmptyDisputesState from '../components/EmptyDisputesState';
```

Leave any other imports from `EmptyState` untouched. (Currently `EmptyState` is imported only in this file, but we are replacing its usage here — not the component itself, which may be reused elsewhere later.)

- [ ] **Step 2: Add onboarding state to the component**

Inside `DisputeListView`, just below the existing `const [statusFilter, setStatusFilter] = ...` line, add:

```tsx
const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(true);
```

We default to `true` so the onboarding panel does not flash on screen during the initial load. It flips to `false` (and renders the panel) only after the backend explicitly confirms the merchant has not completed onboarding.

- [ ] **Step 3: Fetch onboarding state alongside disputes**

Replace the existing `loadDisputes` callback with a combined loader that fetches both in parallel:

```tsx
const loadDisputes = useCallback(async () => {
  setViewState('loading');
  try {
    const [disputesResult, onboardingResult] = await Promise.all([
      fetchBackend<{ data: Dispute[] }>('/api/disputes', contextRef.current),
      fetchBackend<{ completed: boolean; completed_at: string | null }>(
        '/api/merchant/onboarding',
        contextRef.current,
      ),
    ]);
    setDisputes(disputesResult.data);
    setOnboardingCompleted(onboardingResult.completed);
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
```

- [ ] **Step 4: Add the dismiss handler**

Above the `return` statement (between the filter logic and the JSX), add:

```tsx
const handleDismissOnboarding = async () => {
  // Optimistic — hide the panel immediately. If the backend call fails we
  // will rehydrate on next mount, which is fine; worst case the merchant
  // sees it once more.
  setOnboardingCompleted(true);
  try {
    await fetchBackend('/api/merchant/onboarding/update', contextRef.current, {
      completed: true,
    });
  } catch {
    // Swallow — the next load will correct state.
  }
};
```

- [ ] **Step 5: Replace the empty-state render**

Find this block inside the `<TabPanel id="disputes">` body:

```tsx
{disputes.length === 0 ? (
  <EmptyState
    title="No disputes yet"
    description="When a dispute comes in, we'll walk you through exactly what to do."
  />
) : (
```

Replace it with:

```tsx
{disputes.length === 0 ? (
  <EmptyDisputesState
    onboardingCompleted={onboardingCompleted}
    onDismissOnboarding={handleDismissOnboarding}
  />
) : (
```

- [ ] **Step 6: Typecheck**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: PASS. If the compiler reports `EmptyState` as unused in this file, that is expected — the import was removed in Step 1.

- [ ] **Step 7: Commit**

```bash
git add stripe-app/src/views/DisputeListView.tsx
git commit -m "feat(WIN-25): wire onboarding state into DisputeListView"
```

---

## Task 7: Add "Show getting started guide" link in Settings

**Files:**
- Modify: `stripe-app/src/views/AppSettings.tsx`

- [ ] **Step 1: Add a reopen handler and its state**

In `stripe-app/src/views/AppSettings.tsx`, inside `AppSettings`, below the existing `const [upgradeError, setUpgradeError] = ...` line, add:

```tsx
const [reopening, setReopening] = useState(false);
const [reopenDone, setReopenDone] = useState(false);
const [reopenError, setReopenError] = useState<string | null>(null);

const handleReopenOnboarding = async () => {
  setReopening(true);
  setReopenError(null);
  setReopenDone(false);
  try {
    await fetchBackend('/api/merchant/onboarding/update', contextRef.current, {
      completed: false,
    });
    setReopenDone(true);
  } catch (err) {
    const msg = err instanceof ApiError ? err.message : 'Failed to reopen guide';
    setReopenError(msg);
  } finally {
    setReopening(false);
  }
};
```

- [ ] **Step 2: Render the reopen section**

Immediately before the final `About WinBack` block (the `<Divider />` that precedes `"About WinBack"`), insert:

```tsx
<Divider />

<Box css={{ stack: 'y', gap: 'xsmall' }}>
  <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
    Getting started guide
  </Inline>
  <Inline css={{ font: 'caption', color: 'secondary' }}>
    Show the "How WinBack works" guide again in the Disputes tab next time you have no active disputes.
  </Inline>
  {reopenError && (
    <Banner type="critical" title="Could not reopen guide" description={reopenError} />
  )}
  {reopenDone && !reopenError && (
    <Inline css={{ font: 'caption', color: 'secondary' }}>
      Done. The guide will appear the next time your disputes list is empty.
    </Inline>
  )}
  <Box css={{ stack: 'x', alignX: 'start' }}>
    <Button type="secondary" onPress={handleReopenOnboarding} disabled={reopening}>
      {reopening ? 'Reopening…' : 'Show getting started guide'}
    </Button>
  </Box>
</Box>
```

Note: `Button` is already imported from `@stripe/ui-extension-sdk/ui` in this file (it is used for the upgrade button). No new imports required.

- [ ] **Step 3: Typecheck**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/views/AppSettings.tsx
git commit -m "feat(WIN-25): add reopen-guide control in Settings"
```

---

## Task 8: Manual QA in Stripe test mode

**Files:** none (verification only)

- [ ] **Step 1: Start backend and app**

In two terminals:

```bash
cd backend && npm run dev
```

```bash
cd stripe-app && stripe apps start
```

- [ ] **Step 2: Verify first-run state**

Using the Dockett sandbox Stripe account (`acct_1TCiQ5EGBKy2j9aE`, per `reference_stripe_test_env` memory), open the WinBack app in the Stripe Dashboard. Before testing, clear any existing onboarding state for this account:

```bash
cd backend && set -a && source .env.local && set +a && \
  npx supabase db query "UPDATE merchants SET onboarding_completed_at = NULL WHERE stripe_account_id = 'acct_1TCiQ5EGBKy2j9aE';"
```

Confirm in the UI:
- Reassurance banner renders: "You're all set. When a new dispute arrives, you'll see it here with an alert."
- Onboarding panel renders below it with the 3 numbered steps and a "Got it" button.

- [ ] **Step 3: Verify dismissal**

Click "Got it". Confirm:
- Button shows "Saving…" briefly, then the panel disappears.
- Banner remains visible.
- Reload the iframe. The panel should stay dismissed.
- Database check:
  ```bash
  cd backend && set -a && source .env.local && set +a && \
    npx supabase db query "SELECT onboarding_completed_at FROM merchants WHERE stripe_account_id = 'acct_1TCiQ5EGBKy2j9aE';"
  ```
  Expected: a timestamp, not NULL.

- [ ] **Step 4: Verify reopen from Settings**

Open the WinBack Settings view. Click "Show getting started guide". Confirm:
- Button briefly shows "Reopening…"
- Confirmation caption appears: "Done. The guide will appear the next time your disputes list is empty."

Return to the Disputes tab. The onboarding panel should render again (the banner was already there).

- [ ] **Step 5: Verify returning-merchant state**

Dismiss the panel a second time. Confirm only the banner remains. Reload. Still only the banner.

- [ ] **Step 6: Verify the state disappears once a dispute exists**

Create a test dispute via the Stripe Dashboard test-mode dispute simulator on a payment in the Dockett sandbox. Reload the WinBack app. Confirm:
- Both the banner and the onboarding panel are gone.
- The DisputeCard list renders as normal.

- [ ] **Step 7: Mark Linear issue and ship**

```bash
git log --oneline main..HEAD
```

Expected: seven commits, one per task (1, 2, 3, 4, 5, 6, 7). Push the branch and open a PR targeting `main`. In the PR description, link WIN-25 and note manual QA was completed against the Dockett sandbox.

---

## Self-Review Notes

- **Spec coverage:**
  - "Detect zero disputes" — Task 6 uses existing `disputes.length === 0`.
  - Empty state copy — Task 5 `EmptyDisputesState` banner.
  - First-visit onboarding (what WinBack does / how it works / what happens when a dispute arrives) — Task 4 `OnboardingPanel` 3-step content + heading caption.
  - Notification promise — Task 5 banner + Task 4 step 1 ("you get an alert here"). Scope matches WIN-26 in-app badge.
  - First-visit detection — Tasks 1 (column), 2 (read), 3 (update).
- **Reopen path** — Task 7 wires Settings control to the same update endpoint with `completed:false`.
- **Dependencies** — WIN-9 (app shell) and WIN-11 (dispute list) are both Done, so this plan can execute immediately.
- **Integration test** — Task 3 Step 5 runs the backend integration suite before landing backend routes, per `CLAUDE.md` pre-PR checklist for `backend/**` changes.
- **No em dashes in user-facing copy** — per `feedback_no_mdashes.md`, copy in `OnboardingPanel.tsx` and `EmptyDisputesState.tsx` uses regular punctuation. The word "em dash" appears only in code comments, not in strings shown to merchants.
