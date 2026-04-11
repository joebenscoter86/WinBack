import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Banner, Divider, Inline, Link } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { Dispute, PlaybookData, EvidenceChecklistItem, EvidenceFile } from '../../lib/types';
import { patchBackend, fetchBackend } from '../../lib/apiClient';
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

function formatCheckValue(raw: string | null | undefined): string {
  if (!raw) return 'Not checked';
  switch (raw) {
    case 'pass': return 'Match';
    case 'fail': return 'No match';
    case 'unavailable': return 'Not checked';
    case 'unchecked': return 'Not checked';
    default: return raw;
  }
}

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatCurrency(amount: number, currency?: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'usd',
  }).format(amount / 100);
}

/**
 * Status of a stripe_field-linked checklist item:
 * - 'positive': data exists and helps the case (auto-check, show value)
 * - 'unavailable': verification wasn't collected at checkout (grey out, explain)
 * - 'negative': verification failed, hurts the case (warn merchant)
 * - null: no stripe_field or not a mapped item
 */
export type StripeFieldStatus = 'positive' | 'unavailable' | 'negative';

export interface StripeFieldResult {
  status: StripeFieldStatus;
  value: string;
  guidance: string;
}

function getStripeFieldResult(item: EvidenceChecklistItem, dispute: Dispute): StripeFieldResult | null {
  const field = item.stripe_field;
  if (!field) return null;

  switch (field) {
    case 'avs_result': {
      const addr = dispute.avs_address_check;
      const zip = dispute.avs_zip_check;
      if (!addr && !zip) return {
        status: 'unavailable',
        value: 'Not collected at checkout',
        guidance: "Address verification wasn't run on this transaction. This can't be added after the fact -- focus your energy on the other evidence items instead.",
      };
      const addrFail = addr === 'fail';
      const zipFail = zip === 'fail';
      if (addrFail && zipFail) return {
        status: 'negative',
        value: 'Address: no match, ZIP: no match',
        guidance: "The billing address didn't match what the bank has on file. The issuer will see this automatically -- it weakens your case. Focus on strengthening other evidence to compensate.",
      };
      if (addrFail || zipFail) return {
        status: 'negative',
        value: `Address: ${formatCheckValue(addr)}, ZIP: ${formatCheckValue(zip)}`,
        guidance: "Partial address match -- one element didn't match. The issuer will see this. It's not as damaging as a full mismatch, but strengthen your other evidence to compensate.",
      };
      return {
        status: 'positive',
        value: `Address: ${formatCheckValue(addr)}, ZIP: ${formatCheckValue(zip)}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'cvc_check': {
      const cvc = dispute.cvc_check;
      if (!cvc || cvc === 'unavailable' || cvc === 'unchecked') return {
        status: 'unavailable',
        value: 'Not collected at checkout',
        guidance: "The security code (CVV) wasn't verified on this transaction. This can't be added after the fact -- focus your energy on the other evidence items instead.",
      };
      if (cvc === 'fail') return {
        status: 'negative',
        value: 'CVV: no match',
        guidance: "The CVV check failed on this transaction -- the code entered didn't match. The issuer will see this automatically and it hurts your case. Focus on strengthening other evidence to compensate.",
      };
      return {
        status: 'positive',
        value: 'CVV verified',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'three_d_secure': {
      const result = dispute.three_d_secure_result;
      if (!result) return {
        status: 'unavailable',
        value: 'Not used on this transaction',
        guidance: "3D Secure wasn't used on this transaction. This is the single strongest defense for fraud disputes -- consider enabling it for future transactions. For this dispute, focus on the other evidence items.",
      };
      const version = dispute.three_d_secure_version;
      if (result === 'authenticated') return {
        status: 'positive',
        value: version ? `Verified by bank (3DS v${version})` : 'Verified by bank (3DS)',
        guidance: "We pulled this from your transaction -- you're covered here. This is your strongest piece of evidence.",
      };
      if (result === 'attempt_acknowledged') return {
        status: 'positive',
        value: 'Bank verification attempted',
        guidance: "We pulled this from your transaction -- the bank acknowledged the 3DS attempt, which still provides liability shift in most cases.",
      };
      return {
        status: 'positive',
        value: `3DS result: ${result}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'authorization': {
      const code = dispute.authorization_code;
      const status = dispute.network_status;
      if (!code && !status) return null;
      if (status === 'declined_by_network') return {
        status: 'negative',
        value: 'Declined by network',
        guidance: "The authorization was declined by the network. This is unusual for a completed charge -- contact support if this doesn't look right.",
      };
      if (code && status === 'approved_by_network') return {
        status: 'positive',
        value: `Approved (auth code: ${code})`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
      if (code) return {
        status: 'positive',
        value: `Auth code: ${code}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
      if (status === 'approved_by_network') return {
        status: 'positive',
        value: 'Approved by network',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
      return {
        status: 'positive',
        value: `Network status: ${status}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'customer_email':
      if (!dispute.customer_email) return null;
      return {
        status: 'positive',
        value: dispute.customer_email,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'billing_address':
      if (!dispute.billing_address) return null;
      return {
        status: 'positive',
        value: dispute.billing_address,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'transaction_date':
      if (!dispute.transaction_date) return null;
      return {
        status: 'positive',
        value: formatDate(dispute.transaction_date),
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'receipt_url':
      if (!dispute.receipt_url) return null;
      return {
        status: 'positive',
        value: 'Receipt available',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'refund_data': {
      const refunds = dispute.refunds;
      if (!refunds || refunds.length === 0) return null;
      const r = refunds[0];
      return {
        status: 'positive',
        value: `Refund of ${formatCurrency(r.amount, dispute.currency)} on ${formatDate(r.created)}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    default:
      return null;
  }
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

const EvidenceChecklist = ({ dispute, playbook, context, isUrgent, daysRemaining }: EvidenceChecklistProps) => {
  const items = playbook?.evidence_checklist ?? [];
  const [checklistState, setChecklistState] = useState<ChecklistState>(() =>
    buildInitialState(items, dispute),
  );
  const [notesState, setNotesState] = useState<NotesState>(
    () => dispute.checklist_notes ?? {},
  );
  const [expandedSections, setExpandedSections] = useState<Map<string, Set<ExpandedSection>>>(new Map());
  const [filesState, setFilesState] = useState<Record<string, EvidenceFile | null>>({});
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
      <Banner
        type="default"
        title="Gather your evidence"
        description="Here's what you'll need to build your case. Expand each item to see why it matters and jot down notes as you go."
      />

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
                onFileChange={(file) => handleFileChange(item.item, file)}
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
