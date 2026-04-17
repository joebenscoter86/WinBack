import { describe, it, expect } from "vitest";
import { TEMPLATES } from "../templates";
import { ALL_PLAYBOOKS } from "@/lib/playbooks/data";

/**
 * WIN-50: enforce that every playbook checklist item's stable `key` appears in
 * at least one template section's `evidence_keys` — OR is listed as an
 * intentional exclusion below with a reason.
 *
 * Without this check, a playbook can add a new item and the LLM silently won't
 * know which narrative section should reference files uploaded under that key.
 * The file still appears in the prompt's "MERCHANT-UPLOADED EVIDENCE" list, but
 * it doesn't get attached to a named section — so the narrative may ignore it.
 */

// Keys that are intentionally not mapped to any section's evidence_keys. Each
// entry must have a short reason explaining why the playbook item doesn't
// belong in any narrative section. Review before adding.
const INTENTIONAL_EXCLUSIONS: Record<string, string> = {
  // (none currently)
};

describe("prompt template / playbook coverage (WIN-50)", () => {
  for (const playbook of ALL_PLAYBOOKS) {
    const templateKey = `${playbook.network}:${playbook.reason_code}`;
    const template = TEMPLATES.find(
      (t) => t.network === playbook.network && t.reason_code === playbook.reason_code,
    );

    it(`every playbook key for ${templateKey} is covered by a template section (or intentionally excluded)`, () => {
      expect(template, `no template registered for ${templateKey}`).toBeDefined();
      if (!template) return;

      const coveredKeys = new Set<string>();
      for (const section of template.sections) {
        for (const key of section.evidence_keys) {
          coveredKeys.add(key);
        }
      }

      const gaps: string[] = [];
      for (const item of playbook.evidence_checklist) {
        if (coveredKeys.has(item.key)) continue;
        if (INTENTIONAL_EXCLUSIONS[item.key]) continue;
        gaps.push(item.key);
      }

      expect(
        gaps,
        `Playbook keys not mapped to any template section in ${templateKey}: ${gaps.join(", ")}. ` +
          `Either add each key to an existing section's evidence_keys, or add it to INTENTIONAL_EXCLUSIONS with a reason.`,
      ).toEqual([]);
    });

    it(`every template evidence_key for ${templateKey} exists in the playbook`, () => {
      if (!template) return;
      const playbookKeys = new Set(playbook.evidence_checklist.map((i) => i.key));
      const stray: { section: string; key: string }[] = [];
      for (const section of template.sections) {
        for (const key of section.evidence_keys) {
          if (!playbookKeys.has(key)) {
            stray.push({ section: section.name, key });
          }
        }
      }
      expect(
        stray,
        `Template references evidence_keys that don't exist in the playbook: ${stray
          .map((s) => `${s.section} → ${s.key}`)
          .join(", ")}`,
      ).toEqual([]);
    });
  }
});
