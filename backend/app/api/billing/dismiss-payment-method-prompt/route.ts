import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;
  await ensureMerchant(accountId, userId);

  const { data: merchant } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .maybeSingle();
  if (!merchant) {
    return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
  }
  const row = merchant as { id: string };

  try {
    const { error } = await supabase
      .from("merchants")
      .update({ payment_method_prompt_dismissed_at: new Date().toISOString() })
      .eq("id", row.id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    captureRouteError(err, { route: "billing.dismiss-pm-prompt" });
    return NextResponse.json({ error: "Failed to dismiss" }, { status: 500 });
  }
});
