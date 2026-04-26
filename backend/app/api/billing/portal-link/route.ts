import { NextResponse } from "next/server";
import Stripe from "stripe";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";
import { env } from "@/lib/env";

/**
 * Returns a Stripe Customer Portal session URL for the merchant. The portal
 * lets the merchant manage their Pro subscription (cancel at period end,
 * update payment method, view invoice history). The link is signed by
 * Stripe with a short-lived token, so we can return it to the iframe and
 * render it as a <Link target="_blank"> safely.
 *
 * Only Pro-tier merchants need this — usage-tier merchants don't have a
 * subscription to manage. We still allow the call as long as a billing
 * customer exists, in case a merchant is on a brief past_due/canceled
 * window and needs to update payment to recover.
 */

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(env().STRIPE_SECRET_KEY);
  }
  return _stripe;
}

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id, stripe_billing_customer_id")
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
    stripe_billing_customer_id: string | null;
  };

  if (!row.stripe_billing_customer_id) {
    // Merchant has never had a billing customer created — nothing to manage.
    // This is rare in practice (Pro merchants always have one); usage-tier
    // merchants without a PM would hit it.
    return NextResponse.json(
      { error: "No billing account to manage", code: "no_customer" },
      { status: 409 },
    );
  }

  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: row.stripe_billing_customer_id,
      return_url: "https://dashboard.stripe.com/settings/apps",
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    captureRouteError(err, {
      route: "billing.portal-link",
      extra: { merchant_id: row.id },
    });
    return NextResponse.json(
      { error: "Failed to create portal session", code: "internal_error" },
      { status: 500 },
    );
  }
});
