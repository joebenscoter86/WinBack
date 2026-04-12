# WIN-19: Narrative Review/Edit UI Design

## Problem

The Narrative tab in the dispute workflow is a placeholder. Merchants need to generate AI narratives from their uploaded evidence, review the AI's reasoning, edit the text, and approve it before moving to the Submit step. The UI must handle async generation (3-15 seconds), a 5-generation limit, and graceful fallback when the AI is unavailable.

## Dependencies

- WIN-18 (Claude API backend) -- done. `POST /api/narratives/generate` returns `{ generation_id }`, `POST /api/narratives/{generationId}/status` returns `{ status, narrative, annotations }`.
- WIN-17 (prompt templates) -- done. Each playbook has a `narrative_template` for static fallback.
- WIN-31 (auth middleware) -- done.

## Approach

Replace the placeholder in the Narrative tab with a `NarrativePanel` component that manages a 4-phase state machine: idle (pre-generation), generating (polling), review (annotated + editable), and error (fallback). Merchant explicitly triggers generation. Annotations display as inline callout blocks for coaching. Editing happens in a TextArea below a collapsible annotation accordion.

---

## 1. Component Architecture

```
NarrativePanel (state machine: idle -> generating -> review -> error)
  NarrativePreGeneration   -- evidence summary, feedback field, generate button
  NarrativeGenerating      -- spinner + context message, polls /status endpoint
  NarrativeReview          -- collapsible annotations + edit area + approve/regenerate
  NarrativeError           -- caution banner + pre-filled playbook template
```

### Props from DisputeWorkflow

```typescript
interface NarrativePanelProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  evidenceFiles: EvidenceFile[];
  context: ExtensionContextValue;
  onApprove: (narrativeText: string) => void;
  onNavigateBack: () => void; // switches to evidence tab
}
```

### Internal State (NarrativePanel)

```typescript
phase: 'idle' | 'generating' | 'review' | 'error'
generationId: string | null
narrative: string              // original from API (read-only after generation)
annotations: Array<{ section: string; reasoning: string }>
generationNumber: number       // current generation (1-5)
maxGenerations: number         // 5 (constant)
errorMessage: string | null
```

### Lifted State (DisputeWorkflow parent)

```typescript
editedNarrative: string        // merchant's edits, persists across tab switches
```

Passed to `NarrativePanel` as a prop along with a setter. NarrativePanel initializes it from the API response on generation complete, then updates it on every TextArea change.

---

## 2. Phase: Pre-Generation (idle)

The first screen the merchant sees on the Narrative tab. Purpose: show what evidence the AI will work with and give the merchant a chance to go back and add more.

### Evidence Summary

- For each item in `playbook.evidence_checklist`, show:
  - Green checkmark + file name if `evidenceFiles` contains a file matching that checklist item key
  - Amber dot + "not uploaded" if no matching file
  - Missing mandatory items get amber text (not just gray)
- "Go back to add more evidence" link calls `onNavigateBack()`
- If no playbook (unknown reason code), skip the evidence summary and show a generic message

### Feedback Field

- Stripe SDK `TextArea` component
- Placeholder: "e.g. Customer confirmed receipt by phone on March 20th"
- Label: "Anything else the AI should know? (optional)"
- Maps to `merchant_feedback` on the generate endpoint
- On regeneration, this carries the feedback from the previous cycle

### Generate Button

- Primary `Button`: "Generate Narrative"
- Counter text: "5 generations available" (updates as generations are used)
- When limit reached (5/5): button disabled, text reads "You've used all 5 generations. You can still edit the current narrative manually."

### No Evidence Warning

If zero evidence files are uploaded, show a `Banner` with type `caution`: "No evidence has been uploaded yet. The AI can still generate a narrative, but it will be stronger with supporting evidence." Do not block generation.

---

## 3. Phase: Generating

- Centered `Spinner` with context text: "Generating your narrative..."
- Subtitle: "WinBack is analyzing your evidence and building a response tailored to [network] reason code [reason_code]. This usually takes 5-10 seconds."
- Poll `POST /api/narratives/{generationId}/status` every 3 seconds
- Max poll duration: 60 seconds (safety net)
- On `status: 'completed'`: transition to `review`, populate `narrative`, `annotations`, `editedNarrative`
- On `status: 'failed'`: transition to `error`
- On network error: retry up to 3 times, then transition to `error`

### Polling Implementation

`useEffect` with `setInterval` at 3-second intervals. Cleanup on unmount or phase change. If the merchant navigates to another tab, polling continues in the background (the component stays mounted in the TabPanel).

---

## 4. Phase: Review

Two sections stacked vertically:

### Collapsible AI Strategy Accordion

- Uses Stripe SDK `Accordion` component
- Title: "AI Strategy & Reasoning"
- Subtitle: "{N} sections analyzed"
- Expanded by default on first load
- Each annotation displayed as:
  - Section name (uppercase label)
  - Reasoning text (blue-tinted, matches the coaching color from the Review tab)
- Read-only. This is the coaching layer.

### Editable Narrative

- Label: "Edit Your Narrative"
- Subtitle: "This is the text that will be submitted to Stripe. Edit freely."
- Stripe SDK `TextArea` pre-filled with `narrative` (the full concatenated text from the API, without section headers or annotations)
- Auto-save: on every change, update `editedNarrative` in parent state. Show subtle "Auto-saved" indicator.
- No server persistence -- edits live in component state only, travel forward to the Submit step via `onApprove(editedNarrative)`

### Generation Counter

- Top right: "Generation {N} of 5"

### Action Buttons

- Primary: "Approve & Continue" -- calls `onApprove(editedNarrative)`, advances wizard to Submit step
- Secondary: "Regenerate" -- triggers a new generation cycle
- Counter: "{remaining} generations remaining"

### Regeneration Confirmation

If `editedNarrative !== narrative` (merchant made manual edits), show an inline `Banner` type `caution` before regenerating: "Regenerating will replace your edits. Continue?" with "Yes, regenerate" and "Keep editing" buttons. Do not use a modal (SDK doesn't support them).

---

## 5. Phase: Error / Fallback

### When AI generation fails

- `Banner` type `caution`: "AI generation unavailable. You can write your narrative manually, or try again later. Your dispute deadline is not affected."
- `TextArea` pre-filled with `playbook.narrative_template`:
  - Auto-replace `{{auto_pull_fields}}` (e.g. `{{avs_address_check}}`) with actual dispute data
  - Leave `[bracketed placeholders]` for the merchant to fill in
  - If no playbook available: empty TextArea with placeholder "Describe what happened with this transaction and why the dispute should be resolved in your favor..."
- "Continue with Manual Narrative" button (primary) -- calls `onApprove(editedNarrative)`
- "Try Again" button (secondary) -- re-triggers generation

---

## 6. Edge Cases

| Scenario | Behavior |
|----------|----------|
| Generation limit reached (5/5) | Generate and Regenerate buttons disabled. Message: "You've used all 5 generations. You can still edit the current narrative manually." |
| Navigate away mid-generation | Polling continues in background. On return, shows current state (spinner or completed result). |
| Navigate away after edits | `editedNarrative` persisted in parent state. Edits preserved on return. |
| No evidence uploaded | Caution banner shown but generation not blocked. |
| Unknown reason code (no playbook) | Skip evidence summary in pre-gen. Error fallback shows empty TextArea with generic placeholder. |
| 429 from generate endpoint | Display the server's error message. Show "Try Again" only if the error is not `generation_limit`. |

---

## 7. Data Flow

```
DisputeWorkflow (parent)
  |-- dispute, playbook, evidenceFiles (already fetched)
  |-- editedNarrative (lifted state, persists across tab switches)
  |
  NarrativePanel
    |
    [idle] --> merchant clicks "Generate Narrative"
    |           POST /api/narratives/generate
    |           { dispute_id, reason_code, network, merchant_feedback }
    |           --> 202 { generation_id, status: "pending" }
    |
    [generating] --> poll every 3s
    |               POST /api/narratives/{generationId}/status
    |               --> { status: "completed", narrative, annotations }
    |
    [review] --> merchant reads annotations, edits text
    |            "Approve & Continue" --> onApprove(editedNarrative)
    |            "Regenerate" --> back to [generating] (with confirmation if edits made)
    |
    [error] --> pre-fill with playbook.narrative_template
                "Try Again" --> back to [idle] or [generating]
                "Continue with Manual Narrative" --> onApprove(editedNarrative)
```

---

## 8. Files to Create/Modify

### New files (in `stripe-app/src/components/narrative/`)

- `NarrativePanel.tsx` -- main component, state machine, orchestration
- `NarrativePreGeneration.tsx` -- evidence summary, feedback field, generate button
- `NarrativeGenerating.tsx` -- loading spinner with context
- `NarrativeReview.tsx` -- collapsible annotations + edit area
- `NarrativeError.tsx` -- fallback with playbook template

### Modified files

- `stripe-app/src/components/DisputeWorkflow.tsx` -- replace placeholder with `NarrativePanel`, lift `editedNarrative` state, pass props
- `stripe-app/src/lib/types.ts` -- add narrative-related types (`NarrativePhase`, `NarrativeGeneration`, etc.)

### Not in scope

- WIN-35 (feedback mechanism on regenerate) -- the `merchant_feedback` field is wired up, but the structured feedback UI is a separate issue
- WIN-20 (evidence submission) -- `onApprove` passes the narrative text forward, but the Submit tab is a separate issue
- Server-side persistence of edits -- not needed; edits live in component state only
