import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getPlaybook } from "@/lib/playbooks";
import { ensureMerchant } from "@/lib/merchants";

export const POST = withStripeAuth(async (_request, { identity, body }) => {
  const { accountId, userId } = identity;
  const { network, reason_code } = body as { network?: string; reason_code?: string };

  if (!network || !reason_code) {
    return NextResponse.json(
      { error: "Missing network or reason_code", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  try {
    const playbook = await getPlaybook(network, reason_code);

    if (!playbook) {
      return NextResponse.json(
        { error: "Playbook not found", code: "not_found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: playbook });
  } catch (err) {
    console.error("Error fetching playbook:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
