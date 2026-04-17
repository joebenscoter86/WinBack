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
  narrative_text?: string | null;
  evidence_submitted_at?: string | null;
  // Auto-pull fields (WIN-37)
  avs_address_check?: string;
  avs_zip_check?: string;
  cvc_check?: string;
  three_d_secure_result?: string;
  three_d_secure_version?: string;
  authorization_code?: string;
  network_status?: string;
  refunds?: Array<{ amount: number; created: number; status: string }>;
}

// Playbook types (mirrors backend PlaybookData)

export interface EvidenceChecklistItem {
  // Stable identifier that mirrors backend/lib/playbooks/types.ts EvidenceChecklistItem.key.
  // Used everywhere the playbook item needs a stable handle (filesByKey,
  // checklist_state, checklist_notes). The `item` field is the display label. (WIN-40)
  key: string;
  item: string;
  category: 'mandatory' | 'recommended' | 'situational';
  context: string;
  required: boolean;
  why_matters: string;
  where_to_find?: string;
  stripe_field?: string;
  narrative_only?: boolean;
  // Per-playbook canned merchant assertion used by the backend prompt builder
  // when a T item has no merchant note. Frontend doesn't render this -- it's
  // only here so the type matches the backend payload. (WIN-49)
  narrative_fallback?: string;
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

export interface EvidenceFile {
  id: string;
  stripe_file_id: string;
  checklist_item_key: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

export type SubmissionWarning =
  | { code: 'field_truncated'; field: string; original_length: number; truncated_length: number }
  | { code: 'field_collision'; winning_item: string; losing_item: string; field: string; resolution: 'uncategorized_file' | 'dropped' }
  | { code: 'missing_mandatory_items'; items: string[] }
  | { code: 'deadline_passed'; due_by: number }
  | { code: 'concat_skipped'; file_name: string; slot: string; reason: string };

export interface SubmissionResponse {
  submission_id: string;
  submitted_at: string;
  dispute_status: string;
  warnings: SubmissionWarning[];
}
