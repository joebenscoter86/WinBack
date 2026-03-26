import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";

export const POST = withStripeAuth(async (_request, { identity }) => {
  return NextResponse.json({
    ok: true,
    userId: identity.userId,
    accountId: identity.accountId,
  });
});
