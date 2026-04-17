import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

/**
 * WIN-21: Map a Stripe dispute object to the columns we persist.
 * Mirrors the fields normalizeDispute returns to the iframe — kept narrow on
 * purpose so a missed Stripe API field doesn't silently overwrite a hand-set
 * one in the DB.
 */
function disputeToRow(d: Stripe.Dispute): Record<string, unknown> {
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

const CLOSED_OUTCOME_STATUSES = new Set([
  "won",
  "lost",
  "warning_closed",
  "charge_refunded",
]);

/**
 * Apply a Stripe dispute webhook event to the disputes table.
 * Caller is responsible for idempotency (checking webhook_events first).
 */
export async function handleDisputeEvent(
  event: Stripe.Event,
  accountId: string,
): Promise<void> {
  const dispute = event.data.object as Stripe.Dispute;

  const { data: merchant } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (!merchant) {
    // Merchant hasn't installed/used the app yet — ignore. The reconciliation
    // job will pick this up when the merchant first opens the iframe.
    return;
  }

  const merchantId = (merchant as { id: string }).id;
  const baseRow = disputeToRow(dispute);

  if (event.type === "charge.dispute.closed") {
    const outcomeAt = CLOSED_OUTCOME_STATUSES.has(dispute.status)
      ? new Date(event.created * 1000).toISOString()
      : null;

    await supabase
      .from("disputes")
      .upsert(
        { ...baseRow, merchant_id: merchantId, outcome_at: outcomeAt },
        { onConflict: "stripe_dispute_id" },
      );
    return;
  }

  // created or updated — preserve existing outcome_at if set
  await supabase
    .from("disputes")
    .upsert(
      { ...baseRow, merchant_id: merchantId },
      { onConflict: "stripe_dispute_id" },
    );
}
