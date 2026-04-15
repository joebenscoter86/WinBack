import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Banner, Divider, Inline, Link } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { Dispute, PlaybookData, EvidenceChecklistItem, EvidenceFile } from '../../lib/types';
import { patchBackend, fetchBackend } from '../../lib/apiClient';
import { getStripeFieldResult } from '../../lib/stripe-field-status';
import type { StripeFieldStatus, StripeFieldResult } from '../../lib/stripe-field-status';
import ChecklistProgress from './ChecklistProgress';
import ChecklistItem from './ChecklistItem';
import type { ExpandedSection } from './ChecklistItem';

// Re-export for consumers that imported from this module
export type { StripeFieldStatus, StripeFieldResult };

interface EvidenceChecklistProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  context: ExtensionContextValue;
  isUrgent: boolean;
  daysRemaining: number;
  submitted?: boolean;
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
    const result = getStripeFieldResult(item, dispute);
    if (result?.status === 'positive') {
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

const EvidenceChecklist = ({ dispute, playbook, context, isUrgent, daysRemaining, submitted }: EvidenceChecklistProps) => {
  const items = playbook?.evidence_checklist ?? [];
  const [checklistState, setChecklistState] = useState<ChecklistState>(() =>
    buildInitialState(items, dispute),
  );
  const [notesState, setNotesState] = useState<NotesState>(
    () => dispute.checklist_notes ?? {},
  );
  // T-category (narrative_only) items default to having their notes section
  // expanded -- it's the only place merchants can contribute for these items,
  // so collapsing it hurts discoverability. (WIN-49)
  const [expandedSections, setExpandedSections] = useState<Map<string, Set<ExpandedSection>>>(
    () => {
      const initial = new Map<string, Set<ExpandedSection>>();
      for (const item of items) {
        if (item.narrative_only) {
          initial.set(item.item, new Set<ExpandedSection>(['notes']));
        }
      }
      return initial;
    }
  );
  const [filesState, setFilesState] = useState<Record<string, EvidenceFile | null>>({});
  const [showFullChecklist, setShowFullChecklist] = useState(false);

  // Refs for debounced saves
  const checklistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contextRef = useRef(context);
  contextRef.current = context;

  // Rebuild state when dispute or playbook changes
  useEffect(() => {
    const nextChecklist = buildInitialState(items, dispute);
    setChecklistState(nextChecklist);
    latestChecklistRef.current = nextChecklist;
    const nextNotes = dispute.checklist_notes ?? {};
    setNotesState(nextNotes);
    latestNotesRef.current = nextNotes;
    // Re-seed T-item notes as expanded when switching playbooks. (WIN-49)
    const nextExpanded = new Map<string, Set<ExpandedSection>>();
    for (const item of items) {
      if (item.narrative_only) {
        nextExpanded.set(item.item, new Set<ExpandedSection>(['notes']));
      }
    }
    setExpandedSections(nextExpanded);
  }, [dispute.id, dispute.checklist_state, dispute.checklist_notes, playbook?.reason_code]);

  // Fetch evidence files on mount / dispute change
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await fetchBackend<{ data: EvidenceFile[] }>(
          `/api/disputes/${dispute.id}/evidence-files`,
          contextRef.current,
        );
        const fileMap: Record<string, EvidenceFile | null> = {};
        for (const file of result.data) {
          fileMap[file.checklist_item_key] = file;
        }
        setFilesState(fileMap);
      } catch (err) {
        console.error('Failed to fetch evidence files:', err);
      }
    };
    fetchFiles();
  }, [dispute.id]);

  // Holds the latest checklist state so the unmount flush can persist it
  // without racing against React re-renders. (WIN-49)
  const latestChecklistRef = useRef<ChecklistState>({});

  const persistChecklist = useCallback((newState: ChecklistState) => {
    latestChecklistRef.current = newState;
    if (checklistTimeoutRef.current) {
      clearTimeout(checklistTimeoutRef.current);
    }
    checklistTimeoutRef.current = setTimeout(() => {
      patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
        checklist_state: latestChecklistRef.current,
      }).catch((err) => {
        console.error('Failed to save checklist state:', err);
      });
    }, 500);
  }, [dispute.id]);

  // Holds the latest notes state so flushNotes can read the current values
  // without depending on React re-renders. The debounced save and the explicit
  // Save button both read from here.
  const latestNotesRef = useRef<NotesState>({});

  const flushNotes = useCallback(() => {
    if (notesTimeoutRef.current) {
      clearTimeout(notesTimeoutRef.current);
      notesTimeoutRef.current = null;
    }
    patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
      checklist_notes: latestNotesRef.current,
    }).catch((err) => {
      console.error('Failed to save checklist notes:', err);
    });
  }, [dispute.id]);

  const persistNotes = useCallback((newNotes: NotesState) => {
    latestNotesRef.current = newNotes;
    // No debounce -- notes are short, typed infrequently, and the cost of
    // losing a note to a debounce race (WIN-49 QA) far exceeds the cost of
    // a few extra PATCH requests. Every keystroke commits immediately.
    if (notesTimeoutRef.current) {
      clearTimeout(notesTimeoutRef.current);
      notesTimeoutRef.current = null;
    }
    patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
      checklist_notes: newNotes,
    }).catch((err) => {
      console.error('Failed to save checklist notes:', err);
    });
  }, [dispute.id]);

  // Safety net: if the wizard unmounts (user closes the FocusView, navigates
  // to a different dispute, etc.) before the debounce fires, flush any
  // pending notes and checklist state immediately so nothing is lost. (WIN-49)
  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) {
        clearTimeout(notesTimeoutRef.current);
        notesTimeoutRef.current = null;
        patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
          checklist_notes: latestNotesRef.current,
        }).catch((err) => {
          console.error('Failed to flush checklist notes on unmount:', err);
        });
      }
      if (checklistTimeoutRef.current) {
        clearTimeout(checklistTimeoutRef.current);
        checklistTimeoutRef.current = null;
        patchBackend(`/api/disputes/${dispute.id}`, contextRef.current, {
          checklist_state: latestChecklistRef.current,
        }).catch((err) => {
          console.error('Failed to flush checklist state on unmount:', err);
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleFileChange = useCallback((itemName: string, file: EvidenceFile | null) => {
    setFilesState((prev) => ({ ...prev, [itemName]: file }));
  }, []);

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
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      {submitted ? (
        <Banner
          type="default"
          title="Evidence submitted"
          description="Your evidence has been submitted to Stripe. Files and checklist items are now read-only."
        />
      ) : (
        <Banner
          type="default"
          title="Gather your evidence"
          description="Here's what you'll need to build your case. Expand each item to see why it matters and jot down notes as you go."
        />
      )}

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

      {grouped.map(({ category, label, items: groupItems }, groupIndex) => (
        <Box key={category} css={{ stack: 'y', gap: 'small' }}>
          {groupIndex > 0 && <Divider />}
          <Inline css={{ font: 'caption', fontWeight: 'bold', color: 'secondary', textTransform: 'uppercase' }}>
            {label}
          </Inline>
          {groupItems.map((item) => {
            const stripeResult = getStripeFieldResult(item, dispute);
            return (
              <ChecklistItem
                key={item.item}
                item={item}
                checked={!!checklistState[item.item]}
                stripeFieldResult={stripeResult ?? undefined}
                expandedSections={expandedSections.get(item.item) ?? new Set()}
                notes={notesState[item.item] ?? ''}
                existingFile={filesState[item.item] ?? null}
                disputeId={dispute.id}
                context={contextRef.current}
                onToggle={() => handleToggle(item.item)}
                onSectionToggle={(section) => handleSectionToggle(item.item, section)}
                onNotesChange={(value) => handleNotesChange(item.item, value)}
                onSaveNotes={flushNotes}
                onFileChange={(file) => handleFileChange(item.item, file)}
                submitted={submitted}
              />
            );
          })}
        </Box>
      ))}

      <Divider />

      <Inline css={{ font: 'caption', color: 'disabled' }}>
        Your progress and notes are saved automatically.
      </Inline>
    </Box>
  );
};

export default EvidenceChecklist;
