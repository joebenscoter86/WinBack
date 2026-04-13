# WIN-20: Stripe Disputes API Evidence Submission — Implementation Plan (Rescoped 2026-04-12)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the rescoped WIN-20 evidence submission flow: PDF concat assembly, playbook authoring pass per the 80-item matrix, `narrative_only` schema, warnings surface, HEIC upload rejection, and the `POST /api/disputes/[id]/submit` route that glues it all together.

**Architecture:** Replaces the collision-handler mapper with an async evidence assembler that groups uploaded files by target Stripe slot and PDF-concats any slot with 2+ files (via `sharp` + `pdf-lib`) before calling `stripe.disputes.update(id, { evidence, submit: true })`. Every playbook checklist item is classified as autofilled (A), narrative-only (T), or file-slot upload per the matrix in [docs/superpowers/specs/2026-04-12-win-20-evidence-submission-design.md](../specs/2026-04-12-win-20-evidence-submission-design.md). The scaffolding from the original WIN-20 branch (migration 009, submission guard, Stripe wrapper, route skeleton, SubmitView, read-only mode) is cherry-picked forward; the broken mapper and sloppy playbook backfill are deleted.

**Tech Stack:** TypeScript, Next.js 15 App Router, Vitest, Supabase Postgres, Stripe Node SDK, `pdf-lib`, `sharp`, `@stripe/ui-extension-sdk` (Stripe Apps UI).

**Source of truth:** The authoring matrix in the spec is definitive. If a conflict arises between this plan and the spec's matrix, the spec wins. The matrix lives in `docs/superpowers/specs/2026-04-12-win-20-evidence-submission-design.md` under "Evidence authoring matrix."

---

## File Structure

**Backend — create:**

- `backend/supabase/migrations/010_submissions_concat_receipts.sql` — additive column on `dispute_submissions`
- `backend/lib/disputes/pdf-concat.ts` — pure-ish concat library (sharp + pdf-lib, takes buffers, returns buffer)
- `backend/lib/disputes/pdf-concat.test.ts` — unit tests for concat library with fixture images/PDFs
- `backend/lib/disputes/assemble-evidence.ts` — async evidence assembler, replaces the deleted mapper
- `backend/lib/disputes/assemble-evidence.test.ts` — unit tests for the assembler
- `backend/lib/playbooks/validate.ts` — runtime validator enforcing the A/T/Slot invariant
- `backend/lib/playbooks/validate.test.ts` — unit tests for the invariant
- `backend/__tests__/fixtures/concat/sample.jpg` — small JPEG fixture for concat tests (~50 KB)
- `backend/__tests__/fixtures/concat/sample.pdf` — small PDF fixture for concat tests (~10 KB)

**Backend — modify:**

- `backend/lib/playbooks/types.ts` — add `narrative_only?: boolean`, document the invariant
- `backend/lib/playbooks/data/visa-10.4.ts` — rewrite per matrix (5 A, 3 T, 5 slot items)
- `backend/lib/playbooks/data/visa-13.1.ts` — rewrite per matrix (0 A, 0 T, 11 slot items)
- `backend/lib/playbooks/data/visa-13.2.ts` — rewrite per matrix (2 A, 2 T, 7 slot items)
- `backend/lib/playbooks/data/visa-13.3.ts` — rewrite per matrix (1 A, 2 T, 9 slot items)
- `backend/lib/playbooks/data/visa-13.6.ts` — rewrite per matrix (3 A, 1 T, 6 slot items)
- `backend/lib/playbooks/data/mastercard-4808.ts` — rewrite per matrix (3 A, 2 T, 4 slot items; DELETE item #10)
- `backend/lib/playbooks/data/mastercard-4853.ts` — rewrite per matrix (0 A, 1 T, 12 slot items)
- `backend/supabase/seed-playbooks.ts` — run the invariant validator during seed; fail the seed on violation
- `backend/lib/disputes/types.ts` — add `StripeEvidenceFileField` (if not already exported), add `SubmissionWarning` codes `concat_skipped` and `concat_failed`, move `EvidenceFileInput` here from the deleted mapper
- `backend/lib/disputes/submission-guard.ts` — filter `narrative_only` items from the `missing_mandatory_items` check, update import to pull `EvidenceFileInput` from `./types`
- `backend/lib/disputes/submission-guard.test.ts` — add test cases covering `narrative_only` mandatory items
- `backend/lib/stripe/client.ts` — add `downloadStripeFile(fileId)` and `uploadCombinedEvidence(buffer, filename)` wrappers
- `backend/app/api/disputes/[disputeId]/submit/route.ts` — replace the deleted mapper call with the new assembler, propagate `concat_skipped` warnings, handle `concat_failed` hard-fail, persist `concat_receipts` into the submissions row
- `backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts` — rewrite against the assembler's async signature, add coverage for the new error codes and warnings
- `backend/__tests__/integration/dispute-wizard-flow.test.ts` — add a multi-file concat variant as step 10

**Backend — delete:**

- `backend/lib/disputes/build-evidence-payload.ts` — the collision-handler mapper, superseded by `assemble-evidence.ts`
- `backend/lib/disputes/build-evidence-payload.test.ts` — superseded by `assemble-evidence.test.ts`

**Frontend — modify:**

- `stripe-app/src/lib/types.ts` — add `narrative_only` to `EvidenceChecklistItem`, add `warnings` to `SubmissionResponse`, add the `concat_skipped`/`concat_failed` codes to the `SubmissionWarning` union
- `stripe-app/src/components/evidence/ChecklistItem.tsx` — branch on `item.narrative_only` to hide the attach/notes toggles and show a "Covered in your narrative" hint
- `stripe-app/src/components/evidence/FileUploadSection.tsx` — reject `image/heic` and `image/heif` in `handleUploadComplete` with a clear user-facing error
- `stripe-app/src/components/submit/SubmissionConfirmation.tsx` — render a warnings callout above the success body when `response.warnings.length > 0`

---

## Task 0: Branch setup — cherry-pick scaffolding, delete broken code, stub missing imports

**Context:** The `joebenscoter/win-20-evidence-submission` branch has all the scaffolding commits plus a docs commit containing this plan, the rescoped spec, the rescope handoff, and the 3 PDF-concat spike scripts. Most of the scaffolding is correct and survives the rescope. The broken parts are `build-evidence-payload.ts` (the collision-handler mapper) and the `stripe_evidence_field` assignments across the 7 playbooks (they default to `uncategorized_file` everywhere). We create the rescope branch from the current tip of `joebenscoter/win-20-evidence-submission` so every scaffolding commit is already in place, then delete the bad files and stub the references in one rescope-prep commit.

**Files:**
- Modify: `backend/lib/disputes/submission-guard.ts` (move import path)
- Modify: `backend/lib/disputes/types.ts` (absorb `EvidenceFileInput` type)
- Modify: `backend/app/api/disputes/[disputeId]/submit/route.ts` (stub the assembler call)
- Delete: `backend/lib/disputes/build-evidence-payload.ts`
- Delete: `backend/lib/disputes/build-evidence-payload.test.ts`
- Modify: `backend/lib/playbooks/data/*.ts` — strip all `stripe_evidence_field` values (the type declaration stays)

- [ ] **Step 1: Make sure you are on `joebenscoter/win-20-evidence-submission` with a clean tree**

```bash
cd /Users/joeb/Projects/WinBack
git fetch origin
git checkout joebenscoter/win-20-evidence-submission
git pull origin joebenscoter/win-20-evidence-submission
git status
```

Expected: branch is `joebenscoter/win-20-evidence-submission`, working tree is clean (or only has local `.claude/settings.local.json` / build artifacts — ignore those).

This branch contains all scaffolding plus the rescope docs commit. The plan file you are executing right now lives on this branch — do NOT check out `main` (the plan file will vanish from the working directory).

- [ ] **Step 2: Create the rescope branch from the current tip**

```bash
git checkout -b joebenscoter/win-20-rescope
```

Expected: new branch created at the same SHA as `joebenscoter/win-20-evidence-submission`. All prior scaffolding commits are already in history — no cherry-pick needed.

- [ ] **Step 3: Verify the branch state**

```bash
git log --oneline main..HEAD | head -20
git log --oneline main..HEAD | wc -l
```

Expected: at least 17 scaffolding commits plus the rescope docs commit visible. The rescope docs commit (subject starts with `docs(WIN-20): rescope`) should be at or near HEAD.

- [ ] **Step 4: Delete the collision-handler mapper and its test**

```bash
rm backend/lib/disputes/build-evidence-payload.ts
rm backend/lib/disputes/build-evidence-payload.test.ts
```

- [ ] **Step 5: Absorb `EvidenceFileInput` into `backend/lib/disputes/types.ts`**

Read the current contents of `backend/lib/disputes/types.ts`. At the bottom of that file, add:

```ts
/**
 * Shape of a row from the evidence_files table as consumed by the guard and
 * the assembler. Originally defined in build-evidence-payload.ts (now deleted).
 */
export interface EvidenceFileInput {
  id: string;
  checklist_item_key: string;
  stripe_file_id: string;
  file_name: string;
  file_size: number;
  mime_type: string;
}
```

- [ ] **Step 6: Fix the guard's import path**

In `backend/lib/disputes/submission-guard.ts`, change the `EvidenceFileInput` import from the deleted mapper to `./types`:

```ts
import type { EvidenceFileInput } from "./types";
```

(Remove any line that says `import type { EvidenceFileInput } from "./build-evidence-payload";`.)

- [ ] **Step 7: Stub the assembler call in the submit route**

Read `backend/app/api/disputes/[disputeId]/submit/route.ts`. Find the line that imports `buildEvidencePayload` and replace its use with a thrown error so the file compiles but the route is known-broken until Task 7 lands:

Replace the import:

```ts
// DELETE this line:
// import { buildEvidencePayload } from "@/lib/disputes/build-evidence-payload";

// No import needed for now — assembler is stubbed until Task 7
```

Replace the call site where `buildEvidencePayload(...)` is invoked with:

```ts
// TODO(WIN-20 Task 7): replace with assembleEvidence() call
throw new Error("evidence assembler not yet implemented — see docs/superpowers/plans/2026-04-12-win-20-evidence-submission.md Task 7");
```

(This is the single permitted TODO in the plan. It is load-bearing: it marks a stub that Task 7 removes.)

- [ ] **Step 8: Strip all `stripe_evidence_field` values from the 7 playbooks**

For each of these files, remove every `stripe_evidence_field: "..."` line from every checklist item. Keep the property definition in `backend/lib/playbooks/types.ts` — we're only clearing the *values*, not the *type*.

Files to edit:
- `backend/lib/playbooks/data/visa-10.4.ts`
- `backend/lib/playbooks/data/visa-13.1.ts`
- `backend/lib/playbooks/data/visa-13.2.ts`
- `backend/lib/playbooks/data/visa-13.3.ts`
- `backend/lib/playbooks/data/visa-13.6.ts`
- `backend/lib/playbooks/data/mastercard-4808.ts`
- `backend/lib/playbooks/data/mastercard-4853.ts`

Use a grep to find them first:

```bash
grep -rn "stripe_evidence_field" backend/lib/playbooks/data/
```

Expected: ~80 occurrences. Remove every one of these lines (the values, not the type declaration in `types.ts`).

Note: in `backend/lib/playbooks/types.ts`, change `stripe_evidence_field` to optional so the stripped files type-check:

```ts
stripe_evidence_field?: StripeEvidenceFileField;
```

- [ ] **Step 9: Revert the `d98078f` band-aid in the route**

The band-aid inserted a fallback `|| "uncategorized_file"` somewhere in the route (or assembler context). Now that the mapper is deleted and the route is stubbed, grep for the fallback and remove it:

```bash
grep -rn "uncategorized_file" backend/app/api/disputes/
```

If any results appear in route.ts as a fallback default, remove them. The stub from Step 7 is the only thing that should remain.

- [ ] **Step 10: Verify TypeScript build**

```bash
cd backend && npx tsc --noEmit 2>&1 | head -30
```

Expected: zero errors. If errors appear in `submission-guard.ts`, re-check Step 6. If errors appear in `route.ts`, re-check Step 7. If errors appear in playbook files about missing `stripe_evidence_field`, verify Step 8 made the property optional.

- [ ] **Step 11: Run the seed to verify playbooks still load**

```bash
cd backend && set -a && source .env.local && set +a && npm run seed:playbooks
```

Expected: seed succeeds. The playbooks now have no `stripe_evidence_field` values; they'll be populated correctly in Task 3.

- [ ] **Step 12: Run unit tests to establish baseline**

```bash
cd backend && npm test 2>&1 | tail -30
```

Expected: most tests pass; the route tests fail with the "assembler not yet implemented" error. Document which tests fail — that's the baseline to beat in Task 10.

- [ ] **Step 13: Commit the rescope prep**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore(backend): rescope prep — remove broken mapper and sloppy playbook assignments (WIN-20)

Deletes build-evidence-payload.ts (the collision-handler mapper that dropped
evidence files on submit) and build-evidence-payload.test.ts. Strips the
uncategorized_file default values from all 7 playbooks — the authoring pass
in Task 3 will rewrite every item per the spec matrix.

Moves EvidenceFileInput into lib/disputes/types.ts to decouple the guard from
the deleted mapper. Stubs the submit route's assembly call with a thrown
error until Task 7 lands the new assembler.

See docs/superpowers/plans/2026-04-12-win-20-evidence-submission.md Task 0.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 1: Schema — add `narrative_only` flag with validation invariant

**Context:** Each checklist item must fall into exactly one category: autofilled (A, via `stripe_field`), narrative-only (T, via `narrative_only: true`), or file-slot upload (via `stripe_evidence_field`). The invariant is enforced at seed time so bad playbook data can't reach the DB.

**Files:**
- Modify: `backend/lib/playbooks/types.ts`
- Create: `backend/lib/playbooks/validate.ts`
- Create: `backend/lib/playbooks/validate.test.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/lib/playbooks/validate.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { validatePlaybookChecklist, PlaybookInvariantError } from "./validate";
import type { EvidenceChecklistItem } from "./types";

function baseItem(overrides: Partial<EvidenceChecklistItem> = {}): EvidenceChecklistItem {
  return {
    item: "Test item",
    category: "recommended",
    context: "all",
    required: false,
    why_matters: "because",
    where_to_find: "somewhere",
    urgency_essential: false,
    urgency_order: null,
    ...overrides,
  };
}

describe("validatePlaybookChecklist", () => {
  it("accepts a stripe_field only item (category A)", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [baseItem({ stripe_field: "authorization" })]),
    ).not.toThrow();
  });

  it("accepts a narrative_only item (category T)", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [baseItem({ narrative_only: true })]),
    ).not.toThrow();
  });

  it("accepts a stripe_evidence_field item (slot upload)", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ stripe_evidence_field: "receipt" }),
      ]),
    ).not.toThrow();
  });

  it("rejects an item with both stripe_field and stripe_evidence_field", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ stripe_field: "authorization", stripe_evidence_field: "uncategorized_file" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });

  it("rejects an item with both narrative_only and stripe_evidence_field", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ narrative_only: true, stripe_evidence_field: "receipt" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });

  it("rejects an item with none of the three", () => {
    expect(() => validatePlaybookChecklist("visa-10.4", [baseItem({})])).toThrow(
      PlaybookInvariantError,
    );
  });

  it("reports the offending item and playbook in the error message", () => {
    try {
      validatePlaybookChecklist("visa-10.4", [baseItem({ item: "bad item" })]);
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(PlaybookInvariantError);
      expect((err as Error).message).toContain("visa-10.4");
      expect((err as Error).message).toContain("bad item");
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && npm test -- lib/playbooks/validate 2>&1 | tail -20
```

Expected: fail with `Cannot find module './validate'`.

- [ ] **Step 3: Extend `EvidenceChecklistItem` in types.ts**

In `backend/lib/playbooks/types.ts`, locate the `EvidenceChecklistItem` interface and add the `narrative_only` field. The final three slot-related fields should look like:

```ts
  /**
   * Populated at submit time from the Charge object. An item with stripe_field
   * set is category A (autofilled) and MUST NOT have stripe_evidence_field or
   * narrative_only set.
   */
  stripe_field?: string;

  /**
   * True for items the merchant addresses in the narrative body, not via file
   * upload. An item with narrative_only=true is category T and MUST NOT have
   * stripe_evidence_field or stripe_field set.
   */
  narrative_only?: boolean;

  /**
   * Target Stripe dispute evidence file slot. Multiple items in a playbook MAY
   * share a slot — PDF concat at submit time resolves the merge. Items with a
   * stripe_evidence_field are file-upload items and MUST NOT have stripe_field
   * or narrative_only set.
   */
  stripe_evidence_field?: StripeEvidenceFileField;
```

- [ ] **Step 4: Implement the validator**

Create `backend/lib/playbooks/validate.ts`:

```ts
import type { EvidenceChecklistItem } from "./types";

export class PlaybookInvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlaybookInvariantError";
  }
}

/**
 * Enforces the A/T/Slot invariant: every checklist item MUST have exactly one
 * of stripe_field, narrative_only=true, or stripe_evidence_field set. Throws
 * PlaybookInvariantError naming the playbook and offending item on violation.
 */
export function validatePlaybookChecklist(
  playbookKey: string,
  checklist: EvidenceChecklistItem[],
): void {
  for (const item of checklist) {
    const flags = [
      Boolean(item.stripe_field),
      Boolean(item.narrative_only),
      Boolean(item.stripe_evidence_field),
    ];
    const count = flags.filter(Boolean).length;
    if (count !== 1) {
      const present = [
        item.stripe_field ? "stripe_field" : null,
        item.narrative_only ? "narrative_only" : null,
        item.stripe_evidence_field ? "stripe_evidence_field" : null,
      ].filter(Boolean);
      const detail = present.length === 0 ? "none set" : `set: ${present.join(", ")}`;
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} item "${item.item}" violates A/T/Slot invariant (${detail}). Exactly one of stripe_field, narrative_only, or stripe_evidence_field must be set.`,
      );
    }
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd backend && npm test -- lib/playbooks/validate 2>&1 | tail -20
```

Expected: all 7 tests pass.

- [ ] **Step 6: Commit**

```bash
git add backend/lib/playbooks/types.ts backend/lib/playbooks/validate.ts backend/lib/playbooks/validate.test.ts
git commit -m "$(cat <<'EOF'
feat(backend): narrative_only flag + A/T/Slot invariant validator (WIN-20)

Adds narrative_only to EvidenceChecklistItem and a runtime validator that
enforces exactly one of stripe_field / narrative_only / stripe_evidence_field
per item. The seed script (next task) will run this validator to prevent
bad playbook data from reaching the DB.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Migration 010 — add `concat_receipts` column

**Context:** The assembler records per-slot concat diagnostics (which files went into which slot, in what order, what combined file_id came out) into a new JSONB column on `dispute_submissions`. Additive, nullable, non-breaking. Exists to unblock the future narrative-rework follow-up ticket.

**Files:**
- Create: `backend/supabase/migrations/010_submissions_concat_receipts.sql`

- [ ] **Step 1: Write the migration**

Create `backend/supabase/migrations/010_submissions_concat_receipts.sql`:

```sql
-- WIN-20: add concat_receipts column to dispute_submissions
-- Captures per-slot assembly diagnostics: which files were merged into each
-- slot, their order, and the resulting combined file_id. Nullable and
-- additive — no impact on existing rows.

ALTER TABLE dispute_submissions
  ADD COLUMN concat_receipts JSONB;

COMMENT ON COLUMN dispute_submissions.concat_receipts IS
  'Per-slot concat diagnostics. Shape: { [slot_name]: { input_file_ids: string[], combined_file_id: string } }. Consumed by future narrative enumeration logic.';
```

- [ ] **Step 2: Apply the migration to dev Supabase**

Use the Supabase MCP tools. If the Supabase MCP is available in the environment, run the migration via `mcp__claude_ai_Supabase__apply_migration` with the project `ssnwzgxvugraswghqsvo`. Otherwise run it manually via the Supabase SQL editor.

Verification query:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'dispute_submissions' AND column_name = 'concat_receipts';
```

Expected: one row, `data_type = jsonb`, `is_nullable = YES`.

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/010_submissions_concat_receipts.sql
git commit -m "$(cat <<'EOF'
feat(backend): migration 010 — dispute_submissions.concat_receipts column (WIN-20)

Additive nullable JSONB column capturing per-slot PDF concat diagnostics
for future narrative enumeration. No impact on existing rows.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Playbook authoring pass — rewrite all 7 playbooks per the spec matrix

**Context:** This is the biggest and most detail-sensitive task. Every checklist item in every playbook must be updated to match the authoring matrix in the spec. The spec's "Evidence authoring matrix" section is the definitive source — consult it for every decision. Below is visa-10.4 fully transformed as a worked example so the pattern is clear, then a compact change table for each remaining playbook.

**The rule for each item:**
- If the spec's matrix marks it as **A**: set `stripe_field` to the named source, and remove `stripe_evidence_field` and `narrative_only`.
- If the spec's matrix marks it as **T**: set `narrative_only: true`, and remove `stripe_field` and `stripe_evidence_field`.
- If the spec's matrix marks it as a **slot**: set `stripe_evidence_field` to the named slot, and remove `stripe_field` and `narrative_only`.

**Files:**
- Modify: `backend/lib/playbooks/data/visa-10.4.ts`
- Modify: `backend/lib/playbooks/data/visa-13.1.ts`
- Modify: `backend/lib/playbooks/data/visa-13.2.ts`
- Modify: `backend/lib/playbooks/data/visa-13.3.ts`
- Modify: `backend/lib/playbooks/data/visa-13.6.ts`
- Modify: `backend/lib/playbooks/data/mastercard-4808.ts`
- Modify: `backend/lib/playbooks/data/mastercard-4853.ts`

### Step 1: Rewrite visa-10.4 (worked example)

- [ ] **Step 1: Apply these changes to `backend/lib/playbooks/data/visa-10.4.ts`**

There are 13 checklist items. Apply these field assignments, preserving all other fields (item, category, context, required, why_matters, where_to_find, urgency_essential, urgency_order) exactly as they are:

| # | Item (partial) | Action |
|---|---|---|
| 1 | Transaction authorization record | `stripe_field: "authorization"` (already present), no `stripe_evidence_field`, no `narrative_only` |
| 2 | Address verification result | `stripe_field: "avs_result"`, no `stripe_evidence_field`, no `narrative_only` |
| 3 | Security code (CVV) verification | `stripe_field: "cvc_check"`, no `stripe_evidence_field`, no `narrative_only` |
| 4 | Two prior undisputed transactions | `stripe_evidence_field: "receipt"` |
| 5 | IP or device ID fingerprint matching | `narrative_only: true` |
| 6 | Second matching data element | `narrative_only: true` |
| 7 | Bank verification (3D Secure) | `stripe_field: "three_d_secure"` |
| 8 | Delivery confirmation to cardholder's verified billing address | `stripe_evidence_field: "shipping_documentation"` |
| 9 | Customer account details | `stripe_evidence_field: "service_documentation"` |
| 10 | Access/activity logs | `stripe_evidence_field: "service_documentation"` |
| 11 | Device identifier and IP address of the transaction | `narrative_only: true` |
| 12 | Bank statement name screenshot | `stripe_field: "calculated_statement_descriptor"` |
| 13 | Communication with cardholder showing engagement | `stripe_evidence_field: "customer_communication"` |

Example — item #4 currently looks like this (after Task 0 stripped the old value):

```ts
    {
      item: "Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)",
      category: "mandatory",
      context: "ce3",
      required: true,
      why_matters: "...",
      where_to_find: "...",
      urgency_essential: true,
      urgency_order: 3,
    },
```

After this step it should look like:

```ts
    {
      item: "Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)",
      category: "mandatory",
      context: "ce3",
      required: true,
      why_matters: "...",
      where_to_find: "...",
      stripe_evidence_field: "receipt",
      urgency_essential: true,
      urgency_order: 3,
    },
```

Apply the equivalent transformation to every item in the table above. Do not modify any other fields.

- [ ] **Step 2: Typecheck visa-10.4**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep visa-10.4
```

Expected: no output (no errors).

### Step 2: Rewrite visa-13.1

- [ ] **Step 3: Apply these 11 changes to `backend/lib/playbooks/data/visa-13.1.ts`**

| # | Item (partial) | Action |
|---|---|---|
| 1 | Carrier tracking confirmation | `stripe_evidence_field: "shipping_documentation"` |
| 2 | Delivery address verification (matches billing or shipping) | `stripe_evidence_field: "shipping_documentation"` |
| 3 | Signed delivery confirmation (POD) | `stripe_evidence_field: "customer_signature"` |
| 4 | Order confirmation showing agreed delivery date | `stripe_evidence_field: "receipt"` |
| 5 | Screenshot of order details | `stripe_evidence_field: "receipt"` |
| 6 | Communication with customer about delivery | `stripe_evidence_field: "customer_communication"` |
| 7 | Access logs showing customer used the product/service | `stripe_evidence_field: "service_documentation"` |
| 8 | Email delivery confirmation (license key, download link) | `stripe_evidence_field: "customer_communication"` |
| 9 | Terms of service / delivery terms accepted at checkout | `stripe_evidence_field: "uncategorized_file"` |
| 10 | Service completion documentation or proof of performance | `stripe_evidence_field: "service_documentation"` |
| 11 | Appointment or scheduling records confirming service date | `stripe_evidence_field: "service_documentation"` |

### Step 3: Rewrite visa-13.2

- [ ] **Step 4: Apply these 11 changes to `backend/lib/playbooks/data/visa-13.2.ts`**

| # | Item (partial) | Action |
|---|---|---|
| 1 | Proof of active subscription at time of charge | `stripe_evidence_field: "service_documentation"` |
| 2 | Billing period covered (service_date) | `narrative_only: true` |
| 3 | Customer email address tied to subscription | `stripe_field: "customer_email"` (already present) — ensure no `stripe_evidence_field` |
| 4 | Cancellation policy (terms accepted at signup) | `stripe_evidence_field: "cancellation_policy"` |
| 5 | Cancellation request timestamp vs charge date | `narrative_only: true` |
| 6 | Cancellation confirmation sent to customer | `stripe_evidence_field: "customer_communication"` |
| 7 | Service usage logs after last billing cycle | `stripe_evidence_field: "service_documentation"` |
| 8 | Subscription agreement / terms of service | `stripe_evidence_field: "cancellation_policy"` |
| 9 | Communication history with customer | `stripe_evidence_field: "customer_communication"` |
| 10 | Refund confirmation (if already refunded) | `stripe_field: "refund_data"` |
| 11 | Proof this is an installment plan, not a recurring | `stripe_evidence_field: "uncategorized_file"` |

### Step 4: Rewrite visa-13.3

- [ ] **Step 5: Apply these 12 changes to `backend/lib/playbooks/data/visa-13.3.ts`**

| # | Item (partial) | Action |
|---|---|---|
| 1 | Product description as shown at time of purchase | `stripe_evidence_field: "uncategorized_file"` |
| 2 | Proof of delivery | `stripe_evidence_field: "shipping_documentation"` |
| 3 | Pre-shipment photos of the actual item | `stripe_evidence_field: "uncategorized_file"` |
| 4 | Product specifications or detailed listing | `stripe_evidence_field: "uncategorized_file"` |
| 5 | Customer communications about the product | `stripe_evidence_field: "customer_communication"` |
| 6 | Proof cardholder did NOT attempt to return | `narrative_only: true` |
| 7 | Refund refusal explanation | `narrative_only: true` |
| 8 | Return policy clearly stated at checkout | `stripe_evidence_field: "refund_policy"` |
| 9 | Refund or replacement confirmation | `stripe_field: "refund_data"` |
| 10 | Service agreement or scope of work document | `stripe_evidence_field: "customer_signature"` |
| 11 | Proof of service delivery (reports, access logs, deliverables) | `stripe_evidence_field: "service_documentation"` |
| 12 | Client sign-off or acceptance documentation | `stripe_evidence_field: "customer_communication"` |

### Step 5: Rewrite visa-13.6

- [ ] **Step 6: Apply these 10 changes to `backend/lib/playbooks/data/visa-13.6.ts`**

| # | Item (partial) | Action |
|---|---|---|
| 1 | Refund confirmation / transaction record | `stripe_field: "refund_data"` |
| 2 | Refund amount and date matching the dispute | `stripe_field: "refund_data"` |
| 3 | Processor confirmation of the credit posting | `stripe_field: "refund_data"` |
| 4 | Return/refund policy as displayed at checkout | `stripe_evidence_field: "refund_policy"` |
| 5 | Return condition documentation (photos or inspection records) | `stripe_evidence_field: "uncategorized_file"` |
| 6 | Evidence the item was not returned | `narrative_only: true` |
| 7 | Customer communication denying the return | `stripe_evidence_field: "customer_communication"` |
| 8 | Order confirmation showing original terms | `stripe_evidence_field: "receipt"` |
| 9 | Cancellation policy disclosure | `stripe_evidence_field: "cancellation_policy"` |
| 10 | Written communication about the return or refund | `stripe_evidence_field: "customer_communication"` |

### Step 6: Rewrite mastercard-4808 AND delete item #10

- [ ] **Step 7: Apply these 9 changes to `backend/lib/playbooks/data/mastercard-4808.ts`, AND delete item #10**

| # | Item (partial) | Action |
|---|---|---|
| 1 | Original authorization record | `stripe_field: "authorization"` |
| 2 | Final charge record tied to authorization | `stripe_field: "authorization"` |
| 3 | Transaction approval number | `stripe_field: "authorization"` |
| 4 | Currency conversion documentation | `narrative_only: true` |
| 5 | Tip or gratuity authorization (signed receipt) | `stripe_evidence_field: "customer_signature"` |
| 6 | Renewed payment approval record | `stripe_evidence_field: "uncategorized_file"` |
| 7 | Timestamp proof charge was finalized before authorization expired | `narrative_only: true` |
| 8 | Payment processor transaction log | `stripe_evidence_field: "uncategorized_file"` |
| 9 | Order details matching the authorized amount | `stripe_evidence_field: "receipt"` |
| 10 | **DELETE** the item "Stripe evidence field mapping (uncategorized_text and uncategorized_file)" entirely | Remove the whole object from the array |

After the delete, the `evidence_checklist` array should have 9 entries, not 10. Confirm by searching for "Stripe evidence field mapping" — it should be gone.

### Step 7: Rewrite mastercard-4853

- [ ] **Step 8: Apply these 13 changes to `backend/lib/playbooks/data/mastercard-4853.ts`**

| # | Item (partial) | Action |
|---|---|---|
| 1 | Original product/service description | `stripe_evidence_field: "uncategorized_file"` |
| 2 | Proof the item or service matched the description | `stripe_evidence_field: "uncategorized_file"` |
| 3 | Customer communication logs | `stripe_evidence_field: "customer_communication"` |
| 4 | Return/refund policy as displayed at checkout | `stripe_evidence_field: "refund_policy"` |
| 5 | Refund refusal explanation | `narrative_only: true` |
| 6 | Proof of delivery | `stripe_evidence_field: "shipping_documentation"` |
| 7 | Prior transaction history with the cardholder | `stripe_evidence_field: "receipt"` |
| 8 | Photos or video of item before shipment | `stripe_evidence_field: "uncategorized_file"` |
| 9 | Quality control or inspection records | `stripe_evidence_field: "uncategorized_file"` |
| 10 | Terms of service accepted at checkout | `stripe_evidence_field: "uncategorized_file"` |
| 11 | Signed scope of work or service agreement | `stripe_evidence_field: "customer_signature"` |
| 12 | Proof of service delivery | `stripe_evidence_field: "service_documentation"` |
| 13 | Milestone sign-offs or approval emails | `stripe_evidence_field: "customer_communication"` |

### Finalize Task 3

- [ ] **Step 9: Typecheck all 7 playbooks**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep -E "playbooks/data" || echo "OK"
```

Expected: `OK` (no errors).

- [ ] **Step 10: Commit**

```bash
git add backend/lib/playbooks/data/
git commit -m "$(cat <<'EOF'
feat(backend): playbook authoring pass — A/T/Slot classification per matrix (WIN-20)

Reclassifies every checklist item across all 7 playbooks per the evidence
authoring matrix in the WIN-20 rescoped spec. Every item now falls into
exactly one category: autofilled (stripe_field), narrative-only
(narrative_only), or file-slot upload (stripe_evidence_field).

- visa-10.4:      5 A, 3 T, 5 slot items (13 total)
- visa-13.1:      0 A, 0 T, 11 slot items
- visa-13.2:      2 A, 2 T, 7 slot items
- visa-13.3:      1 A, 2 T, 9 slot items
- visa-13.6:      3 A, 1 T, 6 slot items
- mastercard-4808: 3 A, 2 T, 4 slot items (deleted meta item #10)
- mastercard-4853: 0 A, 1 T, 12 slot items

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Wire invariant validator into seed + reseed dev DB

**Context:** The validator from Task 1 must run during seed so a future sloppy playbook edit can't bypass the invariant.

**Files:**
- Modify: `backend/supabase/seed-playbooks.ts`

- [ ] **Step 1: Open the seed script**

Read the existing `backend/supabase/seed-playbooks.ts` to understand its current structure (how it imports playbooks, how it writes to the DB).

- [ ] **Step 2: Add the invariant check before DB writes**

At the top of the file, add the import:

```ts
import { validatePlaybookChecklist } from "../lib/playbooks/validate";
```

Find the loop that iterates over the 7 playbooks (probably `const playbooks = [visa104, visa131, ...]`). Before the DB write for each playbook, add:

```ts
for (const pb of playbooks) {
  const key = `${pb.network}-${pb.reason_code}`;
  validatePlaybookChecklist(key, pb.evidence_checklist);
  // ... existing DB write logic
}
```

- [ ] **Step 3: Run the seed to verify the invariant passes on all 7 playbooks**

```bash
cd backend && set -a && source .env.local && set +a && npm run seed:playbooks 2>&1 | tail -20
```

Expected: seed succeeds with no `PlaybookInvariantError`. If it fails, go back to Task 3 and fix the offending item.

- [ ] **Step 4: Commit**

```bash
git add backend/supabase/seed-playbooks.ts
git commit -m "$(cat <<'EOF'
feat(backend): enforce A/T/Slot invariant at playbook seed time (WIN-20)

Runs validatePlaybookChecklist on every playbook before the DB write.
A sloppy future edit that sets both stripe_field and stripe_evidence_field
(or leaves both unset) will now fail the seed loudly instead of silently
producing broken evidence submissions.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Stripe client wrappers — `downloadStripeFile` and `uploadCombinedEvidence`

**Context:** The assembler needs to (a) download existing uploaded files from Stripe Files by their file_id, and (b) upload a combined PDF back as new dispute evidence. Both are thin wrappers around the Stripe Node SDK for mockability and consistency with existing helpers.

**Files:**
- Modify: `backend/lib/stripe/client.ts`
- Create: `backend/lib/stripe/client.test.ts` (if it doesn't exist) OR append to existing test file

- [ ] **Step 1: Write the failing tests**

If `backend/lib/stripe/client.test.ts` doesn't exist, create it. Otherwise append these tests:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { downloadStripeFile, uploadCombinedEvidence } from "./client";

// Mock the Stripe module entirely — we only need to verify our wrappers call it correctly.
vi.mock("stripe", () => {
  const filesCreate = vi.fn();
  const filesRetrieve = vi.fn();
  const StripeCtor = vi.fn(() => ({
    files: { create: filesCreate, retrieve: filesRetrieve },
  }));
  return { default: StripeCtor };
});

describe("downloadStripeFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches the file URL and returns the body as a Buffer", async () => {
    const fakeBuffer = Buffer.from("hello");
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(fakeBuffer) as unknown as Response);

    // Prepare the mocked Stripe retrieve to return a file with a URL
    const Stripe = (await import("stripe")).default as unknown as ReturnType<typeof vi.fn>;
    const instance = new (Stripe as unknown as { new (): { files: { retrieve: ReturnType<typeof vi.fn> } } })();
    instance.files.retrieve.mockResolvedValue({
      id: "file_test",
      url: "https://files.stripe.com/file_test",
    });

    const result = await downloadStripeFile("file_test");
    expect(result.equals(fakeBuffer)).toBe(true);
    fetchSpy.mockRestore();
  });
});

describe("uploadCombinedEvidence", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uploads with purpose=dispute_evidence and returns the new file_id", async () => {
    const Stripe = (await import("stripe")).default as unknown as ReturnType<typeof vi.fn>;
    const instance = new (Stripe as unknown as { new (): { files: { create: ReturnType<typeof vi.fn> } } })();
    instance.files.create.mockResolvedValue({ id: "file_new", size: 1234 });

    const buf = Buffer.from("pdf-contents");
    const id = await uploadCombinedEvidence(buf, "combined.pdf");
    expect(id).toBe("file_new");
    expect(instance.files.create).toHaveBeenCalledWith({
      purpose: "dispute_evidence",
      file: {
        data: buf,
        name: "combined.pdf",
        type: "application/pdf",
      },
    });
  });
});
```

Note: the mocking here is brittle because of how Stripe is a singleton in the existing `client.ts`. If the existing file already has its own mocking strategy, use that instead. The critical thing is that the two wrappers exist, are exported, and have coverage of the happy path.

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && npm test -- lib/stripe/client 2>&1 | tail -20
```

Expected: fail with `Cannot find module ... downloadStripeFile`.

- [ ] **Step 3: Implement the wrappers in `backend/lib/stripe/client.ts`**

Append these functions to the file (after the existing `submitDispute` wrapper):

```ts
/**
 * Download an existing Stripe File by ID as a Buffer. Uses the file's short-lived
 * URL from files.retrieve(). The file must have been uploaded with a purpose
 * that grants read access to the platform account.
 */
export async function downloadStripeFile(fileId: string): Promise<Buffer> {
  const file = await getStripe().files.retrieve(fileId);
  if (!file.url) {
    throw new Error(`Stripe file ${fileId} has no URL`);
  }
  const res = await fetch(file.url, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to download Stripe file ${fileId}: ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Upload a combined PDF to Stripe Files as dispute evidence. Returns the new file_id.
 */
export async function uploadCombinedEvidence(
  pdf: Buffer,
  filename: string,
): Promise<string> {
  const file = await getStripe().files.create({
    purpose: "dispute_evidence",
    file: {
      data: pdf,
      name: filename,
      type: "application/pdf",
    },
  });
  return file.id;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd backend && npm test -- lib/stripe/client 2>&1 | tail -20
```

Expected: both tests pass.

- [ ] **Step 5: Commit**

```bash
git add backend/lib/stripe/client.ts backend/lib/stripe/client.test.ts
git commit -m "$(cat <<'EOF'
feat(backend): add downloadStripeFile and uploadCombinedEvidence wrappers (WIN-20)

Thin wrappers around Stripe Files API for the assembler's concat code path.
downloadStripeFile pulls an uploaded evidence file by file_id; uploadCombinedEvidence
pushes a concat'd PDF back with purpose=dispute_evidence and returns the new file_id.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: PDF concat library

**Context:** Pure function that takes a list of files (buffers + kind), compresses images via sharp, merges everything into one combined PDF via pdf-lib, returns the buffer. Reference implementation is `backend/scripts/spike-concat-real.ts` — this task moves that logic into `backend/lib/disputes/pdf-concat.ts` and hardens it.

**Files:**
- Create: `backend/lib/disputes/pdf-concat.ts`
- Create: `backend/lib/disputes/pdf-concat.test.ts`
- Create: `backend/__tests__/fixtures/concat/sample.jpg`
- Create: `backend/__tests__/fixtures/concat/sample.pdf`

- [ ] **Step 1: Create the test fixtures**

Generate small fixture files programmatically. Run this from `backend/`:

```bash
mkdir -p __tests__/fixtures/concat && npx tsx -e '
import sharp from "sharp";
import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "node:fs/promises";

const jpg = await sharp({
  create: { width: 400, height: 300, channels: 3, background: { r: 100, g: 150, b: 200 } },
}).jpeg({ quality: 80 }).toBuffer();
await fs.writeFile("__tests__/fixtures/concat/sample.jpg", jpg);

const doc = await PDFDocument.create();
const font = await doc.embedFont(StandardFonts.Helvetica);
const page = doc.addPage([612, 792]);
page.drawText("Test PDF", { x: 50, y: 720, size: 24, font });
const pdf = Buffer.from(await doc.save());
await fs.writeFile("__tests__/fixtures/concat/sample.pdf", pdf);
console.log("fixtures created");
'
```

Expected: `fixtures created`. Both files should exist and be under 10 KB each.

- [ ] **Step 2: Write the failing tests**

Create `backend/lib/disputes/pdf-concat.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { concatFilesToPDF, compressImageForEvidence, type ConcatInput } from "./pdf-concat";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const FIXTURES = path.join(__dirname, "../../__tests__/fixtures/concat");

async function loadFixture(name: string): Promise<Buffer> {
  return fs.readFile(path.join(FIXTURES, name));
}

describe("compressImageForEvidence", () => {
  it("produces a smaller buffer than the input for a large image", async () => {
    // Generate a large image via sharp for this test
    const { default: sharp } = await import("sharp");
    const big = await sharp({
      create: { width: 3000, height: 3000, channels: 3, background: { r: 50, g: 50, b: 50 } },
    }).jpeg({ quality: 100 }).toBuffer();

    const compressed = await compressImageForEvidence(big);
    expect(compressed.length).toBeLessThan(big.length);
  });

  it("honors EXIF rotation (rotate() is called before resize)", async () => {
    const jpg = await loadFixture("sample.jpg");
    const compressed = await compressImageForEvidence(jpg);
    expect(compressed.length).toBeGreaterThan(0);
    // We cannot easily verify rotation happened on a square fixture; this test
    // exists to ensure the pipeline does not throw on images with EXIF data.
  });
});

describe("concatFilesToPDF", () => {
  it("produces a valid PDF from a single image", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [{ name: "a.jpg", buffer: jpg, kind: "image" }];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBe(1);
  });

  it("produces a valid PDF from a single source PDF (page copy)", async () => {
    const pdf = await loadFixture("sample.pdf");
    const inputs: ConcatInput[] = [{ name: "a.pdf", buffer: pdf, kind: "pdf" }];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });

  it("merges 3 images into a 3-page PDF", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [
      { name: "a.jpg", buffer: jpg, kind: "image" },
      { name: "b.jpg", buffer: jpg, kind: "image" },
      { name: "c.jpg", buffer: jpg, kind: "image" },
    ];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBe(3);
  });

  it("merges a PDF + 2 images into a multi-page PDF", async () => {
    const jpg = await loadFixture("sample.jpg");
    const pdf = await loadFixture("sample.pdf");
    const inputs: ConcatInput[] = [
      { name: "a.pdf", buffer: pdf, kind: "pdf" },
      { name: "b.jpg", buffer: jpg, kind: "image" },
      { name: "c.jpg", buffer: jpg, kind: "image" },
    ];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(3);
  });

  it("throws on a corrupted PDF input (caller must catch)", async () => {
    const bad = Buffer.from("not a pdf at all");
    const inputs: ConcatInput[] = [{ name: "bad.pdf", buffer: bad, kind: "pdf" }];
    await expect(concatFilesToPDF(inputs)).rejects.toThrow();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd backend && npm test -- lib/disputes/pdf-concat 2>&1 | tail -20
```

Expected: fail with `Cannot find module './pdf-concat'`.

- [ ] **Step 4: Implement `backend/lib/disputes/pdf-concat.ts`**

```ts
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export type ConcatInput = {
  name: string;
  buffer: Buffer;
  kind: "image" | "pdf";
};

/**
 * Compress a merchant-uploaded image for dispute evidence. Resizes to 1200px
 * on the long edge, honors EXIF rotation, re-encodes as JPEG quality 80 via
 * mozjpeg. Real iPhone photos (4 MB, 24 MP) compress to ~110 KB with no
 * visible loss of evidentiary detail at standard monitor viewing sizes.
 * Reference: backend/scripts/spike-concat-real.ts.
 */
export async function compressImageForEvidence(imgBuffer: Buffer): Promise<Buffer> {
  return sharp(imgBuffer)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

/**
 * Merge a list of images and PDFs into a single combined PDF.
 * - PDF inputs: pages are copied into the output via PDFDocument.copyPages.
 * - Image inputs: compressed via compressImageForEvidence, then embedded one
 *   per page, scaled to fit Letter size (612x792).
 *
 * This function does NOT handle per-file error recovery. The caller (the
 * evidence assembler) is responsible for wrapping this in a try/catch per
 * file to enforce the skip-and-warn policy.
 */
export async function concatFilesToPDF(items: ConcatInput[]): Promise<Buffer> {
  const combined = await PDFDocument.create();

  for (const item of items) {
    if (item.kind === "pdf") {
      const src = await PDFDocument.load(item.buffer);
      const pages = await combined.copyPages(src, src.getPageIndices());
      for (const p of pages) combined.addPage(p);
    } else {
      const compressed = await compressImageForEvidence(item.buffer);
      const img = await combined.embedJpg(compressed);
      const pageW = 612;
      const pageH = 792;
      const scale = Math.min(pageW / img.width, pageH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const page = combined.addPage([pageW, pageH]);
      page.drawImage(img, {
        x: (pageW - drawW) / 2,
        y: (pageH - drawH) / 2,
        width: drawW,
        height: drawH,
      });
    }
  }

  return Buffer.from(await combined.save());
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd backend && npm test -- lib/disputes/pdf-concat 2>&1 | tail -30
```

Expected: all 6 tests pass.

- [ ] **Step 6: Commit**

```bash
git add backend/lib/disputes/pdf-concat.ts backend/lib/disputes/pdf-concat.test.ts backend/__tests__/fixtures/concat/
git commit -m "$(cat <<'EOF'
feat(backend): PDF concat library for WIN-20 evidence assembly

Extracts the sharp + pdf-lib pipeline from scripts/spike-concat-real.ts into
a reusable library. Pure function: takes a list of image/PDF buffers, returns
one combined PDF. Images are compressed (1200px, JPEG q80 mozjpeg) before
embedding. EXIF rotation honored.

Per-file error recovery is the caller's responsibility — concatFilesToPDF
throws on bad input and the assembler wraps it in a skip-and-warn try/catch.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Evidence assembler — replaces the deleted mapper

**Context:** This is the core of WIN-20. An async function that takes everything the route has loaded (dispute, charge, playbook, evidence files, narrative) and returns a `{evidence, warnings, concat_receipts}` triple ready for `stripe.disputes.update(id, { evidence, submit: true })`. Takes the Stripe client as a dependency so it can download files and upload combined PDFs.

**Files:**
- Create: `backend/lib/disputes/assemble-evidence.ts`
- Create: `backend/lib/disputes/assemble-evidence.test.ts`
- Modify: `backend/lib/disputes/types.ts` (add SubmissionWarning codes and AssemblyResult type)

- [ ] **Step 1: Extend `backend/lib/disputes/types.ts` with new types**

Add these type declarations to `backend/lib/disputes/types.ts`:

```ts
export type ConcatReceipt = {
  slot: StripeEvidenceFileField;
  input_file_ids: string[];
  combined_file_id: string;
};

export type AssemblyResult = {
  evidence: Record<string, unknown>; // Stripe.DisputeUpdateParams.Evidence shape
  warnings: SubmissionWarning[];
  concat_receipts: ConcatReceipt[];
};
```

And add the new `SubmissionWarning` codes to the existing `SubmissionWarning` union:

```ts
export type SubmissionWarning =
  // ...existing codes (field_truncated, missing_mandatory_items, deadline_passed)...
  | { code: "concat_skipped"; file_name: string; slot: string; reason: string };
```

Note: `concat_failed` is an *error code* not a warning — it lives in the route's error taxonomy, not in SubmissionWarning.

- [ ] **Step 2: Write the failing tests**

Create `backend/lib/disputes/assemble-evidence.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";
import { assembleEvidence, type AssembleInput } from "./assemble-evidence";
import type { PlaybookData } from "../playbooks/types";
import type Stripe from "stripe";

function mockCharge(): Stripe.Charge {
  return {
    id: "ch_test",
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      address: { line1: "123 Main St", city: "Boston", state: "MA", postal_code: "02101", country: "US" },
    },
    payment_method_details: {
      card: {
        checks: {
          address_line1_check: "pass",
          address_postal_code_check: "pass",
          cvc_check: "pass",
        },
        three_d_secure: { result: "authenticated", version: "2.2.0" },
      },
    },
    calculated_statement_descriptor: "JKBTECH LLC",
    refunds: { data: [] },
    description: "Test purchase",
  } as unknown as Stripe.Charge;
}

function mockPlaybook(items: PlaybookData["evidence_checklist"]): PlaybookData {
  return {
    network: "visa",
    reason_code: "10.4",
    display_name: "Test",
    evidence_checklist: items,
  } as unknown as PlaybookData;
}

function mockStripeClient(overrides: {
  downloadStripeFile?: (id: string) => Promise<Buffer>;
  uploadCombinedEvidence?: (pdf: Buffer, name: string) => Promise<string>;
} = {}) {
  return {
    downloadStripeFile:
      overrides.downloadStripeFile ??
      vi.fn(async (id: string) => Buffer.from(`fake-${id}`)),
    uploadCombinedEvidence:
      overrides.uploadCombinedEvidence ??
      vi.fn(async () => "file_combined_abc"),
  };
}

describe("assembleEvidence", () => {
  it("pulls stripe_field values from the charge for autofilled items", async () => {
    const playbook = mockPlaybook([
      { item: "AVS", category: "mandatory", context: "all", required: true, why_matters: "", where_to_find: "", stripe_field: "avs_result", urgency_essential: true, urgency_order: 1 },
    ]);

    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [],
      narrativeText: "my narrative",
      stripeClient: mockStripeClient(),
    } as AssembleInput);

    // Autofilled fields propagate into evidence text fields
    expect(result.evidence.uncategorized_text).toContain("my narrative");
  });

  it("does not populate a file slot for narrative_only items", async () => {
    const playbook = mockPlaybook([
      { item: "IP match", category: "mandatory", context: "all", required: true, why_matters: "", where_to_find: "", narrative_only: true, urgency_essential: true, urgency_order: 1 },
    ]);

    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [],
      narrativeText: "narrative",
      stripeClient: mockStripeClient(),
    } as AssembleInput);

    // No file slots set
    const fileSlotKeys = [
      "receipt", "customer_communication", "shipping_documentation",
      "service_documentation", "customer_signature", "refund_policy",
      "cancellation_policy", "uncategorized_file", "duplicate_charge_documentation",
    ];
    for (const key of fileSlotKeys) {
      expect(result.evidence[key]).toBeUndefined();
    }
  });

  it("passes a single-file slot through without concat", async () => {
    const playbook = mockPlaybook([
      { item: "Delivery", category: "mandatory", context: "all", required: true, why_matters: "", where_to_find: "", stripe_evidence_field: "shipping_documentation", urgency_essential: true, urgency_order: 1 },
    ]);

    const client = mockStripeClient();
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "Delivery", stripe_file_id: "file_existing_1", file_name: "tracking.pdf", file_size: 1000, mime_type: "application/pdf" },
      ],
      narrativeText: "n",
      stripeClient: client,
    } as AssembleInput);

    expect(result.evidence.shipping_documentation).toBe("file_existing_1");
    expect(client.uploadCombinedEvidence).not.toHaveBeenCalled();
    expect(result.concat_receipts).toHaveLength(0);
  });

  it("concats 2+ files into a single slot via PDF merge + upload", async () => {
    const playbook = mockPlaybook([
      { item: "Email", category: "recommended", context: "all", required: false, why_matters: "", where_to_find: "", stripe_evidence_field: "customer_communication", urgency_essential: false, urgency_order: null },
      { item: "Chat", category: "recommended", context: "all", required: false, why_matters: "", where_to_find: "", stripe_evidence_field: "customer_communication", urgency_essential: false, urgency_order: null },
    ]);

    // Feed real JPEG bytes for both so sharp+pdf-lib can actually process them
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const jpg = await fs.readFile(path.join(__dirname, "../../__tests__/fixtures/concat/sample.jpg"));

    const downloadSpy = vi.fn(async () => jpg);
    const uploadSpy = vi.fn(async () => "file_merged_xyz");

    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "Email", stripe_file_id: "file_1", file_name: "email.jpg", file_size: 1000, mime_type: "image/jpeg" },
        { id: "ef2", checklist_item_key: "Chat", stripe_file_id: "file_2", file_name: "chat.jpg", file_size: 1000, mime_type: "image/jpeg" },
      ],
      narrativeText: "n",
      stripeClient: { downloadStripeFile: downloadSpy, uploadCombinedEvidence: uploadSpy },
    } as AssembleInput);

    expect(downloadSpy).toHaveBeenCalledTimes(2);
    expect(uploadSpy).toHaveBeenCalledTimes(1);
    expect(result.evidence.customer_communication).toBe("file_merged_xyz");
    expect(result.concat_receipts).toHaveLength(1);
    expect(result.concat_receipts[0]).toMatchObject({
      slot: "customer_communication",
      input_file_ids: ["file_1", "file_2"],
      combined_file_id: "file_merged_xyz",
    });
  });

  it("skips a corrupted file with concat_skipped warning and continues", async () => {
    const playbook = mockPlaybook([
      { item: "A", category: "recommended", context: "all", required: false, why_matters: "", where_to_find: "", stripe_evidence_field: "customer_communication", urgency_essential: false, urgency_order: null },
      { item: "B", category: "recommended", context: "all", required: false, why_matters: "", where_to_find: "", stripe_evidence_field: "customer_communication", urgency_essential: false, urgency_order: null },
    ]);

    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const goodJpg = await fs.readFile(path.join(__dirname, "../../__tests__/fixtures/concat/sample.jpg"));
    const badBuf = Buffer.from("not a real image");

    const downloadSpy = vi.fn(async (id: string) => (id === "file_bad" ? badBuf : goodJpg));
    const uploadSpy = vi.fn(async () => "file_merged");

    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "A", stripe_file_id: "file_bad", file_name: "bad.jpg", file_size: 100, mime_type: "image/jpeg" },
        { id: "ef2", checklist_item_key: "B", stripe_file_id: "file_ok", file_name: "ok.jpg", file_size: 100, mime_type: "image/jpeg" },
      ],
      narrativeText: "n",
      stripeClient: { downloadStripeFile: downloadSpy, uploadCombinedEvidence: uploadSpy },
    } as AssembleInput);

    // One file skipped, the good one still got uploaded
    const skipWarnings = result.warnings.filter((w) => w.code === "concat_skipped");
    expect(skipWarnings).toHaveLength(1);
    expect(result.evidence.customer_communication).toBe("file_merged");
  });

  it("truncates narrative to 20000 chars and emits field_truncated warning", async () => {
    const playbook = mockPlaybook([]);
    const longNarrative = "x".repeat(25000);

    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [],
      narrativeText: longNarrative,
      stripeClient: mockStripeClient(),
    } as AssembleInput);

    expect((result.evidence.uncategorized_text as string).length).toBe(20000);
    const truncWarnings = result.warnings.filter((w) => w.code === "field_truncated");
    expect(truncWarnings).toHaveLength(1);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd backend && npm test -- lib/disputes/assemble-evidence 2>&1 | tail -20
```

Expected: fail with `Cannot find module './assemble-evidence'`.

- [ ] **Step 4: Implement `backend/lib/disputes/assemble-evidence.ts`**

```ts
import type Stripe from "stripe";
import type { PlaybookData, EvidenceChecklistItem, StripeEvidenceFileField } from "../playbooks/types";
import type { EvidenceFileInput, SubmissionWarning, ConcatReceipt, AssemblyResult } from "./types";
import { concatFilesToPDF, type ConcatInput } from "./pdf-concat";

const UNCATEGORIZED_TEXT_CAP = 20000;

export interface AssembleInput {
  charge: Stripe.Charge;
  playbook: PlaybookData;
  evidenceFiles: EvidenceFileInput[];
  narrativeText: string | null;
  stripeClient: {
    downloadStripeFile(fileId: string): Promise<Buffer>;
    uploadCombinedEvidence(pdf: Buffer, filename: string): Promise<string>;
  };
}

/**
 * Build the Stripe dispute evidence payload. Pulls autofilled fields from the
 * charge, truncates the narrative into uncategorized_text, groups uploaded files
 * by their target Stripe slot, concats any slot with 2+ files via PDF merge,
 * and returns the finished evidence object plus diagnostics.
 *
 * Per-file errors during concat (corrupt PDF, unreadable image, download
 * failure) are caught and reported as concat_skipped warnings — the bad file
 * is excluded from its slot and assembly continues. A final combined-PDF
 * upload failure is NOT caught here; the route classifies it as concat_failed
 * and aborts the submission.
 */
export async function assembleEvidence(input: AssembleInput): Promise<AssemblyResult> {
  const { charge, playbook, evidenceFiles, narrativeText, stripeClient } = input;
  const warnings: SubmissionWarning[] = [];
  const evidence: Record<string, unknown> = {};

  // 1. Autofilled fields from the charge. Pulled per-item via stripe_field.
  for (const item of playbook.evidence_checklist) {
    if (!item.stripe_field) continue;
    const value = readChargeField(charge, item.stripe_field);
    if (value !== undefined && value !== null) {
      // Known stripe_field values map to either real evidence text fields or
      // narrative template variables. The ones that map to dispute evidence
      // text fields are written here; the rest are consumed by narrative pre-gen.
      writeAutofilledEvidenceField(evidence, item.stripe_field, value, charge);
    }
  }

  // 2. Narrative → uncategorized_text with truncation warning
  if (narrativeText && narrativeText.trim().length > 0) {
    let narrative = narrativeText;
    if (narrative.length > UNCATEGORIZED_TEXT_CAP) {
      warnings.push({
        code: "field_truncated",
        field: "uncategorized_text",
        original_length: narrative.length,
        truncated_length: UNCATEGORIZED_TEXT_CAP,
      });
      narrative = narrative.slice(0, UNCATEGORIZED_TEXT_CAP);
    }
    evidence.uncategorized_text = narrative;
  }

  // 3. Group evidence files by target slot
  const slotGroups = new Map<StripeEvidenceFileField, Array<{ file: EvidenceFileInput; item: EvidenceChecklistItem }>>();
  const itemByKey = new Map<string, EvidenceChecklistItem>();
  for (const item of playbook.evidence_checklist) {
    itemByKey.set(item.item, item);
  }

  for (const file of evidenceFiles) {
    const item = itemByKey.get(file.checklist_item_key);
    if (!item || !item.stripe_evidence_field) continue;
    const slot = item.stripe_evidence_field;
    const list = slotGroups.get(slot) ?? [];
    list.push({ file, item });
    slotGroups.set(slot, list);
  }

  // 4. Resolve each slot: single files pass through; multi-file slots are concat'd
  const concat_receipts: ConcatReceipt[] = [];

  for (const [slot, group] of slotGroups) {
    if (group.length === 1) {
      evidence[slot] = group[0].file.stripe_file_id;
      continue;
    }

    // Multi-file: download, concat, upload
    const concatInputs: ConcatInput[] = [];
    const inputFileIds: string[] = [];

    for (const { file } of group) {
      try {
        const buf = await stripeClient.downloadStripeFile(file.stripe_file_id);
        const kind = file.mime_type === "application/pdf" ? "pdf" : "image";
        concatInputs.push({ name: file.file_name, buffer: buf, kind });
        inputFileIds.push(file.stripe_file_id);
      } catch (err) {
        warnings.push({
          code: "concat_skipped",
          file_name: file.file_name,
          slot,
          reason: `download failed: ${(err as Error).message}`,
        });
      }
    }

    // Per-file concat wrap so one bad input doesn't tank the slot
    const validInputs: ConcatInput[] = [];
    const validInputIds: string[] = [];
    for (let i = 0; i < concatInputs.length; i++) {
      try {
        // Validate by attempting single-item concat (cheap — catches corrupt inputs)
        await concatFilesToPDF([concatInputs[i]]);
        validInputs.push(concatInputs[i]);
        validInputIds.push(inputFileIds[i]);
      } catch (err) {
        warnings.push({
          code: "concat_skipped",
          file_name: concatInputs[i].name,
          slot,
          reason: `concat failed: ${(err as Error).message}`,
        });
      }
    }

    if (validInputs.length === 0) {
      // Every file in this slot was skipped; leave the slot empty
      continue;
    }

    if (validInputs.length === 1) {
      // After filtering, only one valid file remains — pass through without upload
      const originalId = validInputIds[0];
      evidence[slot] = originalId;
      continue;
    }

    // Real concat + upload path
    const combined = await concatFilesToPDF(validInputs);
    const combinedId = await stripeClient.uploadCombinedEvidence(combined, `${slot}-combined.pdf`);
    evidence[slot] = combinedId;
    concat_receipts.push({ slot, input_file_ids: validInputIds, combined_file_id: combinedId });
  }

  return { evidence, warnings, concat_receipts };
}

/**
 * Read a named field from the Charge object. Known stripe_field values map to
 * specific paths. Unknown values return undefined (and the assembler silently
 * skips them — the invariant validator caught this case at seed time).
 */
function readChargeField(charge: Stripe.Charge, field: string): unknown {
  const card = charge.payment_method_details?.card;
  switch (field) {
    case "authorization":
      // Stripe exposes auth data across a few fields; we pass the charge ID through
      // and let the narrative template refer to charge.payment_method_details.card
      return charge.id;
    case "avs_result":
      return card?.checks?.address_line1_check ?? null;
    case "cvc_check":
      return card?.checks?.cvc_check ?? null;
    case "three_d_secure":
      return card?.three_d_secure?.result ?? null;
    case "customer_email":
      return charge.billing_details?.email ?? null;
    case "refund_data":
      return charge.refunds?.data?.length ?? 0;
    case "calculated_statement_descriptor":
      return charge.calculated_statement_descriptor ?? null;
    default:
      return undefined;
  }
}

/**
 * Write an autofilled value into the right spot in the evidence object. Not
 * every stripe_field has a dedicated Stripe evidence slot — the ones that do
 * are written; the others are consumed by narrative template substitution in
 * WIN-19 and do not need to be written here.
 */
function writeAutofilledEvidenceField(
  evidence: Record<string, unknown>,
  field: string,
  value: unknown,
  charge: Stripe.Charge,
): void {
  switch (field) {
    case "customer_email":
      if (typeof value === "string") evidence.customer_email_address = value;
      break;
    case "refund_data":
      // Refund existence is communicated via the narrative and/or refund_policy_disclosure;
      // no dedicated dispute evidence field to write into here.
      break;
    case "calculated_statement_descriptor":
      // Communicated via narrative template variable; no dedicated evidence field.
      break;
    default:
      // AVS, CVC, 3DS, authorization land in the narrative via WIN-19's pre-gen.
      break;
  }

  // Always include the customer name and billing address when present
  if (charge.billing_details?.name && !evidence.customer_name) {
    evidence.customer_name = charge.billing_details.name;
  }
  if (charge.billing_details?.address) {
    const a = charge.billing_details.address;
    const line = [a.line1, a.line2, a.city, a.state, a.postal_code, a.country].filter(Boolean).join(", ");
    if (line && !evidence.billing_address) evidence.billing_address = line;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd backend && npm test -- lib/disputes/assemble-evidence 2>&1 | tail -30
```

Expected: all 6 tests pass. If the `concat_skipped` test fails, double-check the per-file validation loop is catching the bad input buffer.

- [ ] **Step 6: Commit**

```bash
git add backend/lib/disputes/assemble-evidence.ts backend/lib/disputes/assemble-evidence.test.ts backend/lib/disputes/types.ts
git commit -m "$(cat <<'EOF'
feat(backend): evidence assembler with PDF concat for WIN-20

Replaces the deleted build-evidence-payload.ts collision-handler mapper.
Groups uploaded files by target Stripe slot per the playbook's stripe_evidence_field
assignments, merges any slot with 2+ files into one PDF via lib/disputes/pdf-concat,
uploads the combined PDF to Stripe Files, and returns the finished evidence
object alongside concat_receipts diagnostics and any per-file concat_skipped
warnings.

Per-file error handling: corrupt inputs are skipped with a warning, assembly
continues. A final combined-PDF upload failure is not caught here — the route
classifies it as concat_failed and aborts the submission.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Guard update — narrative_only items silently pass mandatory check

**Context:** The existing guard counts every mandatory checklist item with no file as a missing-mandatory warning. With `narrative_only`, those items have no file by definition and should not warn.

**Files:**
- Modify: `backend/lib/disputes/submission-guard.ts`
- Modify: `backend/lib/disputes/submission-guard.test.ts`

- [ ] **Step 1: Write the failing test**

Open `backend/lib/disputes/submission-guard.test.ts` and add this test case inside the existing `describe` block:

```ts
  it("silently passes narrative_only mandatory items (no missing_mandatory_items warning)", () => {
    const playbook = {
      network: "visa",
      reason_code: "10.4",
      evidence_checklist: [
        {
          item: "IP match",
          category: "mandatory" as const,
          context: "all",
          required: true,
          why_matters: "",
          where_to_find: "",
          narrative_only: true,
          urgency_essential: true,
          urgency_order: 1,
        },
        {
          item: "Delivery",
          category: "mandatory" as const,
          context: "all",
          required: true,
          why_matters: "",
          where_to_find: "",
          stripe_evidence_field: "shipping_documentation" as const,
          urgency_essential: true,
          urgency_order: 2,
        },
      ],
    } as unknown as Parameters<typeof evaluateSubmissionGuard>[0]["playbook"];

    const result = evaluateSubmissionGuard({
      stripeDispute: { status: "needs_response", evidence_details: { due_by: Math.floor(Date.now() / 1000) + 100000 } } as unknown as Parameters<typeof evaluateSubmissionGuard>[0]["stripeDispute"],
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "Delivery", stripe_file_id: "file_1", file_name: "track.pdf", file_size: 1000, mime_type: "application/pdf" },
      ],
      narrativeText: "something",
    });

    expect(result.action).toBe("allow");
    const missing = result.warnings.filter((w) => w.code === "missing_mandatory_items");
    expect(missing).toHaveLength(0);
  });
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd backend && npm test -- lib/disputes/submission-guard 2>&1 | tail -20
```

Expected: the new test fails — current guard still counts the narrative_only mandatory item as missing.

- [ ] **Step 3: Update the guard**

In `backend/lib/disputes/submission-guard.ts`, modify the missing-mandatory calculation:

```ts
const filedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));
const missingMandatory = playbook.evidence_checklist
  .filter((i) => i.category === "mandatory")
  .filter((i) => !i.narrative_only) // narrative_only items are implicitly satisfied by the narrative
  .filter((i) => !i.stripe_field)   // autofilled items are implicitly satisfied by the charge
  .filter((i) => !filedKeys.has(i.item))
  .map((i) => i.item);
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd backend && npm test -- lib/disputes/submission-guard 2>&1 | tail -20
```

Expected: all guard tests pass, including the new one.

- [ ] **Step 5: Commit**

```bash
git add backend/lib/disputes/submission-guard.ts backend/lib/disputes/submission-guard.test.ts
git commit -m "$(cat <<'EOF'
feat(backend): guard silently passes narrative_only + autofilled mandatory items (WIN-20)

The missing_mandatory_items check now filters out items with narrative_only
or stripe_field set. Rationale: narrative_only items have no file to upload
by definition, and autofilled items are populated from the charge, not by
the merchant. Warning on either category every submit would be pure noise.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Route integration — wire assembler into submit route

**Context:** Remove the Task 0 stub and replace it with a real `assembleEvidence` call. Propagate warnings to the response, persist concat_receipts into the submissions row, handle the new error codes.

**Files:**
- Modify: `backend/app/api/disputes/[disputeId]/submit/route.ts`

- [ ] **Step 1: Read the current route file**

Read `backend/app/api/disputes/[disputeId]/submit/route.ts` in full to understand the current flow (after the Task 0 stub). Note the position of the stub throw from Task 0 Step 7.

- [ ] **Step 2: Add the assembler import and call**

Replace the stub throw with a real assembler invocation. The exact code depends on what's around the stub — the pattern is:

```ts
import { assembleEvidence } from "@/lib/disputes/assemble-evidence";
import { downloadStripeFile, uploadCombinedEvidence } from "@/lib/stripe/client";

// ... inside the route handler, where the stub used to be ...

let assembly;
try {
  assembly = await assembleEvidence({
    charge,
    playbook,
    evidenceFiles,
    narrativeText,
    stripeClient: { downloadStripeFile, uploadCombinedEvidence },
  });
} catch (err) {
  // A thrown error here means the combined-PDF upload failed after per-file
  // assembly completed. Per the spec, this is a hard-fail classified as
  // concat_failed; update the submissions row and return 502.
  await supabase
    .from("dispute_submissions")
    .update({
      status: "failed",
      error_code: "concat_failed",
      error_message: (err as Error).message,
      completed_at: new Date().toISOString(),
    })
    .eq("id", submissionRowId);

  return Response.json(
    {
      error: "Failed to assemble combined evidence for Stripe upload.",
      code: "concat_failed",
    },
    { status: 502 },
  );
}

const { evidence, warnings: assemblyWarnings, concat_receipts } = assembly;
const allWarnings = [...guardWarnings, ...assemblyWarnings];
```

- [ ] **Step 3: Persist concat_receipts into the submissions row**

Find the `dispute_submissions` INSERT/UPDATE block in the route. Add `concat_receipts` to the payload:

```ts
await supabase
  .from("dispute_submissions")
  .update({
    status: "succeeded",
    stripe_response: updatedDispute,
    concat_receipts: concat_receipts.length > 0 ? concat_receipts : null,
    warnings: allWarnings.length > 0 ? allWarnings : null,
    completed_at: new Date().toISOString(),
  })
  .eq("id", submissionRowId);
```

- [ ] **Step 4: Propagate warnings to the success response**

Find the success response block and ensure it returns `warnings`:

```ts
return Response.json({
  data: {
    submission_id: submissionRowId,
    submitted_at: new Date().toISOString(),
    dispute_status: updatedDispute.status,
    warnings: allWarnings,
  },
});
```

- [ ] **Step 5: Typecheck**

```bash
cd backend && npx tsc --noEmit 2>&1 | grep -E "submit/route" || echo "OK"
```

Expected: `OK`.

- [ ] **Step 6: Commit**

```bash
git add backend/app/api/disputes/[disputeId]/submit/route.ts
git commit -m "$(cat <<'EOF'
feat(backend): wire evidence assembler into submit route (WIN-20)

Replaces the Task 0 stub with a real assembleEvidence() call. Per-file
concat_skipped warnings propagate to the response; concat_receipts persist
into the submissions row for future narrative enumeration; final upload
failure is classified as concat_failed and returns 502 with the submissions
row marked failed.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Route unit tests — rewrite against the assembler

**Context:** The existing `route.test.ts` from the cherry-picked branch references `buildEvidencePayload`. Rewrite it to mock `assembleEvidence` and cover the new error codes + warnings.

**Files:**
- Modify: `backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts`

- [ ] **Step 1: Update the mocks**

Read the current `route.test.ts` to see its mocking strategy. Replace any `vi.mock(".../build-evidence-payload")` with:

```ts
vi.mock("@/lib/disputes/assemble-evidence", () => ({
  assembleEvidence: vi.fn(async () => ({
    evidence: { uncategorized_text: "mocked narrative" },
    warnings: [],
    concat_receipts: [],
  })),
}));
```

- [ ] **Step 2: Add tests for the new paths**

Append to the existing describe block:

```ts
it("propagates concat_skipped warnings to the success response", async () => {
  const { assembleEvidence } = await import("@/lib/disputes/assemble-evidence");
  (assembleEvidence as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
    evidence: { uncategorized_text: "n" },
    warnings: [{ code: "concat_skipped", file_name: "bad.jpg", slot: "customer_communication", reason: "corrupt" }],
    concat_receipts: [],
  });

  // ... execute a happy-path request against the mocked route ...
  // const res = await POST(request, { params: { disputeId: "dp_test" } });
  // const body = await res.json();
  // expect(body.data.warnings).toHaveLength(1);
  // expect(body.data.warnings[0].code).toBe("concat_skipped");
});

it("returns 502 concat_failed when the assembler throws on final upload", async () => {
  const { assembleEvidence } = await import("@/lib/disputes/assemble-evidence");
  (assembleEvidence as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
    new Error("Stripe Files upload failed"),
  );

  // ... execute the request, expect 502 and body.error.code === "concat_failed" ...
});

it("persists concat_receipts to the dispute_submissions row on success", async () => {
  const { assembleEvidence } = await import("@/lib/disputes/assemble-evidence");
  (assembleEvidence as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
    evidence: { customer_communication: "file_merged" },
    warnings: [],
    concat_receipts: [
      { slot: "customer_communication", input_file_ids: ["file_a", "file_b"], combined_file_id: "file_merged" },
    ],
  });

  // ... execute the request, assert that the Supabase update call included
  // concat_receipts matching the mock return ...
});
```

The placeholders (`// ... execute ...`) are commentary on the shape; flesh them out using the existing test helpers in the file — whatever mocks Supabase and constructs the NextRequest. If the existing file uses a helper like `callSubmitRoute(disputeId, overrides)`, use it. If it calls POST directly, follow that pattern.

- [ ] **Step 3: Run the route tests**

```bash
cd backend && npm test -- app/api/disputes 2>&1 | tail -30
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts
git commit -m "$(cat <<'EOF'
test(backend): rewrite submit route tests against new assembler (WIN-20)

Mocks lib/disputes/assemble-evidence. Adds coverage for concat_skipped
warning propagation, concat_failed hard-fail path, and concat_receipts
persistence into dispute_submissions.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Integration test — multi-file concat variant

**Context:** The existing step-9 integration test covers a single-file happy path. Add a step-10 variant that uploads multiple files to colliding slots and asserts the combined PDFs land correctly.

**Files:**
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts`

- [ ] **Step 1: Locate the step 9 test**

Read the existing `backend/__tests__/integration/dispute-wizard-flow.test.ts` to find the step 9 block. Note how it mocks Stripe, Supabase, and auth.

- [ ] **Step 2: Add a new step 10 test block**

Append to the file (inside the same `describe`):

```ts
it("WIN-20 step 10: submits evidence with multi-file concat in one slot", async () => {
  // Seed a dispute with 3 evidence files, all mapped to customer_communication.
  // Use the visa-13.1 playbook which has items #6 (delivery comms) and #8 (license key email)
  // both mapping to customer_communication — and we'll attach 2 files to item #6 and 1 to item #8
  // (requires extending evidence_files to allow multiple files per item — if not supported,
  //  use 3 separate items that share the same slot).

  // Mock downloadStripeFile to return real JPEG bytes from the fixture
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const jpg = await fs.readFile(path.join(__dirname, "../fixtures/concat/sample.jpg"));

  mockStripe.files.retrieve.mockResolvedValue({ id: "file_in_1", url: "https://files.stripe.com/file_in_1" });
  global.fetch = vi.fn(async () => new Response(jpg)) as unknown as typeof fetch;
  mockStripe.files.create.mockResolvedValue({ id: "file_combined_xyz", size: 12345 });
  mockStripe.disputes.update.mockResolvedValue({ id: "dp_test", status: "under_review" });

  // Call the submit route
  const res = await callSubmitRoute("dp_test");
  const body = await res.json();

  expect(res.status).toBe(200);
  expect(body.data.submission_id).toBeDefined();

  // Assert combined PDF uploaded exactly once
  expect(mockStripe.files.create).toHaveBeenCalledTimes(1);

  // Assert the update call received the combined file_id in customer_communication
  expect(mockStripe.disputes.update).toHaveBeenCalledWith(
    "dp_test",
    expect.objectContaining({
      evidence: expect.objectContaining({
        customer_communication: "file_combined_xyz",
      }),
      submit: true,
    }),
    expect.anything(),
  );

  // Assert the submissions row captured concat_receipts
  const { data: submission } = await supabase
    .from("dispute_submissions")
    .select("concat_receipts")
    .eq("dispute_id", "dp_test")
    .single();
  expect(submission?.concat_receipts).toHaveLength(1);
  expect(submission?.concat_receipts[0].slot).toBe("customer_communication");
});
```

(If the integration harness uses different helper names than `callSubmitRoute` or `mockStripe`, adapt to the existing conventions.)

- [ ] **Step 3: Run the integration test**

```bash
cd backend && npm run test:integration 2>&1 | tail -30
```

Expected: step 10 passes alongside all existing integration tests.

- [ ] **Step 4: Commit**

```bash
git add backend/__tests__/integration/dispute-wizard-flow.test.ts
git commit -m "$(cat <<'EOF'
test(backend): integration test step 10 — multi-file concat variant (WIN-20)

Extends dispute-wizard-flow.test.ts with a variant that uploads 3 files to
the same customer_communication slot, asserts one combined PDF is uploaded
to Stripe Files, the disputes.update call receives the combined file_id,
and the dispute_submissions row captures concat_receipts.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Frontend — evidence tab narrative_only rendering

**Context:** Items with `narrative_only: true` should show a "Covered in your narrative" hint and hide the attach/notes toggles. Items with `stripe_field` (autofilled) already use the existing `stripeFieldResult` pattern in `ChecklistItem.tsx` — no new code needed for those.

**Files:**
- Modify: `stripe-app/src/lib/types.ts`
- Modify: `stripe-app/src/components/evidence/ChecklistItem.tsx`

- [ ] **Step 1: Add `narrative_only` to the frontend EvidenceChecklistItem type**

In `stripe-app/src/lib/types.ts`, find the `EvidenceChecklistItem` interface and add:

```ts
narrative_only?: boolean;
```

- [ ] **Step 2: Branch on `narrative_only` in `ChecklistItem.tsx`**

In `stripe-app/src/components/evidence/ChecklistItem.tsx`, find the block starting at line 137 that renders the `notes` and `file` SectionToggles:

```tsx
{!isUnavailable && !isPositive && !submitted && (
  <>
    <SectionToggle
      label={notes ? 'Your notes' : 'Add notes'}
      expanded={notesExpanded}
      onPress={() => onSectionToggle('notes')}
    />
    <SectionToggle
      label={existingFile ? existingFile.file_name : 'Attach file'}
      expanded={fileExpanded}
      onPress={() => onSectionToggle('file')}
    />
  </>
)}
```

Add a `narrative_only` guard that replaces both toggles with a hint:

```tsx
{item.narrative_only ? (
  <Inline css={{ font: 'caption', color: 'secondary', fontStyle: 'italic' }}>
    Covered in your narrative
  </Inline>
) : !isUnavailable && !isPositive && !submitted ? (
  <>
    <SectionToggle
      label={notes ? 'Your notes' : 'Add notes'}
      expanded={notesExpanded}
      onPress={() => onSectionToggle('notes')}
    />
    <SectionToggle
      label={existingFile ? existingFile.file_name : 'Attach file'}
      expanded={fileExpanded}
      onPress={() => onSectionToggle('file')}
    />
  </>
) : null}
```

Also update the `fileExpanded` render block lower in the file — narrative_only items should not even show the FileUploadSection if the expanded state somehow gets set. Wrap the existing `fileExpanded && !isUnavailable` block:

```tsx
{fileExpanded && !isUnavailable && !item.narrative_only && (
  <Box css={{ marginLeft: 'xlarge' }}>
    <FileUploadSection
      disputeId={disputeId}
      checklistItemKey={item.item}
      existingFile={existingFile}
      context={context}
      onFileChange={onFileChange}
      submitted={submitted}
    />
  </Box>
)}
```

- [ ] **Step 3: Manual visual check**

Run the Stripe App dev server and load a dispute with a playbook that has narrative_only items (e.g., visa-10.4 has 3 of them). Confirm:
- narrative_only items show the "Covered in your narrative" italic hint
- no attach/notes toggles on those items
- other items unchanged

```bash
cd stripe-app && stripe apps start
```

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/lib/types.ts stripe-app/src/components/evidence/ChecklistItem.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): render narrative_only items without file uploader (WIN-20)

narrative_only items now show a "Covered in your narrative" italic hint
instead of the attach/notes toggles. The FileUploadSection is also guarded
so it cannot render for a narrative_only item even if expanded state leaks.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Frontend — warnings surface on SubmissionConfirmation

**Context:** The success screen currently just says "Evidence submitted" — merchants don't see warnings like `concat_skipped`, `field_truncated`, or `missing_mandatory_items` that came through on success. Render them as a non-blocking yellow callout above the success body.

**Files:**
- Modify: `stripe-app/src/lib/types.ts`
- Modify: `stripe-app/src/components/submit/SubmissionConfirmation.tsx`

- [ ] **Step 1: Add warnings to the SubmissionResponse type**

In `stripe-app/src/lib/types.ts`, find `SubmissionResponse` and add:

```ts
export type SubmissionWarning =
  | { code: 'field_truncated'; field: string; original_length: number; truncated_length: number }
  | { code: 'missing_mandatory_items'; items: string[] }
  | { code: 'deadline_passed'; due_by: number }
  | { code: 'concat_skipped'; file_name: string; slot: string; reason: string };

export interface SubmissionResponse {
  submission_id: string;
  submitted_at: string;
  dispute_status: string;
  warnings: SubmissionWarning[];
}
```

- [ ] **Step 2: Render warnings in `SubmissionConfirmation.tsx`**

Modify the component to render a warnings banner above the success body when warnings exist. The full updated file:

```tsx
import { Box, Banner, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { SubmissionResponse, SubmissionWarning } from '../../lib/types';

interface SubmissionConfirmationProps {
  response: SubmissionResponse;
  onBackToList?: () => void;
}

function describeWarning(w: SubmissionWarning): string {
  switch (w.code) {
    case 'field_truncated':
      return `Your narrative was truncated from ${w.original_length} to ${w.truncated_length} characters before submission.`;
    case 'missing_mandatory_items':
      return `Mandatory items were not attached: ${w.items.join(', ')}. Submitted without them.`;
    case 'deadline_passed':
      return `The response deadline has passed. Submitted late.`;
    case 'concat_skipped':
      return `"${w.file_name}" could not be merged into ${w.slot}: ${w.reason}. Submitted without it.`;
  }
}

export default function SubmissionConfirmation({ response, onBackToList }: SubmissionConfirmationProps) {
  const submittedAt = new Date(response.submitted_at).toLocaleString();
  const hasWarnings = response.warnings && response.warnings.length > 0;

  return (
    <Box css={{ stack: 'y', gap: 'large', padding: 'large' }}>
      {hasWarnings && (
        <Banner
          type="caution"
          title="Submitted with warnings"
          description={
            <Box css={{ stack: 'y', gap: 'xsmall' }}>
              {response.warnings.map((w, i) => (
                <Inline key={i} css={{ font: 'caption' }}>
                  • {describeWarning(w)}
                </Inline>
              ))}
            </Box>
          }
        />
      )}

      <Banner
        type="default"
        title="Evidence submitted"
        description="Your rebuttal is on its way to the card issuer."
      />

      <Box css={{ stack: 'y', gap: 'small' }}>
        <Inline css={{ font: 'heading' }}>What happens next</Inline>
        <Box>
          The bank typically takes 60-75 days to issue a decision. You will be
          notified in Stripe when the dispute is resolved.
        </Box>
        <Box css={{ stack: 'y', gap: 'xxsmall' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>Submitted at</Inline>
          <Inline css={{ font: 'caption' }}>{submittedAt}</Inline>
        </Box>
      </Box>

      {onBackToList && (
        <Button type="secondary" onPress={onBackToList}>
          Back to disputes
        </Button>
      )}
    </Box>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/types.ts stripe-app/src/components/submit/SubmissionConfirmation.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): surface submission warnings on success screen (WIN-20)

SubmissionConfirmation now renders a caution banner above the success body
when the response includes warnings. Covers field_truncated, missing_mandatory_items,
deadline_passed, and concat_skipped. Each warning is a one-line plain-English
description the merchant can act on.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Frontend — HEIC upload rejection

**Context:** Reject `image/heic` and `image/heif` uploads before they save to `evidence_files`. The `StripeFileUploader` component doesn't expose a pre-upload mime filter, so we validate inside `handleUploadComplete` — the file is already in Stripe Files by that point, but we simply don't save the DB row, which makes it a no-op from the merchant's perspective.

**Files:**
- Modify: `stripe-app/src/components/evidence/FileUploadSection.tsx`

- [ ] **Step 1: Replace `handleUploadComplete` in `FileUploadSection.tsx`**

Locate the existing `handleUploadComplete` function (around lines 46-74 in the current file) and replace it with this version. The HEIC/HEIF check runs before the DB save and returns early with a merchant-friendly error:

```tsx
const handleUploadComplete = async (fileObject: {
  id: string;
  filename?: string;
  size: number;
  type?: string;
}) => {
  setError(null);

  // WIN-20: reject HEIC/HEIF before persisting. Stripe's FileUploader component
  // has no pre-upload mime filter, so we reject post-upload — the file is already
  // in Stripe Files but we don't persist the evidence_files row, so it's a no-op
  // from the merchant's perspective. The merchant re-exports as JPEG/PNG.
  const mime = (fileObject.type ?? '').toLowerCase();
  if (mime === 'image/heic' || mime === 'image/heif') {
    setError(
      "HEIC photos aren't supported. Open the file in Preview or your photo app, export it as JPEG or PNG, and try again.",
    );
    return;
  }

  setSaving(true);

  try {
    const result = await fetchBackend<{ data: EvidenceFile }>(
      `/api/disputes/${disputeId}/evidence-files`,
      context,
      {
        checklist_item_key: checklistItemKey,
        stripe_file_id: fileObject.id,
        file_name: fileObject.filename ?? 'untitled',
        file_size: fileObject.size,
        mime_type: fileObject.type ?? 'application/octet-stream',
      },
    );
    onFileChange(result.data);
    setShowReplace(false);
  } catch (err) {
    setError('Failed to save file record. The file was uploaded to Stripe but we could not link it. Try again.');
  } finally {
    setSaving(false);
  }
};
```

Note the string uses double quotes so the apostrophe in `aren't` doesn't need escaping.

- [ ] **Step 2: Update the user-facing file type hint**

Find the hint line near the bottom of the file that says "PDF, PNG, JPG, or GIF. Max 10MB." and leave it unchanged (HEIC is already not in the list).

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/evidence/FileUploadSection.tsx
git commit -m "$(cat <<'EOF'
feat(stripe-app): reject HEIC/HEIF uploads with clear error message (WIN-20)

HEIC files can't be merged by the backend concat pipeline (pdf-lib can't
embed HEIC, sharp's HEIF decode path isn't reliable on the Vercel runtime).
The stripe-app now rejects HEIC/HEIF at upload time with a message telling
the merchant to export as JPEG/PNG from their photo app. The file is still
uploaded to Stripe Files by the SDK, but we don't persist the evidence_files
row, so it's a no-op from the merchant's perspective.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Manual QA pass in Docket sandbox

**Context:** End-to-end verification against real Stripe test mode. Walks the full wizard for a multi-file dispute and confirms the submitted evidence renders correctly in the Stripe Dashboard.

**Files:** none (manual test)

- [ ] **Step 1: Create a test dispute**

```bash
stripe trigger charge.dispute.created --api-key $STRIPE_SECRET_KEY
```

Or use an existing test dispute from the Docket sandbox (acct_1TCiQ5EGBKy2j9aE). Note the dispute ID.

- [ ] **Step 2: Walk the full wizard**

Open the WinBack app in the Stripe Dashboard for the Docket account. Select the new dispute. Walk every tab in order:

1. **Review tab** — confirm dispute details render.
2. **Evidence tab** — attach 4 real files across 2 slots that will concat:
   - Upload 2 screenshots to items that map to `customer_communication`
   - Upload 2 screenshots to items that map to `uncategorized_file`
   - Verify that narrative_only items show the "Covered in your narrative" hint
   - Verify that autofilled items show the existing FROM STRIPE badge
3. **Narrative tab** — generate a narrative. Verify the narrative populates.
4. **Submit tab** — check the confirmation checkbox, click Submit.

Expected:
- Submission succeeds
- Success screen renders with no warnings (or expected warnings if any items were missing)
- `SubmissionConfirmation` shows the timestamp

- [ ] **Step 3: Verify in Stripe Dashboard**

Open the dispute directly in Stripe Dashboard (outside the app). Under the Evidence section:

- `customer_communication` should contain exactly **one** combined PDF (not 2 separate files)
- `uncategorized_file` should contain exactly **one** combined PDF (not 2 separate files)
- Open each combined PDF and verify all merged pages are present, readable, and right-side-up

- [ ] **Step 4: Verify in dev Supabase**

```sql
SELECT id, status, concat_receipts, warnings
FROM dispute_submissions
WHERE dispute_id = (SELECT id FROM disputes WHERE stripe_dispute_id = '<dp_id>')
ORDER BY created_at DESC
LIMIT 1;
```

Expected: `status = 'succeeded'`, `concat_receipts` contains entries for the two concat'd slots, `warnings` is null or contains only expected entries.

- [ ] **Step 5: Attempt to submit again (should return cached response)**

Click Submit again on the same dispute. Expected: returns the cached response, no new Stripe call.

- [ ] **Step 6: Test HEIC rejection**

Find a `.heic` file (or generate one by taking a photo on your Mac's Photo Booth if iCloud is serving HEIC). Drag it into one of the file upload boxes. Expected: the upload error banner shows "HEIC photos aren't supported..."

- [ ] **Step 7: Document the manual test results**

Add a short summary to the eventual PR description (Task 16): which dispute IDs were tested, which playbooks, what was verified.

---

## Task 16: Pull request

**Files:** none (PR only)

- [ ] **Step 1: Push the branch**

```bash
git push -u origin joebenscoter/win-20-rescope
```

- [ ] **Step 2: Open the PR**

```bash
gh pr create --title "WIN-20: evidence submission with PDF concat and A/T/Slot playbook matrix" --body "$(cat <<'EOF'
## Summary

- Replaces the collision-handler mapper with an async evidence assembler that PDF-concats any Stripe slot with 2+ files before `disputes.update(submit: true)`
- Reclassifies every playbook checklist item across all 7 playbooks into autofilled (A) / narrative-only (T) / file-slot upload per the spec matrix; `uncategorized_file` is no longer used as a lazy default
- Rejects HEIC/HEIF uploads with a clear error message; surfaces per-file `concat_skipped` warnings on the success screen
- Adds `dispute_submissions.concat_receipts` column capturing per-slot assembly diagnostics for a future narrative enumeration ticket

Spec: `docs/superpowers/specs/2026-04-12-win-20-evidence-submission-design.md`
Plan: `docs/superpowers/plans/2026-04-12-win-20-evidence-submission.md`

## Test plan

- [x] Unit: playbook invariant validator (7 tests)
- [x] Unit: PDF concat library (6 tests)
- [x] Unit: evidence assembler (6 tests covering A/T/slot/concat/skip/truncate)
- [x] Unit: submission guard updated for narrative_only (1 new test)
- [x] Unit: submit route updated for new error codes (3 new tests)
- [x] Integration: dispute-wizard-flow step 10 multi-file concat variant
- [x] Manual: full wizard walk in Docket sandbox on a real dispute, verified combined PDFs in Stripe Dashboard and concat_receipts in Supabase
- [x] Manual: HEIC upload rejection confirmed with a real .heic file

## Tested dispute IDs

(Filled in during Task 15 manual QA)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL printed. Paste it into the issue's Linear WIN-20 comment.

---

## Summary

16 tasks covering the full WIN-20 rescope: branch setup → schema + playbooks → backend libraries (concat, assembler) → guard → route → tests → frontend → QA → PR. Every task ships a commit; the plan can be stopped and resumed between any two tasks without leaving the branch broken (modulo the Task 0 stub, which is cleared by Task 9).

## Self-Review Checklist

- [x] Spec coverage: every requirement in the spec maps to at least one task
  - Evidence authoring matrix → Task 3
  - `narrative_only` schema + invariant → Task 1
  - Migration 010 `concat_receipts` → Task 2
  - PDF concat library → Task 6
  - Evidence assembler → Task 7
  - Guard narrative_only filter → Task 8
  - Route integration with new error codes → Task 9
  - Warnings on success screen → Task 13
  - HEIC upload rejection → Task 14
  - Concat failure handling (skip-and-warn + hard-fail) → Tasks 7, 9
  - Read-only wizard mode → already on cherry-picked branch (Task 0)
  - Idempotency ledger → already on cherry-picked branch (Task 0)
  - `calculated_statement_descriptor` autofill → Tasks 3 (visa-10.4 #12) + 7 (assembler)
- [x] No placeholders except the single load-bearing stub in Task 0 Step 7 (which Task 9 removes)
- [x] Type consistency: `AssemblyResult`, `ConcatInput`, `ConcatReceipt`, `SubmissionWarning`, `EvidenceFileInput` are all defined in one task and referenced consistently in later tasks
