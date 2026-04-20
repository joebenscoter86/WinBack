import { createClient } from "@supabase/supabase-js";

async function main() {
  const s = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const ids = process.argv.slice(2);
  if (ids.length === 0) {
    console.error("Pass dispute IDs as args");
    process.exit(1);
  }
  const { data, error } = await s
    .from("disputes")
    .select("stripe_dispute_id, network, reason_code, amount, currency, status, response_deadline, viewed_at, narrative_generations_count, created_at")
    .in("stripe_dispute_id", ids)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.table(data);
}

main();
