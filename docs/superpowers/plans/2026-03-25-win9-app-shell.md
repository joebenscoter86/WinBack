# WIN-9: App Shell and Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the WinBack Stripe App shell with hybrid drawer/FocusView navigation, 4-step wizard, and authenticated backend API client.

**Architecture:** Drawer view (DisputeListView) provides tabbed overview of disputes and insights. Clicking a dispute opens a full-screen FocusView with a 4-step wizard (Review → Evidence → Narrative → Submit). A thin `fetchBackend()` utility handles all authenticated backend calls. Mock data stands in for real API calls (WIN-10+).

**Tech Stack:** Stripe Apps SDK (`@stripe/ui-extension-sdk` v9), React, TypeScript

**Design Spec:** `docs/superpowers/specs/2026-03-25-win9-app-shell-design.md`

---

### Task 1: Types and Mock Data

**Files:**
- Create: `stripe-app/src/lib/types.ts`
- Create: `stripe-app/src/lib/mockData.ts`

- [ ] **Step 1: Create shared TypeScript types**

```typescript
// stripe-app/src/lib/types.ts

export type DisputeStatus =
  | 'needs_response'
  | 'under_review'
  | 'won'
  | 'lost'
  | 'warning_needs_response'
  | 'warning_under_review'
  | 'warning_closed'
  | 'charge_refunded';

export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover';

export type WizardStep = 'review' | 'evidence' | 'narrative' | 'submit';

export const WIZARD_STEPS: WizardStep[] = ['review', 'evidence', 'narrative', 'submit'];

export const WIZARD_STEP_LABELS: Record<WizardStep, string> = {
  review: 'Review',
  evidence: 'Evidence',
  narrative: 'Narrative',
  submit: 'Submit',
};

export interface Dispute {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  status: DisputeStatus;
  due_by: string;
  reason_code: string;
  network: CardNetwork;
  payment_intent?: string;
}
```

- [ ] **Step 2: Create mock data**

```typescript
// stripe-app/src/lib/mockData.ts

import type { Dispute } from './types';

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'dp_mock_1',
    amount: 14900,
    currency: 'usd',
    reason: 'product_not_received',
    status: 'needs_response',
    due_by: '2026-03-28',
    reason_code: '13.1',
    network: 'visa',
    payment_intent: 'pi_mock_1',
  },
  {
    id: 'dp_mock_2',
    amount: 8999,
    currency: 'usd',
    reason: 'product_unacceptable',
    status: 'needs_response',
    due_by: '2026-04-06',
    reason_code: '4853',
    network: 'mastercard',
    payment_intent: 'pi_mock_2',
  },
  {
    id: 'dp_mock_3',
    amount: 23450,
    currency: 'usd',
    reason: 'fraudulent',
    status: 'needs_response',
    due_by: '2026-04-12',
    reason_code: '10.4',
    network: 'visa',
    payment_intent: 'pi_mock_3',
  },
];
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/lib/types.ts stripe-app/src/lib/mockData.ts
git commit -m "feat(stripe-app): add shared types and mock dispute data (WIN-9)"
```

---

### Task 2: API Client (fetchBackend)

**Files:**
- Create: `stripe-app/src/lib/apiClient.ts`

- [ ] **Step 1: Create the authenticated fetch wrapper**

```typescript
// stripe-app/src/lib/apiClient.ts

import fetchStripeSignature from '@stripe/ui-extension-sdk/signature';

// Matches connect-src in stripe-app.json CSP. For local dev, update CSP to localhost.
const BACKEND_URL = 'https://winback-api.vercel.app';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

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
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new ApiError(
      error.message || `API error: ${response.status}`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/apiClient.ts
git commit -m "feat(stripe-app): add authenticated backend API client (WIN-9)"
```

---

### Task 3: Reusable Components — ErrorBanner and EmptyState

**Files:**
- Create: `stripe-app/src/components/ErrorBanner.tsx`
- Create: `stripe-app/src/components/EmptyState.tsx`

- [ ] **Step 1: Create ErrorBanner component**

```tsx
// stripe-app/src/components/ErrorBanner.tsx

import { Banner, Box, Button } from '@stripe/ui-extension-sdk/ui';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <Box css={{ padding: 'medium' }}>
      <Banner
        type="critical"
        title="Something went wrong"
        description={message}
        actions={
          onRetry ? (
            <Button onPress={onRetry}>Retry</Button>
          ) : undefined
        }
      />
    </Box>
  );
};

export default ErrorBanner;
```

- [ ] **Step 2: Create EmptyState component**

```tsx
// stripe-app/src/components/EmptyState.tsx

import { Box, Icon, Inline } from '@stripe/ui-extension-sdk/ui';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <Box
      css={{
        padding: 'xlarge',
        stack: 'y',
        gap: 'small',
        alignX: 'center',
        alignY: 'center',
      }}
    >
      <Icon name="info" size="large" />
      <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
        {title}
      </Inline>
      <Inline css={{ font: 'caption', color: 'secondary' }}>
        {description}
      </Inline>
    </Box>
  );
};

export default EmptyState;
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/components/ErrorBanner.tsx stripe-app/src/components/EmptyState.tsx
git commit -m "feat(stripe-app): add ErrorBanner and EmptyState components (WIN-9)"
```

---

### Task 4: DisputeCard Component

**Files:**
- Create: `stripe-app/src/components/DisputeCard.tsx`

- [ ] **Step 1: Create DisputeCard component**

This component renders a single dispute row with amount, reason code, network, and urgency badge. It's used in both DisputeListView and could be reused elsewhere.

```tsx
// stripe-app/src/components/DisputeCard.tsx

import { Box, Badge, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../lib/types';

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

function getDaysRemaining(dueBy: string): number {
  const now = new Date();
  const due = new Date(dueBy);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyBadge(dueBy: string): { label: string; type: 'urgent' | 'warning' | 'positive' } {
  const days = getDaysRemaining(dueBy);
  if (days <= 3) return { label: `${days}d left`, type: 'urgent' };
  if (days <= 7) return { label: `${days}d left`, type: 'warning' };
  return { label: `${days}d left`, type: 'positive' };
}

const DisputeCard = ({ dispute, onSelect }: DisputeCardProps) => {
  const urgency = getUrgencyBadge(dispute.due_by);

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
          <Badge type={urgency.type}>{urgency.label}</Badge>
        </Box>
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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/DisputeCard.tsx
git commit -m "feat(stripe-app): add DisputeCard component with urgency badge (WIN-9)"
```

---

### Task 5: DisputeWorkflow (FocusView Wizard Shell)

**Files:**
- Create: `stripe-app/src/components/DisputeWorkflow.tsx`

- [ ] **Step 1: Create the FocusView wizard shell**

This component renders the full-screen 4-step wizard. Each step shows placeholder content — real content comes in WIN-12, 14, 19, 20.

```tsx
// stripe-app/src/components/DisputeWorkflow.tsx

import { useState } from 'react';
import {
  Box,
  Button,
  FocusView,
  Inline,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Banner,
} from '@stripe/ui-extension-sdk/ui';
import { WIZARD_STEPS, WIZARD_STEP_LABELS } from '../lib/types';
import type { WizardStep } from '../lib/types';

interface DisputeWorkflowProps {
  disputeId: string;
  shown: boolean;
  setShown: (shown: boolean) => void;
}

const DisputeWorkflow = ({ disputeId, shown, setShown }: DisputeWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('review');

  const currentIndex = WIZARD_STEPS.indexOf(currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === WIZARD_STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(WIZARD_STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(WIZARD_STEPS[currentIndex - 1]);
    }
  };

  return (
    <FocusView
      title={`Dispute ${disputeId.slice(0, 12)}...`}
      shown={shown}
      setShown={setShown}
      confirmCloseMessages={{
        title: 'Leave dispute workflow?',
        description: 'Your progress on this step will not be saved.',
        cancelAction: 'Stay',
        exitAction: 'Leave',
      }}
      primaryAction={
        isLastStep ? (
          <Button type="primary" onPress={() => setShown(false)}>
            Submit (placeholder)
          </Button>
        ) : (
          <Button type="primary" onPress={handleNext}>
            Next: {WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex + 1]]}
          </Button>
        )
      }
      secondaryAction={
        isFirstStep ? (
          <Button onPress={() => setShown(false)}>Cancel</Button>
        ) : (
          <Button onPress={handleBack}>
            Back: {WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex - 1]]}
          </Button>
        )
      }
    >
      <Box css={{ padding: 'medium' }}>
        <Tabs
          fitted
          size="medium"
          selectedKey={currentStep}
          onSelectionChange={(key) => setCurrentStep(key as WizardStep)}
        >
          <TabList>
            {WIZARD_STEPS.map((step) => (
              <Tab key={step} id={step}>
                {WIZARD_STEP_LABELS[step]}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel id="review">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="default"
                  title="Step 1: Review Dispute"
                  description="Review the dispute details and understand the reason code. Playbook guidance will appear here."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Dispute ID: {disputeId} — Detailed dispute info, reason code breakdown, and playbook recommendations will be populated by WIN-12 and WIN-13.
                </Inline>
              </Box>
            </TabPanel>
            <TabPanel id="evidence">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="default"
                  title="Step 2: Gather Evidence"
                  description="Check off required evidence items and upload supporting files."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Evidence checklist and file upload will be built in WIN-14 and WIN-16.
                </Inline>
              </Box>
            </TabPanel>
            <TabPanel id="narrative">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="default"
                  title="Step 3: AI Narrative"
                  description="Generate a compelling narrative based on your evidence. Review, edit, and approve before submission."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  AI narrative generation and editing will be built in WIN-18 and WIN-19.
                </Inline>
              </Box>
            </TabPanel>
            <TabPanel id="submit">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="warning"
                  title="Step 4: Submit Evidence"
                  description="Review everything one final time. Submission to Stripe is irrevocable."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Final review and Stripe submission will be built in WIN-20.
                </Inline>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </FocusView>
  );
};

export default DisputeWorkflow;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "feat(stripe-app): add FocusView wizard shell with 4-step navigation (WIN-9)"
```

---

### Task 6: DisputeListView — Tabbed Drawer with FocusView

**Files:**
- Modify: `stripe-app/src/views/DisputeListView.tsx` (full rewrite)

- [ ] **Step 1: Rewrite DisputeListView with tabs, dispute cards, and FocusView**

```tsx
// stripe-app/src/views/DisputeListView.tsx

import { useState } from 'react';
import {
  Box,
  ContextView,
  Inline,
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
import { MOCK_DISPUTES } from '../lib/mockData';
import type { Dispute } from '../lib/types';

type ViewState = 'loading' | 'error' | 'ready';

const DisputeListView = ({ environment, userContext }: ExtensionContextValue) => {
  // In WIN-10+, these will come from API calls instead of mock data
  const [viewState] = useState<ViewState>('ready');
  const [disputes] = useState<Dispute[]>(MOCK_DISPUTES);
  const [errorMessage] = useState('');

  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const handleSelectDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowWorkflow(true);
  };

  const handleCloseWorkflow = (shown: boolean) => {
    setShowWorkflow(shown);
    if (!shown) setSelectedDisputeId(null);
  };

  // Sort disputes by deadline (soonest first)
  const sortedDisputes = [...disputes].sort(
    (a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime(),
  );

  const activeDisputes = sortedDisputes.filter(
    (d) => d.status === 'needs_response' || d.status === 'warning_needs_response',
  );

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
                {activeDisputes.length === 0 ? (
                  <EmptyState
                    title="No active disputes"
                    description="No disputes need your response right now. That's a good thing!"
                  />
                ) : (
                  <>
                    <Box css={{ paddingY: 'small' }}>
                      <Inline css={{ font: 'caption', color: 'secondary' }}>
                        {activeDisputes.length} dispute{activeDisputes.length !== 1 ? 's' : ''} need{activeDisputes.length === 1 ? 's' : ''} response
                      </Inline>
                    </Box>
                    {activeDisputes.map((dispute) => (
                      <DisputeCard
                        key={dispute.id}
                        dispute={dispute}
                        onSelect={handleSelectDispute}
                      />
                    ))}
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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/views/DisputeListView.tsx
git commit -m "feat(stripe-app): build tabbed DisputeListView with FocusView drill-down (WIN-9)"
```

---

### Task 7: PaymentDisputeView — Status Badge and Open CTA

**Files:**
- Modify: `stripe-app/src/views/PaymentDisputeView.tsx` (full rewrite)

- [ ] **Step 1: Rewrite PaymentDisputeView with dispute status and FocusView trigger**

```tsx
// stripe-app/src/views/PaymentDisputeView.tsx

import { useState } from 'react';
import {
  Box,
  Badge,
  Button,
  ContextView,
  Inline,
  Spinner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeWorkflow from '../components/DisputeWorkflow';
import { MOCK_DISPUTES } from '../lib/mockData';
import type { Dispute } from '../lib/types';

function getStatusBadge(status: string): { label: string; type: 'urgent' | 'warning' | 'positive' | 'negative' | 'info' } {
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

const PaymentDisputeView = ({ environment }: ExtensionContextValue) => {
  const paymentIntentId = environment?.objectContext?.id;

  // In WIN-10+, this will be a real API lookup by payment_intent ID
  const dispute: Dispute | undefined = MOCK_DISPUTES.find(
    (d) => d.payment_intent === paymentIntentId,
  );

  // For dev/demo: show first mock dispute if no match (real matching comes in WIN-10)
  const displayDispute = dispute ?? MOCK_DISPUTES[0];

  const [showWorkflow, setShowWorkflow] = useState(false);

  if (!displayDispute) {
    return (
      <ContextView title="WinBack">
        <Box css={{ padding: 'medium', alignX: 'center' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            No dispute on this payment.
          </Inline>
        </Box>
      </ContextView>
    );
  }

  const statusBadge = getStatusBadge(displayDispute.status);

  return (
    <ContextView title="WinBack">
      <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between', alignY: 'center' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Dispute
          </Inline>
          <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
        </Box>

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'body' }}>
            {displayDispute.network.charAt(0).toUpperCase() + displayDispute.network.slice(1)} {displayDispute.reason_code}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {displayDispute.reason.replace(/_/g, ' ')}
          </Inline>
        </Box>

        {(displayDispute.status === 'needs_response' || displayDispute.status === 'warning_needs_response') && (
          <Button type="primary" css={{ width: 'fill' }} onPress={() => setShowWorkflow(true)}>
            Open in WinBack
          </Button>
        )}
      </Box>

      <DisputeWorkflow
        disputeId={displayDispute.id}
        shown={showWorkflow}
        setShown={setShowWorkflow}
      />
    </ContextView>
  );
};

export default PaymentDisputeView;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/views/PaymentDisputeView.tsx
git commit -m "feat(stripe-app): build PaymentDisputeView with status badge and FocusView (WIN-9)"
```

---

### Task 8: AppSettings View Shell

**Files:**
- Modify: `stripe-app/src/views/AppSettings.tsx` (full rewrite)

- [ ] **Step 1: Rewrite AppSettings with subscription and preferences placeholders**

```tsx
// stripe-app/src/views/AppSettings.tsx

import {
  Box,
  Banner,
  Inline,
  SettingsView,
  Divider,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';

const AppSettings = ({ environment, userContext }: ExtensionContextValue) => {
  return (
    <SettingsView>
      <Box css={{ stack: 'y', gap: 'medium', padding: 'medium' }}>
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Subscription
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Subscription management will be available here. Coming in WIN-24.
          </Inline>
        </Box>

        <Divider />

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Account
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Connected Stripe account information will appear here.
          </Inline>
        </Box>

        <Divider />

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            About WinBack
          </Inline>
          <Inline css={{ font: 'body' }}>
            Version 0.0.1
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Guided dispute resolution for Stripe merchants. Built by JKB Tech.
          </Inline>
        </Box>
      </Box>
    </SettingsView>
  );
};

export default AppSettings;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/views/AppSettings.tsx
git commit -m "feat(stripe-app): build AppSettings shell with section placeholders (WIN-9)"
```

---

### Task 9: Smoke Test in Stripe Dev Mode

**Files:** None (manual verification)

- [ ] **Step 1: Start the Stripe App in dev mode**

Run: `cd stripe-app && stripe apps start`
Expected: App starts, outputs a URL to open in the Stripe Dashboard

- [ ] **Step 2: Verify DisputeListView in drawer**

Open the Stripe Dashboard. Click the WinBack icon in the sidebar.

Verify:
- "WinBack" title shows in the drawer header
- "Disputes" and "Insights" tabs are visible
- 3 mock dispute cards appear in the Disputes tab, sorted by urgency
- Each card shows amount, network + reason code, and urgency badge
- Clicking a card opens the FocusView wizard

- [ ] **Step 3: Verify FocusView wizard navigation**

Click a dispute card to open the wizard. Verify:
- FocusView opens full-screen with the dispute ID in the title
- 4 tabs visible: Review, Evidence, Narrative, Submit
- "Next" and "Cancel" buttons in the footer
- Clicking "Next" advances through steps (button label updates)
- On the last step, "Next" becomes "Submit (placeholder)"
- Clicking tabs directly also switches steps
- Closing the FocusView shows the confirmation dialog ("Leave dispute workflow?")

- [ ] **Step 4: Verify PaymentDisputeView**

Navigate to any payment detail page in the Dashboard. Verify:
- WinBack panel shows with dispute status badge
- "Open in WinBack" button appears for `needs_response` disputes
- Clicking "Open in WinBack" opens the same FocusView wizard

- [ ] **Step 5: Verify AppSettings**

Go to the WinBack app settings page. Verify:
- Subscription, Account, and About sections visible
- Version shows 0.0.1

- [ ] **Step 6: Fix any issues found during smoke test**

If any component doesn't render or navigation breaks, fix and re-test. Common issues:
- Import paths: Ensure all imports use relative paths from the file's location
- SDK component props: Check against the types defined in the SDK (e.g., `Badge` `type` must be one of: `neutral`, `urgent`, `warning`, `negative`, `positive`, `info`)
- FocusView `shown` prop: Must be controlled by parent state, not conditional rendering

- [ ] **Step 7: Commit any fixes**

```bash
git add -A stripe-app/src/
git commit -m "fix(stripe-app): address smoke test findings (WIN-9)"
```

Only create this commit if there were fixes. Skip if smoke test passed cleanly.

---

### Task 10: Final Verification and Task Completion

- [ ] **Step 1: Verify all TypeScript compiles cleanly**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Verify file structure matches spec**

Run: `find stripe-app/src -type f -name '*.ts' -o -name '*.tsx' | sort`

Expected output:
```
stripe-app/src/components/DisputeCard.tsx
stripe-app/src/components/DisputeWorkflow.tsx
stripe-app/src/components/EmptyState.tsx
stripe-app/src/components/ErrorBanner.tsx
stripe-app/src/lib/apiClient.ts
stripe-app/src/lib/mockData.ts
stripe-app/src/lib/types.ts
stripe-app/src/views/AppSettings.tsx
stripe-app/src/views/DisputeListView.tsx
stripe-app/src/views/PaymentDisputeView.tsx
```

- [ ] **Step 3: Mark WIN-9 complete in tasks.json**

Update `.taskmaster/tasks/tasks.json` — set task 9 status to `"done"`.

- [ ] **Step 4: Final commit**

```bash
git commit -m "chore: mark WIN-9 complete"
```
