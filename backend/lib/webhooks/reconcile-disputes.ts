import Stripe from "stripe";
import { listDisputes } from "@/lib/stripe";
import { handleDisputeEvent } from "./handle-dispute-event";
import { supabase } from "@/lib/supabase";

export interface ReconciliationResult {
  merchant_count: number;
  disputes_seen: number;
  disputes_upserted: number;
  errors: Array<{ merchant_id: string; message: string }>;
}

/**
 * WIN-21: Daily reconciliation. For every merchant, list their disputes from
 * Stripe and upsert any rows that are missing or stale in our DB. Catches
 * webhooks that were dropped during deploys or cold starts.
 *
 * Scope: all non-closed disputes + closed in the last 7 days. Closed disputes
 * older than that won't change again.
 */
export async function reconcileDisputes(): Promise<ReconciliationResult> {
  const result: ReconciliationResult = {
    merchant_count: 0,
    disputes_seen: 0,
    disputes_upserted: 0,
    errors: [],
  };

  const { data: merchants, error: merchErr } = await supabase
    .from("merchants")
    .select("stripe_account_id");

  if (merchErr || !merchants) {
    throw new Error(`Failed to list merchants: ${merchErr?.message ?? "no data"}`);
  }

  const sevenDaysAgo = Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);

  for (const m of merchants as Array<{ stripe_account_id: string }>) {
    result.merchant_count += 1;
    const accountId = m.stripe_account_id;

    try {
      const disputes = await listDisputes(accountId, {
        limit: 100,
        created: { gte: sevenDaysAgo },
      });
      result.disputes_seen += disputes.length;

      for (const d of disputes) {
        await handleDisputeEvent(
          synthesizeReconciliationEvent(d, accountId),
          accountId,
        );
        result.disputes_upserted += 1;
      }
    } catch (err) {
      result.errors.push({
        merchant_id: accountId,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}

/**
 * Reconciliation reuses the same handler the webhook route uses, so we wrap the
 * dispute object in a synthetic event. event.created is set to the dispute's
 * own created timestamp so outcome_at lands on a sensible value if the dispute
 * is already closed.
 */
function synthesizeReconciliationEvent(
  dispute: Stripe.Dispute,
  accountId: string,
): Stripe.Event {
  const eventType: Stripe.Event.Type =
    dispute.status === "needs_response" || dispute.status === "warning_needs_response"
      ? "charge.dispute.updated"
      : "charge.dispute.closed";

  return {
    id: `evt_reconcile_${dispute.id}`,
    object: "event",
    api_version: null,
    created: dispute.created,
    data: { object: dispute },
    livemode: dispute.livemode,
    pending_webhooks: 0,
    request: { id: null, idempotency_key: null },
    type: eventType,
    account: accountId,
  } as Stripe.Event;
}
