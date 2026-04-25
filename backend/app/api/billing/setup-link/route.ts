import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/upgrade-token";
import { captureRouteError } from "@/lib/sentry";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string };

  try {
    const token = signToken({ merchant_id: row.id, kind: "setup" });
    const url = `https://winbackpay.com/setup-billing?t=${encodeURIComponent(token)}`;
    return NextResponse.json({ url });
  } catch (err) {
    captureRouteError(err, { route: "billing.setup-link", extra: { merchant_id: row.id } });
    return NextResponse.json(
      { error: "Failed to create setup link", code: "internal_error" },
      { status: 500 },
    );
  }
});
