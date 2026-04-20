/**
 * Dev-only: prep 7 test disputes for WIN-27 QA.
 *
 * - Retargets each dispute to a specific playbook (except du_1TN5Oi which
 *   stays native visa/10.4 for the real Submit test).
 * - Clears narrative_text, checklist_notes, narrative_generations rows,
 *   generation count on every retargeted row.
 * - Nulls viewed_at on one dispute (new-badge QA).
 * - Backdates one response_deadline to 3 days out (urgent tier QA).
 * - Forward-dates one response_deadline to 20 days out (calm tier QA).
 *
 * Usage:
 *   set -a && source .env.local && set +a && \
 *     npx tsx scripts/qa-prep-win-27.ts
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
if (process.env.NODE_ENV === "production") {
  console.error("Refusing to run with NODE_ENV=production.");
  process.exit(1);
}

const s = createClient(supabaseUrl, supabaseKey);

type Target = {
  du: string;
  network: "visa" | "mastercard";
  code: string;
  role: string;
};

const targets: Target[] = [
  { du: "du_1TN5OiEQYvM3XwRz0MRwmnN9", network: "visa", code: "10.4", role: "native (real submit)" },
  { du: "du_1TNnESEQYvM3XwRz35SZQEYY", network: "visa", code: "13.1", role: "retarget" },
  { du: "du_1TO9U0EQYvM3XwRzRBqogiOf", network: "visa", code: "13.2", role: "retarget + calm tier (deadline 20d)" },
  { du: "du_1TO9TwEQYvM3XwRzgpMUWDAt", network: "visa", code: "13.3", role: "retarget" },
  { du: "du_1TO9TrEQYvM3XwRzzRMLRRDa", network: "visa", code: "13.6", role: "retarget + urgent tier (deadline 3d)" },
  { du: "du_1TO9TmEQYvM3XwRzWoTAePpg", network: "mastercard", code: "4808", role: "retarget" },
  { du: "du_1TO9YNEQYvM3XwRzOpvJ1HHU", network: "mastercard", code: "4853", role: "retarget + new-badge (viewed_at=null)" },
];

const URGENT_DUE = "2026-04-22T23:59:59+00:00"; // 3 days from 2026-04-19
const CALM_DUE = "2026-05-09T23:59:59+00:00"; // 20 days from 2026-04-19

async function main() {
  for (const t of targets) {
    const { data: row, error: lookupErr } = await s
      .from("disputes")
      .select("id, stripe_dispute_id, network, reason_code")
      .eq("stripe_dispute_id", t.du)
      .single();

    if (lookupErr || !row) {
      console.error(`[${t.du}] NOT FOUND in disputes table. Open it in the app first. Skipping.`);
      continue;
    }

    const updates: Record<string, unknown> = {
      network: t.network,
      reason_code: t.code,
      narrative_text: null,
      checklist_notes: {},
      narrative_generations_count: 0,
    };

    if (t.du === "du_1TO9YNEQYvM3XwRzOpvJ1HHU") {
      updates.viewed_at = null;
    }
    if (t.du === "du_1TO9TrEQYvM3XwRzzRMLRRDa") {
      updates.response_deadline = URGENT_DUE;
    }
    if (t.du === "du_1TO9U0EQYvM3XwRzRBqogiOf") {
      updates.response_deadline = CALM_DUE;
    }

    const { error: updErr } = await s
      .from("disputes")
      .update(updates)
      .eq("id", row.id);

    if (updErr) {
      console.error(`[${t.du}] update failed: ${updErr.message}`);
      continue;
    }

    const { error: genErr } = await s
      .from("narrative_generations")
      .delete()
      .eq("dispute_id", row.id);

    if (genErr) {
      console.warn(`[${t.du}] warn: narrative_generations cleanup: ${genErr.message}`);
    }

    const extras: string[] = [];
    if (updates.viewed_at === null) extras.push("viewed_at=null");
    if (updates.response_deadline === URGENT_DUE) extras.push(`deadline=${URGENT_DUE} (urgent)`);
    if (updates.response_deadline === CALM_DUE) extras.push(`deadline=${CALM_DUE} (calm)`);

    console.log(
      `OK ${t.du} -> ${t.network}/${t.code} [${t.role}]${extras.length ? " | " + extras.join(", ") : ""}`,
    );
  }

  console.log("\nDone. Refresh WinBack to see the updated fixtures.");
}

main().catch((err) => {
  console.error("Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
