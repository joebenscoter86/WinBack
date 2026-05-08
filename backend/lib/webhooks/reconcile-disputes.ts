import Stripe from "stripe";
import { listDisputesAllPages, getDispute } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { handleDisputeEvent } from "./handle-dispute-event";

export interface ReconciliationResult {
  merchant_count: number;
  disputes_seen: number;
  disputes_upserted: number;
  status_refreshes: number;
  truncated: boolean;
  errors: Array<{ merchant_id: string; message: string }>;
}

/** Statuses considered "still open" -- a status update could still arrive. */
const OPEN_STATUSES = new Set([
  "needs_response",
  "warning_needs_response",
  "under_review",
  "warning_under_review",
]);

/** Window matches the Insights aggregator's 90-day pattern window. */
const RECONCILE_WINDOW_DAYS = 90;

/**
 * Window-overlap when last_reconciled_at is set. The cron runs every ~24h,
 * so a 1-day overlap means a webhook delivered seconds after the previous
 * pass began still falls inside the next pass's window. Cheap insurance
 * against missing the boundary. The handler upserts on stripe_dispute_id
 * so re-fetched disputes are idempotent.
 */
const WINDOW_OVERLAP_SECONDS = 24 * 60 * 60;

interface MerchantRow {
  id: string;
  last_reconciled_at_test: string | null;
  last_reconciled_at_live: string | null;
}

/**
 * Daily reconciliation. For every (merchant, livemode) pair, refresh the
 * local disputes mirror so the Insights aggregator and the unread-badge
 * logic both see what Stripe sees.
 *
 * Two passes per call:
 *
 *   1. Listing pass -- fetch every dispute created since
 *      max(last_reconciled_at - overlap, 90 days ago) and upsert each one.
 *      Catches new disputes the webhook missed and any updates to disputes
 *      that fall inside the window.
 *
 *   2. Status-drift pass -- for every locally-known open dispute that
 *      WASN'T touched by the listing pass, re-fetch it by id and upsert.
 *      Catches the case where a dispute created >90 days ago changes
 *      status (e.g. an old `under_review` becomes `lost`) -- the
 *      created-date filter on Stripe's list API would never surface that
 *      transition otherwise, and Insights would show stale resolved
 *      counts.
 *
 * On success the merchant's last_reconciled_at_{mode} is updated. On
 * partial failure we still update the timestamp for completed work so a
 * persistent error in one merchant doesn't permanently widen the next
 * pass's window for everyone else.
 */
export async function reconcileDisputes(
  livemode: boolean,
  accountId: string,
): Promise<ReconciliationResult> {
  const result: ReconciliationResult = {
    merchant_count: 1,
    disputes_seen: 0,
    disputes_upserted: 0,
    status_refreshes: 0,
    truncated: false,
    errors: [],
  };

  const { data: merchant, error: merchantErr } = await supabase
    .from("merchants")
    .select("id, last_reconciled_at_test, last_reconciled_at_live")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (merchantErr) {
    result.errors.push({ merchant_id: accountId, message: merchantErr.message });
    return result;
  }
  const merchantRow = merchant as MerchantRow | null;
  if (!merchantRow) {
    // Merchant hasn't installed -- nothing to reconcile. The webhook
    // handler also short-circuits in this case, so we stay consistent.
    return result;
  }

  const lastReconciledAt = livemode
    ? merchantRow.last_reconciled_at_live
    : merchantRow.last_reconciled_at_test;
  const since = computeSinceFilter(lastReconciledAt);

  const seenIds = new Set<string>();

  // Pass 1: created-date listing.
  try {
    const { disputes, truncated } = await listDisputesAllPages(livemode, accountId, {
      created: { gte: since },
    });
    result.disputes_seen += disputes.length;
    result.truncated = truncated;
    for (const d of disputes) {
      try {
        await handleDisputeEvent(synthesizeReconciliationEvent(d, accountId), accountId);
        result.disputes_upserted += 1;
        seenIds.add(d.id);
      } catch (err) {
        result.errors.push({
          merchant_id: accountId,
          message: `upsert ${d.id}: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
    }
  } catch (err) {
    result.errors.push({
      merchant_id: accountId,
      message: `list pass: ${err instanceof Error ? err.message : String(err)}`,
    });
    // Don't run the status-drift pass if the listing pass itself blew up.
    // The local "open" set could be stale and we'd be pulling on bad data.
    return result;
  }

  // Pass 2: status drift refresh on local opens not touched by pass 1.
  try {
    const { data: localOpens, error: opensErr } = await supabase
      .from("disputes")
      .select("stripe_dispute_id")
      .eq("merchant_id", merchantRow.id)
      .eq("livemode", livemode)
      .in("status", Array.from(OPEN_STATUSES));

    if (opensErr) {
      result.errors.push({
        merchant_id: accountId,
        message: `select opens: ${opensErr.message}`,
      });
    } else {
      const driftCandidates = (
        (localOpens ?? []) as Array<{ stripe_dispute_id: string }>
      )
        .map((r) => r.stripe_dispute_id)
        .filter((id) => !seenIds.has(id));

      for (const id of driftCandidates) {
        try {
          const fresh = await getDispute(livemode, accountId, id);
          await handleDisputeEvent(
            synthesizeReconciliationEvent(fresh, accountId),
            accountId,
          );
          result.status_refreshes += 1;
        } catch (err) {
          result.errors.push({
            merchant_id: accountId,
            message: `refresh ${id}: ${err instanceof Error ? err.message : String(err)}`,
          });
        }
      }
    }
  } catch (err) {
    result.errors.push({
      merchant_id: accountId,
      message: `drift pass: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Mark this (merchant, mode) as reconciled. We update even on partial
  // failure -- the next pass will still cover what we did this pass plus
  // a 1-day overlap, which is the bound the failure couldn't have left
  // behind.
  const now = new Date().toISOString();
  const column = livemode ? "last_reconciled_at_live" : "last_reconciled_at_test";
  const { error: stampErr } = await supabase
    .from("merchants")
    .update({ [column]: now })
    .eq("id", merchantRow.id);
  if (stampErr) {
    result.errors.push({
      merchant_id: accountId,
      message: `stamp last_reconciled: ${stampErr.message}`,
    });
  }

  return result;
}

function computeSinceFilter(lastReconciledAt: string | null): number {
  const ninetyDaysAgoSec = Math.floor(
    (Date.now() - RECONCILE_WINDOW_DAYS * 86_400_000) / 1000,
  );
  if (!lastReconciledAt) return ninetyDaysAgoSec;
  const lastReconciledSec = Math.floor(
    new Date(lastReconciledAt).getTime() / 1000,
  );
  if (Number.isNaN(lastReconciledSec)) return ninetyDaysAgoSec;
  // Use the more recent of (90 days ago, last_reconciled - 1 day overlap).
  // Floor at 90 days so a long-running merchant whose last reconcile was
  // 200 days ago doesn't produce a 200-day Stripe scan.
  return Math.max(ninetyDaysAgoSec, lastReconciledSec - WINDOW_OVERLAP_SECONDS);
}

/**
 * Reconciliation reuses the same handler the webhook route uses, so we wrap
 * the dispute object in a synthetic event. event.created is set to the
 * dispute's own created timestamp so outcome_at lands on a sensible value
 * if the dispute is already closed.
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
