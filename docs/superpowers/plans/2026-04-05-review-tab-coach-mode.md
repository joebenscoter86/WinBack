# Review Tab Coach Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Review tab to present playbook content with progressive disclosure and a coaching tone, replacing the current expert-level text dump.

**Architecture:** Add 4 new coach fields to PlaybookData (backend types, seed data, Supabase schema, frontend types). Replace GamePlan and ReasonCodeBreakdown components with CoachHeader, QuickActions, and LearnMore. Update DisputeWorkflow's renderReviewTab to wire the new components with urgency-adaptive behavior.

**Tech Stack:** Stripe Apps SDK (React), Supabase (PostgreSQL), TypeScript

**Spec:** `docs/superpowers/specs/2026-04-05-review-tab-coach-mode-design.md`

---

### Task 1: Add coach fields to backend PlaybookData type

**Files:**
- Modify: `backend/lib/playbooks/types.ts:43-60`
- Modify: `backend/lib/playbooks/__tests__/types.test.ts`

- [ ] **Step 1: Add coach fields to PlaybookData interface**

In `backend/lib/playbooks/types.ts`, add 4 new fields to the `PlaybookData` interface after `description`:

```typescript
export interface PlaybookData {
  network: CardNetwork;
  reason_code: string;
  display_name: string;
  category: PlaybookCategory;
  legacy_code: string | null;
  description: string;
  coach_headline: string;
  coach_summary: string;
  coach_issuer_summary: string;
  coach_acquirer_summary: string;
  issuer_evaluation: string;
  acquirer_prereview: string;
  evidence_checklist: EvidenceChecklistItem[];
  common_mistakes: CommonMistake[];
  pro_tips: ProTip[];
  urgency_essentials: UrgencyEssentials;
  narrative_template: string;
  response_deadline_days: number;
  filing_window_days: number;
  key_differences: string | null;
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd backend && npx tsc --noEmit 2>&1 | grep -v "errors.test.ts"`

Expected: Type errors in all 7 playbook data files (missing the new required fields). This confirms the type system catches the missing fields.

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/types.ts
git commit -m "feat(backend): add coach fields to PlaybookData type (WIN-12)"
```

---

### Task 2: Add coach content to Visa 10.4 playbook

**Files:**
- Modify: `backend/lib/playbooks/data/visa-10.4.ts`

- [ ] **Step 1: Add coach fields to visa104 playbook data**

In `backend/lib/playbooks/data/visa-10.4.ts`, add the 4 new fields after `description`:

```typescript
export const visa104: PlaybookData = {
  network: "visa",
  reason_code: "10.4",
  display_name: "Fraud -- Card Not Present",
  category: "fraud",
  legacy_code: "83",
  description:
    "The cardholder claims they didn't authorize a card-not-present transaction (online, phone, or mail order). This is either true fraud (someone stole the card and used it) or friendly fraud (the cardholder made the purchase but claims they didn't). This is the hardest dispute type to win because the burden of proof is entirely on the merchant -- in a CNP environment, you can't prove the cardholder was physically present. The good news: Visa Compelling Evidence 3.0 (CE3.0) gives merchants a powerful new tool. If you can show the same cardholder made previous undisputed purchases from the same device/IP, Visa presumes the disputed transaction is also legitimate.",

  coach_headline: "The cardholder says they didn't authorize this purchase.",
  coach_summary:
    "This is the most common type of dispute. The key question the bank will ask: can you prove this customer actually made the purchase? If you used 3D Secure, you're in great shape. If not, we'll focus on gathering verification data and any proof the customer engaged with your store.",
  coach_issuer_summary:
    "The bank checks six things: Did you use 3D Secure? (If yes, you almost certainly win.) Did you verify the billing address? Did the customer enter the CVV code? Is your store name recognizable on their statement? Is there a history of legitimate purchases from this customer? And was the dispute filed within 120 days?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. If anything is missing or doesn't address this specific dispute type, it gets rejected automatically and you don't get another chance. That's why we walk you through exactly what to include.",

  issuer_evaluation: `The issuer evaluates Visa 10.4 disputes using the following criteria:
  // ... rest of file unchanged
```

- [ ] **Step 2: Verify visa-10.4.ts compiles**

Run: `cd backend && npx tsc --noEmit 2>&1 | grep "visa-10.4"`

Expected: No errors for this file (other playbook files will still error).

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/visa-10.4.ts
git commit -m "feat(backend): add coach content to Visa 10.4 playbook (WIN-12)"
```

---

### Task 3: Add coach content to remaining 6 playbooks

**Files:**
- Modify: `backend/lib/playbooks/data/visa-13.1.ts`
- Modify: `backend/lib/playbooks/data/visa-13.2.ts`
- Modify: `backend/lib/playbooks/data/visa-13.3.ts`
- Modify: `backend/lib/playbooks/data/visa-13.6.ts`
- Modify: `backend/lib/playbooks/data/mastercard-4853.ts`
- Modify: `backend/lib/playbooks/data/mastercard-4808.ts`

Each playbook needs 4 new fields. The content must be written in plain English at a "smart 16-year-old" reading level. No jargon, no reason codes in the headline. Coach tone: warm, direct, reassuring.

- [ ] **Step 1: Add coach fields to visa-13.1.ts (Merchandise/Services Not Received)**

```typescript
  coach_headline: "The cardholder says they never received what they paid for.",
  coach_summary:
    "This is one of the most winnable dispute types. If you can prove delivery, you're in a strong position. The bank's main question: was the item actually delivered to the right address? Tracking numbers and delivery confirmation are your best friends here.",
  coach_issuer_summary:
    "The bank checks: Was there a confirmed delivery date? Does tracking show it was delivered? Was it delivered to the correct address (the one on the order, not a random location)? For digital products, can you prove the customer accessed or downloaded it?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. For this dispute type, delivery proof is non-negotiable. Without a tracking number or access log, your response will likely be rejected before the bank even reviews it.",
```

- [ ] **Step 2: Add coach fields to visa-13.2.ts (Cancelled Recurring Transaction)**

```typescript
  coach_headline: "The cardholder says they cancelled but were still charged.",
  coach_summary:
    "The bank wants to know: did the customer actually cancel, and did you process the cancellation correctly? If you can show the customer didn't cancel through your process, or that the charge was for a period before cancellation, you have a solid case.",
  coach_issuer_summary:
    "The bank checks: Did the customer follow your cancellation process? Was the cancellation request received before or after the billing date? Did you clearly communicate your cancellation policy at signup? Do your records show the subscription was still active when charged?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. You need to show your cancellation policy and proof the customer either didn't cancel or was billed for a valid period. Generic terms of service alone won't clear the check.",
```

- [ ] **Step 3: Add coach fields to visa-13.3.ts (Not as Described / Defective)**

```typescript
  coach_headline: "The cardholder says what they got wasn't what was advertised.",
  coach_summary:
    "The customer is claiming the product or service didn't match what you described. The bank will compare what you promised against what was delivered. Your product listing, photos, and any communication with the customer are key evidence here.",
  coach_issuer_summary:
    "The bank checks: Does the product match its description? Did the merchant misrepresent quality, features, or condition? Did the customer contact the merchant first and give them a chance to resolve it? Was a return offered and refused?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. You need your original product description, proof of what was delivered, and ideally any customer communication showing they were satisfied or didn't raise concerns through your support channels.",
```

- [ ] **Step 4: Add coach fields to visa-13.6.ts (Credit Not Processed)**

```typescript
  coach_headline: "The cardholder says they returned the item but never got a refund.",
  coach_summary:
    "The customer claims they're owed a refund that was never processed. If you already issued the refund, show proof. If the return doesn't qualify under your policy, you'll need to show the customer agreed to that policy at purchase.",
  coach_issuer_summary:
    "The bank checks: Was a refund actually issued? If not, does the merchant's return policy apply? Did the customer follow the return process? Was the return policy clearly disclosed before purchase?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. Either show proof the refund was already processed (with date and amount) or provide your return policy and evidence it was disclosed to the customer at checkout.",
```

- [ ] **Step 5: Add coach fields to mastercard-4853.ts (Goods or Services Not as Described)**

```typescript
  coach_headline: "The cardholder says what they received didn't match what was promised.",
  coach_summary:
    "Similar to a Visa 'not as described' dispute. The bank will look at whether your product matched its listing and whether the customer tried to resolve it with you first. Clear product descriptions and customer communication records are your best defense.",
  coach_issuer_summary:
    "The bank checks: Does the product match the description provided at the time of purchase? Did the cardholder attempt to return the merchandise or resolve the issue with the merchant? Was the merchandise or service received at all?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. You need the original product description, proof of delivery, and evidence of any customer interaction. If the customer never contacted you before filing the dispute, that works in your favor.",
```

- [ ] **Step 6: Add coach fields to mastercard-4808.ts**

Read the existing `mastercard-4808.ts` file first to understand the dispute type, then write coach content following the same pattern: plain English headline, 2-3 sentence reassuring summary, plain-English issuer criteria, plain-English acquirer prereview.

- [ ] **Step 7: Verify all playbooks compile**

Run: `cd backend && npx tsc --noEmit 2>&1 | grep -v "errors.test.ts"`

Expected: No type errors (all playbooks now have the required coach fields).

- [ ] **Step 8: Commit**

```bash
git add backend/lib/playbooks/data/
git commit -m "feat(backend): add coach content to all playbooks (WIN-12)"
```

---

### Task 4: Update Supabase schema and re-seed playbooks

**Files:**
- Modify: `backend/supabase/seed-playbooks.ts` (if schema changes needed)

- [ ] **Step 1: Add coach columns to Supabase playbooks table**

Run via Supabase MCP or SQL:

```sql
ALTER TABLE playbooks
  ADD COLUMN IF NOT EXISTS coach_headline text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS coach_summary text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS coach_issuer_summary text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS coach_acquirer_summary text NOT NULL DEFAULT '';
```

- [ ] **Step 2: Re-seed playbooks with coach content**

Run: `cd backend && npx tsx supabase/seed-playbooks.ts`

The seed script should already upsert all fields from the PlaybookData objects. Verify the coach fields are populated.

- [ ] **Step 3: Verify seeded data**

Query Supabase to confirm:

```sql
SELECT reason_code, coach_headline FROM playbooks WHERE coach_headline != '';
```

Expected: 7 rows, each with a non-empty coach_headline.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(backend): add coach columns to Supabase and re-seed playbooks (WIN-12)"
```

---

### Task 5: Add coach fields to frontend PlaybookData type

**Files:**
- Modify: `stripe-app/src/lib/types.ts:64-78`

- [ ] **Step 1: Add coach fields to frontend PlaybookData interface**

In `stripe-app/src/lib/types.ts`, add 4 new fields to `PlaybookData`:

```typescript
export interface PlaybookData {
  network: string;
  reason_code: string;
  display_name: string;
  category: string;
  description: string;
  coach_headline: string;
  coach_summary: string;
  coach_issuer_summary: string;
  coach_acquirer_summary: string;
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

- [ ] **Step 2: Verify stripe-app compiles**

Run: `cd stripe-app && npx tsc --noEmit`

Expected: PASS (new fields are additive, no existing code references them yet).

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/types.ts
git commit -m "feat(stripe-app): add coach fields to PlaybookData type (WIN-12)"
```

---

### Task 6: Create CoachHeader component

**Files:**
- Create: `stripe-app/src/components/review/CoachHeader.tsx`

- [ ] **Step 1: Create CoachHeader component**

```tsx
import { Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface CoachHeaderProps {
  headline: string;
  summary: string;
  urgencyMode: boolean;
  daysRemaining?: number;
}

const CoachHeader = ({ headline, summary, urgencyMode, daysRemaining }: CoachHeaderProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        {headline}
      </Inline>
      <Inline css={{ font: 'body', color: 'secondary' }}>
        {urgencyMode && daysRemaining !== undefined
          ? `You have ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}. Focus on the essentials below.`
          : summary}
      </Inline>
    </Box>
  );
};

export default CoachHeader;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/review/CoachHeader.tsx
git commit -m "feat(stripe-app): add CoachHeader component (WIN-12)"
```

---

### Task 7: Create QuickActions component

**Files:**
- Create: `stripe-app/src/components/review/QuickActions.tsx`

- [ ] **Step 1: Create QuickActions component**

This component derives its items from the playbook data. In normal mode, it shows mandatory evidence items + reframed common mistakes (top 5). In urgency mode, it shows only urgency essentials.

```tsx
import { Box, Icon, Inline } from '@stripe/ui-extension-sdk/ui';
import type { PlaybookData } from '../../lib/types';

interface QuickActionsProps {
  playbook: PlaybookData;
  urgencyMode: boolean;
}

function deriveActions(playbook: PlaybookData): string[] {
  const actions: string[] = [];

  // Top mandatory evidence items (non-CE3 context, max 3)
  const mandatoryItems = playbook.evidence_checklist
    .filter((item) => item.category === 'mandatory' && item.context === 'all')
    .slice(0, 3);
  for (const item of mandatoryItems) {
    actions.push(`Confirm you have: ${item.item.toLowerCase()}`);
  }

  // Reframe top 2 common mistakes as positive actions
  const topMistakes = playbook.common_mistakes.slice(0, 2);
  for (const mistake of topMistakes) {
    // Strip "Not " or "Skipping " prefix and reframe
    const reframed = mistake.mistake.startsWith('Not ')
      ? `Make sure you're ${mistake.mistake.slice(4).toLowerCase()}`
      : mistake.mistake.startsWith('Skipping ')
        ? `Make sure you're using ${mistake.mistake.slice(9).toLowerCase()}`
        : `Check: ${mistake.mistake.toLowerCase()}`;
    actions.push(reframed);
  }

  return actions.slice(0, 5);
}

const QuickActions = ({ playbook, urgencyMode }: QuickActionsProps) => {
  const items = urgencyMode
    ? playbook.urgency_essentials.ordered_items
    : deriveActions(playbook);

  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        {urgencyMode ? 'Focus on these essentials' : 'Your next steps'}
      </Inline>
      {items.map((text, index) => (
        <Box key={index} css={{ stack: 'x', gap: 'small', alignY: 'top' }}>
          <Icon name="info" size="xsmall" />
          <Inline css={{ font: 'body' }}>{text}</Inline>
        </Box>
      ))}
    </Box>
  );
};

export default QuickActions;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/review/QuickActions.tsx
git commit -m "feat(stripe-app): add QuickActions component (WIN-12)"
```

---

### Task 8: Create LearnMore component

**Files:**
- Create: `stripe-app/src/components/review/LearnMore.tsx`

- [ ] **Step 1: Create LearnMore component**

```tsx
import { Accordion, AccordionItem, Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface LearnMoreProps {
  issuerSummary: string;
  acquirerSummary: string;
}

const LearnMore = ({ issuerSummary, acquirerSummary }: LearnMoreProps) => {
  return (
    <Accordion>
      <AccordionItem title="Why this matters">
        <Box css={{ stack: 'y', gap: 'medium' }}>
          <Box css={{ stack: 'y', gap: 'small' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
              What the bank checks
            </Inline>
            <Inline css={{ font: 'body', color: 'secondary' }}>
              {issuerSummary}
            </Inline>
          </Box>
          <Box css={{ stack: 'y', gap: 'small' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
              What happens to your response
            </Inline>
            <Inline css={{ font: 'body', color: 'secondary' }}>
              {acquirerSummary}
            </Inline>
          </Box>
        </Box>
      </AccordionItem>
    </Accordion>
  );
};

export default LearnMore;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/review/LearnMore.tsx
git commit -m "feat(stripe-app): add LearnMore component (WIN-12)"
```

---

### Task 9: Wire new components into DisputeWorkflow

**Files:**
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx:1-25` (imports)
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx:115-147` (renderReviewTab)

- [ ] **Step 1: Update imports**

In `stripe-app/src/components/DisputeWorkflow.tsx`, replace the old component imports:

```tsx
// Remove these imports:
import ReasonCodeBreakdown from './review/ReasonCodeBreakdown';
import GamePlan from './review/GamePlan';

// Add these imports:
import CoachHeader from './review/CoachHeader';
import QuickActions from './review/QuickActions';
import LearnMore from './review/LearnMore';
```

- [ ] **Step 2: Rewrite renderReviewTab**

Replace the entire `renderReviewTab` function:

```tsx
  const renderReviewTab = () => {
    const isLoadingPlaybook = loading.playbook;

    return (
      <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
        {isUrgent && playbook && <UrgencyBanner daysRemaining={daysRemaining} essentials={playbook.urgency_essentials} />}

        {errors.dispute && <ErrorBanner message={errors.dispute} />}

        <DisputeOverview dispute={dispute} loading={loading.dispute} />

        {isLoadingPlaybook ? (
          <Box css={{ alignX: 'center', padding: 'medium' }}>
            <Spinner size="medium" />
            <Inline css={{ font: 'caption', color: 'secondary' }}>Loading playbook...</Inline>
          </Box>
        ) : errors.playbook ? (
          <ErrorBanner message={errors.playbook} />
        ) : playbook ? (
          <>
            <CoachHeader
              headline={playbook.coach_headline}
              summary={playbook.coach_summary}
              urgencyMode={isUrgent}
              daysRemaining={daysRemaining}
            />
            <QuickActions playbook={playbook} urgencyMode={isUrgent} />
            <LearnMore
              issuerSummary={playbook.coach_issuer_summary}
              acquirerSummary={playbook.coach_acquirer_summary}
            />
          </>
        ) : (
          <Banner
            type="default"
            title="No playbook available"
            description="We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          />
        )}
      </Box>
    );
  };
```

- [ ] **Step 3: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "feat(stripe-app): wire CoachHeader, QuickActions, LearnMore into Review tab (WIN-12)"
```

---

### Task 10: Delete old components

**Files:**
- Delete: `stripe-app/src/components/review/GamePlan.tsx`
- Delete: `stripe-app/src/components/review/ReasonCodeBreakdown.tsx`

- [ ] **Step 1: Delete GamePlan.tsx**

```bash
rm stripe-app/src/components/review/GamePlan.tsx
```

- [ ] **Step 2: Delete ReasonCodeBreakdown.tsx**

```bash
rm stripe-app/src/components/review/ReasonCodeBreakdown.tsx
```

- [ ] **Step 3: Verify no remaining imports**

Run: `cd stripe-app && grep -r "GamePlan\|ReasonCodeBreakdown" src/`

Expected: No matches (all imports were removed in Task 9).

- [ ] **Step 4: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A stripe-app/src/components/review/
git commit -m "refactor(stripe-app): remove GamePlan and ReasonCodeBreakdown components (WIN-12)"
```

---

### Task 11: QA verification

- [ ] **Step 1: Ensure backend is running**

Run: `cd backend && npm run dev`

Verify it starts on port 3000 without errors.

- [ ] **Step 2: Ensure stripe app is running**

Run: `cd stripe-app && stripe apps start`

Verify it compiles successfully.

- [ ] **Step 3: Open dispute in Stripe Dashboard**

Navigate to a dispute in the Stripe test dashboard. Verify:

1. DisputeOverview loads with amount, status, card info (unchanged)
2. CoachHeader shows plain-English headline and reassuring summary
3. QuickActions shows 3-5 positive action items
4. "Why this matters" accordion is collapsed by default
5. Expanding accordion shows "What the bank checks" and "What happens to your response"
6. No raw playbook text (description, issuer_evaluation, acquirer_prereview) is visible by default
7. No pro tips or common mistakes sections visible

- [ ] **Step 4: Test urgency mode**

If a dispute has < 5 days remaining, verify:
1. UrgencyBanner appears at top
2. CoachHeader shows direct urgency message instead of summary
3. QuickActions shows urgency essentials instead of derived actions

- [ ] **Step 5: Test "no playbook" state**

Create or find a dispute with an unmapped reason code. Verify the "No playbook available" banner still renders correctly.
