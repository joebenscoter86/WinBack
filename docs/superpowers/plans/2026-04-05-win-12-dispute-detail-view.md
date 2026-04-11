# WIN-12: Dispute Detail View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Review tab in the dispute workflow FocusView, showing enriched Stripe dispute data, playbook-driven reason code guidance, and smart urgency mode.

**Architecture:** Enrich `WinBackDispute` on the backend with charge-level fields (card, billing, receipt, metadata, evidence state). Frontend fetches enriched dispute + playbook in parallel on workflow open, renders four focused components (DisputeOverview, ReasonCodeBreakdown, GamePlan, UrgencyBanner). Smart urgency mode (< 5 days) surfaces essentials-only view.

**Tech Stack:** Stripe Apps SDK (React), Next.js API routes, Stripe Node.js SDK, Supabase (playbooks), Vitest

---

## File Map

### Backend (modify)
- `backend/lib/stripe/normalize.ts` -- add new fields to `WinBackDispute` interface + `normalizeDispute`
- `backend/lib/stripe/__tests__/normalize.test.ts` -- tests for new fields

### Frontend types (modify)
- `stripe-app/src/lib/types.ts` -- add enriched fields to `Dispute`, add `PlaybookData` + sub-types

### Frontend components (create)
- `stripe-app/src/components/review/DisputeOverview.tsx` -- dispute info section
- `stripe-app/src/components/review/ReasonCodeBreakdown.tsx` -- playbook explanation + accordions
- `stripe-app/src/components/review/GamePlan.tsx` -- evidence summary, pro tips, common mistakes
- `stripe-app/src/components/review/UrgencyBanner.tsx` -- < 5 days urgency mode banner

### Frontend components (modify)
- `stripe-app/src/components/DisputeWorkflow.tsx` -- data fetching, pass dispute prop, compose Review tab
- `stripe-app/src/views/DisputeListView.tsx` -- pass full dispute to DisputeWorkflow
- `stripe-app/src/views/PaymentDisputeView.tsx` -- pass full dispute to DisputeWorkflow

---

### Task 1: Enrich WinBackDispute type and normalizeDispute

**Files:**
- Modify: `backend/lib/stripe/normalize.ts`
- Test: `backend/lib/stripe/__tests__/normalize.test.ts`

- [ ] **Step 1: Write failing tests for new fields**

Add to `backend/lib/stripe/__tests__/normalize.test.ts`. Update the `makeStripeDispute` factory to include the new Stripe fields, then assert the new normalized fields:

```typescript
const makeStripeDispute = (overrides?: Partial<Stripe.Dispute>): Stripe.Dispute =>
  ({
    id: "dp_test_123",
    object: "dispute",
    amount: 14900,
    currency: "usd",
    reason: "product_not_received",
    status: "needs_response",
    network_reason_code: "13.1",
    payment_intent: "pi_test_456",
    created: 1711324800,
    is_charge_refundable: true,
    evidence: {
      receipt: "file_receipt_123",
      shipping_documentation: null,
    },
    charge: {
      id: "ch_test_789",
      object: "charge",
      created: 1711238400,
      description: "Order #1042 - Blue Widget",
      receipt_url: "https://pay.stripe.com/receipts/test_abc",
      payment_method_details: {
        card: { network: "visa", brand: "visa", last4: "4242" },
      },
      customer: {
        id: "cus_test_abc",
        name: "Jane Doe",
        email: "jane@example.com",
      },
      billing_details: {
        address: {
          line1: "123 Main St",
          line2: null,
          city: "Springfield",
          state: "IL",
          postal_code: "62701",
          country: "US",
        },
      },
      metadata: { order_id: "1042" },
    },
    evidence_details: {
      due_by: 1712188800,
      submission_count: 0,
    },
    ...overrides,
  }) as unknown as Stripe.Dispute;
```

Then add these test cases:

```typescript
it("should include enriched charge fields", () => {
  const result = normalizeDispute(makeStripeDispute());

  expect(result.transaction_date).toBe(1711238400);
  expect(result.card_brand).toBe("visa");
  expect(result.card_last4).toBe("4242");
  expect(result.billing_address).toBe("123 Main St, Springfield, IL 62701, US");
  expect(result.charge_description).toBe("Order #1042 - Blue Widget");
  expect(result.receipt_url).toBe("https://pay.stripe.com/receipts/test_abc");
  expect(result.metadata).toEqual({ order_id: "1042" });
});

it("should include evidence state fields", () => {
  const result = normalizeDispute(makeStripeDispute());

  expect(result.has_evidence).toBe(true);
  expect(result.evidence_submission_count).toBe(0);
  expect(result.is_charge_refundable).toBe(true);
});

it("should set has_evidence false when no evidence fields are set", () => {
  const dispute = makeStripeDispute({
    evidence: null as unknown as Stripe.Dispute.Evidence,
  });
  const result = normalizeDispute(dispute);

  expect(result.has_evidence).toBe(false);
});

it("should handle missing billing address", () => {
  const dispute = makeStripeDispute({
    charge: {
      ...makeStripeDispute().charge as object,
      billing_details: { address: null },
    } as unknown as Stripe.Charge,
  });
  const result = normalizeDispute(dispute);

  expect(result.billing_address).toBeUndefined();
});

it("should handle partial billing address", () => {
  const dispute = makeStripeDispute({
    charge: {
      ...makeStripeDispute().charge as object,
      billing_details: {
        address: {
          line1: "456 Oak Ave",
          line2: null,
          city: null,
          state: "CA",
          postal_code: null,
          country: "US",
        },
      },
    } as unknown as Stripe.Charge,
  });
  const result = normalizeDispute(dispute);

  expect(result.billing_address).toBe("456 Oak Ave, CA, US");
});

it("should handle charge with no metadata", () => {
  const dispute = makeStripeDispute({
    charge: {
      ...makeStripeDispute().charge as object,
      metadata: {},
    } as unknown as Stripe.Charge,
  });
  const result = normalizeDispute(dispute);

  expect(result.metadata).toEqual({});
});
```

Also update the existing "should normalize a full Stripe dispute" test to include the new fields in its expected output:

```typescript
it("should normalize a full Stripe dispute into WinBack format", () => {
  const result = normalizeDispute(makeStripeDispute());

  expect(result).toEqual({
    id: "dp_test_123",
    amount: 14900,
    currency: "usd",
    reason: "product_not_received",
    status: "needs_response",
    due_by: "2024-04-04",
    reason_code: "13.1",
    network: "visa",
    payment_intent: "pi_test_456",
    charge_id: "ch_test_789",
    customer_name: "Jane Doe",
    customer_email: "jane@example.com",
    created: 1711324800,
    evidence_due_by: 1712188800,
    transaction_date: 1711238400,
    card_brand: "visa",
    card_last4: "4242",
    billing_address: "123 Main St, Springfield, IL 62701, US",
    charge_description: "Order #1042 - Blue Widget",
    receipt_url: "https://pay.stripe.com/receipts/test_abc",
    has_evidence: true,
    evidence_submission_count: 0,
    is_charge_refundable: true,
    metadata: { order_id: "1042" },
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/joeb/Projects/WinBack/backend && npx vitest run lib/stripe/__tests__/normalize.test.ts`
Expected: FAIL -- new fields not yet returned by `normalizeDispute`

- [ ] **Step 3: Update WinBackDispute interface and normalizeDispute**

In `backend/lib/stripe/normalize.ts`, update the interface and function:

```typescript
import type Stripe from "stripe";

export interface WinBackDispute {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  status: string;
  due_by: string;
  reason_code: string;
  network: string;
  payment_intent?: string;
  charge_id: string;
  customer_name?: string;
  customer_email?: string;
  created: number;
  evidence_due_by: number;
  transaction_date?: number;
  card_brand?: string;
  card_last4?: string;
  billing_address?: string;
  charge_description?: string;
  receipt_url?: string;
  has_evidence: boolean;
  evidence_submission_count: number;
  is_charge_refundable: boolean;
  metadata: Record<string, string>;
}

function flattenAddress(
  address: Stripe.Address | null | undefined,
): string | undefined {
  if (!address) return undefined;
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state && address.postal_code
      ? `${address.state} ${address.postal_code}`
      : address.state || address.postal_code,
    address.country,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : undefined;
}

function hasAnyEvidence(
  evidence: Stripe.Dispute.Evidence | null | undefined,
): boolean {
  if (!evidence) return false;
  return Object.values(evidence).some(
    (v) => v !== null && v !== undefined && v !== "",
  );
}

export function normalizeDispute(d: Stripe.Dispute): WinBackDispute {
  const charge = typeof d.charge === "string" ? null : d.charge;
  const chargeId = typeof d.charge === "string" ? d.charge : d.charge?.id ?? "";
  const customer =
    charge && typeof charge.customer === "object" && charge.customer !== null
      ? charge.customer
      : null;
  const network =
    (charge?.payment_method_details as { card?: { network?: string } })?.card
      ?.network ?? "unknown";

  const dueBySec = d.evidence_details?.due_by ?? 0;
  const dueByDate = dueBySec
    ? new Date(dueBySec * 1000).toISOString().split("T")[0]
    : "";

  const cardDetails = (
    charge?.payment_method_details as {
      card?: { brand?: string; last4?: string; network?: string };
    }
  )?.card;

  return {
    id: d.id,
    amount: d.amount,
    currency: d.currency,
    reason: d.reason,
    status: d.status,
    due_by: dueByDate,
    reason_code: d.network_reason_code ?? "",
    network,
    payment_intent:
      typeof d.payment_intent === "string"
        ? d.payment_intent
        : d.payment_intent?.id,
    charge_id: chargeId,
    customer_name: (customer as { name?: string })?.name ?? undefined,
    customer_email: (customer as { email?: string })?.email ?? undefined,
    created: d.created,
    evidence_due_by: dueBySec,
    transaction_date: charge?.created ?? undefined,
    card_brand: cardDetails?.brand ?? undefined,
    card_last4: cardDetails?.last4 ?? undefined,
    billing_address: flattenAddress(
      (charge as { billing_details?: { address?: Stripe.Address } })
        ?.billing_details?.address,
    ),
    charge_description: charge?.description ?? undefined,
    receipt_url: charge?.receipt_url ?? undefined,
    has_evidence: hasAnyEvidence(d.evidence),
    evidence_submission_count: d.evidence_details?.submission_count ?? 0,
    is_charge_refundable: d.is_charge_refundable ?? false,
    metadata: (charge?.metadata as Record<string, string>) ?? {},
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/joeb/Projects/WinBack/backend && npx vitest run lib/stripe/__tests__/normalize.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/stripe/normalize.ts backend/lib/stripe/__tests__/normalize.test.ts
git commit -m "feat(backend): enrich WinBackDispute with charge-level fields (WIN-12)"
```

---

### Task 2: Add frontend types (Dispute enrichment + PlaybookData)

**Files:**
- Modify: `stripe-app/src/lib/types.ts`

- [ ] **Step 1: Update Dispute interface and add PlaybookData types**

In `stripe-app/src/lib/types.ts`, add the new optional fields to `Dispute` and add the playbook types:

```typescript
export type DisputeStatus =
  | 'needs_response'
  | 'under_review'
  | 'won'
  | 'lost'
  | 'warning_needs_response'
  | 'warning_under_review'
  | 'warning_closed'
  | 'charge_refunded';

export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

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
  charge_id: string;
  customer_name?: string;
  customer_email?: string;
  created: number;
  evidence_due_by: number;
  // Enriched fields (available after detail fetch)
  transaction_date?: number;
  card_brand?: string;
  card_last4?: string;
  billing_address?: string;
  charge_description?: string;
  receipt_url?: string;
  has_evidence?: boolean;
  evidence_submission_count?: number;
  is_charge_refundable?: boolean;
  metadata?: Record<string, string>;
}

// Playbook types (mirrors backend PlaybookData)

export interface EvidenceChecklistItem {
  item: string;
  category: 'mandatory' | 'recommended' | 'situational';
  context: string;
  required: boolean;
  why_matters: string;
  urgency_essential: boolean;
  urgency_order: number | null;
}

export interface PlaybookData {
  network: string;
  reason_code: string;
  display_name: string;
  category: string;
  description: string;
  issuer_evaluation: string;
  acquirer_prereview: string;
  evidence_checklist: EvidenceChecklistItem[];
  common_mistakes: { mistake: string; explanation: string }[];
  pro_tips: { tip: string }[];
  urgency_essentials: { summary: string; ordered_items: string[] };
  narrative_template: string;
  response_deadline_days: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add stripe-app/src/lib/types.ts
git commit -m "feat(stripe-app): add enriched Dispute fields and PlaybookData type (WIN-12)"
```

---

### Task 3: Wire DisputeWorkflow to accept Dispute prop + fetch data

**Files:**
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx`
- Modify: `stripe-app/src/views/DisputeListView.tsx`
- Modify: `stripe-app/src/views/PaymentDisputeView.tsx`

- [ ] **Step 1: Update DisputeWorkflow props and add data fetching**

Replace `stripe-app/src/components/DisputeWorkflow.tsx` with:

```typescript
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  FocusView,
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
import { WIZARD_STEPS, WIZARD_STEP_LABELS } from '../lib/types';
import type { WizardStep, Dispute, PlaybookData } from '../lib/types';
import { fetchBackend, ApiError } from '../lib/apiClient';
import { getDaysRemaining, isResolved } from '../lib/utils';
import ErrorBanner from './ErrorBanner';
import DisputeOverview from './review/DisputeOverview';
import ReasonCodeBreakdown from './review/ReasonCodeBreakdown';
import GamePlan from './review/GamePlan';
import UrgencyBanner from './review/UrgencyBanner';

interface DisputeWorkflowProps {
  dispute: Dispute;
  context: ExtensionContextValue;
  shown: boolean;
  setShown: (shown: boolean) => void;
}

const DisputeWorkflow = ({ dispute: initialDispute, context, shown, setShown }: DisputeWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('review');
  const [dispute, setDispute] = useState<Dispute>(initialDispute);
  const [playbook, setPlaybook] = useState<PlaybookData | null>(null);
  const [loading, setLoading] = useState({ dispute: true, playbook: true });
  const [errors, setErrors] = useState<{ dispute: string | null; playbook: string | null }>({
    dispute: null,
    playbook: null,
  });

  const fetchData = useCallback(async () => {
    setLoading({ dispute: true, playbook: true });
    setErrors({ dispute: null, playbook: null });

    const disputePromise = fetchBackend<{ data: Dispute }>(
      `/api/disputes/${initialDispute.id}`,
      context,
    )
      .then((result) => {
        setDispute(result.data);
        setLoading((prev) => ({ ...prev, dispute: false }));
      })
      .catch((err) => {
        const message =
          err instanceof ApiError ? err.message : 'Failed to load dispute details.';
        setErrors((prev) => ({ ...prev, dispute: message }));
        setLoading((prev) => ({ ...prev, dispute: false }));
      });

    const playbookPromise = fetchBackend<{ data: PlaybookData }>(
      '/api/playbooks',
      context,
      { network: initialDispute.network, reason_code: initialDispute.reason_code },
    )
      .then((result) => {
        setPlaybook(result.data);
        setLoading((prev) => ({ ...prev, playbook: false }));
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) {
          setPlaybook(null);
        } else {
          const message =
            err instanceof ApiError ? err.message : 'Failed to load playbook.';
          setErrors((prev) => ({ ...prev, playbook: message }));
        }
        setLoading((prev) => ({ ...prev, playbook: false }));
      });

    await Promise.allSettled([disputePromise, playbookPromise]);
  }, [initialDispute.id, initialDispute.network, initialDispute.reason_code, context]);

  useEffect(() => {
    if (shown) {
      fetchData();
    }
  }, [shown, fetchData]);

  const currentIndex = WIZARD_STEPS.indexOf(currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === WIZARD_STEPS.length - 1;
  const daysRemaining = getDaysRemaining(dispute.due_by);
  const isUrgent = daysRemaining < 5 && !isResolved(dispute.status);

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
      title={`Dispute ${dispute.id.slice(0, 12)}...`}
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
              <Box css={{ padding: 'small', stack: 'y', gap: 'medium' }}>
                {errors.dispute && (
                  <ErrorBanner message={errors.dispute} />
                )}

                {isUrgent && playbook && (
                  <UrgencyBanner
                    daysRemaining={daysRemaining}
                    essentials={playbook.urgency_essentials}
                  />
                )}

                <DisputeOverview dispute={dispute} loading={loading.dispute} />

                {loading.playbook ? (
                  <Box css={{ padding: 'medium', alignX: 'center' }}>
                    <Spinner size="large" />
                    <Inline css={{ font: 'caption', color: 'secondary' }}>
                      Loading playbook...
                    </Inline>
                  </Box>
                ) : playbook ? (
                  <>
                    <ReasonCodeBreakdown playbook={playbook} defaultExpanded={!isUrgent} />
                    <GamePlan playbook={playbook} />
                  </>
                ) : !errors.playbook ? (
                  <Banner
                    type="default"
                    title="No specific playbook available"
                    description="We don't have a specific playbook for this reason code yet. You can still gather evidence and submit."
                  />
                ) : (
                  <ErrorBanner message={errors.playbook} />
                )}
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
                  type="caution"
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

- [ ] **Step 2: Update DisputeListView to pass full dispute + context**

In `stripe-app/src/views/DisputeListView.tsx`, change the state and handlers:

Replace `selectedDisputeId` state and `handleSelectDispute`/`handleCloseWorkflow`:

```typescript
const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
const [showWorkflow, setShowWorkflow] = useState(false);
```

```typescript
const handleSelectDispute = (dispute: Dispute) => {
  setSelectedDispute(dispute);
  setShowWorkflow(true);
};

const handleCloseWorkflow = (shown: boolean) => {
  setShowWorkflow(shown);
  if (!shown) setSelectedDispute(null);
};
```

Update `DisputeCard` usage to pass the full dispute:

```typescript
<DisputeCard
  key={dispute.id}
  dispute={dispute}
  onSelect={() => handleSelectDispute(dispute)}
/>
```

Update the `DisputeWorkflow` rendering at the bottom:

```typescript
{selectedDispute && (
  <DisputeWorkflow
    dispute={selectedDispute}
    context={context}
    shown={showWorkflow}
    setShown={handleCloseWorkflow}
  />
)}
```

Where `context` is the `ExtensionContextValue` -- store it: add `const context = arguments[0];` is not possible since it's destructured. Instead, capture the full context. The component signature is `const DisputeListView = (context: ExtensionContextValue) => {` -- so `context` is already available as the parameter.

Also update the `DisputeCard` `onSelect` prop. In `DisputeCard.tsx`, the prop is `onSelect: (disputeId: string) => void`. We don't need to change DisputeCard's interface -- the list view wraps it with a closure: `onSelect={() => handleSelectDispute(dispute)}`.

- [ ] **Step 3: Update PaymentDisputeView to pass full dispute + context**

In `stripe-app/src/views/PaymentDisputeView.tsx`, update the `DisputeWorkflow` usage:

```typescript
<DisputeWorkflow
  dispute={dispute}
  context={context}
  shown={showWorkflow}
  setShown={setShowWorkflow}
/>
```

Where `context` is the component parameter (it's `const PaymentDisputeView = (context: ExtensionContextValue) => {`).

- [ ] **Step 4: Verify the app compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit`
Expected: Compilation errors for missing review components (DisputeOverview, ReasonCodeBreakdown, GamePlan, UrgencyBanner) -- these are created in Tasks 4-7. That's expected at this point.

- [ ] **Step 5: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx stripe-app/src/views/DisputeListView.tsx stripe-app/src/views/PaymentDisputeView.tsx
git commit -m "feat(stripe-app): wire DisputeWorkflow data fetching and prop changes (WIN-12)"
```

---

### Task 4: Build DisputeOverview component

**Files:**
- Create: `stripe-app/src/components/review/DisputeOverview.tsx`

- [ ] **Step 1: Create DisputeOverview component**

Create `stripe-app/src/components/review/DisputeOverview.tsx`:

```typescript
import { Box, Badge, Inline, Link, Spinner } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../../lib/types';
import { getStatusBadge, getUrgencyBadge, getDaysRemaining } from '../../lib/utils';

interface DisputeOverviewProps {
  dispute: Dispute;
  loading: boolean;
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCard(brand?: string, last4?: string): string | null {
  if (!brand || !last4) return null;
  return `${brand.charAt(0).toUpperCase() + brand.slice(1)} ending in ${last4}`;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between' }}>
    <Inline css={{ font: 'caption', color: 'secondary' }}>{label}</Inline>
    <Inline css={{ font: 'caption' }}>{value}</Inline>
  </Box>
);

const DisputeOverview = ({ dispute, loading }: DisputeOverviewProps) => {
  const statusBadge = getStatusBadge(dispute.status);
  const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
  const daysRemaining = getDaysRemaining(dispute.due_by);
  const cardLabel = formatCard(dispute.card_brand, dispute.card_last4);

  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      {/* Amount + badges */}
      <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between', alignY: 'center' }}>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          {formatAmount(dispute.amount, dispute.currency)}
        </Inline>
        <Box css={{ stack: 'x', gap: 'xsmall' }}>
          <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
          {urgencyBadge && (
            <Badge type={urgencyBadge.type}>{urgencyBadge.label}</Badge>
          )}
        </Box>
      </Box>

      {/* Countdown */}
      {dispute.due_by && daysRemaining > 0 && (
        <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
          {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} to respond
        </Inline>
      )}

      {/* Core info rows */}
      {dispute.customer_name && (
        <InfoRow label="Customer" value={dispute.customer_name} />
      )}
      {dispute.customer_email && (
        <InfoRow label="Email" value={dispute.customer_email} />
      )}

      {/* Enriched fields -- show spinner while loading */}
      {loading ? (
        <Box css={{ padding: 'small', alignX: 'center' }}>
          <Spinner size="small" />
        </Box>
      ) : (
        <>
          {cardLabel && <InfoRow label="Card" value={cardLabel} />}
          {dispute.transaction_date && (
            <InfoRow label="Transaction" value={formatDate(dispute.transaction_date)} />
          )}
          {dispute.charge_description && (
            <InfoRow label="Description" value={dispute.charge_description} />
          )}
          {dispute.billing_address && (
            <InfoRow label="Billing address" value={dispute.billing_address} />
          )}
          {dispute.receipt_url && (
            <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between' }}>
              <Inline css={{ font: 'caption', color: 'secondary' }}>Receipt</Inline>
              <Link href={dispute.receipt_url} target="_blank">View receipt</Link>
            </Box>
          )}
          {dispute.metadata && Object.keys(dispute.metadata).length > 0 && (
            <Box css={{ stack: 'y', gap: 'xsmall', paddingTop: 'xsmall' }}>
              <Inline css={{ font: 'caption', color: 'secondary', fontWeight: 'semibold' }}>
                Order metadata
              </Inline>
              {Object.entries(dispute.metadata).map(([key, value]) => (
                <InfoRow key={key} label={key} value={value} />
              ))}
            </Box>
          )}
        </>
      )}

      {/* IDs */}
      <Box css={{ paddingTop: 'xsmall' }}>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          {dispute.id} / {dispute.charge_id}
        </Inline>
      </Box>
    </Box>
  );
};

export default DisputeOverview;
```

- [ ] **Step 2: Commit**

```bash
git add stripe-app/src/components/review/DisputeOverview.tsx
git commit -m "feat(stripe-app): add DisputeOverview component (WIN-12)"
```

---

### Task 5: Build ReasonCodeBreakdown component

**Files:**
- Create: `stripe-app/src/components/review/ReasonCodeBreakdown.tsx`

- [ ] **Step 1: Create ReasonCodeBreakdown component**

Create `stripe-app/src/components/review/ReasonCodeBreakdown.tsx`:

```typescript
import {
  Accordion,
  AccordionItem,
  Box,
  Inline,
} from '@stripe/ui-extension-sdk/ui';
import type { PlaybookData } from '../../lib/types';

interface ReasonCodeBreakdownProps {
  playbook: PlaybookData;
  defaultExpanded: boolean;
}

const ReasonCodeBreakdown = ({ playbook, defaultExpanded }: ReasonCodeBreakdownProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        {playbook.display_name}
      </Inline>

      <Inline css={{ font: 'body' }}>
        {playbook.description}
      </Inline>

      <Accordion>
        <AccordionItem
          title="What the issuer looks for"
          id="issuer-evaluation"
          defaultOpen={defaultExpanded}
        >
          <Box css={{ padding: 'small' }}>
            <Inline css={{ font: 'caption', whiteSpace: 'pre-wrap' }}>
              {playbook.issuer_evaluation}
            </Inline>
          </Box>
        </AccordionItem>

        <AccordionItem
          title="What happens before the issuer sees your case"
          id="acquirer-prereview"
          defaultOpen={defaultExpanded}
        >
          <Box css={{ padding: 'small' }}>
            <Inline css={{ font: 'caption', whiteSpace: 'pre-wrap' }}>
              {playbook.acquirer_prereview}
            </Inline>
          </Box>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ReasonCodeBreakdown;
```

- [ ] **Step 2: Commit**

```bash
git add stripe-app/src/components/review/ReasonCodeBreakdown.tsx
git commit -m "feat(stripe-app): add ReasonCodeBreakdown component (WIN-12)"
```

---

### Task 6: Build GamePlan component

**Files:**
- Create: `stripe-app/src/components/review/GamePlan.tsx`

- [ ] **Step 1: Create GamePlan component**

Create `stripe-app/src/components/review/GamePlan.tsx`:

```typescript
import { Box, Inline, Icon } from '@stripe/ui-extension-sdk/ui';
import type { PlaybookData } from '../../lib/types';

interface GamePlanProps {
  playbook: PlaybookData;
}

const GamePlan = ({ playbook }: GamePlanProps) => {
  const mandatoryCount = playbook.evidence_checklist.filter(
    (item) => item.category === 'mandatory',
  ).length;
  const recommendedCount = playbook.evidence_checklist.filter(
    (item) => item.category === 'recommended',
  ).length;

  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        Game plan
      </Inline>

      {/* Evidence summary */}
      <Box css={{ stack: 'x', gap: 'small' }}>
        <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
          {mandatoryCount} mandatory
        </Inline>
        <Inline css={{ font: 'body', color: 'secondary' }}>
          {recommendedCount} recommended
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          evidence items
        </Inline>
      </Box>

      {/* Pro tips */}
      {playbook.pro_tips.length > 0 && (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'caption', fontWeight: 'semibold' }}>
            Pro tips
          </Inline>
          {playbook.pro_tips.map((tip, i) => (
            <Box key={i} css={{ stack: 'x', gap: 'xsmall' }}>
              <Icon name="info" size="xsmall" />
              <Inline css={{ font: 'caption' }}>{tip.tip}</Inline>
            </Box>
          ))}
        </Box>
      )}

      {/* Common mistakes */}
      {playbook.common_mistakes.length > 0 && (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'caption', fontWeight: 'semibold' }}>
            Common mistakes to avoid
          </Inline>
          {playbook.common_mistakes.map((mistake, i) => (
            <Box key={i} css={{ stack: 'y', gap: 'xxsmall' }}>
              <Box css={{ stack: 'x', gap: 'xsmall' }}>
                <Icon name="warning" size="xsmall" />
                <Inline css={{ font: 'caption', fontWeight: 'semibold' }}>
                  {mistake.mistake}
                </Inline>
              </Box>
              <Box css={{ paddingLeft: 'medium' }}>
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  {mistake.explanation}
                </Inline>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GamePlan;
```

- [ ] **Step 2: Commit**

```bash
git add stripe-app/src/components/review/GamePlan.tsx
git commit -m "feat(stripe-app): add GamePlan component (WIN-12)"
```

---

### Task 7: Build UrgencyBanner component

**Files:**
- Create: `stripe-app/src/components/review/UrgencyBanner.tsx`

- [ ] **Step 1: Create UrgencyBanner component**

Create `stripe-app/src/components/review/UrgencyBanner.tsx`:

```typescript
import { Banner, Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface UrgencyBannerProps {
  daysRemaining: number;
  essentials: { summary: string; ordered_items: string[] };
}

const UrgencyBanner = ({ daysRemaining, essentials }: UrgencyBannerProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Banner
        type="caution"
        title={`${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left to respond`}
        description="Focus on the essentials below to maximize your chances."
      />

      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'body' }}>
          {essentials.summary}
        </Inline>

        {essentials.ordered_items.map((item, i) => (
          <Box key={i} css={{ stack: 'x', gap: 'xsmall' }}>
            <Inline css={{ font: 'caption', fontWeight: 'semibold' }}>
              {i + 1}.
            </Inline>
            <Inline css={{ font: 'caption' }}>{item}</Inline>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UrgencyBanner;
```

- [ ] **Step 2: Commit**

```bash
git add stripe-app/src/components/review/UrgencyBanner.tsx
git commit -m "feat(stripe-app): add UrgencyBanner component (WIN-12)"
```

---

### Task 8: Verify full build and type-check

**Files:**
- No new files -- verification only

- [ ] **Step 1: Run backend tests**

Run: `cd /Users/joeb/Projects/WinBack/backend && npx vitest run lib/stripe/__tests__/normalize.test.ts`
Expected: All tests PASS

- [ ] **Step 2: Run frontend type-check**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Fix any type errors**

If Stripe SDK Accordion/AccordionItem imports don't match the expected API (prop names like `defaultOpen` vs `isOpen`, or `title` vs `label`), adjust `ReasonCodeBreakdown.tsx` to match the actual SDK API. Check: `node_modules/@stripe/ui-extension-sdk/ui.d.ts` for the exact Accordion interface.

If `Icon` doesn't accept `name="info"` or `name="warning"`, check available icon names in the SDK and substitute the closest match (e.g., `"informationCircle"`, `"alertTriangle"`).

- [ ] **Step 4: Run stripe apps build (if available)**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx stripe-app build 2>/dev/null || echo "no build script"`
If no build script, the tsc check from Step 2 is sufficient.

- [ ] **Step 5: Commit any fixes from Steps 3-4**

Only if fixes were needed:
```bash
git add -A stripe-app/src/
git commit -m "fix(stripe-app): resolve type/build issues for review components (WIN-12)"
```
