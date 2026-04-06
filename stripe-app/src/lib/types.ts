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
  checklist_state?: Record<string, boolean>;
  checklist_notes?: Record<string, string>;
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
