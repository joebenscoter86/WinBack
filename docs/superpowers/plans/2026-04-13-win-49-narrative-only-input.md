# WIN-49: Merchant input surface for narrative-only checklist items

**Linear:** WIN-49
**Branch:** `joebenscoter/win-49-narrative-only-input`
**Related:** WIN-19 (narrative UI), WIN-20 (A/T/Slot rescope), WIN-14 (checklist_notes infra)
**Date:** 2026-04-13

## Problem

The WIN-20 rescope introduced the A/T/Slot framework. T (narrative-only) checklist items render today as a static "Covered in your narrative" hint with no merchant input affordance. The narrative generator has no way to learn anything specific about these items, so the prompt either omits the assertion entirely or hand-waves it. There are 11 such items across 5 playbooks (visa-10.4, visa-13.2, visa-13.3, visa-13.6, mc-4808, mc-4853) covering things like device fingerprint matching, billing-period assertions, refund refusal explanations, and documented absences.

## Decision (locked in conversation 2026-04-13)

**Option 3: hybrid.** Keep T as a category. Add an optional notes textarea on T items. Backend narrative prompt uses the merchant text when present, falls back to a per-playbook canned line when absent. Per-playbook fallbacks (not generic) so the AI has reason-code-specific assertion text instead of "merchant says X" boilerplate.

## Surprise: most of the plumbing already exists

The original cost estimate (1 to 1.5 days) assumed a new schema migration, a new storage shape, and new GET/POST routes. Walking the code revealed:

- `disputes.checklist_notes` JSONB already exists (migration `006_add_checklist_notes.sql`, shipped with WIN-14).
- `EvidenceChecklist.tsx` already manages a `notesState` keyed by checklist item key, with autosave-on-debounce to `PATCH /api/disputes/[id]` via `checklist_notes`.
- `build-prompt.ts` already loops `context.checklist_notes` and injects them into the LLM prompt at line 86.
- `generate-background.ts` already passes `checklist_notes` into the prompt builder.

The only thing blocking T items from using this end-to-end is one conditional in `ChecklistItem.tsx` line 137 that renders a static hint instead of the notes toggle for `narrative_only` items.

Real cost: ~half a day, mostly spent on per-playbook fallback authoring and reseeding.

## Out of scope

- Schema migrations. None needed.
- New API routes or storage shapes.
- Eval suite work (WIN-34, still backlog). Hand-test the 11 items before marking done.
- Refining child-component copy drift from WIN-48 (separate issue).

## Implementation plan

### Step 1: Backend type extension

`backend/lib/playbooks/types.ts`

Add an optional `narrative_fallback?: string` field on `EvidenceChecklistItem`. Document the invariant: only items with `narrative_only: true` should set it. Items without merchant notes will use this string as the prompt context for that item.

### Step 2: Per-playbook fallback authoring

For each of the 11 T items below, add a `narrative_fallback` string that reads as a credible merchant assertion in the absence of merchant input. Each one should be specific enough to feel substantive but generic enough to apply to any merchant in that reason code without lying.

Files to edit:
- `backend/lib/playbooks/data/visa-10.4.ts` (items #5, #6, #11)
- `backend/lib/playbooks/data/visa-13.2.ts` (items #2, #5)
- `backend/lib/playbooks/data/visa-13.3.ts` (items #6, #7)
- `backend/lib/playbooks/data/visa-13.6.ts` (item #6)
- `backend/lib/playbooks/data/mastercard-4808.ts` (items #4, #7)
- `backend/lib/playbooks/data/mastercard-4853.ts` (item #5)

Draft fallback strings (will be refined during authoring pass against the actual item text):

| Playbook | Item | Fallback (draft) |
|---|---|---|
| visa-10.4 #5 | IP/device ID matching across 3 transactions | "The merchant's fraud monitoring shows the device fingerprint and IP address used for this transaction match prior successful purchases on the same account." |
| visa-10.4 #6 | Second matching data element | "A second identifying element (account ID, shipping address, or device ID) on this transaction matches a prior verified purchase by the same cardholder." |
| visa-10.4 #11 | Device identifier and IP | "The device identifier and IP address captured at checkout are on file and consistent with prior cardholder activity." |
| visa-13.2 #2 | Billing period covered | "The disputed charge corresponds to a billing period for which services were available and used." |
| visa-13.2 #5 | Cancellation request timestamp vs charge date | "The cardholder did not submit a cancellation request prior to the charge date." |
| visa-13.3 #6 | Proof cardholder did not return | "The merchant has no record of a return shipment, return authorization, or in-person return tied to this transaction." |
| visa-13.3 #7 | Refund refusal explanation | "The merchant's published refund policy, accepted by the cardholder at checkout, does not cover the conditions of this dispute." |
| visa-13.6 #6 | Evidence item not returned | "The item was delivered and the merchant has no record of it being returned." |
| mc-4808 #4 | Currency conversion documentation | "The transaction was processed in the currency presented to the cardholder at checkout, with no FX adjustment after authorization." |
| mc-4808 #7 | Authorization expiry timestamp | "The charge was finalized within the authorization validity window." |
| mc-4853 #5 | Refund refusal explanation | "The merchant's published refund policy, accepted by the cardholder at checkout, does not cover the conditions of this dispute." |

Joe will refine these against the actual item text during authoring. Treat the table as a starting point, not the final copy.

### Step 3: Backend prompt builder

`backend/lib/prompts/build-prompt.ts`

Currently, `checklistNotesList` (line 86) emits one block listing every key in `checklist_notes`. This already covers T items implicitly (any key in checklist_notes will appear), but it does not handle the fallback case.

Add a new section to the prompt that explicitly walks the playbook's narrative-only items:

```
NARRATIVE-ONLY ASSERTIONS (use the merchant's words verbatim when provided, otherwise use the fallback):
- "<item.item>": "<merchant note OR item.narrative_fallback>"
```

Implementation: extend the `BuildPromptContext` type to include the playbook (or the narrative-only items extracted from it). Walk `playbook.evidence_checklist` filtered to `narrative_only: true`. For each, emit the merchant note from `context.checklist_notes` if present, otherwise the fallback string. Skip items that have neither (defensive: warn in test).

Keep the existing `checklistNotesList` block too. It still serves the non-T items where merchants drop notes alongside file uploads.

### Step 4: Backend test coverage

`backend/lib/prompts/__tests__/build-prompt.test.ts`

Add three cases:
1. T item with a merchant note in `checklist_notes` -- prompt contains the merchant text verbatim.
2. T item without a merchant note but with a `narrative_fallback` -- prompt contains the fallback string.
3. T item without note AND without fallback -- prompt skips the item, test asserts no crash and no empty key emitted.

### Step 5: Frontend ChecklistItem

`stripe-app/src/components/evidence/ChecklistItem.tsx`

Line 137-141 currently renders the static "Covered in your narrative" hint for `narrative_only` items. Replace with the notes section toggle (the same SectionToggle pattern A/Slot items use), plus an "Optional. Add detail to strengthen this point. If left blank, your narrative will note this generally." caption.

The `notes` prop and `onNotesChange` callback are already passed for T items (the parent doesn't filter). The TextArea conditional at line 184 currently checks `!isUnavailable && !submitted` -- this already permits T items, so no change needed there.

Open question for implementation: should the notes toggle for T items be expanded by default? T items are the only place where the merchant has a clear ask, so auto-expanding may improve discoverability. Lean yes, but verify in QA.

### Step 6: Frontend types

`stripe-app/src/lib/types.ts`

Add `narrative_fallback?: string` to the `EvidenceChecklistItem` type. The field is consumed by the backend prompt builder, but the frontend type needs to match for `getPlaybook` typing to work.

### Step 7: Reseed playbooks

After playbook data edits:

```bash
cd backend && set -a && source .env.local && set +a && npm run seed:playbooks
```

Per CLAUDE.md, runtime reads from Supabase, not from the TS modules. WIN-20 QA caught this exact pitfall.

### Step 8: Manual QA in Dockett sandbox

For each of the 11 affected items:
1. Open a dispute with the matching reason code in the Dockett sandbox.
2. Verify the T item now shows the optional notes textarea with the new caption.
3. Generate a narrative without entering merchant notes -- confirm the fallback string appears in the narrative.
4. Generate a second narrative with merchant notes filled in -- confirm the merchant text appears verbatim.
5. Confirm no regression on A or Slot items.

Combine this QA pass with the WIN-48 expired-dispute QA on the same dispute set.

## Acceptance criteria

- [ ] T items render an optional notes textarea with the agreed caption.
- [ ] `build-prompt.ts` injects merchant notes verbatim when present, fallback string when absent.
- [ ] All 11 T items across the 5 affected playbooks have a `narrative_fallback` value.
- [ ] `build-prompt.test.ts` covers note-present, note-absent-fallback-present, and note-absent-fallback-absent paths.
- [ ] Playbook reseed completed; runtime reads new fields from Supabase.
- [ ] Hand-test pass on all 11 items in Dockett sandbox.
- [ ] Backend integration suite green.
- [ ] Stripe-app typecheck clean.

## Risks and tradeoffs

**Fallback credibility.** The fallback strings are merchant assertions written by us, not by the merchant. If they read as canned, the issuer's representment evaluator may discount them. Mitigation: write each fallback to sound like the kind of thing a competent merchant would actually say, grounded in the specific reason code. Worst case, this is still better than the current state where T items contribute nothing to the narrative.

**No eval gate.** WIN-34 (eval suite) is backlog. We are shipping a prompt change without an automated quality gate. Mitigation: hand-test all 11 items end-to-end against real disputes in the Dockett sandbox before marking done. If any narrative reads poorly, iterate on the fallback string before merging.

**Notes auto-expand.** If we default the T-item notes toggle to expanded, the evidence tab gets visually heavier. If we default to collapsed, merchants may not realize they can contribute. Lean expanded for T only, collapsed for A/Slot (matches today's behavior). Confirm during QA.
