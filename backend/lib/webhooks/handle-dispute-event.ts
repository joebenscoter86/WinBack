import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { reportDisputeWonFee } from "@/lib/billing";
import { captureRouteError } from "@/lib/sentry";
import { isInquiryToChargebackEscalation } from "@/lib/disputes/inquiry";

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
    .select("id, billing_tier")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (!merchant) {
    // Merchant hasn't installed/used the app yet — ignore. The reconciliation
    // job will pick this up when the merchant first opens the iframe.
    return;
  }

  const merchantRow = merchant as { id: string; billing_tier: "usage" | "pro" };
  const merchantId = merchantRow.id;
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

    // WIN-24: report 15% success fee as a meter event on usage-tier wins.
    // Meter events are idempotent via `identifier` (keyed by dispute_id), so
    // webhook retries or reconciliation replays never double-charge. Pro
    // merchants (post pro_since_at) skip metering entirely.
    if (dispute.status === "won" && merchantRow.billing_tier === "usage") {
      try {
        await reportDisputeWonFee({
          merchantId,
          disputeId: dispute.id,
          amountRecoveredCents: dispute.amount,
        });
      } catch (err) {
        // Billing failures should not re-queue the webhook — the dispute row
        // is already persisted and reconciliation can retry. Log to Sentry.
        captureRouteError(err, {
          route: "webhooks.stripe.report_success_fee",
          extra: {
            dispute_id: dispute.id,
            merchant_id: merchantId,
            amount: dispute.amount,
          },
        });
      }
    }
    return;
  }

  // created or updated — preserve existing outcome_at if set
  // On inquiry → chargeback escalation, also clear evidence_submitted_at so
  // the merchant sees the re-submission prompt instead of a stale
  // "already submitted" UI. Stripe requires a separate response for the
  // chargeback even if the merchant already responded at the inquiry stage.
  let escalationReset: { evidence_submitted_at: null } | Record<string, never> = {};
  if (event.type === "charge.dispute.updated") {
    const { data: existing } = await supabase
      .from("disputes")
      .select("status, evidence_submitted_at")
      .eq("stripe_dispute_id", dispute.id)
      .maybeSingle();

    const priorStatus = (existing as { status?: string } | null)?.status;
    if (isInquiryToChargebackEscalation(priorStatus, dispute.status)) {
      escalationReset = { evidence_submitted_at: null };
    }
  }

  await supabase
    .from("disputes")
    .upsert(
      { ...baseRow, merchant_id: merchantId, ...escalationReset },
      { onConflict: "stripe_dispute_id" },
    );
}
