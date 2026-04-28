import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { computeInsights, type DisputeRow } from "@/lib/insights/aggregate";
import { captureRouteError } from "@/lib/sentry";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;

  await ensureMerchant(accountId, userId);

  const { data: merchantRow, error: merchantErr } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (merchantErr) {
    captureRouteError(merchantErr, { route: "insights.merchant_lookup" });
    return NextResponse.json(
      { error: "Failed to load insights", code: "internal_error" },
      { status: 500 },
    );
  }

  const merchantId = (merchantRow as { id: string } | null)?.id;
  if (!merchantId) {
    return NextResponse.json({
      overall: { won: 0, lost: 0, total_resolved: 0, total_disputes: 0, win_rate: null },
      by_reason: [],
      patterns: [],
    });
  }

  const { data: disputes, error: disputesErr } = await supabase
    .from("disputes")
    .select("status, reason_code, created_at")
    .eq("merchant_id", merchantId);

  if (disputesErr) {
    captureRouteError(disputesErr, { route: "insights.disputes_query" });
    return NextResponse.json(
      { error: "Failed to load insights", code: "internal_error" },
      { status: 500 },
    );
  }

  const result = computeInsights((disputes ?? []) as DisputeRow[]);
  return NextResponse.json(result);
});
