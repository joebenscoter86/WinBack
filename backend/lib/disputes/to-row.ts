import type Stripe from "stripe";

/**
 * Single source of truth for mapping a Stripe Dispute object to the
 * columns we persist in the `disputes` table. Both the webhook handler
 * and the on-view backfill (POST /api/disputes/[disputeId]) call this.
 *
 * `reason_code` is always Stripe's coarse `d.reason` (e.g. "fraudulent",
 * "visa_compelling_evidence_3"). `network_reason_code` is always the
 * network code (e.g. "10.4", "4853") or null. Stripe SDK 20.4.1 exposes
 * the field at both top-level (`d.network_reason_code`) and nested
 * (`d.payment_method_details.card.network_reason_code`); the nested form
 * is what the current API docs favor for live card disputes. We read
 * both and prefer the top-level value when both are populated.
 *
 * For null cases (test-mode triggers, or live disputes where Stripe has
 * not yet populated either field), the on-view backfill calls
 * normalizeDispute, which has a TEST_MODE_REASON_CODE_MAP fallback that
 * fills in a representative code. Submit also self-heals from the live
 * Stripe dispute when the column is null at submission time. (WIN-78)
 */
export function disputeToRow(d: Stripe.Dispute): {
  stripe_dispute_id: string;
  stripe_charge_id: string | undefined;
  amount: number;
  currency: string;
  reason_code: string;
  network_reason_code: string | null;
  network: string | null;
  status: string;
  response_deadline: string | null;
} {
  const networkReasonCode = extractNetworkReasonCode(d);
  return {
    stripe_dispute_id: d.id,
    stripe_charge_id: typeof d.charge === "string" ? d.charge : d.charge?.id,
    amount: d.amount,
    currency: d.currency,
    reason_code: d.reason,
    network_reason_code: networkReasonCode,
    network: networkReasonCode ? inferNetwork(d) : null,
    status: d.status,
    response_deadline: d.evidence_details?.due_by
      ? new Date(d.evidence_details.due_by * 1000).toISOString()
      : null,
  };
}

/**
 * Read network_reason_code from either Stripe location, preferring
 * top-level. Exported for reuse in submit's self-heal path.
 */
export function extractNetworkReasonCode(d: Stripe.Dispute): string | null {
  if (d.network_reason_code) return d.network_reason_code;
  const nested = (
    d.payment_method_details as
      | { card?: { network_reason_code?: string | null } }
      | null
      | undefined
  )?.card?.network_reason_code;
  return nested ?? null;
}

/**
 * Extract the card network from a Stripe Dispute, preferring the
 * authoritative source (`charge.payment_method_details.card.network`)
 * and falling back to `card.brand`, then to the regex on `d.reason`
 * for webhook payloads where the charge isn't expanded. Exported for
 * reuse in submit's self-heal path. Returns null when nothing is
 * resolvable. (WIN-78)
 */
export function extractNetwork(d: Stripe.Dispute): string | null {
  const charge = typeof d.charge === "object" && d.charge !== null ? d.charge : null;
  const card = (
    charge?.payment_method_details as
      | { card?: { network?: string | null; brand?: string | null } }
      | null
      | undefined
  )?.card;
  if (card?.network && card.network !== "unknown") return card.network;
  if (card?.brand && card.brand !== "unknown") return card.brand;
  return inferNetwork(d);
}

function inferNetwork(d: Stripe.Dispute): string | null {
  const reason = d.reason ?? "";
  if (/^visa_/.test(reason)) return "visa";
  if (/^mastercard_/.test(reason)) return "mastercard";
  if (/^amex_/.test(reason)) return "amex";
  return null;
}
