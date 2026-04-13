# WIN-20: Stripe Disputes API Evidence Submission — Design Spec

> **Status:** Rescoped 2026-04-12. Supersedes the original 2026-04-12 "approved" revision.
> **Linear:** [WIN-20](https://linear.app/jkbtech/issue/WIN-20/build-stripe-disputes-api-evidence-submission-flow)
> **Depends on:** WIN-5 (research), WIN-16 (upload), WIN-19 (narrative), WIN-31 (auth)
> **Blocks:** WIN-27 (E2E QA)
> **Phase:** 2 — AI Narrative & Submission
> **Rescope context:** [docs/superpowers/handoffs/2026-04-12-win-20-rescope.md](../handoffs/2026-04-12-win-20-rescope.md)

## Rescope summary

The original WIN-20 spec shipped with two structural problems that QA on `du_1TLbFcEQYvM3XwRzuHQaXOj1` exposed:

1. **Evidence mapper was architecturally wrong.** It assumed each uploaded file could be assigned 1:1 to one of Stripe's 9 file-evidence slots, with a "collision handler" that silently dropped extras. In reality, Stripe's dispute evidence API has exactly 9 file slots, each accepting exactly one `file_id`. Real merchants routinely upload more files than there are slots. On the QA dispute, 4 uploaded files were reduced to 2 at submit time, with the AI narrative referencing files that never reached the issuer. Catastrophic correctness bug.
2. **Playbook `stripe_evidence_field` assignments were sloppy.** The previous plan's "when in doubt, `uncategorized_file`" guidance leaked `uncategorized_file` as a lazy default across every playbook. Worse, many checklist items aren't files at all — they're data points (AVS, CVC, IP matching, billing period) that belong in narrative prose or are already autofilled from the charge. The UI was showing file uploaders for items that should never have had them.

**The core architectural shift:** instead of trying to cram files into slots 1:1, we accept Stripe's 9-slot constraint as a hard boundary and make the playbook fit inside it. Every checklist item now falls into exactly one of four categories: **autofilled (A)** from the charge, **narrative-only (T)** text in the dispute narrative, **single-file upload (S)** to a specific Stripe slot, or **merge-capable upload (M)** where multiple files concat into one PDF per slot before submission. The authoring matrix below assigns a category to all 79 non-deleted checklist items across the 7 seeded playbooks.

This rescope also **deletes** one checklist item (mc-4808 #10 "Stripe evidence field mapping") which was meta instructions that leaked into the evidence list, not actual evidence.

### Feasibility validated (2026-04-12 spike)

Before committing to this architecture, a three-stage spike was run on a real iPhone photo pulled from Apple Cloud Photos (the path 99% of merchants will take — drag-and-drop from their desktop photo library, which auto-serves JPEG). Results:

- **Single photo:** 4.03 MB raw iPhone photo (5712×4284, 24.5 MP) → 0.11 MB after pipeline (sharp resize to 1200px + JPEG quality 80 mozjpeg + pdf-lib embed). 2.7% of raw. Quality is visually indistinguishable from the original at dispute-evidence viewing sizes.
- **Single-slot stress test:** 10 copies of that photo combined into one PDF → 1.09 MB. Stripe accepted the upload via Files API with `purpose: "dispute_evidence"`. Under 22% of the 5 MB per-file cap.
- **Pipeline time:** 126 ms for one photo, 1.18 s for 10 photos. Fits comfortably in a synchronous submit flow.
- **Library stack:** `sharp` + `pdf-lib` + Stripe Files API. All production-hardened. No exotic dependencies.

The spike scripts are at `backend/scripts/spike-concat.ts`, `spike-concat-stress.ts`, and `spike-concat-real.ts` — kept in-tree as reference implementations of the compression pipeline.

**HEIC decision:** iPhone photos uploaded via Apple Cloud Photos, AirDrop, or macOS Preview are automatically served as JPEG. The ~1% of cases where a raw `.heic` file reaches the uploader are handled by rejecting HEIC at upload time in WIN-16 with a clear message ("Please export as JPEG or PNG and try again"). We do not build HEIC decoding. This is a scope reduction, not a capability gap.

## Context

WIN-20 is the final, irrevocable step of the dispute wizard: packaging uploaded evidence and the AI-generated narrative, then submitting them to Stripe via the Disputes API with `submit: true`. Once it lands with Stripe, there is no undo.

### What WIN-16 already does

The Stripe Apps SDK's `StripeFileUploader` uploads each file directly from the iframe to Stripe during the evidence step. By the time the merchant clicks Submit, every individual file is already in Stripe Files with a `stripe_file_id`. The backend stores only the ID + metadata in `evidence_files`.

This means WIN-20 does **not** upload files. What it does do, new in this rescope, is:

1. Group the already-uploaded `evidence_files` by their target Stripe slot (from the playbook's `stripe_evidence_field`).
2. For any slot with >1 file, download each file via Stripe Files API, concatenate into a single PDF (images become pages, PDFs page-append), re-upload the combined PDF to Stripe Files with `purpose: "dispute_evidence"`, and use the resulting new `file_id`.
3. Build the full `evidence` object with autofilled fields from the charge, the narrative in `uncategorized_text`, and one `file_id` per occupied slot.
4. Call `stripe.disputes.update(id, { evidence, submit: true }, { idempotencyKey })`.

## The four-category framework

Every checklist item in every playbook is classified into exactly one of:

| Cat | Name | Merchant sees | Backend behavior |
|---|---|---|---|
| **A** | Autofilled | Read-only reference in the evidence tab ("We already have this") | Mapper pulls the value from the `Charge` object via the item's `stripe_field` property and writes it into the appropriate Stripe dispute evidence text field OR into the narrative via template substitution |
| **T** | Narrative-only | A prompt or checkbox in the evidence tab, no file uploader | Nothing goes into the dispute evidence file slots. The merchant addresses the item in the narrative body, which lands in `uncategorized_text`. A new `narrative_only: true` schema flag on `EvidenceChecklistItem` drives this. |
| **Slot** | Single or merged file upload | File uploader (unchanged from WIN-16) | Every item has a `stripe_evidence_field` naming one of Stripe's 9 slots. At submit time, files are grouped by slot; slots with 1 file pass through; slots with 2+ files are PDF-concatenated into one file. |

The old "S vs M" distinction has been deleted — it was an implementation detail, not an authoring concept. From the playbook author's perspective there is only "which slot does this item belong in?" Concat is a mechanical consequence, not a separate category.

### Authoring rules

1. **If the item corresponds to data that already exists on the charge** (AVS, CVC, 3DS, authorization, customer email, refund data, calculated statement descriptor), it is **A**. It has a `stripe_field` property naming the source and no `stripe_evidence_field`.
2. **If the item is a factual statement, timeline assertion, cited data point, or documented absence** ("the cardholder never attempted a return", "the charge was finalized 3 days before the authorization expired"), it is **T**. It has `narrative_only: true` and no `stripe_evidence_field`.
3. **Otherwise the item is a real file the merchant uploads.** It has a `stripe_evidence_field` naming the closest-matching Stripe slot. `uncategorized_file` is used **only** when no other slot is a reasonable semantic fit, never as a lazy default.
4. **Slot conflicts within a playbook are not a bug — they are expected.** Multiple items mapping to `customer_communication` or `service_documentation` are normal and are resolved by PDF concat at submit time, not by collision handling at authoring time.

## Evidence authoring matrix

The following matrix is the source of truth for all playbook checklist item classifications. It supersedes the current assignments in `backend/lib/playbooks/data/*.ts`. All 7 playbooks and 80 items (79 after the mc-4808 #10 deletion) are accounted for.

**Legend**
- `A` = autofilled from charge
- `T` = narrative-only
- `slot_name` = file upload target; multiple items sharing a slot are PDF-concatenated at submit time

---

### visa-10.4 — Fraud / Card Not Present (13 items)

**A (autofilled):**
- #1 Transaction authorization record → `charge.payment_method_details.card.authorization`
- #2 Address verification result → `charge.payment_method_details.card.checks.address_line1_check` / `address_postal_code_check`
- #3 CVV verification result → `charge.payment_method_details.card.checks.cvc_check`
- #7 3D Secure authentication → `charge.payment_method_details.card.three_d_secure`
- #12 Bank statement name screenshot → `charge.calculated_statement_descriptor` *(newly promoted to A during rescope — removes the last `uncategorized_file` orphan in this playbook)*

**T (narrative-only):**
- #5 IP or device ID fingerprint matching across 3 transactions
- #6 Second matching data element (account ID, shipping address, device ID)
- #11 Device identifier and IP of the transaction

**Slot uploads:**
- `receipt` — #4 two prior undisputed transactions (CE 3.0)
- `shipping_documentation` — #8 delivery confirmation to verified billing address
- `service_documentation` — #9 customer account details, #10 access/activity logs *(concat)*
- `customer_communication` — #13 customer engagement emails/support contacts

---

### visa-13.1 — Merchandise / Services Not Received (11 items)

**A:** none
**T:** none

**Slot uploads:**
- `shipping_documentation` — #1 carrier tracking confirmation, #2 delivery address verification *(concat)*
- `customer_signature` — #3 signed delivery confirmation (POD)
- `receipt` — #4 order confirmation with delivery date, #5 screenshot of order details *(concat)*
- `customer_communication` — #6 delivery-related customer comms, #8 email delivery confirmation *(concat)*
- `service_documentation` — #7 access logs, #10 service completion docs, #11 appointment records *(concat)*
- `uncategorized_file` — #9 ToS / delivery terms accepted at checkout

---

### visa-13.2 — Cancelled Recurring Transaction (11 items)

**A:**
- #3 Customer email tied to subscription → `charge.billing_details.email`
- #10 Refund confirmation (if refunded) → `charge.refunds`

**T:**
- #2 Billing period covered → written into Stripe dispute evidence text field `service_date`
- #5 Cancellation request timestamp vs charge date

**Slot uploads:**
- `service_documentation` — #1 active subscription proof, #7 service usage logs *(concat)*
- `cancellation_policy` — #4 cancellation policy at signup, #8 subscription agreement/ToS *(concat)*
- `customer_communication` — #6 cancellation confirmation sent, #9 customer communication history *(concat)*
- `uncategorized_file` — #11 proof this is an installment plan

---

### visa-13.3 — Not as Described / Defective (12 items)

**A:**
- #9 Refund/replacement confirmation → `charge.refunds` *(when applicable)*

**T:**
- #6 Proof cardholder did not attempt return *(documented absence)*
- #7 Refund refusal explanation → written into Stripe dispute evidence text field `refund_refusal_explanation`

**Slot uploads:**
- `shipping_documentation` — #2 proof of delivery
- `customer_communication` — #5 product comms, #12 client sign-offs/approvals *(concat)*
- `refund_policy` — #8 return policy at checkout
- `customer_signature` — #10 service agreement / SOW
- `service_documentation` — #11 proof of service delivery
- `uncategorized_file` — #1 product description, #3 pre-shipment photos, #4 product specifications *(concat — 3 items)*

---

### visa-13.6 — Credit Not Processed (10 items)

**A:**
- #1 Refund confirmation / transaction record → `charge.refunds`
- #2 Refund amount and date matching the dispute → `charge.refunds`
- #3 Processor confirmation of credit posting → `charge.refunds`

**T:**
- #6 Evidence item was not returned *(documented absence)*

**Slot uploads:**
- `refund_policy` — #4 return/refund policy at checkout
- `customer_communication` — #7 customer communication denying return, #10 written communication about return/refund *(concat)*
- `receipt` — #8 order confirmation showing original terms
- `cancellation_policy` — #9 cancellation policy disclosure
- `uncategorized_file` — #5 return condition documentation (photos)

---

### mastercard-4808 — Authorization-Related Dispute (10 items, 1 deleted)

**A:**
- #1 Original authorization record → `charge.payment_method_details.card.authorization`
- #2 Final charge record tied to authorization → `charge` timeline data
- #3 Transaction approval number → `charge.payment_method_details.card.authorization`

**T:**
- #4 Currency conversion documentation *(merchant cites the 10% rule in narrative)*
- #7 Timestamp proof charge was finalized before authorization expired

**DELETE:**
- #10 "Stripe evidence field mapping" — meta instructions to the merchant, not actual evidence. Removed entirely from the playbook.

**Slot uploads:**
- `customer_signature` — #5 tip/gratuity signed receipt
- `receipt` — #9 order details matching authorized amount
- `uncategorized_file` — #6 renewed payment approval record, #8 payment processor transaction log *(concat)*

---

### mastercard-4853 — Cardholder Dispute / Not as Described (13 items)

**A:** none

**T:**
- #5 Refund refusal explanation → written into Stripe dispute evidence text field `refund_refusal_explanation`

**Slot uploads:**
- `customer_communication` — #3 customer communication logs, #13 milestone sign-offs *(concat)*
- `refund_policy` — #4 return/refund policy at checkout
- `shipping_documentation` — #6 proof of delivery
- `receipt` — #7 prior transaction history
- `customer_signature` — #11 signed scope of work / service agreement
- `service_documentation` — #12 proof of service delivery
- `uncategorized_file` — #1 product description, #2 proof item matched description, #8 pre-shipment photos, #9 QC/inspection records, #10 ToS accepted at checkout *(concat — 5 items)*

---

### Matrix totals

| Playbook | A | T | Slot items | Deleted | Total |
|---|---|---|---|---|---|
| visa-10.4 | 5 | 3 | 5 | — | 13 |
| visa-13.1 | 0 | 0 | 11 | — | 11 |
| visa-13.2 | 2 | 2 | 7 | — | 11 |
| visa-13.3 | 1 | 2 | 9 | — | 12 |
| visa-13.6 | 3 | 1 | 6 | — | 10 |
| mc-4808 | 3 | 2 | 4 | 1 | 10 |
| mc-4853 | 0 | 1 | 12 | — | 13 |
| **Total** | **14** | **11** | **54** | **1** | **80** |

### Observations from the matrix

- **`customer_communication` is a concat target in 5 of 7 playbooks.** Every consumer playbook has support logs, emails, or sign-offs landing here.
- **`uncategorized_file` is a concat target in 5 of 7 playbooks.** It's the home for product listings, photos, QC records, and other evidence with no dedicated Stripe semantic slot. Two playbooks (visa-13.3 and mc-4853) have 3- and 5-item piles here.
- **`service_documentation` concats in 4 of 7 playbooks.** SaaS access logs + completion records + scheduling data routinely coexist.
- **14 of 80 items are autofilled** — roughly 17% of the merchant's perceived work is removed entirely.
- **11 of 80 items are narrative-only** — another 14% disappear from the upload UI.
- **54 items remain as uploads**, but they resolve into 21 concat groups across the 7 playbooks (averaging 3 slots of real file evidence per dispute). That's the actual merchant workload.

## Schema changes

### `EvidenceChecklistItem` additions

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

export interface EvidenceChecklistItem {
  // ...existing fields...

  /**
   * If true, this item is addressed in the narrative body only.
   * No file uploader renders in the UI. The item is not written into
   * any Stripe dispute evidence file slot. Mutually exclusive with
   * stripe_evidence_field.
   */
  narrative_only?: boolean;

  /**
   * Target Stripe dispute evidence file slot. Multiple items in a
   * single playbook MAY share a slot — PDF concat at submit time
   * resolves collisions. Required unless narrative_only or stripe_field
   * is set. Must NOT be present on narrative_only items.
   */
  stripe_evidence_field?: StripeEvidenceFileField;

  /**
   * If set, this item is autofilled from the Charge object at submit
   * time. Pre-existing property (WIN-19 used it for narrative pre-gen).
   * A value here implies the item is Category A and must NOT have
   * stripe_evidence_field or narrative_only set.
   */
  stripe_field?: StripeChargeAutofillField;
}
```

### Validation invariants

A playbook checklist item is valid iff **exactly one** of the following is true:
- `stripe_field` is set (Category A)
- `narrative_only === true` (Category T)
- `stripe_evidence_field` is set (Category S/Slot)

The playbook loader enforces this at DB seed time. Items violating the invariant fail the seed.

### Playbook reseed requirement

Because playbooks are loaded at runtime from the Supabase `playbooks` table, any edit to `backend/lib/playbooks/data/*.ts` requires a reseed before the change takes effect in dev. Already documented in `CLAUDE.md`; flagged here because this rescope touches every playbook file.

```bash
cd backend && set -a && source .env.local && set +a && npm run seed:playbooks
```

## Scope

### In scope

- Schema change: `narrative_only` flag + `StripeEvidenceFileField` type on `EvidenceChecklistItem`, with validation invariant
- Playbook authoring pass: reclassify all 80 items per the matrix above, delete mc-4808 #10
- Backend PDF concat library: group files by target slot, concat slots with >1 file into a single combined PDF, re-upload to Stripe Files. Uses `sharp` + `pdf-lib`. Reference implementation in `backend/scripts/spike-concat-real.ts`.
- Evidence assembler (replaces `buildEvidencePayload`): takes autofilled charge data, narrative text, and concat'd file IDs → emits `Stripe.DisputeUpdateParams.Evidence`
- `POST /api/disputes/{id}/submit` route: auth, guard, idempotency, assembly (now async), submit, persist
- `dispute_submissions` idempotency ledger (carried forward from original spec, unchanged) plus a new nullable `concat_receipts JSONB` column capturing per-slot merge diagnostics
- `submitDispute` Stripe client wrapper (carried forward, unchanged), plus two new wrappers: `downloadStripeFile` and `uploadCombinedEvidence`
- `SubmitView` with warnings surface on both error and success paths
- `SubmissionConfirmation` with warnings list rendering
- Wizard read-only mode after successful submit
- Evidence tab updates: hide file uploader on `narrative_only` items; show autofilled items as read-only references
- **Upload-time HEIC rejection** in the WIN-16 file validator: reject `image/heic` and `image/heif` with a clear user-facing message. Included in WIN-20 scope because the same PR already touches the evidence tab for `narrative_only` and autofilled item rendering.

### Out of scope

Unchanged from original spec: draft-save via `submit: false`, per-file retry, Visa CE 3.0 qualification logic beyond pass-through, Mastercard 19-page limit, `charge.dispute.closed` webhook, email notifications on submit, "undo submit", submission analytics.

## Architecture and data flow

The submit route flow is largely unchanged from the original spec, with one important addition: **evidence assembly is now async** because PDF concat involves downloading and re-uploading files.

1. **Auth** — `withStripeAuth` middleware verifies Stripe App signature.
2. **Load state** — fetch `disputes` row, `evidence_files`, `narrative_text`, playbook by `(network, reason_code)`.
3. **Pre-submission guard** — call `stripe.disputes.retrieve(id)` with `expand: ['charge']`. Reject if `dispute.status !== "needs_response"`. Warn-pass if `evidence_details.due_by` is past. Warn-pass on missing mandatory items (honoring `narrative_only` — narrative-only mandatory items are silently assumed addressed).
4. **Idempotent replay check** — look up `dispute_submissions` rows (succeeded → return cached, <60s pending → 409, stale pending → reconcile).
5. **Assemble evidence** — call the new async `assembleEvidence({dispute, playbook, evidenceFiles, narrativeText, charge, stripeClient})`. This step:
   - Reads autofilled fields from `charge` per the matrix
   - Groups `evidenceFiles` by `stripe_evidence_field`
   - For each slot with >1 file: download via Stripe Files API, concat to PDF, re-upload as `purpose: "dispute_evidence"`, collect new file_id. For slots with 1 file: pass through. For empty slots: skip.
   - Writes narrative into `uncategorized_text` (with truncation and warnings unchanged)
   - Writes narrative-only items' implicit coverage via the narrative itself (no separate handling — the narrative already contains them)
   - Returns `{evidence, warnings, concat_receipts}` where `concat_receipts` is diagnostic data captured in the submissions row
6. **Insert `dispute_submissions` row** with `status: 'pending'`, idempotency key, and the assembled `evidence_payload` snapshot.
7. **Call Stripe** — `stripe.disputes.update(dispute_id, { evidence, submit: true }, { idempotencyKey })`.
8. **On success / error paths** — unchanged from original spec.

**Concat failure handling.** Per-file errors during assembly (corrupted PDF that `pdf-lib` can't parse, unreadable image that `sharp` can't decode, network error downloading from Stripe Files, network error re-uploading the combined PDF) follow a **skip-and-warn** policy, not a hard-fail policy. A single bad file must not block a merchant from submitting the other nine good ones. For each file that fails, the assembler emits a `concat_skipped` warning (code + filename + reason) into the submission's `warnings` array, excludes that file from its target slot, and continues. If the skip empties a slot entirely, the slot is omitted from the evidence payload. The warnings are surfaced to the merchant on both the failure and success screens so they can see exactly what didn't make it and optionally re-upload.

**One exception:** if the underlying Stripe Files API returns an error on the *combined* PDF upload (after all per-file concat succeeded), that is a hard-fail — the submission is aborted, the submissions row is marked `failed`, and the merchant retries. This is not a per-file skip scenario; it's the whole assembly failing and is classified as `concat_failed` in the error taxonomy below.

## Idempotency ledger

Unchanged from the original spec. The `dispute_submissions` table design (migration 009), the UNIQUE constraint on `idempotency_key`, the pending/succeeded/failed status machine, and the stale-pending recovery path all survive the rescope as-is. See the original spec's "Data Model" section for the full schema — it is already applied to dev Supabase and the scaffolding on the current branch is correct.

The one small addition: `dispute_submissions.concat_receipts JSONB` column (nullable) capturing which slots were concat'd, how many files went in, and what the resulting combined `file_id` was. Useful for debugging and for the warnings surface. This is a non-breaking migration — a new column on an existing table.

## Pre-submission guard

Unchanged from the original spec except that the "missing mandatory items" check now **silently ignores** items with `narrative_only: true`. The rationale: we can't verify the narrative actually mentions the item without NLP, and warning on every dispute for items the merchant literally cannot upload would be noise. Narrative-only mandatory items are treated as implicitly satisfied by the existence of a narrative. File-bearing mandatory items still warn-pass when they have no uploaded file (unchanged behavior).

## Stripe client wrapper

Unchanged. `submitDispute(accountId, disputeId, evidence, idempotencyKey)` in `backend/lib/stripe/client.ts` is already on the branch and is correct.

Two new wrappers needed for concat:
- `downloadStripeFile(file_id: string): Promise<Buffer>` — uses Stripe Files API to fetch file contents
- `uploadCombinedEvidence(pdf: Buffer, filename: string): Promise<string>` — uploads a combined PDF with `purpose: "dispute_evidence"`, returns new `file_id`

## Frontend changes

### `SubmitView`

Carried forward from the original spec with one behavioral change: **warnings display in both error and success paths**, not just on error. The current `SubmissionConfirmation` implementation only says "submitted!" — it must render the `warnings` array from the success response, because legitimate warnings exist even on success (missing mandatory items, field truncation, future concat-related warnings like "3 files over size cap, dropped lowest-priority").

### `SubmissionConfirmation`

Accepts a `warnings: SubmissionWarning[]` prop. Renders them as a non-blocking yellow callout above the success message if non-empty. Each warning is one line of plain English ("Your narrative was truncated from 22,300 to 20,000 characters before submission.").

### Evidence tab updates

- **Autofilled (A) items:** render as read-only references with a "We already have this from Stripe" label. No uploader, no action.
- **Narrative-only (T) items:** render as narrative prompts with a "Covered in your narrative" label. No uploader.
- **Slot (file) items:** render the existing WIN-16 uploader, unchanged.

### Wizard read-only mode

Unchanged. Detected in the dispute detail loader when `evidence_submitted_at !== null`, passed down as a `submitted: boolean` prop to each tab.

## Error classification

Unchanged from the original spec (`unauthorized`, `dispute_not_found`, `dispute_not_submittable`, `submission_in_progress`, `already_submitted`, `validation_failed`, `stripe_invalid_request`, `stripe_rate_limit`, `stripe_5xx`, `internal_error`).

New codes added for the assembly path:
- `concat_failed` — final combined-PDF upload to Stripe Files failed after per-file assembly completed. Hard-fail, submissions row marked `failed`, merchant retries. Distinct from per-file `concat_skipped` warnings, which are non-blocking.
- `heic_upload_rejected` — surfaced by the upload validator in WIN-16, not by this route. Included here for completeness: the upload step rejects `image/heic` and `image/heif` with a clear message ("Please export as JPEG or PNG from your photo library and try again"). HEIC decoding is deliberately out of scope — see Feasibility validated section.

## Testing

The detailed test plan lives in the implementation plan (see References). The shape, scoped to this spec:

- **Pure unit tests** for the assembler covering every matrix category: A autofill from charge, T narrative-only pass-through, S single-file slot pass-through, concat of 2+ images into one PDF, concat of 2+ PDFs via page-append, concat of mixed image+PDF, empty slot handling, per-file `concat_skipped` on bad input, hard-fail `concat_failed` on final upload error.
- **Pure unit tests** for the guard: `narrative_only` mandatory items silently pass, file-bearing mandatory items still warn, `dispute_not_submittable` / `validation_failed` unchanged.
- **Route-level tests** for `POST /api/disputes/[id]/submit` covering the full happy path, idempotent replay, concurrent submit, stale-pending recovery (both branches), Stripe 5xx retry, `concat_failed`, `concat_skipped` warnings propagated to the response.
- **Integration test extension** — add a multi-file multi-slot variant to `backend/__tests__/integration/dispute-wizard-flow.test.ts`. Upload 4 files across 2 colliding slots, submit, assert 2 combined PDFs land in Stripe with the expected per-slot file IDs.
- **One real-photo smoke test per playbook** covering the matrix's concat groups — not a full fixture run, just enough to confirm the playbook data and the assembler agree on slot assignments.
- **Manual QA pass in Docket sandbox** against a real test dispute. Full wizard walk, verify in Stripe Dashboard that the submitted evidence renders correctly and the combined PDFs open.

## Rollout order

The implementation plan sequences the work in detail. The spec-level constraint: **migration and schema changes land first, playbook authoring pass follows, then the assembler, then the route, then the frontend.** The existing `joebenscoter/win-20-evidence-submission` branch has ~17 commits of scaffolding; good commits (migration 009, `submitDispute` wrapper, `submission-guard`, route skeleton, `SubmitView` shell, read-only wizard mode) are **cherry-picked** onto a fresh branch, and the broken commits (collision-handler mapper, lazy playbook backfill) are dropped. Rebase-forward was rejected because the collision-handler abstraction is baked into too many files to rip cleanly.

## Known follow-up work (not in WIN-20 scope)

**Narrative must explain file merges to the issuer.** Once the assembler concats multiple files into a single PDF per slot, the issuer opens one file and has no way to know it contains three separate artifacts (say: an email thread, a support ticket transcript, and a chat log all combined into `customer_communication.pdf`). The AI narrative needs to enumerate what's inside each combined exhibit, in order — something like *"Exhibit A (customer_communication.pdf) contains: (1) email thread dated Oct 3 2025, (2) support ticket #4821 from Oct 5, (3) live chat transcript from Oct 12."* Without this, the merge is invisible to the issuer and the narrative's references become ambiguous.

This is a material rework of the narrative generation pipeline and belongs in its own follow-up ticket after WIN-20 ships. The assembler's `concat_receipts` diagnostic data (which files went into which slot, in which order) is the input that pipeline will consume. Capturing it in WIN-20 keeps the door open for the follow-up without blocking this build. Do **not** try to solve the narrative-side problem inside WIN-20 scope.

## Decisions resolved during rescope

All architectural questions are settled. The plan may adjust execution details but the following are locked and should not be revisited without a new spec revision:

- **Evidence assembly architecture** — PDF concat via `sharp` + `pdf-lib`, proven feasible by the 2026-04-12 spike (real iPhone photo: 4 MB → 0.11 MB; 10-photo stress: 1.09 MB combined; Stripe accepted).
- **File slot mapping** — every checklist item classified into A / T / slot per the matrix above. `uncategorized_file` is used only where no other slot fits, never as a lazy default.
- **HEIC** — out of scope. Rejected at upload time in WIN-16 validator. No decode path built.
- **Concat failure handling** — per-file skip-and-warn via `concat_skipped`; final-upload failure hard-fails as `concat_failed`.
- **Staging** — in-memory only. No Supabase Storage staging layer.
- **`narrative_only` mandatory items** — silently pass the pre-submission guard. No warning.
- **Branch strategy** — cherry-pick good scaffolding commits onto a fresh branch. Drop the collision-handler mapper and the lazy playbook backfill.
- **HEIC rejection scope** — inside WIN-20, not a sibling ticket. Same PR already touches upload-adjacent code.

## References

- Research doc: `.taskmaster/docs/disputes-api-research.md` — sections 1 (mechanics), 2 (fields), 4 (reason code mapping), 10 (WinBack implementation notes), 11 (network rules)
- Prior spec: `docs/superpowers/specs/2026-04-10-win-16-evidence-upload-design.md` — upload architecture WIN-20 reads from
- Prior spec: `docs/superpowers/specs/2026-04-11-win-19-narrative-review-edit-ui-design.md` — narrative storage WIN-20 reads from
- Prior spec: `docs/superpowers/specs/2026-04-12-win-43-integration-test-design.md` — integration harness WIN-20 extends
- Rescope handoff: `docs/superpowers/handoffs/2026-04-12-win-20-rescope.md`
- Stripe Disputes API: https://docs.stripe.com/api/disputes/update
- Stripe Files API: https://docs.stripe.com/api/files
- Stripe idempotency: https://docs.stripe.com/api/idempotent_requests
- `pdf-lib` library (proposed for concat): https://pdf-lib.js.org/
