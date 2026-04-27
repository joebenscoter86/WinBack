# Inquiry vs Chargeback Handling — Design

**Date:** 2026-04-27
**Status:** Approved
**Priority:** P0 — launch blocker, fix before further QA
**Linear:** TBD (file when plan lands)

## Background

Stripe disputes have two stages:

- **Inquiry** — `payment_method_details.card.case_type === "inquiry"`, status prefixed `warning_*` (e.g. `warning_needs_response`, `warning_under_review`, `warning_closed`). A pre-dispute warning. Funds are not held. Responding can prevent escalation.
- **Chargeback** — `case_type === "chargeback"`, status `needs_response` / `under_review` / `won` / `lost` / `charge_refunded`. Funds withheld. Formal dispute with a deadline.

Per Stripe docs, an inquiry can escalate to a chargeback; when it does, the merchant **must submit evidence again** — the inquiry response and chargeback response are separate submissions.

A QA pass uncovered three concrete bugs in WinBack's handling:

1. **Silent data-loss bug.** When an inquiry escalates to a chargeback, WinBack does not clear the dispute's `evidence_submitted_at` field. The frontend wizard gates the submission UI on `Boolean(dispute.evidence_submitted_at)`, so a merchant who responded at the inquiry stage will see "already submitted" on the chargeback and silently miss the chargeback deadline. This is a money/credibility incident in production.
2. **Wrong status badge.** The status badge mapping in `stripe-app/src/lib/utils.ts` renders `warning_closed` as "Lost" / negative. `warning_closed` only means the inquiry closed; Stripe does not tell us whether it closed in the merchant's favor or not. Mapping it to "Lost" is misleading.
3. **No visual differentiation.** Inquiries and chargebacks render identically in the dispute list. Merchants cannot tell whether funds are held or whether this is a pre-dispute warning. The list filter merges `needs_response` and `warning_needs_response` into the same "Needs response" tab without distinguishing them.

Plus a Discover-specific risk: per Stripe docs, Discover inquiries become unchallengeable if the merchant doesn't respond. Today WinBack does nothing to flag this.

## Goals

- Eliminate the silent submission-loss class of bug. After an escalation, the merchant must see a clear re-submission prompt.
- Stop misrepresenting `warning_closed` as a loss.
- Give the merchant enough visual context to understand what stage of dispute they are looking at.
- Surface Discover-specific urgency for inquiries.

## Non-goals

- Persisting `case_type` as a column (we infer from the `warning_*` status prefix).
- Splitting inquiries into a separate filter tab. The single "Needs response" queue stays.
- Inquiry-specific playbooks. The chargeback playbooks are heavier than necessary for inquiries but not harmful; defer this.
- Cleaning up the custom `evidence_submitted` status the submit route writes (a known issue, separate cleanup).
- Backfilling existing dispute rows. Pre-launch — dev test data is disposable.

## Scope

**In scope:**

1. Backend: clear `evidence_submitted_at` when an inquiry → chargeback escalation is detected in the webhook handler.
2. Frontend: fix the `warning_closed` badge.
3. Frontend: render an "Inquiry" pill on dispute cards.
4. Frontend: stage-aware copy in the wizard's submit step.
5. Frontend: re-submission banner shown after a detected escalation.
6. Frontend: Discover-specific banner on inquiry detail.
7. Tests: unit, webhook handler, and integration coverage for the escalation path.

**Out of scope:** see Non-goals above.

## Touchpoints

| File | Change |
|---|---|
| `backend/lib/disputes/inquiry.ts` (new) | Shared helpers: `isInquiry()`, `isInquiryToChargebackEscalation()` |
| `backend/lib/webhooks/handle-dispute-event.ts` | Detect escalation, include `evidence_submitted_at: null` in the upsert payload |
| `stripe-app/src/lib/utils.ts` | Fix `warning_closed` badge mapping; add a frontend `isInquiry()` helper |
| `stripe-app/src/views/DisputeListView.tsx` (or the card component it renders) | Render "Inquiry" pill when `isInquiry(dispute.status)` |
| `stripe-app/src/components/DisputeWorkflow.tsx` | Stage-aware copy variants, escalation banner, Discover banner |
| `backend/lib/webhooks/__tests__/handle-dispute-event.test.ts` | Escalation reset tests |
| `backend/__tests__/integration/dispute-wizard-flow.test.ts` (or sibling) | End-to-end inquiry → escalation → resubmit flow |
| Frontend test files (locate during impl) | Badge + helper tests |

No DB migration. No backfill.

## Behavior

### Backend — escalation detection (the core fix)

In `handleDisputeEvent`, on `charge.dispute.updated`:

1. Read the existing `disputes` row by `stripe_dispute_id` (single `.select`).
2. If `existing.status` starts with `warning_` AND the incoming `dispute.status === "needs_response"` → this is an inquiry → chargeback escalation.
3. On escalation, include `evidence_submitted_at: null` in the upsert payload, in addition to the fields produced by `disputeToRow()`.
4. `narrative_text`, `narrative_generations_count`, `checklist_state`, and `checklist_notes` are not touched (the existing `disputeToRow()` does not include them, so they are preserved by default).

Idempotency: the existing `webhook_events` table already gates duplicate event processing, so a replayed event will not re-clear an already-cleared field.

If the existing row is missing (no prior row for this dispute), the escalation check is `false`. The upsert proceeds as a normal insert.

### Shared helpers

New `backend/lib/disputes/inquiry.ts`:

```ts
export function isInquiry(status: string): boolean {
  return status.startsWith("warning_");
}

export function isInquiryToChargebackEscalation(
  oldStatus: string | null | undefined,
  newStatus: string,
): boolean {
  return Boolean(oldStatus) && oldStatus!.startsWith("warning_") && newStatus === "needs_response";
}
```

The frontend gets its own `isInquiry()` in `stripe-app/src/lib/utils.ts`. The two packages do not share code.

### Frontend — status badge fix

In `getStatusBadge` ([stripe-app/src/lib/utils.ts:36-57](stripe-app/src/lib/utils.ts#L36-L57)):

- `warning_closed` → `{ label: 'Inquiry closed', type: 'info' }` *(was `{ label: 'Lost', type: 'negative' }`)*
- `warning_needs_response` → unchanged (already `{ label: 'Needs Response', type: 'urgent' }`)
- `warning_under_review` → unchanged (already `{ label: 'Under Review', type: 'info' }`)

`RESOLVED_STATUSES` ([stripe-app/src/lib/utils.ts:17](stripe-app/src/lib/utils.ts#L17)) is unchanged; `warning_closed` stays in the resolved bucket so list filter behavior is unchanged.

### Frontend — Inquiry pill

When `isInquiry(dispute.status)` is true on the dispute list, render a small `Badge` reading "Inquiry" (Stripe SDK `Badge` component, `type="info"`) alongside the existing status badge. The exact insertion point — `DisputeListView.tsx` or a child card component it renders — is an implementation detail, located during implementation.

### Frontend — wizard copy variants

In `DisputeWorkflow`, when `isInquiry(dispute.status)` is true, replace the submit-step copy that today is tuned for chargebacks with inquiry-tuned copy:

- Heading-level copy on the submit step: "Respond to prevent a chargeback"
- Primary CTA button label: "Submit response"
- Post-submit success message: "Response sent. Stripe will close the inquiry or notify you if it escalates to a chargeback."

The exact strings being replaced are located during implementation by reading `DisputeWorkflow.tsx`. When `isInquiry(dispute.status)` is false, the existing chargeback copy renders unchanged.

### Frontend — escalation banner

Shown on the dispute detail page when **all** of the following are true:

- `dispute.status === "needs_response"` (real chargeback, not inquiry)
- `dispute.evidence_submission_count > 0` (Stripe reports a prior submission round)
- `dispute.evidence_submitted_at` is null in our local row

This combination is only reachable via inquiry → chargeback escalation. A Stripe Dashboard bypass at the chargeback stage would leave status at `under_review` post-submit, not `needs_response`.

Banner copy:

> *"This inquiry escalated to a chargeback. Your prior response was sent to address the inquiry — Stripe requires a fresh submission to address the chargeback. Review your evidence and submit again before [deadline]."*

`[deadline]` substitutes the formatted `due_by`.

### Frontend — Discover inquiry banner

Shown on the dispute detail page when **all** of the following are true:

- `dispute.network === "discover"`
- `dispute.status === "warning_needs_response"`

Banner copy:

> *"Discover requires a response to this inquiry. If you don't respond now, you may lose the ability to challenge a future chargeback on this payment."*

The Discover banner and the escalation banner are not mutually exclusive. If a Discover inquiry escalates, both can render (acceptable; the situations are independent).

## Data flow

```
Stripe → POST /api/webhooks/stripe → handleDisputeEvent(event, accountId)
                                           ↓
                                    SELECT row from disputes by stripe_dispute_id
                                           ↓
                            isInquiryToChargebackEscalation(existing.status, dispute.status)?
                                           ↓
                          YES → upsert: { ...disputeToRow(d), evidence_submitted_at: null }
                          NO  → upsert: { ...disputeToRow(d) }
                                           ↓
                                       Supabase
```

Frontend has no new data flow. The list and detail views fetch from the existing `/api/disputes` endpoint, which already returns `evidence_submitted_at`, `evidence_submission_count`, and `network`. The new banners and copy variants only consume fields already in scope.

## Edge cases

- **No existing row.** First time the webhook sees this dispute. SELECT returns null. `isInquiryToChargebackEscalation` returns false (treats null oldStatus as not-warning). Normal upsert proceeds.
- **Replay/duplicate webhook events.** Gated by the existing `webhook_events` idempotency table. No double-clearing.
- **Same-status update** (e.g. `warning_needs_response` → `warning_needs_response`). New status is `warning_needs_response`, not `needs_response`, so the escalation check returns false. No-op.
- **Reverse transition** (`needs_response` → `warning_needs_response`). Not a real Stripe flow, but if it happened, our detection is one-directional. Safe.
- **Race: webhook arrives mid-submission.** The existing dispute_submissions reconciliation logic handles in-flight submissions on a separate code path (`backend/app/api/disputes/[disputeId]/submit/route.ts`). The escalation reset is on `dispute.updated`. The two paths are independent.
- **Multiple escalations.** Stripe creates a new dispute object for re-filed disputes, with a new `stripe_dispute_id`. Our code keys on this ID, so a new row is created. No conflict.
- **Discover + escalation simultaneously.** Both banners render. Acceptable.

## Testing

### Unit

- `isInquiry()`: truthtable across all 8 `DisputeStatus` values, frontend and backend.
- `isInquiryToChargebackEscalation()`: transition tests covering escalation, same-status, reverse, null-old, all `warning_*` variants.
- `getStatusBadge('warning_closed')` returns `{ label: 'Inquiry closed', type: 'info' }`.

### Webhook handler

In `backend/lib/webhooks/__tests__/handle-dispute-event.test.ts`:

- **Escalation clears submission timestamp.** Seed a row with `status='warning_needs_response'` and `evidence_submitted_at` set. Process a `charge.dispute.updated` event with `status='needs_response'`. Assert the upserted row has `evidence_submitted_at === null` and `status === 'needs_response'`.
- **No false positive on same-status update.** Seed a row with `status='warning_needs_response'`, `evidence_submitted_at` set. Process an update where status stays `warning_needs_response`. Assert `evidence_submitted_at` is preserved (not in the upsert payload as null).
- **No false positive on warning → warning_closed.** Seed `status='warning_needs_response'`, process update to `warning_closed`. Escalation check is false (new is not `needs_response`). `evidence_submitted_at` not cleared.
- **`charge.dispute.created` does not require a SELECT.** Existing test path. Verify the new code does not introduce an extra read on created events.

### Integration

In `backend/__tests__/integration/` (extend `dispute-wizard-flow.test.ts` or add a sibling):

- Full path: open an inquiry → walk the wizard → submit → simulate the `dispute.updated` escalation webhook → re-open dispute → submit again.
- Assert: prior `narrative_text` and `checklist_state` are preserved; second submission succeeds.

### Manual QA

- `stripe trigger charge.dispute.created` for inquiry coverage (existing).
- Escalation: Stripe test mode does not expose a one-shot "escalate inquiry" trigger. Two options to decide during implementation: (a) POST a synthetic webhook payload to local dev that mimics escalation, or (b) write a dev-only script that uses the Stripe API to mutate the dispute and replay the webhook locally.

## Rollout

Single PR. All changes are tightly coupled — a partial deploy (e.g. badge fixed but escalation still broken) would leave the system in a worse state than today.

No DB migration required.
No production backfill required.

## Risks and mitigations

- **Risk: the heuristic-based escalation banner trigger fires when it shouldn't.** Trigger is `needs_response` AND `submission_count > 0` AND local `evidence_submitted_at` null. We argued this is only reachable via escalation. If a real-world flow violates this assumption (e.g. issuer re-files in a way that resets submission count), the banner may show or not show incorrectly. The mitigation is logging: when the escalation upsert path fires in the webhook handler, emit a Sentry breadcrumb or log line so we can verify behavior post-launch.
- **Risk: the Inquiry pill wraps awkwardly on narrow viewports.** The Stripe Dashboard iframe constrains width. Verify visually during implementation; fall back to a single combined badge ("Inquiry · Needs Response") if layout breaks.
- **Risk: stage-aware copy reads as inconsistent if a merchant has both a chargeback and an inquiry open.** Each dispute is a separate row with its own state. Copy is per-dispute. Should be fine.

## Decisions log

- **Q1 — preserve work product on escalation:** keep `narrative_text`, `narrative_generations_count`, `checklist_state`, `checklist_notes`; clear only `evidence_submitted_at`. Show a banner that explains why re-submission is needed.
- **Q2 — visual differentiation:** inline "Inquiry" pill on the card, no filter changes, no schema change. Infer from `warning_*` status prefix.
- **Q3 — `warning_closed` badge:** `{ label: 'Inquiry closed', type: 'info' }`.
- **Q4 — Discover risk:** dedicated banner shown for `network === "discover"` AND `status === "warning_needs_response"`.
- **Q5 — escalation banner copy:** see "Frontend — escalation banner" in the Behavior section.
- **Q6 — wizard copy variants:** stage-aware via `isInquiry(status)` branch.
- **Q7 — escalation detection mechanics:** SELECT existing row in webhook handler, compare statuses, single new branch.
- **Q8 — test coverage:** unit + webhook + integration as described in §6.
- **Q9 — schema/backfill:** no migration, no backfill.
- **Q10 — out of scope:** the custom `evidence_submitted` status written by the submit route is a known issue but not in scope for this fix.
