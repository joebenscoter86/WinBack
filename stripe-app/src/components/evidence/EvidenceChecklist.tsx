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
