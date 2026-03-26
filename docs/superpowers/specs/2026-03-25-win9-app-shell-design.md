# WIN-9: Stripe App Shell and Sidebar Navigation — Design Spec

> Approved 2026-03-25. Guides implementation of the WinBack app shell, navigation architecture, and backend communication layer.

## Summary

Build the WinBack Stripe App shell with a hybrid navigation model: the dashboard drawer provides an overview (tabbed dispute list + insights), and clicking a dispute opens a full-screen FocusView wizard for the guided resolution workflow. Includes the authenticated backend API client used by all future tasks.

## Architecture Decisions

### AD-1: Hybrid Drawer + FocusView Navigation

**Decision:** Drawer view (DisputeListView) shows tabs and dispute cards for browsing. Clicking a dispute opens a FocusView overlay with the 4-step wizard. The drawer is for overview; the FocusView is for work.

**Why:** The drawer is ~450px wide — too narrow for checklists, text areas, and the "TurboTax" guided flow. FocusView gives full-screen real estate and has built-in unsaved-changes protection via `confirmCloseMessages`. The hybrid approach gives merchants a quick glance without losing the guided experience.

**Rejected alternatives:**
- *Tabs + inline detail (all in drawer)* — too cramped for the wizard workflow
- *List → FocusView only (no tabs)* — wastes the drawer for just a list, no room for insights

### AD-2: 4-Step Wizard Flow

**Decision:** The FocusView wizard has 4 steps: Review → Evidence → Narrative → Submit.

**Why:** Matches the PRD specification. Each step has a clear, focused purpose. Fewer steps would cram too much into each screen; more steps would feel tedious for small disputes.

**Steps:**
1. **Review** — Dispute details, reason code info, playbook guidance
2. **Evidence** — Checklist of required/recommended evidence, file upload
3. **Narrative** — AI-generated narrative, review/edit, reasoning annotations
4. **Submit** — Final review of everything, confirmation, submit to Stripe

### AD-3: Thin API Client (fetchBackend utility)

**Decision:** A single `apiClient.ts` file with a `fetchBackend(path, options)` helper that auto-attaches the `Stripe-Signature` header via `fetchStripeSignature()`. Views call it directly. No domain-specific hooks in WIN-9.

**Why:** The SDK's async iframe constraints make React hooks tricky (no Suspense, controlled input lag, React 17). A thin utility is ~30 lines, easy to understand, and sufficient for all downstream tasks. Domain-specific hooks (e.g., `useDisputes()`) can be introduced in WIN-10/11 if needed, built on top of this utility.

**How to use (for future agents):**
```typescript
import { fetchBackend } from '../lib/apiClient';

// GET request
const disputes = await fetchBackend('/api/disputes');

// POST request
const result = await fetchBackend('/api/disputes/dp_123/narrative', {
  method: 'POST',
  body: JSON.stringify({ prompt: '...' }),
});
```

The helper handles: signature fetching, header attachment, JSON parsing, and error normalization. Consumers get back parsed data or a thrown error.

## View Architecture

### 3 Viewports → 3 View Components

| Viewport | Component | Purpose |
|----------|-----------|---------|
| `stripe.dashboard.drawer.default` | DisputeListView | Tabbed overview: Disputes list + Insights |
| `stripe.dashboard.payment.detail` | PaymentDisputeView | Quick dispute status on payment pages + "Open in WinBack" CTA |
| `settings` | AppSettings | Subscription status, preferences, account info |

### FocusView Overlay (shared)

Both DisputeListView and PaymentDisputeView can open the same `DisputeWorkflow` FocusView. It renders the 4-step wizard with `Tabs` for step navigation.

The FocusView is a child of the host ContextView, controlled via the `shown` prop (not conditional rendering — per SDK constraints).

## File Structure

```
stripe-app/src/
├── views/
│   ├── DisputeListView.tsx      — drawer: tabs (Disputes/Insights) + dispute cards
│   ├── PaymentDisputeView.tsx   — payment detail: status badge + "Open" button
│   └── AppSettings.tsx          — settings page shell
├── components/
│   ├── DisputeCard.tsx          — reusable dispute row (id, amount, reason code, urgency badge)
│   ├── DisputeWorkflow.tsx      — FocusView shell with 4-step tab navigation (placeholder steps)
│   ├── EmptyState.tsx           — "No disputes yet" display
│   └── ErrorBanner.tsx          — reusable error display
└── lib/
    ├── apiClient.ts             — fetchBackend() with auto Stripe-Signature
    └── types.ts                 — shared TypeScript types (Dispute, WizardStep, etc.)
```

## Component Details

### DisputeListView

- **Tabs:** "Disputes" (default) and "Insights"
- **Disputes tab:** List of DisputeCard components, sorted by urgency (deadline soonest first)
- **Insights tab:** Placeholder for WIN-22 (win rate dashboard)
- **Empty state:** EmptyState component when no disputes exist
- **Loading state:** Spinner while fetching
- **Error state:** ErrorBanner on fetch failure
- Clicking a DisputeCard sets `selectedDisputeId` and shows the FocusView

### PaymentDisputeView

- Reads `environment.objectContext.id` to get the payment intent ID
- Shows dispute status badge if a dispute exists for this payment
- "Open in WinBack" button opens the FocusView wizard
- If no dispute: shows a brief "No dispute on this payment" message

### DisputeWorkflow (FocusView)

- Receives `disputeId` as prop
- Tabs component with 4 steps: Review, Evidence, Narrative, Submit
- Each step renders placeholder content (real content built in WIN-12, 14, 19, 20)
- `confirmCloseMessages` prop for unsaved-changes protection
- `primaryAction` and `secondaryAction` footer buttons (step-dependent: Next/Back/Submit)

### apiClient.ts

```typescript
import { fetchStripeSignature } from '@stripe/ui-extension-sdk/utils';

// Matches connect-src in stripe-app.json CSP. For local dev, update CSP to localhost.
const BACKEND_URL = 'https://winback-api.vercel.app';

export async function fetchBackend<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const signature = await fetchStripeSignature();
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
      ...options?.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
```

## Mock Data

WIN-9 uses hardcoded mock data (no real API calls — that's WIN-10). Mock disputes array in a `mockData.ts` file:

```typescript
export const MOCK_DISPUTES = [
  { id: 'dp_mock_1', amount: 14900, currency: 'usd', reason: 'product_not_received', status: 'needs_response', due_by: '2026-03-28', reason_code: '13.1', network: 'visa' },
  { id: 'dp_mock_2', amount: 8999, currency: 'usd', reason: 'product_unacceptable', status: 'needs_response', due_by: '2026-04-06', reason_code: '4853', network: 'mastercard' },
  { id: 'dp_mock_3', amount: 23450, currency: 'usd', reason: 'fraudulent', status: 'needs_response', due_by: '2026-04-12', reason_code: '10.4', network: 'visa' },
];
```

## States

Every API-dependent view implements three states:

1. **Loading** — Spinner component centered in the view
2. **Error** — ErrorBanner with message and retry action
3. **Empty** — EmptyState with helpful messaging ("No disputes yet — that's a good thing!")

## Scope Boundary

### WIN-9 builds:
- All 3 view shells with proper layout and navigation
- DisputeCard component with mock data
- FocusView wizard shell with tab navigation and placeholder steps
- apiClient.ts (fetchBackend utility)
- Loading, error, and empty state components
- Mock data for development

### Deferred to later tasks:
- WIN-10: Real Stripe API integration (replaces mock data)
- WIN-11: Real dispute list with live data
- WIN-12: Dispute detail auto-population in wizard
- WIN-14: Evidence checklist logic
- WIN-16: File upload in evidence step
- WIN-18-19: AI narrative generation and review
- WIN-20: Stripe evidence submission
- WIN-24: Subscription billing in settings
