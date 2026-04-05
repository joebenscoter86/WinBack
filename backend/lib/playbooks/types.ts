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

export interface EvidenceChecklistItem {
  item: string;
  category: EvidenceCategory;
  context: EvidenceContext;
  required: boolean;
  why_matters: string;
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
