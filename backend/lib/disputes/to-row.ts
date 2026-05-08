import type Stripe from "stripe";

/**
 * Single source of truth for mapping a Stripe Dispute object to the
 * columns we persist in the `disputes` table. Both the webhook handler
 * and the on-view backfill (POST /api/disputes/[disputeId]) call this
 * so the two paths can never silently disagree on what `status`,
 * `reason_code`, or `network` should be -- a real risk because the
 * Insights aggregator buckets on `status` and the patterns view buckets
 * on `reason_code`. Any drift between the two write paths would
 * silently miscount in the Insights tab.
 *
 * Caller is responsible for setting merchant_id, livemode, and any
 * route-specific extras (customer_name, transaction_date, viewed_at,
 * outcome_at, etc.). This function only handles fields derivable from
 * the Stripe dispute object itself.
 */
export function disputeToRow(d: Stripe.Dispute): {
  stripe_dispute_id: string;
  stripe_charge_id: string | undefined;
  amount: number;
  currency: string;
  reason_code: string;
  network: string | null;
  status: string;
  response_deadline: string | null;
} {
  return {
    stripe_dispute_id: d.id,
    stripe_charge_id: typeof d.charge === "string" ? d.charge : d.charge?.id,
    amount: d.amount,
    currency: d.currency,
    reason_code: d.reason,
    network: d.network_reason_code ? inferNetwork(d) : null,
    status: d.status,
    response_deadline: d.evidence_details?.due_by
      ? new Date(d.evidence_details.due_by * 1000).toISOString()
      : null,
  };
}

function inferNetwork(d: Stripe.Dispute): string | null {
  const reason = d.reason ?? "";
  if (/^visa_/.test(reason)) return "visa";
  if (/^mastercard_/.test(reason)) return "mastercard";
  if (/^amex_/.test(reason)) return "amex";
  return null;
}
