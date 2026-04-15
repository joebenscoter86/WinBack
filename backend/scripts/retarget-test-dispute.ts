/**
 * Dev-only QA helper: retargets a test dispute row in Supabase to a different
 * playbook by rewriting `disputes.network` and `disputes.reason_code`. The
 * underlying Stripe dispute object is unchanged, so the final Submit button
 * will fail (its evidence fields won't match the rewritten reason) -- every
 * step up to and including narrative generation works correctly because the
 * app reads the playbook match from local DB, not from Stripe.
 *
 * Use this to QA the full 5-playbook matrix against a single real Stripe
 * test dispute (only fraud is available via test tokens).
 *
 * Usage:
 *   set -a && source .env.local && set +a && \
 *     npx tsx scripts/retarget-test-dispute.ts du_1TMLgLEQYvM3XwRzpU30VWxm visa 13.2
 *
 * Supported playbooks: visa/13.1, visa/13.2, visa/13.3, visa/13.6, visa/10.4,
 * mastercard/4808, mastercard/4853.
 */

import { createClient } from "@supabase/supabase-js";

// Guard: never run against production. Supabase URL for dev will contain
// the dev project ref; bailing on anything that looks like a prod host.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}

if (process.env.NODE_ENV === "production") {
  console.error("This script must NEVER run against production. Exiting.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const VALID_PLAYBOOKS: Record<string, string[]> = {
  visa: ["10.4", "13.1", "13.2", "13.3", "13.6"],
  mastercard: ["4808", "4853"],
};

function parseArgs(): { disputeId: string; network: string; reasonCode: string } {
  const [disputeId, network, reasonCode] = process.argv.slice(2);
  if (!disputeId || !network || !reasonCode) {
    console.error(
      "Usage: npx tsx scripts/retarget-test-dispute.ts <du_xxx> <network> <reason_code>",
    );
    console.error("Example: npx tsx scripts/retarget-test-dispute.ts du_1TMLgLEQYvM3XwRzpU30VWxm visa 13.2");
    process.exit(1);
  }
  if (!disputeId.startsWith("du_")) {
    console.error(`First arg must be a Stripe dispute ID (du_xxx). Got: ${disputeId}`);
    process.exit(1);
  }
  if (!VALID_PLAYBOOKS[network]?.includes(reasonCode)) {
    const all = Object.entries(VALID_PLAYBOOKS)
      .flatMap(([n, codes]) => codes.map((c) => `${n}/${c}`))
      .join(", ");
    console.error(`Invalid playbook "${network}/${reasonCode}". Options: ${all}`);
    process.exit(1);
  }
  return { disputeId, network, reasonCode };
}

async function main() {
  const { disputeId, network, reasonCode } = parseArgs();

  console.log(`Retargeting ${disputeId} -> ${network} ${reasonCode}...`);

  const { data: existing, error: lookupErr } = await supabase
    .from("disputes")
    .select("id, stripe_dispute_id, network, reason_code, narrative_text, checklist_notes, narrative_generations_count")
    .eq("stripe_dispute_id", disputeId)
    .single();

  if (lookupErr || !existing) {
    console.error(`Dispute not found in local DB: ${lookupErr?.message ?? "no row"}`);
    console.error("Open the dispute in WinBack first to populate the local row, then re-run.");
    process.exit(1);
  }

  const row = existing as {
    id: string;
    stripe_dispute_id: string;
    network: string | null;
    reason_code: string;
    narrative_text: string | null;
    checklist_notes: Record<string, string> | null;
    narrative_generations_count: number | null;
  };

  console.log(`Current: network=${row.network} reason_code=${row.reason_code}`);

  // Wipe narrative + notes + generation count so the next QA pass starts fresh
  // against the new playbook instead of seeing leftover content from the old
  // one. This is the usual expectation when retargeting for QA.
  const { error: updateErr } = await supabase
    .from("disputes")
    .update({
      network,
      reason_code: reasonCode,
      narrative_text: null,
      checklist_notes: {},
      narrative_generations_count: 0,
    })
    .eq("id", row.id);

  if (updateErr) {
    console.error(`Failed to update dispute row: ${updateErr.message}`);
    process.exit(1);
  }

  // Also clear any narrative_generations rows so the next generate call
  // isn't bounded by stale count or pulls in a cached narrative.
  const { error: genErr } = await supabase
    .from("narrative_generations")
    .delete()
    .eq("dispute_id", row.id);

  if (genErr) {
    console.error(`Warning: failed to clear narrative_generations: ${genErr.message}`);
  }

  console.log(`\n=== RETARGETED ===`);
  console.log(`  stripe_dispute_id: ${row.stripe_dispute_id}`);
  console.log(`  network:           ${network}`);
  console.log(`  reason_code:       ${reasonCode}`);
  console.log(`  narrative_text:    cleared`);
  console.log(`  checklist_notes:   cleared`);
  console.log(`  generation count:  reset to 0`);
  console.log(`\nRefresh WinBack and re-open this dispute to QA the ${network}/${reasonCode} playbook.`);
  console.log(`Note: the Submit button will fail -- Stripe still sees this as fraud.`);
}

main().catch((err) => {
  console.error("Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
