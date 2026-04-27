# Inquiry vs Chargeback Handling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three P0 bugs in WinBack's handling of Stripe dispute inquiries vs chargebacks: silent submission-loss on inquiry → chargeback escalation, mis-mapped `warning_closed` badge, and missing visual differentiation between inquiry and chargeback stages.

**Architecture:** Backend webhook handler reads the prior dispute row before upsert and clears `evidence_submitted_at` when the status transitions from `warning_*` to `needs_response`. Two new shared helpers (`isInquiry`, `isInquiryToChargebackEscalation`) live in `backend/lib/disputes/inquiry.ts`; the frontend gets its own copy of `isInquiry` since the two packages do not share code. Frontend renders an "Inquiry" pill, stage-aware wizard copy, and two new banners (escalation + Discover-specific). No DB migration. Single PR.

**Tech Stack:** TypeScript, Next.js 15 App Router (backend), Stripe Apps SDK / React (frontend), Supabase (Postgres), vitest (backend tests only — frontend has no test runner).

**Spec:** [docs/superpowers/specs/2026-04-27-inquiry-vs-chargeback-handling-design.md](../specs/2026-04-27-inquiry-vs-chargeback-handling-design.md) (commit `3a23c07`)

**Branch policy:** Work on `main`. The user wants this in a single session. Per [CLAUDE.md](../../../CLAUDE.md), backend changes must pass `npm run test:integration` before any merge — a full integration run is task 11.

---

## File Structure

### New files

| Path | Responsibility |
|---|---|
| `backend/lib/disputes/inquiry.ts` | Pure helpers: `isInquiry(status)`, `isInquiryToChargebackEscalation(oldStatus, newStatus)` |
| `backend/lib/disputes/inquiry.test.ts` | Unit tests for both helpers |

### Modified files

| Path | What changes |
|---|---|
| `backend/lib/webhooks/handle-dispute-event.ts` | Read prior row on `dispute.updated`, conditionally include `evidence_submitted_at: null` in upsert payload on detected escalation |
| `backend/lib/webhooks/__tests__/handle-dispute-event.test.ts` | New tests: escalation clears submission, no false-positive on same-status update, no false-positive on `warning_*` → `warning_closed` |
| `backend/__tests__/integration/dispute-wizard-flow.test.ts` | New describe block walking inquiry → submit → escalation → resubmit |
| `stripe-app/src/lib/utils.ts` | Fix `warning_closed` badge mapping; add frontend `isInquiry()` |
| `stripe-app/src/components/DisputeCard.tsx` | Render "Inquiry" pill when `isInquiry(dispute.status)` |
| `stripe-app/src/components/DisputeWorkflow.tsx` | Discover banner; escalation banner; pass `isInquiry` flag down |
| `stripe-app/src/components/submit/SubmitView.tsx` | Heading + button copy variant for inquiries |
| `stripe-app/src/components/submit/SubmissionConfirmation.tsx` | Accept `isInquiry` prop; render inquiry-flavored success copy |

### Why this decomposition

The escalation-reset bug has its own backend file (helpers) so the logic is testable in isolation and shared between the webhook handler and (potentially) future code paths. Frontend changes are split per file/component because each has a distinct UI responsibility — one pill on the card, two banners and copy variants in the workflow, two strings in the submit step. Each task produces a self-contained change that can be reviewed independently.

---

## Task 1: Shared backend helpers (`inquiry.ts`)

**Files:**
- Create: `backend/lib/disputes/inquiry.ts`
- Test: `backend/lib/disputes/inquiry.test.ts`

- [ ] **Step 1.1: Write the failing test**

Create `backend/lib/disputes/inquiry.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { isInquiry, isInquiryToChargebackEscalation } from "./inquiry";

describe("isInquiry", () => {
  it.each([
    ["warning_needs_response", true],
    ["warning_under_review", true],
    ["warning_closed", true],
    ["needs_response", false],
    ["under_review", false],
    ["won", false],
    ["lost", false],
    ["charge_refunded", false],
  ])("returns %s for status %s", (status, expected) => {
    expect(isInquiry(status)).toBe(expected);
  });
});

describe("isInquiryToChargebackEscalation", () => {
  it("returns true for warning_needs_response → needs_response", () => {
    expect(isInquiryToChargebackEscalation("warning_needs_response", "needs_response")).toBe(true);
  });

  it("returns true for warning_under_review → needs_response", () => {
    expect(isInquiryToChargebackEscalation("warning_under_review", "needs_response")).toBe(true);
  });

  it("returns true for warning_closed → needs_response", () => {
    // Edge: a closed inquiry that escalates. Stripe generally creates a new
    // dispute, but the predicate is one-directional and should still fire.
    expect(isInquiryToChargebackEscalation("warning_closed", "needs_response")).toBe(true);
  });

  it("returns false for same-status no-op (warning_needs_response → warning_needs_response)", () => {
    expect(
      isInquiryToChargebackEscalation("warning_needs_response", "warning_needs_response"),
    ).toBe(false);
  });

  it("returns false for warning_* → warning_closed (inquiry resolved without escalation)", () => {
    expect(isInquiryToChargebackEscalation("warning_needs_response", "warning_closed")).toBe(false);
  });

  it("returns false for chargeback → chargeback (needs_response → under_review)", () => {
    expect(isInquiryToChargebackEscalation("needs_response", "under_review")).toBe(false);
  });

  it("returns false for null oldStatus", () => {
    expect(isInquiryToChargebackEscalation(null, "needs_response")).toBe(false);
  });

  it("returns false for undefined oldStatus", () => {
    expect(isInquiryToChargebackEscalation(undefined, "needs_response")).toBe(false);
  });

  it("returns false for empty string oldStatus", () => {
    expect(isInquiryToChargebackEscalation("", "needs_response")).toBe(false);
  });
});
```

- [ ] **Step 1.2: Run test to verify it fails**

```bash
cd backend && npm test -- lib/disputes/inquiry.test.ts
```

Expected: FAIL with "Cannot find module './inquiry'" or similar.

- [ ] **Step 1.3: Implement the helpers**

Create `backend/lib/disputes/inquiry.ts`:

```ts
/**
 * Stripe disputes have two stages:
 *   - Inquiry: pre-dispute warning. status starts with `warning_`. No funds held.
 *   - Chargeback: formal dispute. status is needs_response/under_review/won/lost/charge_refunded.
 *
 * An inquiry can escalate to a chargeback. When it does, the merchant must
 * submit evidence again — the inquiry response and chargeback response are
 * separate submissions (per Stripe docs).
 */

export function isInquiry(status: string): boolean {
  return status.startsWith("warning_");
}

/**
 * True only when an inquiry transitions to an open chargeback. We use this
 * in the webhook handler to clear `evidence_submitted_at` so the merchant
 * sees the re-submission prompt rather than a stale "already submitted"
 * state.
 */
export function isInquiryToChargebackEscalation(
  oldStatus: string | null | undefined,
  newStatus: string,
): boolean {
  if (!oldStatus) return false;
  return oldStatus.startsWith("warning_") && newStatus === "needs_response";
}
```

- [ ] **Step 1.4: Run test to verify it passes**

```bash
cd backend && npm test -- lib/disputes/inquiry.test.ts
```

Expected: PASS, all 14 cases green.

- [ ] **Step 1.5: Commit**

```bash
git add backend/lib/disputes/inquiry.ts backend/lib/disputes/inquiry.test.ts
git commit -m "$(cat <<'EOF'
feat(backend): add inquiry vs chargeback stage helpers

Shared predicates used by the webhook handler to detect when a
Stripe dispute inquiry escalates to a chargeback. Foundation for
the escalation-reset fix that prevents merchants from missing
chargeback deadlines after submitting at the inquiry stage.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Webhook handler escalation reset

**Files:**
- Modify: `backend/lib/webhooks/handle-dispute-event.ts`
- Test: `backend/lib/webhooks/__tests__/handle-dispute-event.test.ts`

- [ ] **Step 2.1: Inspect existing test mock setup**

```bash
sed -n '1,80p' backend/lib/webhooks/__tests__/handle-dispute-event.test.ts
```

Note: the existing tests mock `supabase.from()` per-call. Each test sets up a chain like `.eq().maybeSingle()` for the merchants lookup. The new escalation tests will need a similar chained mock for the `disputes.select(...).eq(...).maybeSingle()` call introduced in step 2.4.

- [ ] **Step 2.2: Write the first failing test (escalation clears submission timestamp)**

In `backend/lib/webhooks/__tests__/handle-dispute-event.test.ts`, add a new `describe` block at the bottom (above the closing brace of the outer describe):

```ts
describe("inquiry → chargeback escalation", () => {
  beforeEach(() => {
    upsertSpy = vi.fn(() => Promise.resolve({ error: null }));
  });

  function mockMerchantAndDispute(opts: {
    merchant: { id: string; billing_tier: "usage" | "pro" } | null;
    existingDispute: { status: string; evidence_submitted_at: string | null } | null;
  }) {
    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({ maybeSingle: () => Promise.resolve({ data: opts.merchant, error: null }) }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: () => Promise.resolve({ data: opts.existingDispute, error: null }),
            }),
          }),
          upsert: upsertSpy,
        };
      }
      throw new Error(`unexpected table: ${table}`);
    });
  }

  it("clears evidence_submitted_at when warning_needs_response escalates to needs_response", async () => {
    mockMerchantAndDispute({
      merchant: { id: MERCHANT_ID, billing_tier: "usage" },
      existingDispute: {
        status: "warning_needs_response",
        evidence_submitted_at: "2026-04-25T10:00:00Z",
      },
    });

    const dispute = makeDispute({ status: "needs_response" });
    await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

    expect(upsertSpy).toHaveBeenCalledTimes(1);
    const upsertPayload = upsertSpy.mock.calls[0][0];
    expect(upsertPayload).toMatchObject({
      stripe_dispute_id: dispute.id,
      status: "needs_response",
      evidence_submitted_at: null,
    });
  });

  it("does NOT clear evidence_submitted_at on a same-status update", async () => {
    mockMerchantAndDispute({
      merchant: { id: MERCHANT_ID, billing_tier: "usage" },
      existingDispute: {
        status: "warning_needs_response",
        evidence_submitted_at: "2026-04-25T10:00:00Z",
      },
    });

    const dispute = makeDispute({ status: "warning_needs_response" });
    await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

    const upsertPayload = upsertSpy.mock.calls[0][0];
    // Key assertion: the upsert payload must not set evidence_submitted_at to null.
    // We use `expect.not.objectContaining` because absence-from-payload preserves
    // the existing DB value via Supabase upsert semantics.
    expect(upsertPayload).not.toHaveProperty("evidence_submitted_at", null);
  });

  it("does NOT clear evidence_submitted_at when warning_* transitions to warning_closed", async () => {
    mockMerchantAndDispute({
      merchant: { id: MERCHANT_ID, billing_tier: "usage" },
      existingDispute: {
        status: "warning_needs_response",
        evidence_submitted_at: "2026-04-25T10:00:00Z",
      },
    });

    const dispute = makeDispute({ status: "warning_closed" });
    // warning_closed is a closed inquiry, not a chargeback. The handler routes
    // this through the `charge.dispute.closed` branch in production, but if a
    // `charge.dispute.updated` event arrives carrying this status (Stripe is
    // not strict about which event type carries which status), we still must
    // not clear evidence_submitted_at.
    await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

    const upsertPayload = upsertSpy.mock.calls[0][0];
    expect(upsertPayload).not.toHaveProperty("evidence_submitted_at", null);
  });

  it("treats a missing prior row as no-escalation (safe insert)", async () => {
    mockMerchantAndDispute({
      merchant: { id: MERCHANT_ID, billing_tier: "usage" },
      existingDispute: null,
    });

    const dispute = makeDispute({ status: "needs_response" });
    await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

    const upsertPayload = upsertSpy.mock.calls[0][0];
    expect(upsertPayload).not.toHaveProperty("evidence_submitted_at", null);
  });
});
```

- [ ] **Step 2.3: Run tests to verify the new ones fail**

```bash
cd backend && npm test -- lib/webhooks/__tests__/handle-dispute-event.test.ts
```

Expected: the four new tests in the "inquiry → chargeback escalation" describe block FAIL because the handler does not yet read the prior dispute row or include the `evidence_submitted_at: null` reset. Existing tests should still pass.

- [ ] **Step 2.4: Implement the escalation reset in the handler**

Edit `backend/lib/webhooks/handle-dispute-event.ts`. Add an import at the top and modify the `created or updated` branch.

Add to imports (top of file, after existing imports):

```ts
import { isInquiryToChargebackEscalation } from "@/lib/disputes/inquiry";
```

Replace the existing `// created or updated — preserve existing outcome_at if set` block (the upsert at lines ~107-113) with:

```ts
  // created or updated — preserve existing outcome_at if set
  // On inquiry → chargeback escalation, also clear evidence_submitted_at so
  // the merchant sees the re-submission prompt instead of a stale
  // "already submitted" UI. Stripe requires a separate response for the
  // chargeback even if the merchant already responded at the inquiry stage.
  let escalationReset: { evidence_submitted_at: null } | Record<string, never> = {};
  if (event.type === "charge.dispute.updated") {
    const { data: existing } = await supabase
      .from("disputes")
      .select("status, evidence_submitted_at")
      .eq("stripe_dispute_id", dispute.id)
      .maybeSingle();

    const priorStatus = (existing as { status?: string } | null)?.status;
    if (isInquiryToChargebackEscalation(priorStatus, dispute.status)) {
      escalationReset = { evidence_submitted_at: null };
    }
  }

  await supabase
    .from("disputes")
    .upsert(
      { ...baseRow, merchant_id: merchantId, ...escalationReset },
      { onConflict: "stripe_dispute_id" },
    );
```

- [ ] **Step 2.5: Run tests to verify they pass**

```bash
cd backend && npm test -- lib/webhooks/__tests__/handle-dispute-event.test.ts
```

Expected: all tests PASS, including the four new escalation tests and the existing tests.

- [ ] **Step 2.6: Run the full backend unit test suite as a regression check**

```bash
cd backend && npm test
```

Expected: PASS. If any unrelated test fails, stop and investigate — the read-before-upsert change should not affect anything else, but a failure means a hidden assumption was broken.

- [ ] **Step 2.7: Commit**

```bash
git add backend/lib/webhooks/handle-dispute-event.ts backend/lib/webhooks/__tests__/handle-dispute-event.test.ts
git commit -m "$(cat <<'EOF'
fix(backend): clear evidence_submitted_at on inquiry → chargeback escalation

When a Stripe inquiry (warning_*) escalates to a chargeback
(needs_response), the merchant must submit evidence again per
Stripe rules — the inquiry response does not carry forward.
Without this fix the dispute row keeps evidence_submitted_at set
from the inquiry-stage submission, the wizard renders as
"already submitted", and the merchant silently misses the
chargeback deadline.

Webhook handler now reads the prior row on charge.dispute.updated
and conditionally includes evidence_submitted_at: null in the
upsert payload when it detects the warning_* → needs_response
transition. narrative_text, narrative_generations_count,
checklist_state, and checklist_notes are preserved by virtue of
not being in the upsert payload at all (Supabase upsert
semantics).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Frontend `isInquiry` helper + `warning_closed` badge fix

**Files:**
- Modify: `stripe-app/src/lib/utils.ts`

The stripe-app package has no test runner — verification is type-check + manual QA in Task 9.

- [ ] **Step 3.1: Add `isInquiry` helper to `stripe-app/src/lib/utils.ts`**

At the top of the file (after the imports/constants block ending around line 17), add:

```ts
/**
 * Stripe inquiries (status prefixed `warning_`) are pre-dispute warnings.
 * Funds are not held. Responding can prevent escalation to a chargeback.
 * The frontend uses this for stage-aware copy and the "Inquiry" pill on
 * the dispute card.
 */
export function isInquiry(status: string): boolean {
  return status.startsWith('warning_');
}
```

- [ ] **Step 3.2: Fix the `warning_closed` badge mapping**

In `stripe-app/src/lib/utils.ts`, locate the `getStatusBadge` function (around lines 36-57) and change the `warning_closed` case.

Find:

```ts
    case 'lost':
    case 'warning_closed':
      return { label: 'Lost', type: 'negative' };
```

Replace with:

```ts
    case 'lost':
      return { label: 'Lost', type: 'negative' };
    case 'warning_closed':
      // Inquiries close without telling us the outcome. Don't claim "Lost".
      return { label: 'Inquiry closed', type: 'info' };
```

- [ ] **Step 3.3: Type-check the stripe-app package**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3.4: Commit**

```bash
git add stripe-app/src/lib/utils.ts
git commit -m "$(cat <<'EOF'
fix(stripe-app): correct warning_closed badge and add isInquiry helper

warning_closed previously rendered as "Lost" / negative, falsely
implying the merchant lost. Stripe does not tell us the outcome
of a closed inquiry — only that it closed (often because the
merchant's response satisfied the issuer or the cardholder
withdrew). Now renders as "Inquiry closed" / info.

Adds isInquiry() helper used by upcoming stage-aware UI changes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: "Inquiry" pill on the dispute card

**Files:**
- Modify: `stripe-app/src/components/DisputeCard.tsx`

- [ ] **Step 4.1: Update the import in `DisputeCard.tsx`**

Find the import line at the top of the file (around line 4):

```ts
import {
  getStatusBadge,
  getUrgencyBadge,
```

Add `isInquiry` to the imports from `'../lib/utils'`:

```ts
import {
  getStatusBadge,
  getUrgencyBadge,
  isInquiry,
```

(Keep any other existing imports from that line unchanged.)

- [ ] **Step 4.2: Render the Inquiry pill in the badge cluster**

In `DisputeCard.tsx`, find the badge cluster around line 49-57:

```tsx
          <Box css={{ stack: 'x', gap: 'xsmall' }}>
            {dispute.is_new && <Badge type="info">New</Badge>}
            {statusBadge && (
              <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
            )}
            {urgencyBadge && (
              <Badge type={urgencyBadge.type}>{urgencyBadge.label}</Badge>
            )}
          </Box>
```

Add the Inquiry pill so it appears AFTER "New" but BEFORE the status badge (so the visual order is: New → Inquiry → Status → Urgency):

```tsx
          <Box css={{ stack: 'x', gap: 'xsmall' }}>
            {dispute.is_new && <Badge type="info">New</Badge>}
            {isInquiry(dispute.status) && <Badge type="info">Inquiry</Badge>}
            {statusBadge && (
              <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
            )}
            {urgencyBadge && (
              <Badge type={urgencyBadge.type}>{urgencyBadge.label}</Badge>
            )}
          </Box>
```

- [ ] **Step 4.3: Type-check**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4.4: Commit**

```bash
git add stripe-app/src/components/DisputeCard.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): render "Inquiry" pill on dispute cards

Inquiries previously rendered identically to chargebacks in the
list view, leaving merchants unable to tell whether funds were
held. New pill renders alongside the status badge whenever the
dispute is in the warning_* stage.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: SubmitView — stage-aware heading and button copy

**Files:**
- Modify: `stripe-app/src/components/submit/SubmitView.tsx`

- [ ] **Step 5.1: Import `isInquiry` in `SubmitView.tsx`**

Find the existing import block at the top. The component imports from `../../lib/types` already; add a separate import line below it:

```ts
import { isInquiry } from '../../lib/utils';
```

- [ ] **Step 5.2: Compute the stage flag inside the component**

Inside the `SubmitView` function body, after the existing destructuring/state setup but before the `return (` (around line 184, just before `const submitDisabled = ...`), add:

```ts
  const stageIsInquiry = isInquiry(dispute.status);
```

- [ ] **Step 5.3: Replace the heading copy at line 186**

Find:

```tsx
      <Inline css={{ font: 'heading' }}>Submit evidence</Inline>
```

Replace with:

```tsx
      <Inline css={{ font: 'heading' }}>
        {stageIsInquiry ? 'Respond to prevent a chargeback' : 'Submit evidence'}
      </Inline>
```

- [ ] **Step 5.4: Replace the submit button copy at lines 244-251**

Find:

```tsx
          {isSubmitting ? (
            <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
              <Spinner />
              <Inline>Submitting evidence...</Inline>
            </Box>
          ) : (
            'Submit to Stripe'
          )}
```

Replace with:

```tsx
          {isSubmitting ? (
            <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
              <Spinner />
              <Inline>{stageIsInquiry ? 'Submitting response...' : 'Submitting evidence...'}</Inline>
            </Box>
          ) : (
            stageIsInquiry ? 'Submit response' : 'Submit to Stripe'
          )}
```

- [ ] **Step 5.5: Type-check**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5.6: Commit**

```bash
git add stripe-app/src/components/submit/SubmitView.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): stage-aware submit copy for inquiries

Inquiries are pre-dispute warnings with a different desired
outcome (closure without escalation) than chargebacks (winning).
Heading and button copy now reframe the action in inquiry mode.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: SubmissionConfirmation — stage-aware success copy

**Files:**
- Modify: `stripe-app/src/components/submit/SubmissionConfirmation.tsx`
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx` (one prop pass-through)

- [ ] **Step 6.1: Add `isInquiry` prop to `SubmissionConfirmation`**

In `stripe-app/src/components/submit/SubmissionConfirmation.tsx`, find the props interface (around line 4):

```ts
interface SubmissionConfirmationProps {
  response: SubmissionResponse;
  onBackToList?: () => void;
}
```

Replace with:

```ts
interface SubmissionConfirmationProps {
  response: SubmissionResponse;
  onBackToList?: () => void;
  isInquiry?: boolean;
}
```

Update the function signature (around line 24):

```tsx
export default function SubmissionConfirmation({ response, onBackToList }: SubmissionConfirmationProps) {
```

To:

```tsx
export default function SubmissionConfirmation({ response, onBackToList, isInquiry = false }: SubmissionConfirmationProps) {
```

- [ ] **Step 6.2: Replace the success banner copy at lines 46-50**

Find:

```tsx
      <Banner
        type="default"
        title="Evidence submitted"
        description="Your rebuttal is on its way to the card issuer."
      />
```

Replace with:

```tsx
      <Banner
        type="default"
        title={isInquiry ? 'Response sent' : 'Evidence submitted'}
        description={
          isInquiry
            ? 'Stripe will close the inquiry or notify you if it escalates to a chargeback.'
            : 'Your rebuttal is on its way to the card issuer.'
        }
      />
```

- [ ] **Step 6.3: Replace the "What happens next" body copy at lines 52-57**

Find:

```tsx
      <Box css={{ stack: 'y', gap: 'small' }}>
        <Inline css={{ font: 'heading' }}>What happens next</Inline>
        <Box>
          The bank typically takes 60-75 days to issue a decision. You will be
          notified in Stripe when the dispute is resolved.
        </Box>
```

Replace with:

```tsx
      <Box css={{ stack: 'y', gap: 'small' }}>
        <Inline css={{ font: 'heading' }}>What happens next</Inline>
        <Box>
          {isInquiry
            ? 'The card issuer reviews your response. If it satisfies the inquiry, the case closes. If not, it can escalate to a chargeback — you will be notified in Stripe and asked to submit again.'
            : 'The bank typically takes 60-75 days to issue a decision. You will be notified in Stripe when the dispute is resolved.'}
        </Box>
```

- [ ] **Step 6.4: Pass `isInquiry` through from `DisputeWorkflow.tsx`**

In `stripe-app/src/components/DisputeWorkflow.tsx`, locate the existing `isInquiry` import status:

```bash
grep -n "isInquiry" stripe-app/src/components/DisputeWorkflow.tsx
```

If `isInquiry` is not yet imported (Task 7 may add it), add it to the imports from `'../lib/utils'` along with whatever is already imported there (`getDaysRemaining, isResolved, isDisputeExpired` per the existing file). The import line will look like:

```ts
import { getDaysRemaining, isResolved, isDisputeExpired, isInquiry } from '../lib/utils';
```

Then find the `<SubmissionConfirmation` instantiation around line 322:

```tsx
              {submitted && dispute.evidence_submitted_at ? (
                <SubmissionConfirmation
                  response={{
                    submission_id: '',
                    submitted_at: dispute.evidence_submitted_at,
                    dispute_status: 'evidence_submitted',
                    warnings: [],
                  }}
                />
```

Add the prop:

```tsx
              {submitted && dispute.evidence_submitted_at ? (
                <SubmissionConfirmation
                  response={{
                    submission_id: '',
                    submitted_at: dispute.evidence_submitted_at,
                    dispute_status: 'evidence_submitted',
                    warnings: [],
                  }}
                  isInquiry={isInquiry(dispute.status)}
                />
```

- [ ] **Step 6.5: Type-check**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6.6: Commit**

```bash
git add stripe-app/src/components/submit/SubmissionConfirmation.tsx stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): inquiry-aware success copy after submission

Post-submit messaging now reflects that inquiries can either close
or escalate (rather than wait 60-75 days for a card-issuer
decision). Adds optional isInquiry prop to SubmissionConfirmation;
DisputeWorkflow computes it from dispute.status.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: DisputeWorkflow — Discover inquiry banner

**Files:**
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx`

- [ ] **Step 7.1: Verify `isInquiry` is imported**

Task 6 added `isInquiry` to the import. If for any reason it is not present (e.g. tasks ran out of order), add it now.

```bash
grep -n "isInquiry" stripe-app/src/components/DisputeWorkflow.tsx
```

If absent, edit the import:

```ts
import { getDaysRemaining, isResolved, isDisputeExpired, isInquiry } from '../lib/utils';
```

- [ ] **Step 7.2: Add the Discover banner above the existing `submitted` and `expired` banners**

In `DisputeWorkflow.tsx`, find the banner cluster around lines 251-265:

```tsx
        <Box css={{ padding: 'medium', paddingBottom: 'small', stack: 'y', gap: 'small' }}>
          {submitted && (
            <Banner
              type="default"
              title="Evidence submitted"
              description="Your evidence has been submitted to Stripe. This dispute is now read-only."
            />
          )}
          {expired && (
            <Banner
              type="critical"
              title="Response deadline has passed"
              description="No further action can be taken on this dispute. Evidence uploads, narrative generation, and submission are disabled."
            />
          )}
          <DeadlineTimer dueBy={dispute.due_by} status={dispute.status} />
        </Box>
```

Insert the Discover banner BEFORE the `submitted` and `expired` banners (so it shows above them when applicable):

```tsx
        <Box css={{ padding: 'medium', paddingBottom: 'small', stack: 'y', gap: 'small' }}>
          {dispute.network === 'discover' && dispute.status === 'warning_needs_response' && (
            <Banner
              type="caution"
              title="Discover inquiry — respond now"
              description="Discover requires a response to this inquiry. If you don't respond now, you may lose the ability to challenge a future chargeback on this payment."
            />
          )}
          {submitted && (
            <Banner
              type="default"
              title="Evidence submitted"
              description="Your evidence has been submitted to Stripe. This dispute is now read-only."
            />
          )}
          {expired && (
            <Banner
              type="critical"
              title="Response deadline has passed"
              description="No further action can be taken on this dispute. Evidence uploads, narrative generation, and submission are disabled."
            />
          )}
          <DeadlineTimer dueBy={dispute.due_by} status={dispute.status} />
        </Box>
```

- [ ] **Step 7.3: Type-check**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7.4: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): warn merchants about Discover inquiry urgency

Per Stripe docs, Discover inquiries become unchallengeable if the
merchant does not respond. New banner surfaces this risk on the
dispute detail page when network=discover and the inquiry is
awaiting response.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: DisputeWorkflow — escalation banner

**Files:**
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx`

- [ ] **Step 8.1: Compute the escalation flag**

In `DisputeWorkflow.tsx`, find the existing flag computation around line 138:

```ts
  const submitted = Boolean(dispute.evidence_submitted_at);
  const expired = !submitted && isDisputeExpired(dispute.due_by, dispute.status);
```

Add immediately below:

```ts
  // True only when an inquiry has just escalated to a chargeback. The webhook
  // handler clears evidence_submitted_at on this transition, but Stripe still
  // reports a non-zero submission_count. needs_response (no warning_ prefix)
  // means we are now in a chargeback. Together these only co-occur after
  // escalation — we cannot reach this state via normal chargeback flows.
  const justEscalated =
    dispute.status === 'needs_response' &&
    (dispute.evidence_submission_count ?? 0) > 0 &&
    !submitted;
```

- [ ] **Step 8.2: Add the escalation banner alongside the Discover banner**

The Discover banner block from Task 7 now lives at the top of the banner cluster. Add the escalation banner immediately after it (still above `submitted` and `expired`):

```tsx
          {dispute.network === 'discover' && dispute.status === 'warning_needs_response' && (
            <Banner
              type="caution"
              title="Discover inquiry — respond now"
              description="Discover requires a response to this inquiry. If you don't respond now, you may lose the ability to challenge a future chargeback on this payment."
            />
          )}
          {justEscalated && (
            <Banner
              type="caution"
              title="Inquiry escalated to chargeback"
              description="Your prior response was sent to address the inquiry. Stripe requires a fresh submission to address the chargeback. Review your evidence and submit again before the deadline."
            />
          )}
          {submitted && (
```

(Leave the rest of the cluster unchanged.)

- [ ] **Step 8.3: Type-check**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8.4: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): banner on detected inquiry → chargeback escalation

After the backend clears evidence_submitted_at on escalation, the
wizard re-opens to a "needs response" state without context. New
banner explains that the prior submission addressed the inquiry
and a fresh submission is required for the chargeback.

Triggered by status=needs_response AND evidence_submission_count>0
AND local evidence_submitted_at is null — a combination only
reachable via escalation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Manual QA in dev iframe

**Files:** none (verification only)

- [ ] **Step 9.1: Start the dev backend**

```bash
cd backend && npm run dev
```

Leave running in the background. Note the local URL it binds to (typically `http://localhost:3000`).

- [ ] **Step 9.2: Start the Stripe app in test mode**

In a second terminal:

```bash
cd stripe-app && stripe apps start
```

This opens the Stripe dashboard with the WinBack app embedded.

- [ ] **Step 9.3: Trigger a fresh inquiry on WinBack's test account**

In a third terminal (the WinBack profile is the default per current `stripe config`):

```bash
stripe trigger charge.dispute.created
```

Note the dispute ID from the output.

- [ ] **Step 9.4: Verify the "Inquiry" pill renders**

In the Stripe dashboard with WinBack open:
- Navigate to the WinBack disputes list.
- Confirm the new dispute card shows an "Inquiry" pill alongside the existing status badge.
- Confirm the layout does not wrap awkwardly. If it does, check on the narrowest dashboard width.

- [ ] **Step 9.5: Verify stage-aware copy in the wizard**

- Open the dispute. Walk to the "Submit" tab.
- Confirm the heading reads "Respond to prevent a chargeback" (not "Submit evidence").
- Confirm the primary button reads "Submit response" (not "Submit to Stripe").

- [ ] **Step 9.6: Submit the inquiry and verify success copy**

- Acknowledge the "submission is final" checkbox.
- Click "Submit response".
- Confirm the success banner reads "Response sent" (not "Evidence submitted").
- Confirm the "What happens next" body copy mentions the inquiry-can-escalate language.

- [ ] **Step 9.7: Simulate escalation**

The Stripe CLI does not have a direct "escalate inquiry" trigger. Use the Stripe API to update the dispute via the test mode key:

```bash
DISPUTE_ID=du_xxxxxxxx  # replace with the ID from step 9.3
curl https://api.stripe.com/v1/disputes/${DISPUTE_ID} \
  -u "$(stripe config --list 2>/dev/null | awk '/test_mode_api_key/{print $3}' | tr -d "'")":  \
  -d "metadata[escalation_simulated]=2026-04-27"
```

This will not actually flip the status to `needs_response` — Stripe doesn't expose that mutation. Instead, fall back to forging a webhook to local dev:

```bash
# Get the live dispute object
stripe disputes retrieve "$DISPUTE_ID" > /tmp/dispute.json

# Patch the status field to needs_response and POST as a webhook
# (Use a small node/python script or stripe-cli's `stripe events resend`
# with a custom payload — exact mechanics decided here in implementation.)
```

If the forge-webhook approach is more than ~10 minutes of work, skip it for this manual pass and rely on the integration test in Task 10 to cover the escalation path. Document in the PR description that the escalation reset has integration coverage but no end-to-end manual verification (acceptable given Stripe's CLI limitations).

- [ ] **Step 9.8: Verify the `warning_closed` badge**

In the Stripe dashboard, find an existing closed-inquiry dispute (or simulate one by manually closing the test inquiry via the Dashboard UI). Confirm the WinBack list shows "Inquiry closed" / info, not "Lost" / negative.

If no such dispute exists in test mode, this step can be deferred to first production data — the unit test in Task 3 already verifies the mapping change.

- [ ] **Step 9.9: Take screenshots of the changes**

Capture screenshots of the new pill and banners for the PR description. No file edits in this step.

- [ ] **Step 9.10: No commit needed**

This task produces no source changes. Notes go in the PR description.

---

## Task 10: Integration test for the escalation flow

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 10.1: Inspect the existing integration test fixtures**

```bash
sed -n '1,40p' backend/__tests__/integration/fixtures.ts 2>/dev/null || \
  ls backend/__tests__/integration/
```

Confirm where `TEST_DISPUTE_ID` and `TEST_ACCOUNT_ID` are defined and how the existing flow is structured. The existing test uses real dev Supabase with mocked Stripe/auth.

- [ ] **Step 10.2: Add a new describe block at the bottom of the test file**

Append a new `describe` block to `backend/__tests__/integration/dispute-wizard-flow.test.ts` (above the closing `});` of the file, but as a sibling to the existing top-level describe). Locate the import for `handleDisputeEvent` and the mocks for `webhook_events` if they exist; if `handleDisputeEvent` is not already imported, add the import at the top.

```ts
import { handleDisputeEvent } from "@/lib/webhooks/handle-dispute-event";

describe("Inquiry → chargeback escalation", () => {
  // Reuses the same TEST_ACCOUNT_ID and TEST_DISPUTE_ID as the main flow
  // but seeds the dispute row at the inquiry stage to isolate the
  // escalation behavior. Cleanup runs in afterAll of the parent describe.

  it("clears evidence_submitted_at and preserves narrative on escalation", async () => {
    // 1. Seed the disputes row at warning_needs_response with a submission
    //    timestamp + narrative + checklist state set, so we can assert
    //    that only evidence_submitted_at is cleared on escalation.
    const submittedAt = new Date("2026-04-25T10:00:00Z").toISOString();
    const seedNarrative = "The merchant fulfilled the order on time.";
    const seedChecklistState = { receipt: true, shipping_proof: true };

    // First ensure the merchant exists (re-uses the parent setUp pattern):
    const { data: merchant } = await testDb
      .from("merchants")
      .upsert(
        {
          stripe_account_id: TEST_ACCOUNT_ID,
          billing_tier: "usage",
        },
        { onConflict: "stripe_account_id" },
      )
      .select("id")
      .single();
    if (!merchant) throw new Error("merchant seed failed");

    await testDb
      .from("disputes")
      .upsert(
        {
          stripe_dispute_id: TEST_DISPUTE_ID,
          merchant_id: merchant.id,
          stripe_charge_id: "ch_test_inquiry",
          amount: 100,
          currency: "usd",
          reason_code: "fraudulent",
          status: "warning_needs_response",
          evidence_submitted_at: submittedAt,
          narrative_text: seedNarrative,
          narrative_generations_count: 1,
          checklist_state: seedChecklistState,
        },
        { onConflict: "stripe_dispute_id" },
      );

    // 2. Synthesize a charge.dispute.updated event with status=needs_response
    //    (the escalation transition).
    const escalationEvent = {
      id: "evt_test_escalation",
      type: "charge.dispute.updated" as const,
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: TEST_DISPUTE_ID,
          object: "dispute",
          amount: 100,
          currency: "usd",
          charge: "ch_test_inquiry",
          reason: "fraudulent",
          status: "needs_response",
          evidence_details: {
            due_by: Math.floor(Date.now() / 1000) + 7 * 86_400,
            has_evidence: true,
            past_due: false,
            submission_count: 1,
          },
          livemode: false,
          created: Math.floor(Date.now() / 1000) - 86_400,
        },
      },
    } as unknown as Parameters<typeof handleDisputeEvent>[0];

    await handleDisputeEvent(escalationEvent, TEST_ACCOUNT_ID);

    // 3. Assert: evidence_submitted_at is null, status is needs_response,
    //    narrative_text and checklist_state are preserved.
    const { data: postEscalation } = await testDb
      .from("disputes")
      .select("status, evidence_submitted_at, narrative_text, narrative_generations_count, checklist_state")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();

    expect(postEscalation).toMatchObject({
      status: "needs_response",
      evidence_submitted_at: null,
      narrative_text: seedNarrative,
      narrative_generations_count: 1,
      checklist_state: seedChecklistState,
    });
  });
});
```

- [ ] **Step 10.3: Run only the new test**

```bash
cd backend && npm run test:integration -- --grep "Inquiry → chargeback escalation"
```

Expected: PASS. If the test fails because the seed step's `narrative_text` or `checklist_state` columns do not exist or are named differently, inspect `backend/supabase/migrations/` and adjust column names to match the actual schema.

- [ ] **Step 10.4: Run the full integration suite**

```bash
cd backend && npm run test:integration
```

Expected: PASS. Per [CLAUDE.md](../../../CLAUDE.md), the integration suite must be green before any backend PR merges.

- [ ] **Step 10.5: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): integration coverage for inquiry → chargeback escalation

Walks the bug-prone path end-to-end: seed an inquiry with prior
submission + narrative + checklist, fire the escalation webhook,
assert evidence_submitted_at clears while narrative/checklist
state are preserved.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Final verification + push

**Files:** none (verification + push)

- [ ] **Step 11.1: Run the full backend test suite (unit)**

```bash
cd backend && npm test
```

Expected: PASS.

- [ ] **Step 11.2: Run the full backend integration suite**

```bash
cd backend && npm run test:integration
```

Expected: PASS.

- [ ] **Step 11.3: Type-check the stripe-app package**

```bash
cd stripe-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 11.4: Build the stripe-app package as a sanity check**

```bash
cd stripe-app && npm run build
```

Expected: build succeeds; no errors. The build artifacts (`stripe-app/.build/`) update — they are committed alongside source per existing repo convention. Do not separately commit them; they roll forward with the source commits.

If `.build/` files have changed and were not committed by earlier task commits, stage and commit them now:

```bash
git status
# If there are untracked/modified .build files:
git add stripe-app/.build/
git commit -m "$(cat <<'EOF'
chore(stripe-app): rebuild artifacts for inquiry/chargeback handling

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 11.5: Review the diff**

```bash
git log --oneline main..HEAD
git diff main...HEAD --stat
```

Confirm the commit list matches Tasks 1-10 (plus optional 11.4 build commit).

- [ ] **Step 11.6: Hand back to the user**

Stop here. The user wants to control the QA pass and the PR creation. Report:
- Commits landed (count + list)
- Test results (unit + integration both green)
- Manual QA notes from Task 9 (what was verified, what was deferred)
- Anything skipped (e.g. step 9.7 if the forge-webhook was deemed over-budget)

---

## Self-review notes

- Spec coverage: Tasks 1+2 cover the silent-data-loss bug. Task 3 covers `warning_closed`. Tasks 4-8 cover visual differentiation and stage-aware copy (pill, two banners, two copy variants). Task 10 covers the integration test. Task 11 is the verification gate. All §3 spec sections accounted for.
- Type consistency: helper signature `isInquiryToChargebackEscalation(oldStatus: string | null | undefined, newStatus: string)` is consistent across Task 1 (definition), Task 2 (caller signature with `priorStatus` extracted as `string | undefined`).
- The frontend `isInquiry` is named identically to the backend export but they live in different files; this is intentional given the no-shared-code constraint between the two packages. The names match for cognitive consistency.
- Task 9's escalation simulation step 9.7 is deliberately soft — Stripe test mode does not expose a clean escalation trigger, and forging a webhook is real work. Integration test (Task 10) provides the safety net.
