import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-25: Set or clear the merchant's onboarding_completed_at timestamp.
 *
 * Body:
 *   completed: boolean
 *     true  -> onboarding_completed_at = NOW() (dismissal from disputes view)
 *     false -> onboarding_completed_at = NULL (reopen from Settings)
 *
 * Response:
 *   completed: boolean (echo)
 */
export const POST = withStripeAuth(async (_request, { identity, body }) => {
  const { accountId, userId } = identity;
  const completed = (body as { completed?: unknown } | undefined)?.completed;

  if (typeof completed !== "boolean") {
    return NextResponse.json(
      { error: "Missing completed flag", code: "invalid_request" },
      { status: 400 },
    );
  }

  try {
    await ensureMerchant(accountId, userId);

    const now = new Date().toISOString();
    const { error } = await supabase
      .from("merchants")
      .update({
        onboarding_completed_at: completed ? now : null,
        updated_at: now,
      })
      .eq("stripe_account_id", accountId);

    if (error) {
      captureRouteError(error, { route: "merchant.onboarding.update" });
      return NextResponse.json(
        { error: "Internal server error", code: "internal_error" },
        { status: 500 },
      );
    }

    return NextResponse.json({ completed });
  } catch (err) {
    captureRouteError(err, { route: "merchant.onboarding.update" });
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
