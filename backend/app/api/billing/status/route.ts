import { NextResponse } from "next/server";
import Stripe from "stripe";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { SUCCESS_FEE_RATE } from "@/lib/billing";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-24: Return the merchant's current billing state for the Settings view.
 *
 * Response:
 *   tier: 'usage' | 'pro'
 *   subscription_status: active | past_due | canceled | unpaid | null
 *   pro_since_at: ISO timestamp | null
 *   next_billing_at: ISO | null (Pro only — next subscription renewal)
 *   ytd_success_fees_cents: number (estimated; sum of 15% of won disputes YTD)
 *   upgrade_prompted_at: ISO | null
 */

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

// POST (not GET) so it works with the iframe's `fetchBackend` helper, which
// signs a JSON body — a GET can't carry a Stripe App signature payload.
export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select(
      "id, billing_tier, subscription_status, pro_since_at, upgrade_prompted_at, stripe_subscription_id",
    )
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as {
    id: string;
    billing_tier: "usage" | "pro";
    subscription_status: string | null;
    pro_since_at: string | null;
    upgrade_prompted_at: string | null;
    stripe_subscription_id: string | null;
  };

  // Next billing date for Pro subscribers — fetched from Stripe rather than
  // cached locally because it shifts on upgrades/downgrades.
  let nextBillingAt: string | null = null;
  if (row.billing_tier === "pro" && row.stripe_subscription_id) {
    try {
      const sub = await getStripe().subscriptions.retrieve(row.stripe_subscription_id);
      // `current_period_end` moved from Subscription to SubscriptionItem in
      // the 2024-xx API. Take the earliest period end across items.
      const periodEnds = sub.items.data
        .map((item) => item.current_period_end)
        .filter((v): v is number => typeof v === "number");
      if (periodEnds.length > 0) {
        nextBillingAt = new Date(Math.min(...periodEnds) * 1000).toISOString();
      }
    } catch (err) {
      captureRouteError(err, {
        route: "billing.status.subscription_fetch",
        extra: { subscription_id: row.stripe_subscription_id },
      });
    }
  }

  // YTD success fees: sum 15% of won disputes closed this calendar year, up to
  // pro_since_at if the merchant upgraded mid-year. Meter events aren't easily
  // aggregated via the Stripe API, so we reconstruct from our own records —
  // close enough for an informational display.
  const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();
  let ytdFeesCents = 0;
  try {
    const cutoff = row.pro_since_at ?? new Date().toISOString();
    const { data: wonDisputes } = await supabase
      .from("disputes")
      .select("amount, outcome_at")
      .eq("merchant_id", row.id)
      .eq("status", "won")
      .gte("outcome_at", yearStart)
      .lte("outcome_at", cutoff);

    for (const d of (wonDisputes ?? []) as { amount: number }[]) {
      ytdFeesCents += Math.round(d.amount * SUCCESS_FEE_RATE);
    }
  } catch (err) {
    captureRouteError(err, { route: "billing.status.ytd_fees" });
  }

  return NextResponse.json({
    tier: row.billing_tier,
    subscription_status: row.subscription_status,
    pro_since_at: row.pro_since_at,
    upgrade_prompted_at: row.upgrade_prompted_at,
    next_billing_at: nextBillingAt,
    ytd_success_fees_cents: ytdFeesCents,
  });
});
