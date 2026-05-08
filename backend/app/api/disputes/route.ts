import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";
import { reconcileDisputes } from "@/lib/webhooks/reconcile-disputes";
import Stripe from "stripe";

export const POST = withStripeAuth(async (_request, { identity, livemode }) => {
  const { accountId, userId } = identity;

  // Dev-only escape hatch for previewing the empty-disputes onboarding state
  // when the test Stripe account already has open disputes. Hard-gated on
  // NODE_ENV so it cannot ship to production.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.WINBACK_FORCE_EMPTY === "1"
  ) {
    return NextResponse.json({ data: [] });
  }

  await ensureMerchant(accountId, userId);

  try {
    const disputes = await listDisputes(livemode, accountId, {
      limit: 100,
      expand: ["data.charge.customer"],
    });

    const normalized = disputes.map(normalizeDispute);

    // WIN-26: attach is_new so the list can badge unseen disputes. A dispute
    // is "new" when the webhook has inserted a row but the merchant hasn't
    // opened it in WinBack yet (viewed_at IS NULL). Disputes not yet in the
    // DB (pre-webhook race) default to is_new=false -- safer to under-badge
    // than to badge every dispute on a cold start.
    const { data: merchantRow } = await supabase
      .from("merchants")
      .select("id, disputes_backfilled_at_test, disputes_backfilled_at_live")
      .eq("stripe_account_id", accountId)
      .maybeSingle();
    const m = merchantRow as
      | {
          id: string;
          disputes_backfilled_at_test: string | null;
          disputes_backfilled_at_live: string | null;
        }
      | null;
    const merchantId = m?.id;
    const needsBackfill = m
      ? (livemode ? m.disputes_backfilled_at_live : m.disputes_backfilled_at_test) === null
      : false;

    // First-install backfill. The disputes table only gets populated by
    // webhook deliveries that happen AFTER the merchant row exists, plus
    // the daily cron's 90-day window. Disputes that pre-date install
    // (or that hit during the deploy/cold-start gap that dropped the
    // webhook) are otherwise invisible to the Insights aggregator until
    // the merchant clicks into them. Run a one-time per-livemode 90-day
    // reconcile inline on the first list call so Insights has real data
    // immediately. Stamped via disputes_backfilled_at_{mode} so it
    // doesn't repeat. Errors are swallowed -- a backfill failure must
    // not break the disputes list, since the list itself comes from
    // Stripe directly and is correct regardless. We do this BEFORE the
    // is_new lookup so a fresh merchant's first list call still gets
    // accurate unseen-badging instead of "everything looks viewed."
    if (merchantId && needsBackfill) {
      try {
        await reconcileDisputes(livemode, accountId);
      } catch (backfillErr) {
        captureRouteError(backfillErr, {
          route: "disputes.list.first_install_backfill",
          extra: { account_id: accountId, livemode },
        });
      }
      const stampColumn = livemode
        ? "disputes_backfilled_at_live"
        : "disputes_backfilled_at_test";
      const { error: stampErr } = await supabase
        .from("merchants")
        .update({ [stampColumn]: new Date().toISOString() })
        .eq("id", merchantId);
      if (stampErr) {
        captureRouteError(stampErr, {
          route: "disputes.list.backfill_stamp",
          extra: { account_id: accountId, livemode },
        });
      }
    }

    const unseenIds = new Set<string>();
    if (merchantId && normalized.length > 0) {
      const { data: viewRows } = await supabase
        .from("disputes")
        .select("stripe_dispute_id, viewed_at")
        .eq("merchant_id", merchantId)
        .eq("livemode", livemode)
        .in(
          "stripe_dispute_id",
          normalized.map((d) => d.id),
        );
      for (const row of (viewRows ?? []) as {
        stripe_dispute_id: string;
        viewed_at: string | null;
      }[]) {
        if (row.viewed_at === null) unseenIds.add(row.stripe_dispute_id);
      }
    }

    const withNewFlag = normalized.map((d) => ({
      ...d,
      is_new: unseenIds.has(d.id),
    }));

    return NextResponse.json({ data: withNewFlag });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      if (classified.status >= 500) {
        captureRouteError(err, { route: "disputes.list" });
      }
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error listing disputes:", err);
    captureRouteError(err, { route: "disputes.list" });
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
