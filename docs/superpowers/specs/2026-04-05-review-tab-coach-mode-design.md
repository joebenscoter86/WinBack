# Review Tab Redesign: Progressive Briefing with Coach Tone

**Date:** 2026-04-05
**Branch:** task-12-dispute-detail-view
**Related:** WIN-12 (Dispute Detail View)

## Problem

The Review tab dumps raw playbook content (issuer evaluation criteria, acquirer prereview processes, 6 common mistakes, 6 pro tips) on the merchant in a single wall of text. This content is written for payments experts. A small merchant seeing their first dispute reads "this is the hardest dispute type to win" and panics. They stop reading.

The playbook expertise is the product's moat, but it shouldn't be the front door.

## Design Principles

- **First 5 seconds:** The merchant should feel "I can win this," "I know what to do," and "someone has my back"
- **Progressive disclosure:** Clean simple surface by default, expertise behind taps for power users
- **Positive framing:** Reframe mistakes as actions. "Make sure you used 3D Secure" not "Not using 3D Secure"
- **Coach tone:** Warm, direct, confident. Like a knowledgeable friend, not a legal brief
- **Urgency-adaptive:** Tone and content density shift when deadline is tight

## Review Tab Layout (top to bottom)

### 1. DisputeOverview (unchanged)

Existing component. Amount, status badge, urgency badge, card/customer info, charge details. Factual, grounding. No changes needed.

### 2. CoachHeader (new component)

Replaces raw playbook `description` as the first thing the merchant reads after the overview.

**Structure:**
- **Headline:** Plain-English name for what happened. No jargon, no reason codes.
  - Example: "The cardholder says they didn't authorize this purchase."
  - Not: "Fraud -- Card Not Present (Visa 10.4)"
- **Coach note:** 2-3 sentences establishing "we've got this."
  - Example: "This is the most common type of dispute. The key question the bank will ask: can you prove this customer actually made the purchase? We'll walk you through exactly what evidence to gather."

**Data source:** New playbook fields `coach_headline` and `coach_summary` (see Data Changes below).

**Props:** `{ headline: string, summary: string, urgencyMode: boolean }`

### 3. QuickActions (replaces GamePlan)

Instead of "7 mandatory, 5 recommended evidence items" + pro tips dump + mistakes list, show a short list of positive action items. 3-5 max, each one sentence.

**Example for Visa 10.4:**
> **Your next steps**
> - Confirm you used 3D Secure (this is your strongest defense)
> - Pull the delivery confirmation and tracking number
> - Check that your billing descriptor matches your store name
> - Gather any customer communication (emails, support tickets)

**Data source:** Derived from two places:
1. `evidence_checklist` mandatory items (top priority)
2. `common_mistakes` reframed as positive actions

The component selects the top 3-5 items. Ordering: urgency_order from checklist items, then mandatory before recommended.

**Props:** `{ items: { text: string }[], urgencyMode: boolean }`

When `urgencyMode` is true, only show items from `urgency_essentials.ordered_items` (already exists in playbook data).

### 4. LearnMore (replaces ReasonCodeBreakdown)

Single Accordion, collapsed by default. Title: "Why this matters" or "Understand this dispute."

**Two sub-sections inside:**

1. **"What the bank checks"** -- Issuer evaluation criteria rewritten in plain English.
   - Not: "Was AVS (Address Verification) used? Did the billing address match?"
   - Instead: "Did you verify the customer's billing address matched their card?"

2. **"What happens to your response"** -- Acquirer prereview simplified.
   - Key message: Your response goes through a compliance check before the bank sees it. If it's incomplete, it gets rejected and you don't get a second chance.

**Data source:** New playbook fields `coach_issuer_summary` and `coach_acquirer_summary`.

**Props:** `{ issuerSummary: string, acquirerSummary: string }`

### 5. Urgency Behavior

Existing `UrgencyBanner` renders when < 5 days remain. No structural change.

**Behavioral change:** When urgency mode is active:
- CoachHeader tone shifts to direct: "You have 3 days. Focus on these essentials."
- QuickActions shortens to urgency essentials only (uses existing `urgency_essentials` field)
- LearnMore accordion stays but is deprioritized visually

**Implementation:** Pass `urgencyMode: boolean` prop to CoachHeader and QuickActions. Both components adapt rendering based on this flag. The urgency threshold (< 5 days) is computed in the parent (DisputeWorkflow's renderReviewTab).

## Data Changes

### New playbook fields

Add to `PlaybookData` type and all playbook seed data:

| Field | Type | Description |
|-------|------|-------------|
| `coach_headline` | `string` | One sentence, plain English. What happened from the cardholder's perspective. No jargon, no reason codes. |
| `coach_summary` | `string` | 2-3 sentence reassuring briefing. Establishes "we've got this" and previews what matters. Written at "smart 16-year-old" reading level. |
| `coach_issuer_summary` | `string` | Issuer evaluation criteria in plain English. What does the bank actually check? Written conversationally. |
| `coach_acquirer_summary` | `string` | Acquirer prereview in plain English. What happens before the bank sees your case? |

### Existing fields kept but hidden from default view

These fields remain in the playbook data (they power the Evidence tab and AI narrative generation later) but are no longer rendered directly on the Review tab:

- `description` -- replaced by `coach_summary` on Review
- `issuer_evaluation` -- replaced by `coach_issuer_summary` on Review
- `acquirer_prereview` -- replaced by `coach_acquirer_summary` on Review
- `pro_tips` -- removed from Review tab entirely (may resurface contextually in Evidence tab, WIN-14)
- `common_mistakes` -- reframed as positive actions in QuickActions; raw list removed from Review

## Component Changes

| Component | Action |
|-----------|--------|
| `CoachHeader` | New. Renders headline + coach note. |
| `QuickActions` | New. Replaces `GamePlan`. Renders 3-5 positive action items. |
| `LearnMore` | New. Replaces `ReasonCodeBreakdown`. Single collapsed accordion with plain-English expert content. |
| `GamePlan` | Delete. Replaced by `QuickActions`. |
| `ReasonCodeBreakdown` | Delete. Replaced by `LearnMore`. |
| `UrgencyBanner` | Keep. No structural changes. |
| `DisputeOverview` | Keep. No changes. |
| `DisputeWorkflow` | Update `renderReviewTab()` to use new components and pass `urgencyMode` flag. |

## What This Does NOT Change

- DisputeOverview component
- FocusView wizard structure (tabs, Next/Back buttons)
- Playbook data fetching logic
- Evidence, Narrative, Submit tabs (placeholder)
- Urgency threshold (< 5 days)
- Case strength indicator (deferred to Submit tab, WIN-20)

## Files Affected

**Frontend (stripe-app/src/):**
- `components/review/CoachHeader.tsx` -- new
- `components/review/QuickActions.tsx` -- new
- `components/review/LearnMore.tsx` -- new
- `components/review/GamePlan.tsx` -- delete
- `components/review/ReasonCodeBreakdown.tsx` -- delete
- `components/DisputeWorkflow.tsx` -- update renderReviewTab
- `lib/types.ts` -- add new PlaybookData fields

**Backend (backend/):**
- `lib/stripe/normalize.ts` -- no changes
- `lib/playbooks/data/*.ts` -- add coach_headline, coach_summary, coach_issuer_summary, coach_acquirer_summary to each playbook
- Playbook seed script -- update if applicable

**Playbook content (to be written per reason code):**
- Visa 10.4 coach content
- Visa 13.1 coach content
- Visa 13.2 coach content
- Visa 13.3 coach content
- Visa 13.6 coach content
- Mastercard 4853 coach content
- Mastercard 4808 coach content
