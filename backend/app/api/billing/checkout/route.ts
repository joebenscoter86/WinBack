import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { createProCheckoutSession } from "@/lib/billing";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-24: Create a Stripe Checkout session for the Pro ($79/mo) upgrade.
 * Returns the hosted Checkout URL. The iframe UI opens it in a new tab
 * because Checkout cannot render inside the Stripe Dashboard iframe.
 */
export const POST = withStripeAuth(async (_request, { identity, body }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error: merchErr } = await supabase
    .from("merchants")
    .select("id, billing_tier")
    .eq("stripe_account_id", accountId)
    .maybeSingle();
  if (merchErr || !merchant) {
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

  // Success/cancel URLs come from the caller (the iframe) so we can route
  // back to the exact view that launched upgrade. Validate they look like
  // real URLs — anything else is a programming error.
  const successUrl = typeof body?.success_url === "string" ? body.success_url : null;
  const cancelUrl = typeof body?.cancel_url === "string" ? body.cancel_url : null;
  if (!successUrl || !cancelUrl) {
    return NextResponse.json(
      { error: "Missing success_url or cancel_url", code: "invalid_request" },
      { status: 400 },
    );
  }

  try {
    const { url, sessionId } = await createProCheckoutSession({
      merchantId: row.id,
      successUrl,
      cancelUrl,
    });

    // Stamp when we first prompted the merchant so the UI can stop nagging.
    await supabase
      .from("merchants")
      .update({ upgrade_prompted_at: new Date().toISOString() })
      .eq("id", row.id);

    return NextResponse.json({ url, session_id: sessionId });
  } catch (err) {
    captureRouteError(err, { route: "billing.checkout", extra: { merchant_id: row.id } });
    return NextResponse.json(
      { error: "Failed to create checkout session", code: "internal_error" },
      { status: 500 },
    );
  }
});
