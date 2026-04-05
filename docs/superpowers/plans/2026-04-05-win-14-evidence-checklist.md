# WIN-14: Evidence Checklist Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive evidence checklist in the Evidence tab that renders reason-code-specific items from playbooks, tracks completion in Supabase, and adapts to urgency mode.

**Architecture:** Three frontend components (`EvidenceChecklist`, `ChecklistItem`, `ChecklistProgress`) in `stripe-app/src/components/evidence/`. One Supabase migration adding `checklist_state` JSONB column to `disputes`. One new PATCH handler on the existing `/api/disputes/[disputeId]` route. The frontend debounces checkbox toggles and persists state via the PATCH endpoint.

**Tech Stack:** Stripe Apps SDK (React), Next.js App Router, Supabase PostgreSQL, TypeScript

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `stripe-app/src/components/evidence/ChecklistProgress.tsx` | Progress bar header |
| Create | `stripe-app/src/components/evidence/ChecklistItem.tsx` | Single checklist row with badges and expandable why_matters |
| Create | `stripe-app/src/components/evidence/EvidenceChecklist.tsx` | Main component: state management, grouping, urgency filtering, persistence |
| Modify | `stripe-app/src/components/DisputeWorkflow.tsx:216-226` | Replace Evidence tab placeholder with EvidenceChecklist |
| Modify | `stripe-app/src/lib/apiClient.ts` | Add `patchBackend` helper for PATCH requests |
| Modify | `stripe-app/src/lib/types.ts` | Add `checklist_state` to Dispute interface |
| Create | `backend/supabase/migrations/005_add_checklist_state.sql` | Add `checklist_state` JSONB column to disputes table |
| Modify | `backend/app/api/disputes/[disputeId]/route.ts` | Add PATCH handler for checklist state updates |
| Modify | `backend/lib/stripe/normalize.ts` | Add `checklist_state` to WinBackDispute interface |

---

### Task 1: Supabase Migration -- Add `checklist_state` Column

**Files:**
- Create: `backend/supabase/migrations/005_add_checklist_state.sql`

- [ ] **Step 1: Create migration file**

```sql
-- Add checklist_state JSONB to disputes for WIN-14
-- Stores merchant's evidence checklist progress as { "item_name": true/false }
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_state JSONB DEFAULT '{}';
```

- [ ] **Step 2: Apply migration to local Supabase**

Run: `cd backend && npx supabase db push` (or apply via Supabase dashboard SQL editor if using remote-only)
Expected: Migration applies cleanly, `checklist_state` column exists on `disputes` table.

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/005_add_checklist_state.sql
git commit -m "feat(backend): add checklist_state JSONB column to disputes (WIN-14)"
```

---

### Task 2: Update Backend Types and PATCH Handler

**Files:**
- Modify: `backend/lib/stripe/normalize.ts:1-28` (add `checklist_state` to `WinBackDispute`)
- Modify: `backend/app/api/disputes/[disputeId]/route.ts` (add PATCH export)

- [ ] **Step 1: Add `checklist_state` to `WinBackDispute` interface**

In `backend/lib/stripe/normalize.ts`, add to the `WinBackDispute` interface after `metadata`:

```ts
  checklist_state?: Record<string, boolean>;
```

- [ ] **Step 2: Add PATCH handler to dispute route**

In `backend/app/api/disputes/[disputeId]/route.ts`, add at the top with existing imports:

```ts
import { supabase } from "@/lib/supabase";
```

Then add the PATCH export after the existing POST export:

```ts
export const PATCH = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const disputeId = request.nextUrl.pathname.split("/").at(-1);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  const body = JSON.parse(await request.clone().text());
  const { checklist_state } = body;

  if (!checklist_state || typeof checklist_state !== "object") {
    return NextResponse.json(
      { error: "Invalid checklist_state", code: "invalid_request" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("disputes")
    .update({ checklist_state })
    .eq("stripe_dispute_id", disputeId)
    .select()
    .single();

  if (error) {
    // If no row exists yet, upsert a minimal dispute record
    if (error.code === "PGRST116") {
      const { data: merchant } = await supabase
        .from("merchants")
        .select("id")
        .eq("stripe_account_id", accountId)
        .single();

      const { data: inserted, error: insertError } = await supabase
        .from("disputes")
        .upsert(
          {
            stripe_dispute_id: disputeId,
            merchant_id: merchant?.id,
            amount: 0,
            reason_code: "",
            checklist_state,
          },
          { onConflict: "stripe_dispute_id" },
        )
        .select()
        .single();

      if (insertError) {
        console.error("Failed to upsert dispute checklist state:", insertError);
        return NextResponse.json(
          { error: "Failed to save checklist state", code: "db_error" },
          { status: 500 },
        );
      }

      return NextResponse.json({ data: inserted });
    }

    console.error("Failed to update checklist state:", error);
    return NextResponse.json(
      { error: "Failed to save checklist state", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data });
});
```

- [ ] **Step 3: Verify the backend compiles**

Run: `cd backend && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add backend/lib/stripe/normalize.ts backend/app/api/disputes/\[disputeId\]/route.ts
git commit -m "feat(backend): add PATCH handler for checklist state persistence (WIN-14)"
```

---

### Task 3: Update Frontend Types and API Client

**Files:**
- Modify: `stripe-app/src/lib/types.ts:24-50` (add `checklist_state` to `Dispute`)
- Modify: `stripe-app/src/lib/apiClient.ts` (add `patchBackend` function)

- [ ] **Step 1: Add `checklist_state` to frontend Dispute interface**

In `stripe-app/src/lib/types.ts`, add after `metadata?: Record<string, string>;`:

```ts
  checklist_state?: Record<string, boolean>;
```

- [ ] **Step 2: Add `patchBackend` helper to apiClient**

In `stripe-app/src/lib/apiClient.ts`, add after the existing `fetchBackend` function:

```ts
/**
 * Makes an authenticated PATCH request to the WinBack backend.
 */
export async function patchBackend<T = unknown>(
  path: string,
  context: ExtensionContextValue,
  data: Record<string, unknown>,
): Promise<T> {
  const signature = await fetchStripeSignature();

  const body = JSON.stringify({
    ...data,
    user_id: context.userContext?.id,
    account_id: context.userContext?.account.id,
  });

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
    },
    body,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new ApiError(
      error.message || error.error || `API error: ${response.status}`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}
```

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/types.ts stripe-app/src/lib/apiClient.ts
git commit -m "feat(stripe-app): add checklist_state type and patchBackend helper (WIN-14)"
```

---

### Task 4: Build ChecklistProgress Component

**Files:**
- Create: `stripe-app/src/components/evidence/ChecklistProgress.tsx`

- [ ] **Step 1: Create the component file**

```tsx
import { Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface ChecklistProgressProps {
  completed: number;
  total: number;
}

const ChecklistProgress = ({ completed, total }: ChecklistProgressProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Box css={{ stack: 'y', gap: 'xsmall' }}>
      <Box css={{ stack: 'x', distribute: 'space-between' }}>
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          Evidence Progress
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          {completed} of {total} completed
        </Inline>
      </Box>
      <Box
        css={{
          background: 'container',
          borderRadius: 'small',
          height: 'xxsmall',
          overflow: 'hidden',
        }}
      >
        <Box
          css={{
            background: 'info',
            borderRadius: 'small',
            height: 'xxsmall',
            width: `${percentage}%` as any,
          }}
        />
      </Box>
    </Box>
  );
};

export default ChecklistProgress;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/evidence/ChecklistProgress.tsx
git commit -m "feat(stripe-app): add ChecklistProgress component (WIN-14)"
```

---

### Task 5: Build ChecklistItem Component

**Files:**
- Create: `stripe-app/src/components/evidence/ChecklistItem.tsx`

- [ ] **Step 1: Create the component file**

```tsx
import { Box, Checkbox, Badge, Inline, Link, Icon } from '@stripe/ui-extension-sdk/ui';
import type { EvidenceChecklistItem } from '../../lib/types';

interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  autoPopulated: boolean;
  expanded: boolean;
  onToggle: () => void;
  onExpandToggle: () => void;
}

function getCategoryBadge(category: EvidenceChecklistItem['category']) {
  switch (category) {
    case 'mandatory':
      return <Badge type="critical">REQUIRED</Badge>;
    case 'recommended':
      return <Badge type="warning">HELPFUL</Badge>;
    case 'situational':
      return <Badge type="default">IF APPLICABLE</Badge>;
  }
}

const ChecklistItem = ({
  item,
  checked,
  autoPopulated,
  expanded,
  onToggle,
  onExpandToggle,
}: ChecklistItemProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'xsmall', padding: 'small', background: 'surface', borderRadius: 'medium' }}>
      <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
        <Checkbox
          label=""
          checked={checked}
          onChange={onToggle}
          aria-label={item.item}
        />
        <Box css={{ stack: 'y', gap: 'xxsmall', width: 'fill' }}>
          <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
            <Inline css={{ font: 'body', fontWeight: 'medium' }}>
              {item.item}
            </Inline>
            {autoPopulated && <Badge type="info">FROM STRIPE</Badge>}
            {getCategoryBadge(item.category)}
          </Box>
          <Link onPress={onExpandToggle}>
            <Box css={{ stack: 'x', gap: 'xxsmall', alignY: 'center' }}>
              <Inline css={{ font: 'caption', color: 'info' }}>
                Why this matters
              </Inline>
              <Icon name={expanded ? 'chevronUp' : 'chevronDown'} size="xsmall" />
            </Box>
          </Link>
        </Box>
      </Box>
      {expanded && (
        <Box css={{ marginLeft: 'xlarge', padding: 'small', background: 'container', borderRadius: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {item.why_matters}
          </Inline>
        </Box>
      )}
    </Box>
  );
};

export default ChecklistItem;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/evidence/ChecklistItem.tsx
git commit -m "feat(stripe-app): add ChecklistItem component with badges and expand (WIN-14)"
```

---

### Task 6: Build EvidenceChecklist Main Component

**Files:**
- Create: `stripe-app/src/components/evidence/EvidenceChecklist.tsx`

- [ ] **Step 1: Create the component file**

```tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Banner, Inline, Link, Divider } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { Dispute, PlaybookData, EvidenceChecklistItem } from '../../lib/types';
import { patchBackend } from '../../lib/apiClient';
import ChecklistProgress from './ChecklistProgress';
import ChecklistItem from './ChecklistItem';

interface EvidenceChecklistProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  context: ExtensionContextValue;
  isUrgent: boolean;
  daysRemaining: number;
}

type ChecklistState = Record<string, boolean>;

const CATEGORY_ORDER: EvidenceChecklistItem['category'][] = ['mandatory', 'recommended', 'situational'];

const CATEGORY_LABELS: Record<EvidenceChecklistItem['category'], string> = {
  mandatory: 'Mandatory',
  recommended: 'Recommended',
  situational: 'Situational',
};

/**
 * Determines if a checklist item can be auto-populated from Stripe dispute data.
 */
function isAutoPopulated(item: EvidenceChecklistItem, dispute: Dispute): boolean {
  const lower = item.item.toLowerCase();
  if ((lower.includes('receipt') || lower.includes('proof of purchase')) && dispute.receipt_url) {
    return true;
  }
  if (lower.includes('customer email') && dispute.customer_email) {
    return true;
  }
  if (lower.includes('billing address') && dispute.billing_address) {
    return true;
  }
  if (lower.includes('transaction') && lower.includes('date') && dispute.transaction_date) {
    return true;
  }
  return false;
}

/**
 * Builds the initial checklist state by merging:
 * 1. Default (all false)
 * 2. Auto-populated items (true if Stripe data exists)
 * 3. Saved state from Supabase (overrides everything)
 */
function buildInitialState(
  items: EvidenceChecklistItem[],
  dispute: Dispute,
): ChecklistState {
  const state: ChecklistState = {};
  for (const item of items) {
    // Layer 1: default false
    state[item.item] = false;
    // Layer 2: auto-populated
    if (isAutoPopulated(item, dispute)) {
      state[item.item] = true;
    }
  }
  // Layer 3: saved state overrides
  if (dispute.checklist_state) {
    for (const [key, value] of Object.entries(dispute.checklist_state)) {
      if (key in state) {
        state[key] = value;
      }
    }
  }
  return state;
}

const EvidenceChecklist = ({ dispute, playbook, context, isUrgent, daysRemaining }: EvidenceChecklistProps) => {
  const items = playbook?.evidence_checklist ?? [];
  const [checklistState, setChecklistState] = useState<ChecklistState>(() =>
    buildInitialState(items, dispute),
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showFullChecklist, setShowFullChecklist] = useState(false);

  // Ref for debounced save
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contextRef = useRef(context);
  contextRef.current = context;

  // Rebuild state when dispute or playbook changes
  useEffect(() => {
    setChecklistState(buildInitialState(items, dispute));
  }, [dispute.id, dispute.checklist_state, playbook?.reason_code]);

  const persistState = useCallback((newState: ChecklistState) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
        checklist_state: newState,
      }).catch((err) => {
        console.error('Failed to save checklist state:', err);
      });
    }, 500);
  }, [dispute.id]);

  const handleToggle = useCallback((itemName: string) => {
    setChecklistState((prev) => {
      const newState = { ...prev, [itemName]: !prev[itemName] };
      persistState(newState);
      return newState;
    });
  }, [persistState]);

  const handleExpandToggle = useCallback((itemName: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemName)) {
        next.delete(itemName);
      } else {
        next.add(itemName);
      }
      return next;
    });
  }, []);

  // No playbook fallback
  if (!playbook || items.length === 0) {
    return (
      <Box css={{ padding: 'medium' }}>
        <Banner
          type="default"
          title="No evidence checklist available"
          description="No specific evidence checklist for this reason code. Use Stripe's general evidence guidelines for your response."
        />
      </Box>
    );
  }

  // Filter for urgency mode
  const effectiveUrgency = isUrgent && !showFullChecklist;
  let displayItems = items;
  if (effectiveUrgency) {
    displayItems = items
      .filter((item) => item.urgency_essential)
      .sort((a, b) => (a.urgency_order ?? 999) - (b.urgency_order ?? 999));
  }

  // Group by category
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: displayItems.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  // Progress counts (always against full list, not filtered)
  const totalItems = items.length;
  const completedItems = items.filter((item) => checklistState[item.item]).length;

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
      <ChecklistProgress completed={completedItems} total={totalItems} />

      {isUrgent && (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Banner
            type="caution"
            title={`${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left to respond`}
            description={showFullChecklist
              ? 'Showing all evidence items.'
              : 'Showing only essential items to maximize your chances.'}
          />
          <Link onPress={() => setShowFullChecklist(!showFullChecklist)}>
            <Inline css={{ font: 'caption', color: 'info' }}>
              {showFullChecklist ? 'Show essentials only' : 'View full checklist'}
            </Inline>
          </Link>
        </Box>
      )}

      {grouped.map(({ category, label, items: groupItems }) => (
        <Box key={category} css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'caption', fontWeight: 'bold', color: 'secondary', textTransform: 'uppercase' }}>
            {label}
          </Inline>
          {groupItems.map((item) => (
            <ChecklistItem
              key={item.item}
              item={item}
              checked={!!checklistState[item.item]}
              autoPopulated={isAutoPopulated(item, dispute)}
              expanded={expandedItems.has(item.item)}
              onToggle={() => handleToggle(item.item)}
              onExpandToggle={() => handleExpandToggle(item.item)}
            />
          ))}
        </Box>
      ))}

      <Divider />

      <Inline css={{ font: 'caption', color: 'secondary' }}>
        Check off items as you gather evidence. Your progress is saved automatically.
      </Inline>
    </Box>
  );
};

export default EvidenceChecklist;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/evidence/EvidenceChecklist.tsx
git commit -m "feat(stripe-app): add EvidenceChecklist main component (WIN-14)"
```

---

### Task 7: Wire EvidenceChecklist into DisputeWorkflow

**Files:**
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx:216-226`

- [ ] **Step 1: Add import**

At the top of `stripe-app/src/components/DisputeWorkflow.tsx`, add with the other imports:

```ts
import EvidenceChecklist from './evidence/EvidenceChecklist';
```

- [ ] **Step 2: Replace Evidence tab placeholder**

Replace the existing Evidence TabPanel content (lines 216-226):

```tsx
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
```

With:

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

- [ ] **Step 3: Verify it compiles**

Run: `cd stripe-app && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "feat(stripe-app): wire EvidenceChecklist into Evidence tab (WIN-14)"
```

---

### Task 8: Manual QA in Stripe Test Mode

- [ ] **Step 1: Start the backend**

Run: `cd backend && npm run dev`
Expected: Next.js dev server starts on port 3000.

- [ ] **Step 2: Start the Stripe app**

Run: `cd stripe-app && stripe apps start`
Expected: Stripe app dev server starts, accessible in Stripe Dashboard.

- [ ] **Step 3: Open a test dispute in Stripe Dashboard**

Navigate to a test dispute in the Docket sandbox Stripe account. Click the dispute to open the WinBack FocusView. Switch to the "Evidence" tab.

Verify:
- Progress bar shows "X of Y completed"
- Items are grouped by Mandatory / Recommended / Situational
- Required items show REQUIRED badge, recommended show HELPFUL, situational show IF APPLICABLE
- Any auto-populated items (receipt, email, etc.) show FROM STRIPE badge and are pre-checked
- Clicking "Why this matters" expands the explanation text below the item
- Clicking again collapses it
- Checking/unchecking items updates the progress bar
- Leaving and re-entering the FocusView preserves checked state (after debounce)

- [ ] **Step 4: Test urgency mode**

Find or create a test dispute with <5 days remaining. Verify:
- Urgency banner appears with day count
- Only essential items shown
- "View full checklist" link reveals all items
- "Show essentials only" link filters back

- [ ] **Step 5: Test no-playbook fallback**

If possible, open a dispute with an unrecognized reason code. Verify:
- Banner shows "No evidence checklist available" message

- [ ] **Step 6: Commit any fixes needed, then final commit**

```bash
git add -A
git commit -m "feat(stripe-app): complete evidence checklist component (WIN-14)"
```
