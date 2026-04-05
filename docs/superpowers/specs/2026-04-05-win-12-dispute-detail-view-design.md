# WIN-12: Dispute Detail View with Stripe Data

**Date:** 2026-04-05
**Status:** Draft
**Linear:** WIN-12
**Dependencies:** WIN-11 (done), WIN-31 (done), WIN-13 (done -- playbooks seeded)

## Summary

Build the dispute detail view inside the existing `DisputeWorkflow` FocusView. The Review tab (first wizard step) shows full dispute info auto-populated from Stripe, reason code context from the matching playbook, and a game plan for how to win. Smart urgency mode triggers when < 5 days remain.

## Approach

**Enrich the normalized dispute** -- expand `WinBackDispute` and `normalizeDispute` to include charge-level detail (transaction date, card info, billing address, receipt URL, metadata, evidence submission state). The frontend `Dispute` type mirrors this. The Review tab fetches dispute + playbook in parallel and renders actionable guidance.

---

## 1. Enriched Dispute Type

New fields added to `WinBackDispute` (backend) and `Dispute` (frontend):

| Field | Stripe Source | Type | Purpose |
|---|---|---|---|
| `transaction_date` | `charge.created` | `number` (unix) | When original purchase happened |
| `card_brand` | `charge.payment_method_details.card.brand` | `string` | "Visa ending in 4242" |
| `card_last4` | `charge.payment_method_details.card.last4` | `string` | Same |
| `billing_address` | `charge.billing_details.address` | `string?` (flattened: "line1, city, state postal_code, country" -- omit null parts) | Context for delivery disputes |
| `charge_description` | `charge.description` | `string?` | What customer was charged for |
| `receipt_url` | `charge.receipt_url` | `string?` | Link to Stripe receipt |
| `has_evidence` | `dispute.evidence` (any non-null field) | `boolean` | Whether merchant started evidence |
| `evidence_submission_count` | `dispute.evidence_details.submission_count` | `number` | Times evidence submitted |
| `is_charge_refundable` | `dispute.is_charge_refundable` | `boolean` | Can refund instead of fight |
| `metadata` | `charge.metadata` | `Record<string, string>` | Merchant's own order data |

Backend: update `normalizeDispute` in `backend/lib/stripe/normalize.ts` to extract these from the expanded Stripe `Dispute` object. The `/api/disputes/[disputeId]` route already expands `charge.customer` -- add `charge.payment_method_details` if needed (should already be included on the charge).

Frontend: update `Dispute` interface in `stripe-app/src/lib/types.ts` to include the new fields (all optional to maintain backwards compatibility with list view data).

## 2. Data Fetching

### Current state
- `DisputeWorkflow` receives only `disputeId: string`
- No data fetching inside the workflow

### New behavior
- `DisputeWorkflow` receives the full `Dispute` object from the list view (basic fields already available)
- Props change: `disputeId: string` becomes `dispute: Dispute`
- Update `DisputeListView` and `PaymentDisputeView` to pass the full dispute object

### Fetch on mount (inside DisputeWorkflow)
Two parallel requests when the FocusView opens:

1. **Enriched dispute:** `POST /api/disputes/{disputeId}` -- returns full `Dispute` with new fields
2. **Playbook:** `POST /api/playbooks` with `{ network: dispute.network, reason_code: dispute.reason_code }` -- returns `PlaybookData`

No waterfall -- both fire immediately since `network` and `reason_code` are available from the passed dispute object.

### Progressive rendering
- Immediately render what we have from the list view (amount, status, deadline, customer)
- When enriched dispute loads, fill in card info, receipt, metadata, etc.
- When playbook loads, render reason code breakdown and game plan
- Loading states: Spinner placeholders for playbook sections while fetching

### State shape
```typescript
interface WorkflowData {
  dispute: Dispute;           // starts with list data, enriched on fetch
  playbook: PlaybookData | null;  // null until loaded, or if not found
  loading: { dispute: boolean; playbook: boolean };
  errors: { dispute: string | null; playbook: string | null };
}
```

## 3. Review Tab Layout

The Review tab answers three questions: **What happened? How bad is it? What do I do?**

### Normal mode (>= 5 days remaining)

```
[Dispute Overview]
  - Amount + currency (large)
  - Status badge + urgency badge
  - Countdown: "12 days to respond"
  - Customer: name + email
  - Card: "Visa ending in 4242"
  - Transaction date + charge description
  - Charge ID / Dispute ID (caption, secondary)
  - Receipt link (if available)
  - Metadata key-value pairs (if present)

[Reason Code Breakdown]
  - Heading: playbook display_name (e.g., "Merchandise / Services Not Received")
  - Description: plain English explanation
  - Accordion: "What the issuer looks for" -> issuer_evaluation
  - Accordion: "What happens before the issuer sees your case" -> acquirer_prereview

[Game Plan]
  - Evidence summary: "4 mandatory items, 3 recommended"
  - Pro tips list
  - Common mistakes list with explanations
```

### Smart urgency mode (< 5 days remaining)

```
[Urgency Banner]
  - Banner (type: caution): "You have X days left. Focus on these essentials."
  - urgency_essentials.summary
  - Ordered priority list from urgency_essentials.ordered_items

[Dispute Overview]
  (same as normal mode)

[Reason Code Breakdown]
  - display_name + description still visible
  - issuer_evaluation and acquirer_prereview Accordions collapsed (still accessible)

[Game Plan]
  (same as normal mode)
```

The urgency banner appears at the top, pushing educational content down. Accordions default to collapsed so the merchant focuses on essentials.

## 4. Component Structure

New components under `stripe-app/src/components/review/`:

### `DisputeOverview.tsx`
- Props: `dispute: Dispute`
- Pure presentational. Renders amount, status badges, countdown, customer/card info, receipt link, metadata.
- Uses: `Box`, `Inline`, `Badge`, `Link`, `Icon`
- Reuses `getStatusBadge`, `getUrgencyBadge`, `getDaysRemaining` from `lib/utils`

### `ReasonCodeBreakdown.tsx`
- Props: `playbook: PlaybookData`
- Renders display name, description, issuer evaluation accordion, acquirer prereview accordion.
- Uses: `Box`, `Inline`, `Accordion`

### `GamePlan.tsx`
- Props: `playbook: PlaybookData`
- Renders evidence checklist summary (counts), pro tips list, common mistakes list.
- Uses: `Box`, `Inline`, `Icon`

### `UrgencyBanner.tsx`
- Props: `daysRemaining: number`, `essentials: UrgencyEssentials`
- Conditional render: only shown when `daysRemaining < 5`
- Uses: `Banner`, `Box`, `Inline`

### Review tab composition (inside DisputeWorkflow)

```
<ReviewTab dispute={dispute} playbook={playbook} daysRemaining={days}>
  {isUrgent && <UrgencyBanner />}
  <DisputeOverview dispute={dispute} />
  {playbook ? (
    <>
      <ReasonCodeBreakdown playbook={playbook} />
      <GamePlan playbook={playbook} />
    </>
  ) : (
    <PlaybookNotFoundBanner />
  )}
</ReviewTab>
```

## 5. Modified Existing Files

| File | Change |
|---|---|
| `backend/lib/stripe/normalize.ts` | Add new fields to `WinBackDispute`, update `normalizeDispute` |
| `stripe-app/src/lib/types.ts` | Add new optional fields to `Dispute`, add `PlaybookData` type (frontend mirror) |
| `stripe-app/src/components/DisputeWorkflow.tsx` | Accept `Dispute` prop, add data fetching, render Review tab content |
| `stripe-app/src/views/DisputeListView.tsx` | Pass full dispute object to `DisputeWorkflow` |
| `stripe-app/src/views/PaymentDisputeView.tsx` | Pass full dispute object to `DisputeWorkflow` |

## 6. Error & Edge Cases

- **Playbook not found (404):** Banner: "We don't have a specific playbook for this reason code yet. You can still gather evidence and submit." Dispute overview still renders. Game plan section shows fallback.
- **Dispute fetch error:** ErrorBanner with retry button. Keep showing list-view data while retrying.
- **Resolved disputes:** Review tab still renders all info (read-only context). Urgency mode never triggers for resolved disputes.
- **Missing optional fields:** Sections with no data (no metadata, no receipt URL, no customer email) simply don't render those rows. No "N/A" placeholders.

## 7. PlaybookData Frontend Type

Add a frontend mirror of `PlaybookData` to `stripe-app/src/lib/types.ts`. This is a subset of the backend type -- only the fields the Review tab needs:

```typescript
interface PlaybookData {
  network: string;
  reason_code: string;
  display_name: string;
  category: string;
  description: string;
  issuer_evaluation: string;
  acquirer_prereview: string;
  evidence_checklist: EvidenceChecklistItem[];
  common_mistakes: { mistake: string; explanation: string }[];
  pro_tips: { tip: string }[];
  urgency_essentials: { summary: string; ordered_items: string[] };
  narrative_template: string;
  response_deadline_days: number;
}
```

This type is shared across the workflow -- WIN-14 (evidence tab) and WIN-18 (narrative tab) will also use it.

## 8. Out of Scope

- Evidence checklist interaction (WIN-14)
- File upload (WIN-16)
- AI narrative generation (WIN-18)
- Evidence submission to Stripe (WIN-20)
- Countdown timer that live-updates (static calculation on render is sufficient -- disputes have multi-day deadlines, not seconds)
