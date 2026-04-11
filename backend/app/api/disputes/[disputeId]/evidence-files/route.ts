import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";

export const GET = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const segments = request.nextUrl.pathname.split("/");
  const disputeId = segments[segments.indexOf("disputes") + 1];

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  // Look up the internal dispute UUID
  const { data: dispute, error: disputeError } = await supabase
    .from("disputes")
    .select("id")
    .eq("stripe_dispute_id", disputeId)
    .single();

  if (disputeError || !dispute) {
    return NextResponse.json({ data: [] });
  }

  const { data: files, error: filesError } = await supabase
    .from("evidence_files")
    .select("id, dispute_id, checklist_item_key, stripe_file_id, file_name, file_size, mime_type, uploaded_at")
    .eq("dispute_id", dispute.id);

  if (filesError) {
    console.error("Failed to fetch evidence files:", filesError);
    return NextResponse.json(
      { error: "Failed to fetch evidence files", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: files ?? [] });
});

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const segments = request.nextUrl.pathname.split("/");
  const disputeId = segments[segments.indexOf("disputes") + 1];

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  const body = JSON.parse(await request.clone().text());
  const { checklist_item_key, stripe_file_id, file_name, file_size, mime_type } = body;

  if (!checklist_item_key || !stripe_file_id || !file_name) {
    return NextResponse.json(
      { error: "Missing required fields: checklist_item_key, stripe_file_id, file_name", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  // Look up or create the dispute row
  let disputeRow: { id: string } | null = null;

  const { data: existing, error: lookupError } = await supabase
    .from("disputes")
    .select("id")
    .eq("stripe_dispute_id", disputeId)
    .single();

  if (lookupError || !existing) {
    // Dispute not found -- upsert it (same pattern as PATCH route)
    const { data: merchant } = await supabase
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", accountId)
      .single();

    const { data: inserted, error: insertError } = await supabase
      .from("disputes")
      .upsert(
        {
          stripe_dispute_id: disputeId,
          merchant_id: merchant?.id,
          amount: 0,
          reason_code: "",
        },
        { onConflict: "stripe_dispute_id" },
      )
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("Failed to upsert dispute:", insertError);
      return NextResponse.json(
        { error: "Failed to create dispute record", code: "db_error" },
        { status: 500 },
      );
    }

    disputeRow = inserted;
  } else {
    disputeRow = existing;
  }

  // Upsert the evidence file (one file per checklist item)
  const { data: file, error: fileError } = await supabase
    .from("evidence_files")
    .upsert(
      {
        dispute_id: disputeRow.id,
        checklist_item_key,
        stripe_file_id,
        file_name,
        file_size: file_size ?? null,
        mime_type: mime_type ?? null,
        file_path: stripe_file_id,
      },
      { onConflict: "dispute_id,checklist_item_key" },
    )
    .select()
    .single();

  if (fileError) {
    console.error("Failed to upsert evidence file:", fileError);
    return NextResponse.json(
      { error: "Failed to save evidence file", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: file });
});
