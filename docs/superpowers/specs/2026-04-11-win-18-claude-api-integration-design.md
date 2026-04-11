# WIN-18: Claude API Integration Backend Route

## Problem

WinBack needs a backend route that calls Claude API to generate dispute response narratives. The generation takes 3-15 seconds, which is too long to block the Stripe iframe. The route must run generation in the background, let the client poll for results, validate that Claude doesn't hallucinate evidence, and enforce a 5-generation-per-dispute limit.

## Dependencies

- WIN-17 (prompt templates) -- done. `buildPrompt()` and all 7 reason code templates live in `backend/lib/prompts/`.
- WIN-31 (auth middleware) -- done. `withStripeAuth()` in `backend/lib/stripe-auth/`.

## Approach

Background generation using Vercel's `waitUntil()` pattern. The POST handler inserts a pending row, returns a generation_id immediately, and kicks off Claude in the background. The client polls a status endpoint every 2-3 seconds. A separate `narrative_generations` table tracks each attempt with its state, output, and errors.

---

## 1. Database: `narrative_generations` Table

New migration `008_narrative_generations.sql`:

```sql
CREATE TABLE narrative_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | completed | failed
  narrative_output JSONB,                  -- { narrative, annotations[] } on success
  error TEXT,                              -- error message on failure
  generation_number INTEGER NOT NULL,      -- 1-5, from disputes.narrative_generations_count
  merchant_feedback TEXT,                  -- feedback from previous generation (WIN-35)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_narrative_gen_dispute ON narrative_generations(dispute_id);
CREATE INDEX idx_narrative_gen_status ON narrative_generations(status);
```

On completion, the final narrative is also written to `disputes.narrative_text` so downstream consumers (WIN-20 evidence submission) can read it without joining.

---

## 2. API Routes

### `POST /api/narratives/generate`

**Input body** (via `withStripeAuth`):

```typescript
{
  dispute_id: string;        // Stripe dispute ID (dp_xxx)
  reason_code: string;       // e.g. "13.1"
  network: string;           // "visa" | "mastercard"
  merchant_feedback?: string; // optional, for regeneration (WIN-35)
}
```

**Flow:**

1. Verify auth (`withStripeAuth`)
2. Look up dispute in Supabase, confirm it belongs to this merchant
3. Check `narrative_generations_count` < 5, reject with 429 if at limit
4. Fetch the playbook for this reason code (issuer_evaluation, evidence_checklist)
5. Fetch evidence_files for this dispute from Supabase
6. Fetch checklist_notes from the dispute row
7. Increment `disputes.narrative_generations_count` and insert a `pending` row in `narrative_generations`
8. Return `{ generation_id, status: "pending" }` with 202 Accepted
9. `waitUntil()` kicks off: build prompt, call Claude, validate hallucinations, update row to completed/failed, write `disputes.narrative_text`

**Response:** `202 { generation_id: string, status: "pending" }`

### `POST /api/narratives/[generationId]/status`

Uses POST (not GET) because Stripe App SDK signs requests with a body containing `user_id` and `account_id`. GET requests with bodies are non-standard and some proxies strip them.

**Flow:**

1. Verify auth (`withStripeAuth`). The Stripe App frontend sends signed requests with `user_id` and `account_id` in the body and the signature in the `stripe-signature` header.
2. Look up generation row, confirm the dispute belongs to this merchant
3. Return current state

**Responses:**

- Pending: `200 { status: "pending" }`
- Complete: `200 { status: "completed", narrative: string, annotations: [...] }`
- Failed: `200 { status: "failed", error: "human-readable message" }`

Client polls every 2-3 seconds until `completed` or `failed`.

---

## 3. Claude API Client

Thin wrapper at `backend/lib/claude.ts`:

- Lazy-initialized Anthropic client (same proxy pattern as `supabase.ts`)
- `generateNarrative(promptResult: PromptResult): Promise<NarrativeOutput>` function
- Model: `claude-sonnet-4-6` for cost efficiency
- JSON mode enforced via `response_format: { type: "json_object" }`
- 60-second timeout (generous for 3-15s typical response)
- Returns parsed `NarrativeOutput` or throws typed errors for: timeout, rate limit, refusal, invalid JSON

---

## 4. Hallucination Validation

Pure function at `backend/lib/narratives/validate-hallucinations.ts`:

- Takes `NarrativeOutput` and the list of `EvidenceFileRef[]` that were actually uploaded
- Scans the narrative text for references to evidence checklist item keys
- If the narrative mentions an evidence item that wasn't in the uploaded list, strips that sentence/reference
- Returns the cleaned narrative + a list of stripped references (for logging)
- Conservative approach: only strip clear fabrications, don't mangle the whole narrative

Three-layer anti-hallucination strategy (layers 1-2 from WIN-17 spec):

1. **Prompt-level** -- system prompt rule: "only reference evidence that exists in the provided evidence list"
2. **Post-generation validation** -- this function, programmatic check
3. **Checklist notes as source material** -- merchant's own words are injected as quotable facts

---

## 5. Background Generation Orchestrator

Function at `backend/lib/narratives/generate-background.ts` called by `waitUntil()`:

1. Build `PromptContext` from dispute data, playbook, evidence files, checklist notes
2. Call `buildPrompt(context)` (from WIN-17)
3. Call Claude via the client wrapper
4. Run hallucination validation on the result
5. Update `narrative_generations` row: status -> completed, store output, set completed_at
6. Write final narrative to `disputes.narrative_text`
7. On any error: update row to `failed` with error message, don't touch `disputes.narrative_text`

All wrapped in try/catch so failures are always captured in the DB row rather than silently lost.

---

## 6. Error Handling

| Error | User-facing message | Surface |
|-------|-------------------|---------|
| Generation limit (5) reached | "You've used all 5 narrative generations for this dispute. You can edit the current narrative manually." | HTTP 429 on POST |
| Dispute not found / not yours | "Dispute not found" | HTTP 404 on POST |
| Claude timeout | "Narrative generation timed out. Please try again." | Stored in generation row |
| Claude rate limit | "AI service is busy. Please try again in a moment." | Stored in generation row |
| Claude refusal | "Unable to generate narrative for this dispute. You can write one manually." | Stored in generation row |
| Invalid JSON from Claude | "Generation failed unexpectedly. Please try again." | Stored in generation row |

Errors during background generation don't produce HTTP errors -- they're stored in the generation row and surfaced when the client polls the status endpoint.

---

## 7. File Structure

```
backend/
  lib/
    claude.ts                              -- Anthropic client wrapper
    narratives/
      generate-background.ts               -- orchestrator (prompt -> claude -> validate -> save)
      validate-hallucinations.ts           -- post-generation evidence validation
      __tests__/
        validate-hallucinations.test.ts    -- unit tests
        generate-background.test.ts        -- unit tests (mocked Claude)
  app/api/
    narratives/
      generate/
        route.ts                           -- POST handler
      [generationId]/
        status/
          route.ts                         -- GET handler (polling)
  supabase/migrations/
    008_narrative_generations.sql           -- new table
```

---

## 8. Integration Points

| Ticket | How it consumes this work |
|--------|--------------------------|
| **WIN-19** (Narrative UI) | Calls POST to generate, polls GET for status, renders narrative + annotations |
| **WIN-20** (Evidence submission) | Reads `disputes.narrative_text` for the final narrative to submit |
| **WIN-34** (Prompt eval) | Can call the orchestrator directly with test fixtures |
| **WIN-35** (Feedback on regenerate) | Passes `merchant_feedback` to POST, which flows into prompt context |
