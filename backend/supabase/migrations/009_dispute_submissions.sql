-- WIN-20: Dispute submissions ledger -- idempotency + in-flight lock + replay cache

CREATE TABLE dispute_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed')),
  evidence_payload JSONB NOT NULL,
  stripe_response JSONB,
  error_code TEXT,
  error_message TEXT,
  warnings JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_submissions_dispute ON dispute_submissions(dispute_id);
CREATE INDEX idx_submissions_active ON dispute_submissions(dispute_id, status)
  WHERE status IN ('pending', 'succeeded');

ALTER TABLE dispute_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON dispute_submissions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "merchant_read_own" ON dispute_submissions
  FOR SELECT TO authenticated
  USING (
    dispute_id IN (
      SELECT d.id FROM disputes d
      JOIN merchants m ON m.id = d.merchant_id
      WHERE m.stripe_account_id = current_setting('request.headers', true)::json->>'x-stripe-account-id'
    )
  );
