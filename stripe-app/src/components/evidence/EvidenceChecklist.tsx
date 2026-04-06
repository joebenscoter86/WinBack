import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Banner, Inline, Link, Divider } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { Dispute, PlaybookData, EvidenceChecklistItem } from '../../lib/types';
import { patchBackend } from '../../lib/apiClient';
import ChecklistProgress from './ChecklistProgress';
import ChecklistItem from './ChecklistItem';
import type { ExpandedSection } from './ChecklistItem';

interface EvidenceChecklistProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  context: ExtensionContextValue;
  isUrgent: boolean;
  daysRemaining: number;
}

type ChecklistState = Record<string, boolean>;
type NotesState = Record<string, string>;

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
    state[item.item] = false;
    if (isAutoPopulated(item, dispute)) {
      state[item.item] = true;
    }
  }
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
  const [notesState, setNotesState] = useState<NotesState>(
    () => dispute.checklist_notes ?? {},
  );
  const [expandedSections, setExpandedSections] = useState<Map<string, Set<ExpandedSection>>>(new Map());
  const [showFullChecklist, setShowFullChecklist] = useState(false);

  // Refs for debounced saves
  const checklistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contextRef = useRef(context);
  contextRef.current = context;

  // Rebuild state when dispute or playbook changes
  useEffect(() => {
    setChecklistState(buildInitialState(items, dispute));
    setNotesState(dispute.checklist_notes ?? {});
  }, [dispute.id, dispute.checklist_state, dispute.checklist_notes, playbook?.reason_code]);

  const persistChecklist = useCallback((newState: ChecklistState) => {
    if (checklistTimeoutRef.current) {
      clearTimeout(checklistTimeoutRef.current);
    }
    checklistTimeoutRef.current = setTimeout(() => {
      patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
        checklist_state: newState,
      }).catch((err) => {
        console.error('Failed to save checklist state:', err);
      });
    }, 500);
  }, [dispute.id]);

  const persistNotes = useCallback((newNotes: NotesState) => {
    if (notesTimeoutRef.current) {
      clearTimeout(notesTimeoutRef.current);
    }
    notesTimeoutRef.current = setTimeout(() => {
      patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
        checklist_notes: newNotes,
      }).catch((err) => {
        console.error('Failed to save checklist notes:', err);
      });
    }, 1000);
  }, [dispute.id]);

  const handleToggle = useCallback((itemName: string) => {
    setChecklistState((prev) => {
      const newState = { ...prev, [itemName]: !prev[itemName] };
      persistChecklist(newState);
      return newState;
    });
  }, [persistChecklist]);

  const handleNotesChange = useCallback((itemName: string, value: string) => {
    setNotesState((prev) => {
      const newNotes = { ...prev, [itemName]: value };
      persistNotes(newNotes);
      return newNotes;
    });
  }, [persistNotes]);

  const handleSectionToggle = useCallback((itemName: string, section: ExpandedSection) => {
    setExpandedSections((prev) => {
      const next = new Map(prev);
      const sections = new Set(prev.get(itemName) ?? []);
      if (sections.has(section)) {
        sections.delete(section);
      } else {
        sections.add(section);
      }
      next.set(itemName, sections);
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
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          Gather your evidence
        </Inline>
        <Inline css={{ font: 'body', color: 'secondary' }}>
          Here's what you'll need to build your case. Don't let the list intimidate you.
          Expand each item to see why it matters and jot down notes as you go.
          On the next step, you'll put it all together.
        </Inline>
      </Box>

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
              expandedSections={expandedSections.get(item.item) ?? new Set()}
              notes={notesState[item.item] ?? ''}
              onToggle={() => handleToggle(item.item)}
              onSectionToggle={(section) => handleSectionToggle(item.item, section)}
              onNotesChange={(value) => handleNotesChange(item.item, value)}
            />
          ))}
        </Box>
      ))}

      <Divider />

      <Inline css={{ font: 'caption', color: 'secondary' }}>
        Your progress and notes are saved automatically.
      </Inline>
    </Box>
  );
};

export default EvidenceChecklist;
