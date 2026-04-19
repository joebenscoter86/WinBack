import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { captureRouteError } from "@/lib/sentry";
import Stripe from "stripe";

export const POST = withStripeAuth(async (_request, { identity }) => {
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
    const disputes = await listDisputes(accountId, {
      limit: 100,
      expand: ["data.charge.customer"],
    });

    const normalized = disputes.map(normalizeDispute);

    return NextResponse.json({ data: normalized });
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
