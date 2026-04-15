import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { getDispute } from "@/lib/stripe";
import {
  disputeExpiredResponse,
  isDisputeSubmittable,
} from "@/lib/disputes/expired-guard";

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
  { identity, body },
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

  const { checklist_item_key, stripe_file_id, file_name, file_size, mime_type } = body as {
    checklist_item_key?: string;
    stripe_file_id?: string;
    file_name?: string;
    file_size?: number;
    mime_type?: string;
  };

  ensureMerchant(accountId, userId);

  // If no file fields provided, treat as a list request
  if (!checklist_item_key && !stripe_file_id && !file_name) {
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
  }

  // Otherwise, this is an upsert -- validate required fields
  if (!checklist_item_key || !stripe_file_id || !file_name) {
    return NextResponse.json(
      { error: "Missing required fields: checklist_item_key, stripe_file_id, file_name", code: "invalid_request" },
      { status: 400 },
    );
  }

  // Look up the dispute row. The dispute MUST already exist -- the Review tab
  // calls GET /api/disputes/{id} first, which fetches from Stripe and inserts
  // the real reason_code/amount. If it doesn't exist yet, fail loudly instead
  // of inserting a zombie row with zero values (WIN-41).
  const { data: existing, error: lookupError } = await supabase
    .from("disputes")
    .select("id")
    .eq("stripe_dispute_id", disputeId)
    .single();

  if (lookupError || !existing) {
    return NextResponse.json(
      {
        error:
          "Dispute not loaded. Fetch GET /api/disputes/{id} before uploading evidence.",
        code: "dispute_not_loaded",
      },
      { status: 409 },
    );
  }

  const disputeRow = existing;

  // Expired/closed guard (WIN-48)
  try {
    const stripeDispute = await getDispute(accountId, disputeId);
    if (!isDisputeSubmittable(stripeDispute)) {
      return disputeExpiredResponse(stripeDispute);
    }
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message, code: "stripe_error" },
        { status: err.statusCode ?? 502 },
      );
    }
    console.error("[WIN-48] Failed to fetch dispute for expiry check:", err);
    return NextResponse.json(
      { error: "Failed to verify dispute status", code: "internal_error" },
      { status: 500 },
    );
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
