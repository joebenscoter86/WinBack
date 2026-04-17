-- WIN-40: migrate checklist identifiers from display label to stable key.
-- Before this migration: evidence_files.checklist_item_key, disputes.checklist_state
-- keys, and disputes.checklist_notes keys all stored the human-readable label.
-- Renaming a playbook label orphaned every row keyed to the old text.
-- After this migration: all three use the stable key from the playbook definition.
-- The map below covers every current label from visa-10.4/13.1/13.2/13.3/13.6 and
-- mastercard-4808/4853, plus two known historical labels from WIN-19 QA.

BEGIN;

-- Build a one-shot mapping table so we can reuse it across all three updates.
CREATE TEMP TABLE win40_label_map (
  label TEXT PRIMARY KEY,
  stable_key TEXT NOT NULL
) ON COMMIT DROP;

INSERT INTO win40_label_map (label, stable_key) VALUES
  -- visa-10.4
  ('Transaction authorization record', 'authorization_record'),
  ('Address verification result', 'avs_result'),
  ('Security code (CVV) verification result', 'cvc_verification'),
  ('CVV2 verification result', 'cvc_verification'), -- legacy label (WIN-19 QA)
  ('Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)', 'ce3_prior_transactions'),
  ('IP address or device ID/fingerprint matching across all 3 transactions (disputed + 2 historical)', 'ce3_primary_link'),
  ('Second matching data element across all 3 transactions (user account ID, shipping address, or device ID)', 'ce3_secondary_link'),
  ('Bank verification (3D Secure) authentication proof', 'three_d_secure_proof'),
  ('3D Secure / Visa Secure authentication proof', 'three_d_secure_proof'), -- legacy label (WIN-19 QA)
  ('Delivery confirmation to cardholder''s verified billing address', 'delivery_to_billing_address'),
  ('Customer account details (account creation date, purchase history, total prior orders)', 'customer_account_details'),
  ('Access/activity logs proving the customer used the product (for digital goods and SaaS)', 'digital_access_logs'),
  ('Device identifier and IP address of the transaction', 'device_and_ip'),
  ('Bank statement name screenshot showing recognizable business name', 'statement_descriptor_proof'),
  ('Communication with cardholder showing engagement (order confirmation emails opened/clicked, support contacts)', 'customer_engagement_communication'),

  -- visa-13.1
  ('Carrier tracking confirmation with delivery scan', 'tracking_delivery_scan'),
  ('Delivery address verification (matches billing or shipping address on order)', 'shipping_address_match'),
  ('Signed delivery confirmation (for orders over $100)', 'signed_delivery'),
  ('Order confirmation showing agreed delivery date', 'order_confirmation_delivery_date'),
  ('Screenshot of order details (items, quantities, shipping method)', 'order_details_screenshot'),
  ('Communication with customer about delivery (emails, chat logs)', 'delivery_communication'),
  -- Access logs label is scoped to visa-13.1; `digital_access_logs` is intentionally
  -- reused between visa-10.4 and visa-13.1 because the evidence concept is the same.
  ('Access logs showing customer used the product/service (IP address, login timestamps, download confirmation)', 'digital_access_logs'),
  ('Email delivery confirmation (license key, download link sent to customer''s email)', 'digital_delivery_email'),
  ('Terms of service / delivery terms accepted at checkout', 'checkout_terms'),
  ('Service completion documentation or proof of performance', 'service_completion'),
  ('Appointment or scheduling records confirming service date', 'appointment_records'),

  -- visa-13.2
  ('Proof of active subscription at time of charge', 'subscription_active_proof'),
  ('Billing period covered by the disputed charge (service_date)', 'billing_period_covered'),
  ('Customer email address tied to the subscription', 'customer_email_subscription'),
  ('Cancellation policy (terms accepted at signup)', 'cancellation_policy_terms'),
  ('Cancellation request timestamp vs. charge date', 'cancellation_request_timestamp'),
  ('Cancellation confirmation sent to customer', 'cancellation_confirmation_sent'),
  ('Service usage logs after last billing cycle', 'post_billing_usage_logs'),
  ('Subscription agreement / terms of service', 'subscription_agreement'),
  ('Communication history with customer', 'customer_communication_history'),
  ('Refund confirmation (if already refunded)', 'refund_confirmation'),
  ('Proof this is an installment plan, not a recurring transaction', 'installment_plan_proof'),

  -- visa-13.3
  ('Product description as shown at time of purchase (screenshot, listing page)', 'product_description_at_purchase'),
  ('Proof of delivery (tracking number with delivery confirmation)', 'delivery_proof'),
  ('Pre-shipment photos of the actual item', 'pre_shipment_photos'),
  ('Product specifications or detailed listing', 'product_specifications'),
  ('Customer communications about the product (emails, chat logs)', 'customer_product_communications'),
  ('Proof cardholder did NOT attempt to return the merchandise', 'no_return_attempt'),
  ('Refund refusal explanation (if you denied a return or refund request)', 'refund_refusal_explanation'),
  ('Return policy clearly stated at checkout (screenshot or policy page)', 'return_policy_at_checkout'),
  ('Refund or replacement confirmation (if already issued)', 'refund_or_replacement_confirmation'),
  ('Service agreement or scope of work document', 'service_agreement'),
  ('Proof of service delivery (reports, access logs, deliverables, work product)', 'service_delivery_proof'),
  ('Client sign-off or acceptance documentation', 'client_signoff'),

  -- visa-13.6
  ('Refund confirmation / transaction record', 'refund_confirmation_record'),
  ('Refund amount and date matching the dispute', 'refund_amount_and_date'),
  ('Processor confirmation of the credit posting', 'processor_credit_confirmation'),
  ('Return/refund policy as displayed at checkout', 'return_refund_policy_at_checkout'),
  ('Return condition documentation (photos or inspection records)', 'return_condition_documentation'),
  ('Evidence the item was not returned', 'no_return_received'),
  ('Customer communication denying the return', 'customer_denial_communication'),
  ('Order confirmation showing original terms', 'order_confirmation_original_terms'),
  ('Cancellation policy disclosure (if the missing credit relates to a cancelled subscription)', 'cancellation_policy_disclosure'),
  ('Written communication about the return or refund', 'written_return_refund_communication'),

  -- mastercard-4808
  ('Original authorization record with transaction approval number and timestamp', 'authorization_record'),
  ('Final charge record tied to the authorization', 'final_charge_tied_to_authorization'),
  ('Transaction approval number', 'approval_number'),
  ('Currency conversion documentation', 'currency_conversion'),
  ('Tip or gratuity authorization documentation (for restaurant and service merchants)', 'tip_gratuity_authorization'),
  ('Renewed payment approval record (if original authorization expired before the charge was finalized)', 'renewed_payment_approval'),
  ('Timestamp proof that the charge was finalized before the authorization expired', 'charge_before_expiry_timestamp'),
  ('Payment processor transaction log showing the full record from approval to final charge', 'processor_transaction_log'),
  ('Order details matching the authorized amount', 'order_details_matching_amount'),

  -- mastercard-4853
  ('Original product/service description (website listing, catalog page, or order confirmation)', 'product_description_original'),
  ('Proof the item or service matched the description (photos of actual item shipped, quality control records, inspection documentation)', 'matched_description_proof'),
  ('Customer communication logs (emails, chat transcripts, support tickets)', 'customer_communication_logs'),
  ('Proof of delivery (tracking confirmation, signature)', 'proof_of_delivery'),
  ('Prior transaction history with the cardholder', 'prior_transaction_history'),
  ('Photos or video of item before shipment (timestamped packing photos showing correct item in good condition)', 'pre_shipment_photos'),
  ('Quality control or inspection records (batch inspection reports, QC checklists)', 'qc_inspection_records'),
  ('Terms of service accepted at checkout', 'checkout_terms_of_service'),
  ('Signed scope of work or service agreement', 'signed_scope_of_work'),
  ('Proof of service delivery (reports, deliverables, login/access logs)', 'service_delivery_proof'),
  ('Milestone sign-offs or approval emails from the customer', 'milestone_signoffs')
ON CONFLICT (label) DO NOTHING;

-- 1. evidence_files.checklist_item_key
UPDATE evidence_files ef
SET checklist_item_key = m.stable_key
FROM win40_label_map m
WHERE ef.checklist_item_key = m.label;

-- 2. disputes.checklist_state -- rebuild JSONB object with keys remapped.
-- Entries whose old key is not in the map are preserved as-is so we don't
-- silently drop unknown state (it was already orphaned before this migration).
UPDATE disputes d
SET checklist_state = (
  SELECT COALESCE(jsonb_object_agg(
    COALESCE(m.stable_key, entry.key),
    entry.value
  ), '{}'::jsonb)
  FROM jsonb_each(d.checklist_state) AS entry(key, value)
  LEFT JOIN win40_label_map m ON m.label = entry.key
)
WHERE d.checklist_state IS NOT NULL
  AND d.checklist_state <> '{}'::jsonb;

-- 3. disputes.checklist_notes -- same pattern.
UPDATE disputes d
SET checklist_notes = (
  SELECT COALESCE(jsonb_object_agg(
    COALESCE(m.stable_key, entry.key),
    entry.value
  ), '{}'::jsonb)
  FROM jsonb_each(d.checklist_notes) AS entry(key, value)
  LEFT JOIN win40_label_map m ON m.label = entry.key
)
WHERE d.checklist_notes IS NOT NULL
  AND d.checklist_notes <> '{}'::jsonb;

COMMIT;
