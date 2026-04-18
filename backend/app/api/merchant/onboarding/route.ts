import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-25: Read onboarding state for the authenticated merchant.
 *
 * Response:
 *   completed: boolean
 *   completed_at: ISO timestamp | null
 *
 * POST (not GET) because the iframe's fetchBackend helper signs a JSON body
 * and a GET can't carry a Stripe App signature payload.
 */
export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;

  try {
    await ensureMerchant(accountId, userId);

    const { data, error } = await supabase
      .from("merchants")
      .select("onboarding_completed_at")
      .eq("stripe_account_id", accountId)
      .maybeSingle();

    if (error) {
      captureRouteError(error, { route: "merchant.onboarding.read" });
      return NextResponse.json(
        { error: "Internal server error", code: "internal_error" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Merchant not found", code: "not_found" },
        { status: 404 },
      );
    }

    const row = data as { onboarding_completed_at: string | null };
    return NextResponse.json({
      completed: row.onboarding_completed_at !== null,
      completed_at: row.onboarding_completed_at,
    });
  } catch (err) {
    captureRouteError(err, { route: "merchant.onboarding.read" });
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
