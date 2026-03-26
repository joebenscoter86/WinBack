# WIN-11: Dispute List View with Status Indicators — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the existing dispute list view with correct urgency thresholds, status badges, customer names, and a status filter dropdown.

**Architecture:** All changes are frontend-only in `stripe-app/`. Extract shared badge helpers to a utils module, update DisputeCard with new data and corrected thresholds, add a Select dropdown filter to DisputeListView. No backend changes.

**Tech Stack:** Stripe Apps SDK (React), TypeScript

**Spec:** `docs/superpowers/specs/2026-03-26-win-11-dispute-list-view-design.md`

---

### Task 1: Create shared badge utils

**Files:**
- Create: `stripe-app/src/lib/utils.ts`

- [ ] **Step 1: Create `stripe-app/src/lib/utils.ts` with shared helpers**

```typescript
import type { DisputeStatus } from './types';

const RESOLVED_STATUSES: DisputeStatus[] = ['won', 'lost', 'warning_closed', 'charge_refunded'];

export function isResolved(status: string): boolean {
  return RESOLVED_STATUSES.includes(status as DisputeStatus);
}

export function getStatusBadge(status: string): {
  label: string;
  type: 'urgent' | 'warning' | 'positive' | 'negative' | 'info';
} {
  switch (status) {
    case 'needs_response':
    case 'warning_needs_response':
      return { label: 'Needs Response', type: 'urgent' };
    case 'under_review':
    case 'warning_under_review':
      return { label: 'Under Review', type: 'info' };
    case 'won':
      return { label: 'Won', type: 'positive' };
    case 'lost':
    case 'warning_closed':
      return { label: 'Lost', type: 'negative' };
    case 'charge_refunded':
      return { label: 'Refunded', type: 'info' };
    default:
      return { label: status, type: 'info' };
  }
}

export function getDaysRemaining(dueBy: string): number {
  const now = new Date();
  const due = new Date(dueBy);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getUrgencyBadge(
  dueBy: string,
  status: string,
): { label: string; type: 'urgent' | 'warning' | 'positive' } | null {
  if (isResolved(status)) return null;

  const days = getDaysRemaining(dueBy);
  if (days < 5) return { label: `${days}d left`, type: 'urgent' };
  if (days <= 13) return { label: `${days}d left`, type: 'warning' };
  return { label: `${days}d left`, type: 'positive' };
}
```

- [ ] **Step 2: Verify the file compiles**

Run from `stripe-app/`:
```bash
npx tsc --noEmit src/lib/utils.ts
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/utils.ts
git commit -m "feat(stripe-app): add shared badge utility helpers for WIN-11"
```

---

### Task 2: Update DisputeCard with status badge, customer name, and corrected urgency

**Files:**
- Modify: `stripe-app/src/components/DisputeCard.tsx`

- [ ] **Step 1: Replace the entire DisputeCard component**

Replace the contents of `stripe-app/src/components/DisputeCard.tsx` with:

```typescript
import { Box, Badge, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../lib/types';
import { getStatusBadge, getUrgencyBadge } from '../lib/utils';

interface DisputeCardProps {
  dispute: Dispute;
  onSelect: (disputeId: string) => void;
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

const DisputeCard = ({ dispute, onSelect }: DisputeCardProps) => {
  const statusBadge = getStatusBadge(dispute.status);
  const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);

  return (
    <Button
      type="secondary"
      css={{ width: 'fill' }}
      onPress={() => onSelect(dispute.id)}
    >
      <Box
        css={{
          stack: 'y',
          gap: 'xsmall',
          width: 'fill',
          padding: 'small',
        }}
      >
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between', alignY: 'center' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            {formatAmount(dispute.amount, dispute.currency)}
          </Inline>
          <Box css={{ stack: 'x', gap: 'xsmall' }}>
            <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
            {urgencyBadge && (
              <Badge type={urgencyBadge.type}>{urgencyBadge.label}</Badge>
            )}
          </Box>
        </Box>
        <Inline css={{ font: 'caption' }}>
          {dispute.customer_name || 'Unknown customer'}
        </Inline>
        <Box css={{ stack: 'x', gap: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1)} {dispute.reason_code}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {dispute.id.slice(0, 12)}...
          </Inline>
        </Box>
      </Box>
    </Button>
  );
};

export default DisputeCard;
```

- [ ] **Step 2: Verify the file compiles**

Run from `stripe-app/`:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/DisputeCard.tsx
git commit -m "feat(stripe-app): update DisputeCard with status badge, customer name, corrected urgency"
```

---

### Task 3: Update PaymentDisputeView to use shared utils

**Files:**
- Modify: `stripe-app/src/views/PaymentDisputeView.tsx`

- [ ] **Step 1: Remove local `getStatusBadge` and import from shared utils**

Remove the local `getStatusBadge` function (lines 15-34) and add the import. Replace:

```typescript
function getStatusBadge(status: string): {
  label: string;
  type: 'urgent' | 'warning' | 'positive' | 'negative' | 'info';
} {
  switch (status) {
    case 'needs_response':
    case 'warning_needs_response':
      return { label: 'Needs Response', type: 'urgent' };
    case 'under_review':
    case 'warning_under_review':
      return { label: 'Under Review', type: 'info' };
    case 'won':
      return { label: 'Won', type: 'positive' };
    case 'lost':
    case 'warning_closed':
      return { label: 'Lost', type: 'negative' };
    default:
      return { label: status, type: 'info' };
  }
}
```

With this import at the top of the file (after the SDK imports):

```typescript
import { getStatusBadge } from '../lib/utils';
```

- [ ] **Step 2: Verify the file compiles**

Run from `stripe-app/`:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/views/PaymentDisputeView.tsx
git commit -m "refactor(stripe-app): use shared getStatusBadge in PaymentDisputeView"
```

---

### Task 4: Add status filter and show all disputes in DisputeListView

**Files:**
- Modify: `stripe-app/src/views/DisputeListView.tsx`

- [ ] **Step 1: Replace the entire DisputeListView component**

Replace the contents of `stripe-app/src/views/DisputeListView.tsx` with:

```typescript
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  ContextView,
  Inline,
  Select,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Banner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeCard from '../components/DisputeCard';
import DisputeWorkflow from '../components/DisputeWorkflow';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';
import { fetchBackend, ApiError } from '../lib/apiClient';
import { isResolved } from '../lib/utils';
import type { Dispute } from '../lib/types';

type ViewState = 'loading' | 'error' | 'ready';
type StatusFilter = 'all' | 'needs_response' | 'under_review' | 'resolved';

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All disputes' },
  { value: 'needs_response', label: 'Needs response' },
  { value: 'under_review', label: 'Under review' },
  { value: 'resolved', label: 'Resolved' },
];

function matchesFilter(dispute: Dispute, filter: StatusFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'needs_response':
      return dispute.status === 'needs_response' || dispute.status === 'warning_needs_response';
    case 'under_review':
      return dispute.status === 'under_review' || dispute.status === 'warning_under_review';
    case 'resolved':
      return isResolved(dispute.status);
    default:
      return true;
  }
}

function getCountText(count: number, filter: StatusFilter): string {
  const noun = count === 1 ? 'dispute' : 'disputes';
  switch (filter) {
    case 'all':
      return `${count} ${noun}`;
    case 'needs_response':
      return `${count} needing response`;
    case 'under_review':
      return `${count} under review`;
    case 'resolved':
      return `${count} resolved`;
    default:
      return `${count} ${noun}`;
  }
}

const DisputeListView = ({ environment, userContext }: ExtensionContextValue) => {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const loadDisputes = useCallback(async () => {
    setViewState('loading');
    try {
      const result = await fetchBackend<{ data: Dispute[] }>('/api/disputes', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      setDisputes(result.data);
      setViewState('ready');
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to load disputes. Please try again.';
      setErrorMessage(message);
      setViewState('error');
    }
  }, []);

  useEffect(() => {
    loadDisputes();
  }, [loadDisputes]);

  const handleSelectDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowWorkflow(true);
  };

  const handleCloseWorkflow = (shown: boolean) => {
    setShowWorkflow(shown);
    if (!shown) setSelectedDisputeId(null);
  };

  // Sort by deadline (soonest first)
  const sortedDisputes = [...disputes].sort(
    (a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime(),
  );

  const filteredDisputes = sortedDisputes.filter((d) => matchesFilter(d, statusFilter));

  return (
    <ContextView title="WinBack" description="Guided dispute resolution">
      {viewState === 'loading' && (
        <Box
          css={{
            padding: 'xlarge',
            alignX: 'center',
            alignY: 'center',
          }}
        >
          <Spinner size="large" />
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Loading disputes...
          </Inline>
        </Box>
      )}

      {viewState === 'error' && (
        <ErrorBanner message={errorMessage} />
      )}

      {viewState === 'ready' && (
        <Tabs fitted size="medium">
          <TabList>
            <Tab id="disputes">Disputes</Tab>
            <Tab id="insights">Insights</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="disputes">
              <Box css={{ padding: 'small', stack: 'y', gap: 'small' }}>
                {disputes.length === 0 ? (
                  <EmptyState
                    title="No disputes yet"
                    description="When a dispute comes in, we'll walk you through exactly what to do."
                  />
                ) : (
                  <>
                    <Select
                      label="Filter"
                      hiddenElements={['label']}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    >
                      {FILTER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Select>

                    <Box css={{ paddingTop: 'small', paddingBottom: 'small' }}>
                      <Inline css={{ font: 'caption', color: 'secondary' }}>
                        {getCountText(filteredDisputes.length, statusFilter)}
                      </Inline>
                    </Box>

                    {filteredDisputes.length === 0 ? (
                      <Box css={{ padding: 'medium', alignX: 'center' }}>
                        <Inline css={{ font: 'caption', color: 'secondary' }}>
                          No {FILTER_OPTIONS.find((o) => o.value === statusFilter)?.label.toLowerCase()} disputes.
                        </Inline>
                      </Box>
                    ) : (
                      filteredDisputes.map((dispute) => (
                        <DisputeCard
                          key={dispute.id}
                          dispute={dispute}
                          onSelect={handleSelectDispute}
                        />
                      ))
                    )}
                  </>
                )}
              </Box>
            </TabPanel>
            <TabPanel id="insights">
              <Box css={{ padding: 'medium' }}>
                <Banner
                  type="default"
                  title="Insights"
                  description="Win rate analytics and dispute patterns will appear here."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Coming in WIN-22 and WIN-23.
                </Inline>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {selectedDisputeId && (
        <DisputeWorkflow
          disputeId={selectedDisputeId}
          shown={showWorkflow}
          setShown={handleCloseWorkflow}
        />
      )}
    </ContextView>
  );
};

export default DisputeListView;
```

- [ ] **Step 2: Verify the file compiles**

Run from `stripe-app/`:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/views/DisputeListView.tsx
git commit -m "feat(stripe-app): add status filter, show all disputes, filter-aware empty states (WIN-11)"
```

---

### Task 5: Manual QA in Stripe test mode

- [ ] **Step 1: Start the Stripe app locally**

```bash
cd stripe-app && stripe apps start
```

- [ ] **Step 2: Verify dispute list loads**

Open the Stripe Dashboard in test mode. Navigate to a page where the WinBack app sidebar appears. Confirm disputes load and display.

- [ ] **Step 3: Check urgency badge colors**

Verify:
- Disputes with 14+ days remaining show green badge
- Disputes with 5-13 days remaining show yellow badge
- Disputes with <5 days remaining show red badge
- Resolved disputes (won/lost) show no urgency badge

- [ ] **Step 4: Check status badges**

Verify each dispute shows a status badge (Needs Response / Under Review / Won / Lost) with correct coloring.

- [ ] **Step 5: Check customer name**

Verify each card shows the customer name, or "Unknown customer" if none.

- [ ] **Step 6: Test the status filter**

Switch between All / Needs response / Under review / Resolved. Verify:
- Correct disputes appear for each filter
- Count text updates ("3 disputes", "1 needing response", etc.)
- Empty filter state shows "No {filter} disputes." message

- [ ] **Step 7: Test empty state**

If possible, test with an account that has no disputes. Verify the full empty state appears: "No disputes yet. When a dispute comes in, we'll walk you through exactly what to do."
