-- WIN-21: Track processed Stripe webhook events for idempotency.
-- Stripe may deliver the same event multiple times. The handler upserts the
-- event id; if a row already exists with status='processed', the handler
-- short-circuits without re-applying the side effect.

CREATE TABLE webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  account_id TEXT,                 -- event.account from Connect webhooks (null for platform events)
  status TEXT NOT NULL DEFAULT 'pending', -- pending | processed | failed
  error_message TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_webhook_events_received_at ON webhook_events(received_at DESC);
CREATE INDEX idx_webhook_events_status ON webhook_events(status) WHERE status != 'processed';
