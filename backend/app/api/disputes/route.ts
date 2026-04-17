import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { captureRouteError } from "@/lib/sentry";
import Stripe from "stripe";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;

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
