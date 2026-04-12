import { supabase } from "@/lib/supabase";
import { runBackgroundGeneration } from "@/lib/narratives/generate-background";

const STRIPE_DISPUTE_ID = "du_1TIx1JEQYvM3XwRzZDZKVVcb";
const STRIPE_ACCOUNT_ID =
  process.env.SMOKE_STRIPE_ACCOUNT_ID ?? "acct_1TCiQ5EGBKy2j9aE";

async function main() {
  console.log("ANTHROPIC_API_KEY present:", !!process.env.ANTHROPIC_API_KEY);

  const { data: dispute, error: dErr } = await supabase
    .from("disputes")
    .select("id, reason_code, network, narrative_generations_count")
    .eq("stripe_dispute_id", STRIPE_DISPUTE_ID)
    .single();
  if (dErr || !dispute) throw new Error(`dispute lookup failed: ${dErr?.message}`);
  console.log("dispute:", dispute);

  await supabase
    .from("disputes")
    .update({ narrative_generations_count: 0, narrative_text: null })
    .eq("id", dispute.id);

  const { data: gen, error: gErr } = await supabase
    .from("narrative_generations")
    .insert({
      dispute_id: dispute.id,
      status: "pending",
      generation_number: 1,
      merchant_feedback: null,
    })
    .select("id")
    .single();
  if (gErr || !gen) throw new Error(`generation insert failed: ${gErr?.message}`);
  console.log("created generation:", gen.id);

  console.log("running background generation...");
  const t0 = Date.now();
  await runBackgroundGeneration({
    generationId: gen.id,
    accountId: STRIPE_ACCOUNT_ID,
    disputeId: dispute.id,
    stripeDisputeId: STRIPE_DISPUTE_ID,
    reasonCode: dispute.reason_code,
    network: dispute.network,
  });
  console.log(`finished in ${Date.now() - t0}ms`);

  const { data: final } = await supabase
    .from("narrative_generations")
    .select("status, error, narrative_output")
    .eq("id", gen.id)
    .single();
  console.log("final status:", final?.status);
  if (final?.error) console.log("error:", final.error);
  if (final?.narrative_output) {
    const out = final.narrative_output as { narrative?: string };
    console.log("narrative (first 500 chars):", out.narrative?.slice(0, 500));
  }
}

main().catch((err) => {
  console.error("smoke test failed:", err);
  process.exit(1);
});
