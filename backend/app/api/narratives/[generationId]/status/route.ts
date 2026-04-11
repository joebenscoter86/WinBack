import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { supabase } from "@/lib/supabase";

type NarrativeOutput = {
  narrative: string;
  annotations: Array<{ section: string; reasoning: string }>;
};

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId } = identity;

  // 1. Extract generationId from URL path: find the segment before "status"
  const segments = request.nextUrl.pathname.split("/");
  const statusIndex = segments.indexOf("status");
  const generationId = statusIndex > 0 ? segments[statusIndex - 1] : null;

  if (!generationId) {
    return NextResponse.json(
      { error: "Missing generation ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  // 2. Fetch the generation record
  const { data: generation, error: generationError } = await supabase
    .from("narrative_generations")
    .select("id, status, dispute_id, narrative_output, error")
    .eq("id", generationId)
    .single();

  if (generationError || !generation) {
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  // 3. Verify merchant ownership -- look up merchant by Stripe account ID
  const { data: merchant, error: merchantError } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .single();

  if (merchantError || !merchant) {
    // Don't leak existence -- return same 404
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  // 4. Verify the dispute belongs to this merchant
  const { data: dispute, error: disputeError } = await supabase
    .from("disputes")
    .select("id")
    .eq("id", (generation as { dispute_id: string }).dispute_id)
    .eq("merchant_id", merchant.id)
    .single();

  if (disputeError || !dispute) {
    // Don't leak existence -- return same 404
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  // 5. Return based on status
  const gen = generation as {
    id: string;
    status: string;
    dispute_id: string;
    narrative_output: NarrativeOutput | null;
    error: string | null;
  };

  if (gen.status === "pending") {
    return NextResponse.json({ status: "pending" });
  }

  if (gen.status === "completed") {
    const output = gen.narrative_output as NarrativeOutput;
    return NextResponse.json({
      status: "completed",
      narrative: output.narrative,
      annotations: output.annotations,
    });
  }

  if (gen.status === "failed") {
    return NextResponse.json({
      status: "failed",
      error: gen.error ?? "Generation failed unexpectedly. Please try again.",
    });
  }

  // Fallback for any other status value
  return NextResponse.json({ status: gen.status });
});
