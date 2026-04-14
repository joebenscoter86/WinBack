// Prompt template type definitions for WIN-17: AI Prompt Templates

export interface PromptSection {
  name: string;
  bank_criterion: string;
  instruction: string;
  auto_pull_fields: string[];
  evidence_keys: string[];
  priority: 1 | 2;
}

export interface ReasonCodePromptTemplate {
  reason_code: string;
  network: string;
  strategy: string;
  sections: PromptSection[];
}

export interface NarrativeOutput {
  narrative: string;
  annotations: Array<{
    section: string;
    reasoning: string;
  }>;
}

export interface EvidenceFileRef {
  checklist_item_key: string;
  file_name: string;
}

export interface PromptContext {
  reason_code: string;
  network: string;
  display_name: string;
  amount: number;
  currency: string;
  transaction_date?: number;
  customer_name?: string;
  customer_email?: string;
  card_brand?: string;
  card_last4?: string;
  billing_address?: string;
  charge_description?: string;
  avs_address_check?: string;
  avs_zip_check?: string;
  cvc_check?: string;
  three_d_secure_result?: string;
  three_d_secure_version?: string;
  authorization_code?: string;
  network_status?: string;
  refunds?: Array<{ amount: number; created: number; status: string }>;
  calculated_statement_descriptor?: string;
  evidence_files: EvidenceFileRef[];
  checklist_notes: Record<string, string>;
  issuer_evaluation: string;
  merchant_feedback?: string;
}
