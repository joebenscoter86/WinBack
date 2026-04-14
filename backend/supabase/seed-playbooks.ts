import { createClient } from "@supabase/supabase-js";
import { ALL_PLAYBOOKS } from "../lib/playbooks/data";
import { validatePlaybookChecklist } from "../lib/playbooks/validate";

async function seed() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key);

  console.log(`Seeding ${ALL_PLAYBOOKS.length} playbooks...`);

  for (const playbook of ALL_PLAYBOOKS) {
    const key = `${playbook.network}-${playbook.reason_code}`;
    validatePlaybookChecklist(key, playbook.evidence_checklist);

    const row = {
      network: playbook.network,
      reason_code: playbook.reason_code,
      display_name: playbook.display_name,
      category: playbook.category,
      legacy_code: playbook.legacy_code,
      description: playbook.description,
      coach_headline: playbook.coach_headline,
      coach_summary: playbook.coach_summary,
      coach_issuer_summary: playbook.coach_issuer_summary,
      coach_acquirer_summary: playbook.coach_acquirer_summary,
      issuer_evaluation: playbook.issuer_evaluation,
      acquirer_prereview: playbook.acquirer_prereview,
      evidence_checklist: playbook.evidence_checklist,
      common_mistakes: playbook.common_mistakes,
      pro_tips: playbook.pro_tips,
      urgency_essentials: playbook.urgency_essentials,
      narrative_template: playbook.narrative_template,
      response_deadline_days: playbook.response_deadline_days,
      filing_window_days: playbook.filing_window_days,
      key_differences: playbook.key_differences,
    };

    const { error } = await supabase
      .from("playbooks")
      .upsert(row, { onConflict: "network,reason_code" });

    if (error) {
      console.error(
        `Failed to seed ${playbook.network} ${playbook.reason_code}:`,
        error.message,
      );
      process.exit(1);
    }

    console.log(`  Seeded: ${playbook.network} ${playbook.reason_code} -- ${playbook.display_name}`);
  }

  console.log("Done. All playbooks seeded successfully.");
}

seed();
