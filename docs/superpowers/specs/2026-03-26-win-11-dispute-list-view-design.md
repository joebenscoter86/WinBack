# WIN-11: Dispute List View with Status Indicators

**Date:** 2026-03-26
**Linear:** [WIN-11](https://linear.app/jkbtech/issue/WIN-11/build-dispute-list-view-with-status-indicators)
**Status:** Design approved, pending implementation

## Context

The dispute list view scaffolding already exists from WIN-9/WIN-10. This ticket enhances it to match the full WIN-11 spec: correct urgency thresholds, status badges, customer names, and a status filter.

### Existing code

- `stripe-app/src/views/DisputeListView.tsx` -- fetches disputes, sorts by deadline, tabs (Disputes / Insights)
- `stripe-app/src/components/DisputeCard.tsx` -- renders amount, urgency badge, network + reason code
- `stripe-app/src/components/EmptyState.tsx` -- generic empty state
- `stripe-app/src/views/PaymentDisputeView.tsx` -- contains a local `getStatusBadge` helper
- `backend/lib/stripe/normalize.ts` -- `normalizeDispute` returns `WinBackDispute` with customer_name, status, etc.
- `backend/app/api/disputes/route.ts` -- lists all disputes (no status filter server-side)

## Changes

### 1. Fix urgency thresholds in DisputeCard

Current thresholds (3d/7d) don't match the spec. Update `getUrgencyBadge`:

| Days remaining | Color | Badge type |
|----------------|-------|------------|
| 14+ | Green | `positive` |
| 5-13 | Yellow | `warning` |
| <5 | Red | `urgent` |

For resolved disputes (won/lost/warning_closed), don't show an urgency badge at all since the deadline is moot.

### 2. Add status badge to DisputeCard

Each card shows a status badge alongside the urgency badge:

| Status | Label | Badge type |
|--------|-------|------------|
| `needs_response`, `warning_needs_response` | Needs Response | `urgent` |
| `under_review`, `warning_under_review` | Under Review | `info` |
| `won` | Won | `positive` |
| `lost`, `warning_closed` | Lost | `negative` |
| `charge_refunded` | Refunded | `info` |

### 3. Add customer name to DisputeCard

Display `dispute.customer_name` below the amount. Fall back to "Unknown customer" if not present.

### 4. Extract shared helpers

Create `stripe-app/src/lib/utils.ts` with:

- `getStatusBadge(status: string)` -- extracted from PaymentDisputeView (add `charge_refunded` case)
- `getUrgencyBadge(dueBy: string, status: string)` -- extracted from DisputeCard with corrected thresholds, returns null for resolved disputes

Update both DisputeCard and PaymentDisputeView to import from the shared module.

### 5. Status filter dropdown

Add a `Select` component above the dispute list in DisputeListView with these options:

| Value | Label | Matches statuses |
|-------|-------|-----------------|
| `all` | All disputes | everything |
| `needs_response` | Needs response | `needs_response`, `warning_needs_response` |
| `under_review` | Under review | `under_review`, `warning_under_review` |
| `resolved` | Resolved | `won`, `lost`, `warning_closed`, `charge_refunded` |

Default selection: `all`.

Filter is applied client-side on the already-fetched disputes array. No backend changes needed.

### 6. Show all disputes

Remove the current `activeDisputes` filter that hides resolved disputes. The full `sortedDisputes` array is filtered by the dropdown instead. Default sort remains by deadline (soonest first), which naturally pushes resolved disputes (past deadlines) to the bottom.

### 7. Filter-aware empty states and count

- **No disputes at all (unfiltered):** Full EmptyState component with: "No disputes yet. When a dispute comes in, we'll walk you through exactly what to do."
- **No disputes matching filter:** Inline text: "No {filter label} disputes."
- **Count text:** Updates to reflect the filter. Examples: "4 disputes" (all), "2 needing response" (needs_response filter).

## Files touched

| File | Change type | Description |
|------|-------------|-------------|
| `stripe-app/src/lib/utils.ts` | **New** | Shared `getStatusBadge` and `getUrgencyBadge` helpers |
| `stripe-app/src/components/DisputeCard.tsx` | Modify | Fix urgency thresholds, add status badge, add customer name, import from shared utils |
| `stripe-app/src/views/DisputeListView.tsx` | Modify | Remove active-only filter, add Select dropdown, filter logic, filter-aware empty states, update count text |
| `stripe-app/src/views/PaymentDisputeView.tsx` | Modify | Import `getStatusBadge` from shared utils, remove local copy |

## Not in scope

- Sort controls (sort by amount, date created) -- overkill for <100 disputes
- Server-side filtering/pagination -- not needed at this scale
- Onboarding flow (WIN-25) -- empty state text is a placeholder
- Insights tab content (WIN-22, WIN-23)

## Acceptance criteria (from Linear)

- [ ] List renders with correct Stripe test mode data
- [ ] Urgency colors correct (green 14+, yellow 5-13, red <5)
- [ ] Status filter works (All / Needs Response / Under Review / Resolved)
- [ ] Empty state shows appropriate message per filter state
- [ ] Customer name visible on each card
- [ ] Status badge visible on each card
