import type { EvidenceChecklistItem } from "./types";

export class PlaybookInvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlaybookInvariantError";
  }
}

/**
 * Enforces invariants on every checklist item:
 *   - key is non-empty (including after trim) and unique within the playbook. (WIN-40)
 *   - Exactly one of stripe_field, narrative_only, or stripe_evidence_field
 *     is set (the A/T/Slot invariant).
 * Throws PlaybookInvariantError naming the playbook and offending item on violation.
 */
export function validatePlaybookChecklist(
  playbookKey: string,
  checklist: EvidenceChecklistItem[],
): void {
  const seenKeys = new Set<string>();
  for (const item of checklist) {
    if (!item.key || item.key.trim().length === 0) {
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} item "${item.item}" has an empty key. Every checklist item must have a non-empty stable key.`,
      );
    }
    if (seenKeys.has(item.key)) {
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} has duplicate checklist key "${item.key}" (on item "${item.item}"). Keys must be unique within a playbook.`,
      );
    }
    seenKeys.add(item.key);

    const flags = [
      Boolean(item.stripe_field),
      Boolean(item.narrative_only),
      Boolean(item.stripe_evidence_field),
    ];
    const count = flags.filter(Boolean).length;
    if (count !== 1) {
      const present = [
        item.stripe_field ? "stripe_field" : null,
        item.narrative_only ? "narrative_only" : null,
        item.stripe_evidence_field ? "stripe_evidence_field" : null,
      ].filter(Boolean);
      const detail = present.length === 0 ? "none set" : `set: ${present.join(", ")}`;
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} item "${item.item}" violates A/T/Slot invariant (${detail}). Exactly one of stripe_field, narrative_only, or stripe_evidence_field must be set.`,
      );
    }
  }
}
