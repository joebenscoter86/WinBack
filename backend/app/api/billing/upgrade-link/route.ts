import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/upgrade-token";
import { captureRouteError } from "@/lib/sentry";

/**
 * Returns a short-lived signed URL for the public /upgrade confirmation page.
 * The iframe opens that URL in a new tab; the confirmation page then calls
 * /api/billing/checkout-from-token to create the actual Checkout session.
 */
export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id, billing_tier")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string; billing_tier: "usage" | "pro" };
  if (row.billing_tier === "pro") {
    return NextResponse.json(
      { error: "Already on Pro", code: "already_pro" },
      { status: 409 },
    );
  }

  try {
    const token = signToken({ merchant_id: row.id, kind: "upgrade" });
    const url = `https://winbackpay.com/upgrade?t=${encodeURIComponent(token)}`;
    return NextResponse.json({ url });
  } catch (err) {
    captureRouteError(err, { route: "billing.upgrade-link", extra: { merchant_id: row.id } });
    return NextResponse.json(
      { error: "Failed to create upgrade link", code: "internal_error" },
      { status: 500 },
    );
  }
});
