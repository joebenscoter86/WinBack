import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
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

    // WIN-26: attach is_new so the list can badge unseen disputes. A dispute
    // is "new" when the webhook has inserted a row but the merchant hasn't
    // opened it in WinBack yet (viewed_at IS NULL). Disputes not yet in the
    // DB (pre-webhook race) default to is_new=false -- safer to under-badge
    // than to badge every dispute on a cold start.
    const unseenIds = new Set<string>();
    if (normalized.length > 0) {
      const { data: merchantRow } = await supabase
        .from("merchants")
        .select("id")
        .eq("stripe_account_id", accountId)
        .maybeSingle();
      const merchantId = (merchantRow as { id: string } | null)?.id;
      const { data: viewRows } = merchantId
        ? await supabase
            .from("disputes")
            .select("stripe_dispute_id, viewed_at")
            .eq("merchant_id", merchantId)
            .in(
              "stripe_dispute_id",
              normalized.map((d) => d.id),
            )
        : { data: null };
      for (const row of (viewRows ?? []) as {
        stripe_dispute_id: string;
        viewed_at: string | null;
      }[]) {
        if (row.viewed_at === null) unseenIds.add(row.stripe_dispute_id);
      }
    }

    const withNewFlag = normalized.map((d) => ({
      ...d,
      is_new: unseenIds.has(d.id),
    }));

    return NextResponse.json({ data: withNewFlag });
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
