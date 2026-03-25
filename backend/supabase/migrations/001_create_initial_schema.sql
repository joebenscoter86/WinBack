-- WinBack initial schema
-- Tables: merchants, playbooks, disputes, evidence_files

-- Merchants (linked to Stripe account)
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_account_id TEXT UNIQUE NOT NULL,
  email TEXT,
  business_name TEXT,
  subscription_status TEXT DEFAULT 'trial',
  subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reason code playbooks
CREATE TABLE playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  network TEXT NOT NULL, -- visa, mastercard, amex, discover
  reason_code TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL,
  issuer_evaluation TEXT NOT NULL,
  evidence_checklist JSONB NOT NULL, -- [{item, required, why_matters}]
  common_mistakes JSONB, -- [{mistake, explanation}]
  narrative_template TEXT NOT NULL,
  pro_tips JSONB, -- [{tip}]
  urgency_essentials JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(network, reason_code)
);

-- Dispute tracking
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  stripe_dispute_id TEXT UNIQUE NOT NULL,
  stripe_charge_id TEXT,
  amount INTEGER NOT NULL, -- cents
  currency TEXT DEFAULT 'usd',
  reason_code TEXT NOT NULL,
  network TEXT,
  status TEXT DEFAULT 'needs_response',
  customer_name TEXT,
  transaction_date TIMESTAMPTZ,
  response_deadline TIMESTAMPTZ,
  evidence_submitted_at TIMESTAMPTZ,
  outcome_at TIMESTAMPTZ,
  narrative_text TEXT,
  narrative_generations_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence files
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE,
  checklist_item_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Supabase Storage path
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_to_stripe BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Indexes
CREATE INDEX idx_disputes_merchant ON disputes(merchant_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_evidence_dispute ON evidence_files(dispute_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER merchants_updated_at BEFORE UPDATE ON merchants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER playbooks_updated_at BEFORE UPDATE ON playbooks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER disputes_updated_at BEFORE UPDATE ON disputes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
