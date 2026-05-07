import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import {
  listDisputes,
  normalizeDispute,
  classifyStripeError,
} from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

type SupportedObject = "charge" | "payment_intent";

function isSupportedObject(value: unknown): value is SupportedObject {
  return value === "charge" || value === "payment_intent";
}

export const POST = withStripeAuth(async (_request, { identity, body, livemode }) => {
  const { accountId, userId } = identity;

  const { id: rawId, object: rawObject } = body as {
    id?: unknown;
    object?: unknown;
  };
  const id = typeof rawId === "string" ? rawId : null;
  const object = isSupportedObject(rawObject) ? rawObject : null;

  if (!id || !object) {
    return NextResponse.json(
      {
        error:
          "Missing or unsupported payment object. Expected { id, object: 'charge' | 'payment_intent' }.",
        code: "invalid_request",
      },
      { status: 400 },
    );
  }

  await ensureMerchant(accountId, userId);

  const filter: Stripe.DisputeListParams =
    object === "charge"
      ? { charge: id, limit: 1, expand: ["data.charge.customer"] }
      : { payment_intent: id, limit: 1, expand: ["data.charge.customer"] };

  try {
    const disputes = await listDisputes(livemode, accountId, filter);

    if (disputes.length === 0) {
      return NextResponse.json(
        { error: "No dispute found for this payment", code: "not_found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: normalizeDispute(disputes[0]) });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error looking up dispute by payment object:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
