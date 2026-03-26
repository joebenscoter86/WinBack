export type DisputeStatus =
  | 'needs_response'
  | 'under_review'
  | 'won'
  | 'lost'
  | 'warning_needs_response'
  | 'warning_under_review'
  | 'warning_closed'
  | 'charge_refunded';

export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover';

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
}
