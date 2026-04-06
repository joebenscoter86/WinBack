# WIN-14: Evidence Checklist Component -- Design Spec

## Overview

Interactive evidence checklist for the Evidence tab of the dispute workflow FocusView. Renders reason-code-specific items from playbook data, tracks completion and notes per dispute in Supabase, and adapts to urgency mode when <5 days remain.

## Data Sources

### Playbook `evidence_checklist` (read-only, from WIN-13)

Each item in `PlaybookData.evidence_checklist`:

```ts
interface EvidenceChecklistItem {
  item: string;                                    // Display name
  category: 'mandatory' | 'recommended' | 'situational';
  context: string;                                 // 'all' or situational qualifier
  required: boolean;
  why_matters: string;                             // Issuer evaluation context
  where_to_find?: string;                          // Actionable guidance on obtaining this evidence
  urgency_essential: boolean;
  urgency_order: number | null;                    // Sort order in urgency mode
}
```

### Dispute enriched data (from WIN-12)

Auto-population mapping -- checklist items are pre-checked when corresponding Stripe data exists:

| Checklist item pattern | Stripe field | Condition |
|---|---|---|
| Contains "receipt" or "proof of purchase" | `dispute.receipt_url` | Truthy |
| Contains "customer email" | `dispute.customer_email` | Truthy |
| Contains "billing address" | `dispute.billing_address` | Truthy |
| Contains "transaction" and "date" | `dispute.transaction_date` | Truthy |

Auto-populated items get a "FROM STRIPE" badge and are pre-checked. Merchants can uncheck them (empowerment over automation).

### Checklist state (read/write, persisted in Supabase)

JSONB column `checklist_state` on the `disputes` table:

```sql
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_state JSONB DEFAULT '{}';
```

Shape: `Record<string, boolean>` keyed by checklist item name (the `item` field). Only explicitly toggled items are stored. Items not in the map inherit their auto-populated state.

### Checklist notes (read/write, persisted in Supabase)

Separate JSONB column `checklist_notes` on the `disputes` table:

```sql
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_notes JSONB DEFAULT '{}';
```

Shape: `Record<string, string>` keyed by checklist item name. Merchants can jot down tracking numbers, file names, or other context per item.

## Persistence

### Reading state

On mount, merge three layers:
1. Default: all items unchecked
2. Auto-population: items matching Stripe data are checked
3. Saved state: `disputes.checklist_state` overrides both (merchant's explicit choice)

Notes are loaded from `disputes.checklist_notes` directly.

### Writing state

On checkbox toggle, PATCH `/api/disputes/[disputeId]` with `{ checklist_state: { ...current } }`. Debounce writes by 500ms.

On notes change, PATCH `/api/disputes/[disputeId]` with `{ checklist_notes: { ...current } }`. Debounce writes by 1000ms (longer to avoid mid-typing saves).

The PATCH handler accepts either or both fields in a single request.

## Component Architecture

### `EvidenceChecklist` (main component)

- **Props:** `dispute: Dispute`, `playbook: PlaybookData | null`, `context: ExtensionContextValue`, `isUrgent: boolean`, `daysRemaining: number`
- **State:** `checklistState: Record<string, boolean>`, `notesState: Record<string, string>`, `expandedSections: Map<string, Set<ExpandedSection>>`, `showFullChecklist: boolean` (urgency override)
- **Responsibilities:**
  - Render coach intro header with reassuring guidance
  - Merge auto-populated + saved state on mount
  - Filter/sort items based on urgency mode
  - Group items by category
  - Debounce and persist state + notes changes separately
  - Render progress header + item list

### `ChecklistProgress` (progress bar)

- **Props:** `completed: number`, `total: number`
- Renders: "Evidence Progress" label, "X of Y completed" count
- Uses Stripe SDK `Box` and `Inline` components
- Note: Visual progress bar dropped due to Stripe SDK Box not supporting `background` or arbitrary `height` CSS values. Text counter provides the same information.

### `ChecklistItem` (single item row)

- **Props:** `item: EvidenceChecklistItem`, `checked: boolean`, `autoPopulated: boolean`, `expandedSections: Set<ExpandedSection>`, `notes: string`, `onToggle`, `onSectionToggle`, `onNotesChange`
- **Three independent collapsible sections per item:**
  1. **"Why this matters"** -- issuer evaluation context from `why_matters` field
  2. **"Where to find this"** -- actionable guidance from `where_to_find` field (only shown when field is populated)
  3. **"Add notes" / "Your notes"** -- TextArea for merchant to jot down tracking numbers, file names, etc. Label changes to "Your notes" when content exists.
- **Badges:** REQUIRED (mandatory, `type="negative"`), HELPFUL (recommended, `type="warning"`), IF APPLICABLE (situational, `type="neutral"`), FROM STRIPE (auto-populated, `type="info"`)
- Note: Badge types adapted from plan (`critical`/`default`) to actual Stripe SDK types (`negative`/`neutral`). Font weight uses `semibold` (SDK doesn't support `medium`).

### Coach intro header

At the top of the Evidence tab, before the progress bar:

- Heading: "Gather your evidence"
- Body: Reassuring copy explaining the flow -- don't be intimidated by the list, expand items to see guidance and take notes, next step puts it all together.

### No-playbook fallback

When `playbook` is null (unknown reason code), show a Banner:
> "No specific evidence checklist for this reason code. Use Stripe's general evidence guidelines for your response."

## Urgency Mode

When `daysRemaining < 5` and dispute status is actionable:

1. Show urgency banner with day count
2. Filter checklist to only `urgency_essential: true` items
3. Sort by `urgency_order` (ascending, nulls last)
4. Show "View full checklist" link to override the filter
5. When override is active, show all items; link changes to "Show essentials only"

## SDK Components Used

All components are from `@stripe/ui-extension-sdk/ui`:
- `Box` -- layout containers, section grouping
- `Inline` -- text labels, badge text, progress count
- `Checkbox` -- item toggle
- `Badge` -- category and auto-population indicators (types: negative, warning, neutral, info)
- `Icon` -- chevron up/down for section toggles
- `Banner` -- no-playbook fallback, urgency notice
- `Link` -- section toggles, urgency override toggle
- `TextArea` -- per-item notes field
- `Divider` -- section separators

## Integration Point

Replaces the placeholder content in `DisputeWorkflow.tsx` Evidence tab:

```tsx
<TabPanel id="evidence">
  <EvidenceChecklist
    dispute={dispute}
    playbook={playbook}
    context={contextRef.current}
    isUrgent={isUrgent}
    daysRemaining={daysRemaining}
  />
</TabPanel>
```

## API Changes

### Migrations

```sql
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_state JSONB DEFAULT '{}';
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_notes JSONB DEFAULT '{}';
```

### PATCH `/api/disputes/[disputeId]`

Accepts partial updates. Builds an update payload from whichever fields are provided:

```json
{
  "checklist_state": { "Item name": true, "Other item": false },
  "checklist_notes": { "Item name": "tracking #1Z999AA10012345" }
}
```

Falls back to upsert if no dispute row exists yet in Supabase for this `stripe_dispute_id`.

### Playbook data

Added optional `where_to_find` field to `EvidenceChecklistItem` in `backend/lib/playbooks/types.ts`. Populated for all 12 items in visa-10.4 playbook. Other playbooks pending (WIN-36).

Playbooks are served from Supabase, not in-memory TypeScript files. Any changes to playbook data files must also be applied to the Supabase `playbooks` table (via seed script or direct SQL).

### Test-mode reason code fallback

Added `TEST_MODE_REASON_CODE_MAP` in `normalize.ts` that maps Stripe's generic `reason` field to representative Visa/MC reason codes when `network_reason_code` is empty (test mode only). This enables playbook matching during QA.

## States

- **Loading:** Spinner while playbook/dispute data loads (handled by parent `DisputeWorkflow`)
- **No playbook:** Banner fallback
- **Normal mode:** Full checklist grouped by category with coach intro
- **Urgency mode:** Filtered to essentials with override toggle
- **Empty checklist:** If playbook has no evidence_checklist items (graceful empty state)

## File Structure

```
stripe-app/src/components/evidence/
  EvidenceChecklist.tsx    -- main component with coach intro, state management, persistence
  ChecklistItem.tsx        -- single item row with three collapsible sections
  ChecklistProgress.tsx    -- progress counter header
```

## Follow-up Issues

- **WIN-36:** Populate `where_to_find` guidance for all remaining playbooks (visa-13.1, 13.2, 13.3, 13.6, mastercard-4853, 4808)
- **WIN-37:** Auto-pull Stripe transaction data (AVS, CVV, 3DS) into checklist items and carry through to evidence submission. The "TurboTax pre-fills from your W-2" moment.

## Acceptance Criteria Mapping

| Criteria | Implementation |
|---|---|
| Checklist renders correctly for each of 5 reason codes | Items sourced from playbook data via Supabase |
| "Why this matters" expands/collapses | Independent collapsible section per ChecklistItem |
| "Where to find this" guidance | Independent collapsible section, shown when `where_to_find` is populated |
| Per-item notes | TextArea in independent collapsible section, persisted to `checklist_notes` |
| Coach intro | Reassuring header at top of Evidence tab |
| Urgency mode shows reduced checklist | Filter by urgency_essential when <5 days |
| Progress tracking persists across sessions | JSONB columns on disputes table, debounced PATCH |
| Auto-populated items from Stripe | FROM STRIPE badge, pre-checked, merchant can override |
