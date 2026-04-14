import type { EvidenceChecklistItem } from "./types";

export class PlaybookInvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlaybookInvariantError";
  }
}

/**
 * Enforces the A/T/Slot invariant: every checklist item MUST have exactly one
 * of stripe_field, narrative_only=true, or stripe_evidence_field set. Throws
 * PlaybookInvariantError naming the playbook and offending item on violation.
 */
export function validatePlaybookChecklist(
  playbookKey: string,
  checklist: EvidenceChecklistItem[],
): void {
  for (const item of checklist) {
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
