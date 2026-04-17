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

  // 2. Fetch the generation row joined to its dispute and the dispute's
  // merchant -- scope to the authenticated Stripe account in a single
  // query. If any of the three conditions fail (generation missing,
  // dispute mismatch, wrong merchant) we return the same 404 so we don't
  // leak which layer matched. (WIN-42 collapsed the prior 3-query chain.)
  const { data: generation, error: generationError } = await supabase
    .from("narrative_generations")
    .select(
      "id, status, dispute_id, narrative_output, error, disputes!inner(merchants!inner(stripe_account_id))",
    )
    .eq("id", generationId)
    .eq("disputes.merchants.stripe_account_id", accountId)
    .maybeSingle();

  if (generationError || !generation) {
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  // 3. Return based on status
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

  return NextResponse.json({ status: gen.status });
});
