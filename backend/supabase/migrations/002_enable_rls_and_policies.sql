-- Enable RLS on all tables
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_files ENABLE ROW LEVEL SECURITY;

-- Playbooks: public read
CREATE POLICY "Playbooks are readable by all authenticated users"
  ON playbooks FOR SELECT
  USING (true);

-- Merchants: read own record via x-stripe-account-id header
CREATE POLICY "Merchants can read own record"
  ON merchants FOR SELECT
  USING (stripe_account_id = current_setting('request.headers', true)::json->>'x-stripe-account-id');

-- Disputes: merchants see their own
CREATE POLICY "Merchants can read own disputes"
  ON disputes FOR SELECT
  USING (merchant_id IN (
    SELECT id FROM merchants
    WHERE stripe_account_id = current_setting('request.headers', true)::json->>'x-stripe-account-id'
  ));

-- Evidence files: merchants see files for their own disputes
CREATE POLICY "Merchants can read own evidence files"
  ON evidence_files FOR SELECT
  USING (dispute_id IN (
    SELECT d.id FROM disputes d
    JOIN merchants m ON d.merchant_id = m.id
    WHERE m.stripe_account_id = current_setting('request.headers', true)::json->>'x-stripe-account-id'
  ));

-- All writes go through backend service_role (bypasses RLS)
