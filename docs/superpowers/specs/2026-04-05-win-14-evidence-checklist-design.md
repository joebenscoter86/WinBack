# WIN-14: Evidence Checklist Component -- Design Spec

## Overview

Interactive evidence checklist for the Evidence tab of the dispute workflow FocusView. Renders reason-code-specific items from playbook data, tracks completion per dispute in Supabase, and adapts to urgency mode when <5 days remain.

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

New JSONB column `checklist_state` on the `disputes` table:

```sql
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_state JSONB DEFAULT '{}';
```

Shape: `Record<string, boolean>` keyed by checklist item name (the `item` field). Example:

```json
{
  "Transaction receipt or proof of purchase": true,
  "Customer communication log": true,
  "Delivery confirmation or tracking number": false
}
```

Only explicitly toggled items are stored. Items not in the map inherit their auto-populated state.

## Persistence

### Reading state

On mount, merge three layers:
1. Default: all items unchecked
2. Auto-population: items matching Stripe data are checked
3. Saved state: `disputes.checklist_state` overrides both (merchant's explicit choice)

### Writing state

On checkbox toggle, PATCH `/api/disputes/[disputeId]` with `{ checklist_state: { ...current } }`. Debounce writes by 500ms to avoid rapid-fire API calls when the merchant checks off multiple items quickly.

## Component Architecture

### `EvidenceChecklist` (main component)

- **Props:** `dispute: Dispute`, `playbook: PlaybookData | null`, `context: ExtensionContextValue`, `isUrgent: boolean`, `daysRemaining: number`
- **State:** `checklistState: Record<string, boolean>`, `expandedItems: Set<string>`, `showFullChecklist: boolean` (urgency override)
- **Responsibilities:**
  - Merge auto-populated + saved state on mount
  - Filter/sort items based on urgency mode
  - Group items by category
  - Debounce and persist state changes
  - Render progress header + item list

### `ChecklistProgress` (progress bar)

- **Props:** `completed: number`, `total: number`
- Renders: "Evidence Progress" label, "X of Y completed" count, filled progress bar
- Uses Stripe SDK `Box` and `Inline` components

### `ChecklistItem` (single item row)

- **Props:** `item: EvidenceChecklistItem`, `checked: boolean`, `autoPopulated: boolean`, `expanded: boolean`, `onToggle: () => void`, `onExpandToggle: () => void`
- Renders:
  - `Checkbox` component from SDK
  - Item name
  - Badges: REQUIRED (category=mandatory), HELPFUL (category=recommended), IF APPLICABLE (category=situational), FROM STRIPE (auto-populated)
  - "Why this matters" toggle link
  - Expandable `why_matters` text block

### No-playbook fallback

When `playbook` is null (unknown reason code), show a Banner:
> "No specific evidence checklist for this reason code. Use Stripe's general evidence guidelines for your response."

## Urgency Mode

When `daysRemaining < 5` and dispute status is actionable:

1. Show urgency banner (reuse existing `UrgencyBanner` or inline variant)
2. Filter checklist to only `urgency_essential: true` items
3. Sort by `urgency_order` (ascending, nulls last)
4. Show "View full checklist" link to override the filter
5. When override is active, show all items but keep urgency-essential items visually marked

## Badge Mapping

| Condition | Badge text | Color |
|---|---|---|
| `category === 'mandatory'` | REQUIRED | Pink/rose |
| `category === 'recommended'` | HELPFUL | Amber |
| `category === 'situational'` | IF APPLICABLE | Gray |
| Auto-populated from Stripe | FROM STRIPE | Blue |

Items can have two badges (e.g., FROM STRIPE + REQUIRED).

## SDK Components Used

All components are from `@stripe/ui-extension-sdk/ui`:
- `Box` -- layout containers, section grouping
- `Inline` -- text labels, badge text, progress count
- `Checkbox` -- item toggle
- `Badge` -- category and auto-population indicators
- `Icon` -- expand/collapse indicator
- `Banner` -- no-playbook fallback, urgency notice
- `Spinner` -- loading state
- `Link` -- "Why this matters" toggle, "View full checklist" toggle
- `Divider` -- section separators

## Integration Point

Replaces the placeholder content in `DisputeWorkflow.tsx` Evidence tab:

```tsx
<TabPanel id="evidence">
  <EvidenceChecklist
    dispute={dispute}
    playbook={playbook}
    context={context}
    isUrgent={isUrgent}
    daysRemaining={daysRemaining}
  />
</TabPanel>
```

## API Changes

### Migration

```sql
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_state JSONB DEFAULT '{}';
```

### PATCH `/api/disputes/[disputeId]`

Add a PATCH handler to the existing `/api/disputes/[disputeId]/route.ts` to accept partial dispute updates. Request body:

```json
{
  "checklist_state": { "Item name": true, "Other item": false }
}
```

Response: updated dispute object.

## States

- **Loading:** Spinner while playbook/dispute data loads (handled by parent `DisputeWorkflow`)
- **No playbook:** Banner fallback
- **Normal mode:** Full checklist grouped by category
- **Urgency mode:** Filtered to essentials with override toggle
- **Empty checklist:** If playbook has no evidence_checklist items (unlikely but handle gracefully)

## File Structure

```
stripe-app/src/components/evidence/
  EvidenceChecklist.tsx    -- main component
  ChecklistItem.tsx        -- single item row
  ChecklistProgress.tsx    -- progress bar
```

## Acceptance Criteria Mapping

| Criteria | Implementation |
|---|---|
| Checklist renders correctly for each of 5 reason codes | Items sourced from playbook data, tested per reason code |
| "Why this matters" expands/collapses | Inline toggle per ChecklistItem |
| Urgency mode shows reduced checklist | Filter by urgency_essential when <5 days |
| Progress tracking persists across sessions | JSONB column on disputes table, debounced PATCH |
