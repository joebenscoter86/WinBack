export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";

export type PlaybookCategory = "fraud" | "consumer" | "authorization";

export type EvidenceCategory = "mandatory" | "recommended" | "situational";

export type EvidenceContext =
  | "physical_goods"
  | "digital_goods"
  | "services"
  | "all"
  | "amount_discrepancy"
  | "expired_auth"
  | "refund_issued"
  | "refund_disputed"
  | "installment_defense"
  | "ce3";

export type StripeEvidenceFileField =
  | "cancellation_policy"
  | "customer_communication"
  | "customer_signature"
  | "duplicate_charge_documentation"
  | "receipt"
  | "refund_policy"
  | "service_documentation"
  | "shipping_documentation"
  | "uncategorized_file";

export interface EvidenceChecklistItem {
  item: string;
  category: EvidenceCategory;
  context: EvidenceContext;
  required: boolean;
  why_matters: string;
  where_to_find?: string;
  /**
   * Populated at submit time from the Charge object. An item with stripe_field
   * set is category A (autofilled) and MUST NOT have stripe_evidence_field or
   * narrative_only set.
   */
  stripe_field?: string;
  /**
   * True for items the merchant addresses in the narrative body, not via file
   * upload. An item with narrative_only=true is category T and MUST NOT have
   * stripe_evidence_field or stripe_field set.
   */
  narrative_only?: boolean;
  /**
   * Target Stripe dispute evidence file slot. Multiple items in a playbook MAY
   * share a slot — PDF concat at submit time resolves the merge. Items with a
   * stripe_evidence_field are file-upload items and MUST NOT have stripe_field
   * or narrative_only set.
   */
  stripe_evidence_field?: StripeEvidenceFileField;
  urgency_essential: boolean;
  urgency_order: number | null;
}

export interface CommonMistake {
  mistake: string;
  explanation: string;
}

export interface ProTip {
  tip: string;
}

export interface UrgencyEssentials {
  summary: string;
  ordered_items: string[];
}

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
