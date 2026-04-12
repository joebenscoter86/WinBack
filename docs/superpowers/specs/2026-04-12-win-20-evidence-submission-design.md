# WIN-20: Stripe Disputes API Evidence Submission — Design Spec

> **Status:** Approved design, ready for implementation plan
> **Linear:** [WIN-20](https://linear.app/jkbtech/issue/WIN-20/build-stripe-disputes-api-evidence-submission-flow)
> **Depends on:** WIN-5 (research), WIN-16 (upload), WIN-19 (narrative), WIN-31 (auth)
> **Blocks:** WIN-27 (E2E QA)
> **Phase:** 2 — AI Narrative & Submission

## Context

WIN-20 is the final, irrevocable step of the dispute wizard: packaging uploaded evidence and the AI-generated narrative, then submitting it to Stripe via the Disputes API with `submit: true`. This is the highest-stakes action WinBack takes — once it lands with Stripe, there is no undo, and the merchant's ability to win the dispute is frozen.

### Architecture reality check

The ticket was authored with an assumed architecture of server-side batch file uploads at submit time. The actual architecture that shipped in WIN-16 is different: the Stripe Apps SDK's `StripeFileUploader` component uploads each file directly from the iframe to Stripe during the evidence step, and the backend only stores the resulting `stripe_file_id` metadata in `evidence_files`. By the time the merchant clicks Submit, every file is already in Stripe.

This reshapes several of the ticket's requirements:

- **"Partial failure (3 of 5 files upload)"** in the original ticket assumed a server-side batch upload step that does not exist. Per-file failures surface at upload time in the evidence wizard, not at submit time. For WIN-20, "partial failure" is redefined to the two cases that actually occur: missing mandatory checklist items (warn-pass per PRD) and `stripe.disputes.update` itself failing (idempotent retry).
- **File upload to Stripe** is out of scope — already done by WIN-16. This ticket only calls `stripe.disputes.update`, never `stripe.files.create`.

## Scope

### In scope

- One new API route: `POST /api/disputes/{stripe_dispute_id}/submit`
- One new pure library: `lib/disputes/build-evidence-payload.ts` (mapper)
- One new pure library: `lib/disputes/submission-guard.ts` (pre-submission checks)
- One thin Stripe client wrapper: `submitDispute()` in `lib/stripe/client.ts`
- One new migration: `009_dispute_submissions.sql`
- One new playbook property: `stripe_evidence_field` on `EvidenceChecklistItem`, backfilled across all 7 seeded playbooks
- Two new frontend components: `SubmitView` and `SubmissionConfirmation`
- Wizard read-only mode when `evidence_submitted_at` is non-null
- Unit tests for every new module, integration test extension (step 9) in the dispute wizard flow test, manual test pass in Docket sandbox

### Out of scope (explicit)

- Draft-save via `submit: false` (single-shot only — decided during brainstorm)
- Per-file retry queue (not reachable given WIN-16's upload architecture)
- Visa CE 3.0 qualification logic beyond pass-through of whatever Stripe already populated
- Mastercard 19-page limit enforcement (separate validation ticket)
- `charge.dispute.closed` webhook and outcome tracking (Phase 3)
- Email notifications on submit
- "Undo submit" (irrevocable by design)
- Submission analytics / win rate tracking (Phase 3)

## Architecture & Data Flow

All work happens in one Vercel API route: `POST /api/disputes/{stripe_dispute_id}/submit`. It is synchronous from the client's point of view — the Stripe call blocks the response. No polling, no background jobs.

### Flow

1. **Auth** — `withStripeAuth` middleware verifies Stripe App signature, provides `{accountId, userId}`.
2. **Load state** — fetch the local `disputes` row (by `stripe_dispute_id`), its `evidence_files`, `narrative_text`, and the playbook by `(network, reason_code)`.
3. **Pre-submission guard** — call `stripe.disputes.retrieve(id)` with `expand: ['charge']` (charge is also needed for auto-populated evidence fields). Reject if `dispute.status !== "needs_response"`. Warn-pass if `evidence_details.due_by` is in the past.
4. **Idempotent replay check** — look up `dispute_submissions` rows for this `dispute_id`:
   - `succeeded` row exists → return cached `stripe_response` as a 200 (idempotent replay, no Stripe call)
   - `pending` row exists and `created_at` < 60s old → return 409 `submission_in_progress`
   - `pending` row exists and `created_at` ≥ 60s old → stale, reconcile (see Edge Cases)
   - otherwise proceed
5. **Build evidence payload** — call `buildEvidencePayload({dispute, playbook, evidenceFiles, narrativeText, charge})`. Returns `{evidence, warnings}`.
6. **Validate not empty** — if `evidence` has no fields and `narrativeText` is empty → 422 `validation_failed`.
7. **Insert `dispute_submissions` row** with `status: 'pending'`, fresh UUID as `idempotency_key`, and the built `evidence_payload` snapshot. UNIQUE constraint on `idempotency_key` is the final race-condition backstop.
8. **Call Stripe** — `stripe.disputes.update(dispute_id, { evidence, submit: true }, { idempotencyKey })`.
9. **On success** — update `dispute_submissions` row: `status = 'succeeded'`, `stripe_response = <full dispute object>`, `completed_at = now()`. Update `disputes` row: `status = 'evidence_submitted'`, `evidence_submitted_at = now()`.
10. **On Stripe 5xx** — retry once with the same idempotency key. If still failing, update submissions row to `failed` with error details, return classified error.
11. **On other Stripe errors** — update submissions row to `failed`, return classified error. No retry.
12. **Response shape** — success: `{ data: { submission_id, submitted_at, dispute_status, warnings } }`. Error: `{ error, code, warnings? }`.

### Diagram

```
[stripe-app iframe]                    [Vercel /api/disputes/{id}/submit]
  SubmitView  ─────POST─────▶  auth → load state → stripe.disputes.retrieve
       ▲                              │
       │                              ├─▶ pre-sub guard (block/warn)
  200 success                         │
  4xx error                           ├─▶ dispute_submissions lookup
  with warnings                       │   (idempotent replay? in-flight?)
       ▲                              │
       │                              ├─▶ buildEvidencePayload()
       │                              │
       │                              ├─▶ INSERT submissions row (pending)
       │                              │
       │                              ├─▶ stripe.disputes.update(submit:true)
       │                              │   + idempotencyKey
       │                              │
       │                              └─▶ UPDATE submissions + disputes
       └──────────200/4xx/5xx─────────┘
```

## Evidence Mapper — `buildEvidencePayload`

**File:** `backend/lib/disputes/build-evidence-payload.ts`

**Signature:**

```ts
export function buildEvidencePayload(input: {
  dispute: NormalizedDispute;
  playbook: PlaybookData;
  evidenceFiles: EvidenceFileRow[];
  narrativeText: string | null;
  charge: Stripe.Charge;
}): {
  evidence: Stripe.DisputeUpdateParams.Evidence;
  warnings: SubmissionWarning[];
};
```

Pure function. No DB access. No network. Fully unit-testable.

### Mapping rules

1. **Auto-populated fields from charge** (always include when the charge has them):
   - `customer_name` ← `charge.billing_details.name`
   - `customer_email_address` ← `charge.billing_details.email`
   - `customer_purchase_ip` ← `charge.payment_method_details.card?.[...]` or fallback to `charge.outcome` fields per research doc
   - `billing_address` ← `charge.billing_details.address` flattened to a single string
   - `product_description` ← `charge.description` if present
2. **Narrative** → `uncategorized_text`. Truncate at 20,000 chars. If truncated, emit `field_truncated` warning.
3. **File evidence from checklist items** — for each row in `evidenceFiles`:
   - Look up the matching playbook item by `checklist_item_key`
   - Read `stripe_evidence_field` from the playbook item (see Playbook Data Changes below)
   - Write `evidence[stripe_evidence_field] = stripe_file_id`
4. **Collision rule** — Stripe file-evidence fields accept exactly one file ID each. If two `evidence_files` map to the same field:
   - Item with lower `urgency_order` wins (1 is most urgent; null is least)
   - Loser is rewritten to `uncategorized_file`
   - If `uncategorized_file` is also taken, loser is dropped and we emit `field_collision` warning
   - Intended path is that playbook authors design checklists so file-bearing items map to unique Stripe fields. Collision handling is defensive.
5. **Visa CE 3.0 pass-through** — if `network === "visa" && reason_code === "10.4"`, populate `evidence.enhanced_evidence.visa_compelling_evidence_3` from what Stripe already auto-filled (read from `dispute.evidence.enhanced_evidence`). No client-side qualification logic.
6. **Combined text cap** — sum of all text field character lengths must not exceed 150,000. If exceeded, truncate `uncategorized_text` first. Emit `field_truncated` warning.

### Warnings returned

```ts
type SubmissionWarning =
  | { code: 'field_truncated'; field: string; original_length: number; truncated_length: number }
  | { code: 'field_collision'; winning_item: string; losing_item: string; field: string; resolution: 'uncategorized_file' | 'dropped' }
  | { code: 'missing_mandatory_items'; items: string[] }
  | { code: 'deadline_passed'; due_by: number };
```

The route combines mapper warnings with guard warnings into a single array on the response.

## Pre-Submission Guard — `submission-guard.ts`

**File:** `backend/lib/disputes/submission-guard.ts`

**Signature:**

```ts
export function evaluateSubmissionGuard(input: {
  stripeDispute: Stripe.Dispute;
  playbook: PlaybookData;
  evidenceFiles: EvidenceFileRow[];
  narrativeText: string | null;
}): {
  action: 'allow' | 'block';
  blockCode?: 'dispute_not_submittable' | 'validation_failed';
  blockMessage?: string;
  warnings: SubmissionWarning[];
};
```

### Rules

- `dispute.status !== "needs_response"` → block with `dispute_not_submittable`, message includes current status
- `dispute.evidence_details?.due_by` is past → warn with `deadline_passed`, do not block
- Mandatory checklist items (`category === "mandatory"`) with no evidence file → warn with `missing_mandatory_items`, do not block
- Empty evidence AND empty narrative → block with `validation_failed`. This is the true-zero case; distinct from missing-mandatory-but-has-something which is warn-pass.

## Data Model — `dispute_submissions` Table

**Migration:** `backend/supabase/migrations/009_dispute_submissions.sql`

```sql
CREATE TABLE dispute_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed')),
  evidence_payload JSONB NOT NULL,
  stripe_response JSONB,
  error_code TEXT,
  error_message TEXT,
  warnings JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_submissions_dispute ON dispute_submissions(dispute_id);
CREATE INDEX idx_submissions_status ON dispute_submissions(dispute_id, status)
  WHERE status IN ('pending', 'succeeded');
```

**RLS:** follow the pattern in `002_enable_rls_and_policies.sql`. Service role full access; authenticated access scoped by joining `dispute_id → disputes.merchant_id`. Backend uses service role; RLS is defense in depth.

**No changes to `disputes` table** beyond updating the already-existing `status` and `evidence_submitted_at` columns on success.

### Why this shape

- `idempotency_key` is the Stripe idempotency key we sent. Unique constraint = one row per Stripe call, enforced at the database level.
- `evidence_payload` is stored *before* the Stripe call. If the process dies between call and response recording, the stale-pending recovery path has the payload to reconcile against Stripe's idempotent cache.
- `status = 'pending'` acts as an in-flight lock. The 60-second window check prevents double-click races across concurrent requests even before the UNIQUE constraint fires.
- `succeeded` rows are the replay cache. A second submit returns the stored `stripe_response` without a new Stripe call.
- Failed attempts stay as history. Retries create new rows with new idempotency keys.

## Playbook Data Changes

**File:** `backend/lib/playbooks/types.ts`

Add to `EvidenceChecklistItem`:

```ts
stripe_evidence_field: StripeEvidenceFileField;
```

Where `StripeEvidenceFileField` is a new union type listing every file-evidence field from the Stripe Disputes API, plus `'uncategorized_file'` as the explicit fallback:

```ts
export type StripeEvidenceFileField =
  | 'cancellation_policy'
  | 'customer_communication'
  | 'customer_signature'
  | 'duplicate_charge_documentation'
  | 'receipt'
  | 'refund_policy'
  | 'service_documentation'
  | 'shipping_documentation'
  | 'uncategorized_file';
```

**Naming collision note:** the existing `stripe_field` property is already used by WIN-19's narrative pre-gen to pull live transaction data (AVS, CVC, 3DS, authorization code) from `charge.payment_method_details`. It is **not** a Stripe Dispute Evidence field name. The new property is called `stripe_evidence_field` to avoid the collision. Both properties coexist on `EvidenceChecklistItem`.

### Backfill

Every checklist item in all 7 seeded playbooks (visa-10.4, visa-13.1, visa-13.2, visa-13.3, visa-13.6, mastercard-4808, mastercard-4853) gets an explicit `stripe_evidence_field` assignment. Items that don't have a dedicated Stripe field (e.g., "Screenshot of order details") get an explicit `'uncategorized_file'` assignment. No silent defaults.

Playbook authors are responsible for designing checklists so file-bearing items map to unique Stripe fields within a single playbook. The collision rule in the mapper exists as a defensive fallback, not the intended path.

## Stripe Client Wrapper

**File:** `backend/lib/stripe/client.ts` (extended)

```ts
export async function submitDispute(
  _accountId: string,
  disputeId: string,
  evidence: Stripe.DisputeUpdateParams.Evidence,
  idempotencyKey: string,
): Promise<Stripe.Dispute> {
  return getStripe().disputes.update(
    disputeId,
    { evidence, submit: true },
    { idempotencyKey },
  );
}
```

Thin wrapper for mockability and consistency with the existing `getDispute`, `getCharge`, etc. helpers.

## Frontend — Submit Step

### `SubmitView` component

**File:** `stripe-app/src/components/submit/SubmitView.tsx`

Final view of the dispute wizard. Reachable from the narrative tab via a "Continue to submit" button once narrative is generated.

**Layout:**

1. **Pre-submit summary** — dispute ID, reason code label, amount, evidence file count ("4 of 5 mandatory items attached"), narrative word count, last-edited timestamp, deadline badge (color-coded: green if comfortable, yellow if <3 days, red if past).
2. **Warnings Banner** (conditional, yellow) — lists any guard/mapper warnings received from the server on a prior failed attempt. On first render (no attempt yet), this is hidden; warnings appear after the first submit returns them.
3. **Irrevocability disclosure** — explicit language: *"Once you submit, your evidence is final and cannot be changed or recalled. Stripe will send it directly to the card issuer."*
4. **Confirmation checkbox** — "I understand this submission is final." Submit button is disabled until checked.
5. **Submit button** — disabled on click, shows spinner + "Submitting evidence…" while in flight. Client-side guard against double-click; server-side idempotency is the authoritative safety net.

**States:**

- `idle` — summary + checkbox + submit (enabled only if checked)
- `submitting` — button locked, spinner, all inputs disabled
- `success` — replaces view with `SubmissionConfirmation`
- `error` — red Banner with classified error message; retryable errors re-enable the submit button; terminal errors (`dispute_not_submittable`, `already_submitted`) show a "Refresh" CTA instead

### `SubmissionConfirmation` component

**File:** `stripe-app/src/components/submit/SubmissionConfirmation.tsx`

Success screen after a successful submit.

> ✓ **Evidence submitted**
>
> Your rebuttal is on its way to the card issuer.
>
> **What happens next:** The bank typically takes 60-75 days to issue a decision. You'll be notified in Stripe when the dispute is resolved.
>
> **Submitted at:** [timestamp]

Includes a "View in Stripe Dashboard" link to the native dispute page and a "Back to disputes" button.

### Wizard read-only mode

When the wizard loads a dispute with `evidence_submitted_at !== null`, every tab renders in read-only mode:

- Evidence tab: files listed, no add/delete/replace buttons
- Narrative tab: narrative visible, no edit or regenerate
- All tabs show a "Submitted" badge at the top
- No navigation to `SubmitView`

This is detected once in the dispute detail loader and passed down as a `submitted: boolean` prop to each tab component.

## Error Handling & Edge Cases

### Classified error codes

| Code | HTTP | Meaning | Client UX |
|---|---|---|---|
| `unauthorized` | 401 | Stripe App signature invalid | Middleware handles |
| `dispute_not_found` | 404 | Local dispute row missing | "Refresh this page and try again." |
| `dispute_not_submittable` | 409 | Stripe status ≠ `needs_response` | "This dispute is no longer accepting evidence. Current status: [x]." Refresh CTA, no retry |
| `submission_in_progress` | 409 | Pending row <60s old | "A submission is already in flight. Please wait a moment." Retry-after banner |
| `already_submitted` | — | Succeeded row exists | Returned as 200 with cached response, not an error |
| `validation_failed` | 422 | Empty evidence AND empty narrative | "Add at least one piece of evidence or a narrative before submitting." |
| `stripe_invalid_request` | 400 | Stripe rejected the payload | "Stripe rejected this submission: [message]." Not retryable without edits. |
| `stripe_rate_limit` | 429 | Stripe rate limit | "Try again in a moment." Retryable. |
| `stripe_5xx` | 502 | Stripe server error | Auto-retried once server-side first. Retryable. |
| `internal_error` | 500 | Unexpected | "Something went wrong. Your submission was NOT sent." Retryable. |

### Warnings (non-blocking, always returned alongside data)

- `deadline_passed`
- `missing_mandatory_items`
- `field_truncated`
- `field_collision`

### The "submitted but don't know it" gap

Failure mode: the route inserts a `pending` row, calls Stripe, Stripe accepts the evidence, but the process dies before the response is recorded. On the next submit attempt, the guard sees the stale `pending` row. Reconciliation:

1. Pre-sub guard re-fetches the dispute from Stripe.
2. If `dispute.status !== "needs_response"`, the prior submit landed. Mark the orphan pending row as `succeeded`, populate `stripe_response` from the fresh dispute, return 200 with the cached response. Merchant sees success.
3. If `dispute.status === "needs_response"`, the prior submit never reached Stripe. Mark the pending row as `failed` with `error_code: 'timeout_recovered'` and proceed with a fresh idempotency key and new attempt.

This path has an explicit integration test (see Testing).

### Double-click prevention (full chain)

- **Client:** submit button disabled immediately on click (React state).
- **Server, same instance:** the 60s pending-row window catches the second request and returns 409 `submission_in_progress`.
- **Server, two instances simultaneously:** both try to insert a pending row; the UNIQUE constraint on `idempotency_key` forces one to fail (unique violation caught and translated to 409).
- **Idempotency keys are minted server-side per request**, not passed from the client. A naive double-click can't reuse a key to bypass the check — each request gets a new key, and the second is caught by the pending-window check.
- **Final backstop:** Stripe's own idempotency cache (24 hours) prevents duplicate dispute submissions even if all of the above fails.

## Testing

### Unit tests (vitest, fully mocked)

**`lib/disputes/build-evidence-payload.test.ts`:**

- Auto-populated fields pulled from charge
- Narrative → `uncategorized_text`
- File mapping for each of the 7 seeded playbooks (covers the backfill)
- Collision rule: two items mapping to `customer_communication`, lower `urgency_order` wins, loser → `uncategorized_file`
- Collision + `uncategorized_file` already taken → loser dropped + warning
- 20k text truncation + warning
- 150k combined cap → truncate `uncategorized_text` first
- Visa CE 3.0 pass-through: fills `enhanced_evidence.visa_compelling_evidence_3` for visa/10.4, nothing for others
- Empty evidence + empty narrative → empty payload (route handles as `validation_failed`)

**`lib/disputes/submission-guard.test.ts`:**

- `needs_response` → allow
- `under_review` / `won` / `lost` / `warning_closed` → block with `dispute_not_submittable`
- Past `due_by` → warn, not block
- Missing `evidence_details` entirely → warn, not block
- Empty evidence + empty narrative → block with `validation_failed`
- Missing mandatory items with other evidence present → warn, not block

**`app/api/disputes/[disputeId]/submit/__tests__/route.test.ts`:**

- Happy path: seeded merchant + dispute + evidence + narrative, mocked Stripe calls, verify submissions row transitions pending→succeeded, disputes row updated, response shape correct
- Replay: two sequential calls, second returns cached response, `stripe.disputes.update` called exactly once
- Concurrent submit: two parallel requests, one wins, other gets `submission_in_progress`
- Stale pending recovery (both branches — Stripe shows submitted vs. Stripe shows still needs_response)
- Stripe status ≠ `needs_response` → `dispute_not_submittable`
- Stripe 5xx → auto-retried once with same key, then `stripe_5xx` if still failing, submissions row = failed
- Stripe `invalid_request` → `stripe_invalid_request`, no auto-retry
- Missing mandatory items → 200 success + warning in response
- Past deadline → 200 success + warning
- Empty payload → 422 `validation_failed`
- Auth middleware rejects unsigned requests (reuse existing auth test helper)

### Integration test extension

**File:** `backend/__tests__/integration/dispute-wizard-flow.test.ts`

Add step 9 as a new `it("WIN-20: submits evidence end-to-end")` block continuing from step 8.

- Mocks `stripe.disputes.update` to return a dispute with `status: "under_review"`
- Mocks `stripe.disputes.retrieve` to return `status: "needs_response"` on the pre-sub guard
- Calls `POST /api/disputes/{id}/submit`
- Asserts:
  - 200 response, `data.submission_id` present, `data.dispute_status === "under_review"`
  - `dispute_submissions` row exists with `status: 'succeeded'`
  - `disputes` row has `status: 'evidence_submitted'` and `evidence_submitted_at` set
  - Captured `stripe.disputes.update` call had `submit: true`, the expected evidence object shape, and a non-empty `idempotencyKey`
  - Captured evidence contains the narrative in `uncategorized_text` and the file from step 4 mapped to the right Stripe field
- Second call with same dispute → returns cached response, `stripe.disputes.update` not called again

### Manual test pass (Docket sandbox)

1. Create a test dispute via Stripe CLI in the Docket sandbox
2. Open it in WinBack, walk through the full wizard (Review → Evidence upload → Narrative generate → Submit)
3. Verify in Stripe Dashboard that evidence shows on the dispute and status is `under_review`
4. Attempt submit again → expect read-only wizard with "Submitted" badge
5. Verify `dispute_submissions` row in Supabase dev DB has `status: 'succeeded'` and `stripe_response` populated

## Rollout Order

One commit per step; each green before the next.

1. Migration 009 — `dispute_submissions` table + RLS
2. Playbook backfill — add `stripe_evidence_field` type + populate 7 playbooks + unit tests
3. `buildEvidencePayload` mapper + unit tests
4. `evaluateSubmissionGuard` + unit tests
5. `submitDispute` Stripe client wrapper
6. `POST /api/disputes/[disputeId]/submit` route + route unit tests
7. Integration test extension (step 9)
8. `SubmitView` frontend component
9. `SubmissionConfirmation` frontend component
10. Wizard read-only mode across Evidence and Narrative tabs
11. Manual test pass against Docket sandbox, documented in PR description

## References

- Research doc: `.taskmaster/docs/disputes-api-research.md` — section 1 (mechanics), 2 (fields), 4 (reason code mapping), 10 (WinBack implementation notes), 11 (network rules)
- Prior spec: `docs/superpowers/specs/2026-04-10-win-16-evidence-upload-design.md` — upload architecture that WIN-20 reads from
- Prior spec: `docs/superpowers/specs/2026-04-11-win-19-narrative-review-edit-ui-design.md` — narrative storage that WIN-20 reads from
- Prior spec: `docs/superpowers/specs/2026-04-12-win-43-integration-test-design.md` — integration harness WIN-20 extends
- Stripe Disputes API: https://docs.stripe.com/api/disputes/update
- Stripe idempotency: https://docs.stripe.com/api/idempotent_requests
