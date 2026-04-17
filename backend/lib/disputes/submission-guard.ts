import type Stripe from "stripe";
import type { PlaybookData } from "../playbooks/types";
import type { SubmissionWarning } from "./types";
import { SUBMITTABLE_STATUSES } from "./expired-guard";

export interface GuardInput {
  stripeDispute: Stripe.Dispute;
  playbook: PlaybookData;
  evidenceFiles: Array<{ checklist_item_key: string }>;
  narrativeText: string | null;
}

export interface GuardResult {
  action: "allow" | "block";
  blockCode?: "dispute_not_submittable" | "validation_failed";
  blockMessage?: string;
  warnings: SubmissionWarning[];
}

export function evaluateSubmissionGuard(input: GuardInput): GuardResult {
  const { stripeDispute, playbook, evidenceFiles, narrativeText } = input;
  const warnings: SubmissionWarning[] = [];

  if (!SUBMITTABLE_STATUSES.has(stripeDispute.status)) {
    return {
      action: "block",
      blockCode: "dispute_not_submittable",
      blockMessage: `This dispute is no longer accepting evidence. Current status: ${stripeDispute.status}.`,
      warnings: [],
    };
  }

  const hasFiles = evidenceFiles.length > 0;
  const hasNarrative = Boolean(narrativeText && narrativeText.trim().length > 0);
  if (!hasFiles && !hasNarrative) {
    return {
      action: "block",
      blockCode: "validation_failed",
      blockMessage: "Add at least one piece of evidence or a narrative before submitting.",
      warnings: [],
    };
  }

  const dueBy = stripeDispute.evidence_details?.due_by;
  if (dueBy && dueBy * 1000 < Date.now()) {
    warnings.push({ code: "deadline_passed", due_by: dueBy });
  }

  const filedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));
  const missingMandatory = playbook.evidence_checklist
    .filter((i) => i.category === "mandatory")
    .filter((i) => !i.narrative_only)
    .filter((i) => !i.stripe_field)
    .filter((i) => !filedKeys.has(i.key))
    .map((i) => i.item);
  if (missingMandatory.length > 0) {
    warnings.push({ code: "missing_mandatory_items", items: missingMandatory });
  }

  return { action: "allow", warnings };
}
