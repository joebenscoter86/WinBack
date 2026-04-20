import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

async function main() {
  const du = process.argv[2];
  if (!du) {
    console.error("Usage: npx tsx scripts/qa-inspect-submitted.ts <du_xxx>");
    process.exit(1);
  }

  const s = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { data: disp, error } = await s
    .from("disputes")
    .select("*")
    .eq("stripe_dispute_id", du)
    .single();
  if (error || !disp) {
    console.error("Dispute not in DB:", error?.message);
    process.exit(1);
  }

  console.log("=== DB: DISPUTE ROW ===");
  console.log({
    id: disp.id,
    stripe_dispute_id: disp.stripe_dispute_id,
    stripe_charge_id: disp.stripe_charge_id,
    network: disp.network,
    reason_code: disp.reason_code,
    amount: disp.amount,
    currency: disp.currency,
    status: disp.status,
    response_deadline: disp.response_deadline,
    evidence_submitted_at: disp.evidence_submitted_at,
    narrative_generations_count: disp.narrative_generations_count,
    narrative_text_len: disp.narrative_text?.length ?? 0,
  });

  const { data: files } = await s
    .from("evidence_files")
    .select("id, checklist_item_key, stripe_evidence_field, filename, mime_type, size_bytes, stripe_file_id, created_at")
    .eq("dispute_id", disp.id)
    .order("created_at");
  console.log("\n=== DB: EVIDENCE FILES ===");
  console.table(files);

  const { data: gens } = await s
    .from("narrative_generations")
    .select("id, created_at, model, prompt_version, regenerate_feedback_chips, regenerate_feedback_note")
    .eq("dispute_id", disp.id)
    .order("created_at");
  console.log("\n=== DB: NARRATIVE GENERATIONS ===");
  console.table(gens);

  console.log("\n=== STRIPE: DISPUTE (live) ===");
  const stripeDispute = await stripe.disputes.retrieve(du);
  console.log({
    id: stripeDispute.id,
    amount: stripeDispute.amount,
    currency: stripeDispute.currency,
    reason: stripeDispute.reason,
    status: stripeDispute.status,
    is_charge_refundable: stripeDispute.is_charge_refundable,
    evidence_due_by: stripeDispute.evidence_details?.due_by
      ? new Date(stripeDispute.evidence_details.due_by * 1000).toISOString()
      : null,
    has_evidence: stripeDispute.evidence_details?.has_evidence,
    past_due: stripeDispute.evidence_details?.past_due,
    submission_count: stripeDispute.evidence_details?.submission_count,
  });

  console.log("\n=== STRIPE: EVIDENCE PAYLOAD SUBMITTED ===");
  const ev = stripeDispute.evidence as Record<string, unknown>;
  const populated: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(ev)) {
    if (v === null || v === "" || v === undefined) continue;
    populated[k] = v;
  }
  console.log(JSON.stringify(populated, null, 2));

  console.log("\n=== FIELD-BY-FIELD COUNTS ===");
  const allEvFields = Object.keys(ev);
  console.log(`Total evidence fields on Stripe dispute: ${allEvFields.length}`);
  console.log(`Populated (non-null, non-empty):         ${Object.keys(populated).length}`);
  console.log(`Empty / null:                            ${allEvFields.length - Object.keys(populated).length}`);

  const fileFields = Object.entries(ev).filter(
    ([k, v]) => typeof v === "string" && v.startsWith("file_"),
  );
  console.log(`File references attached:                ${fileFields.length}`);
  for (const [k, v] of fileFields) {
    console.log(`  ${k} -> ${v}`);
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
