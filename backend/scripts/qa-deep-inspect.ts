import { createClient } from "@supabase/supabase-js";

async function main() {
  const du = process.argv[2];
  const s = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: disp } = await s
    .from("disputes")
    .select("id")
    .eq("stripe_dispute_id", du)
    .single();
  if (!disp) throw new Error("dispute not found");

  // Evidence files - try both columns
  const ef1 = await s
    .from("evidence_files")
    .select("*")
    .eq("dispute_id", disp.id);
  console.log("=== evidence_files WHERE dispute_id= ===");
  console.log("rows:", ef1.data?.length ?? 0, "err:", ef1.error?.message ?? "none");
  if (ef1.data?.length) console.table(ef1.data);

  const ef2 = await s.from("evidence_files").select("*").limit(10);
  console.log("\n=== evidence_files any recent rows ===");
  console.log("total sampled:", ef2.data?.length ?? 0);
  if (ef2.data?.length) console.table(ef2.data);

  // Narrative generations
  const ng1 = await s
    .from("narrative_generations")
    .select("*")
    .eq("dispute_id", disp.id);
  console.log("\n=== narrative_generations WHERE dispute_id= ===");
  console.log("rows:", ng1.data?.length ?? 0, "err:", ng1.error?.message ?? "none");
  if (ng1.data?.length) console.log(JSON.stringify(ng1.data, null, 2));

  const ng2 = await s.from("narrative_generations").select("*").limit(10);
  console.log("\n=== narrative_generations any recent rows ===");
  console.log("total sampled:", ng2.data?.length ?? 0);
  if (ng2.data?.length) console.log(JSON.stringify(ng2.data, null, 2));

  // Full dispute row for narrative_text
  const { data: full } = await s
    .from("disputes")
    .select("narrative_text")
    .eq("id", disp.id)
    .single();
  console.log("\n=== narrative_text (first 400 chars) ===");
  console.log((full?.narrative_text ?? "").slice(0, 400));
}

main().catch((e) => { console.error(e); process.exit(1); });
