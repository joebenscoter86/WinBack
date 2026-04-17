import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { getDisputeForAccount } from "@/lib/disputes";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const segments = request.nextUrl.pathname.split("/");
  const disputeId = segments[segments.indexOf("disputes") + 1];
  const fileId = segments[segments.indexOf("evidence-files") + 1];

  if (!disputeId || !fileId) {
    return NextResponse.json(
      { error: "Missing dispute ID or file ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  await ensureMerchant(accountId, userId);

  // Merchant-scoped dispute lookup (WIN-42)
  const { data: dispute } = await getDisputeForAccount<{ id: string }>(
    disputeId,
    accountId,
    "id",
  );

  if (!dispute) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Delete the evidence file and verify a row was removed
  const { error: deleteError } = await supabase
    .from("evidence_files")
    .delete()
    .eq("id", fileId)
    .eq("dispute_id", dispute.id)
    .select("id")
    .single();

  if (deleteError) {
    if (deleteError.code === "PGRST116") {
      return NextResponse.json(
        { error: "Evidence file not found", code: "not_found" },
        { status: 404 },
      );
    }
    console.error("Failed to delete evidence file:", deleteError);
    return NextResponse.json(
      { error: "Failed to delete evidence file", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
});
