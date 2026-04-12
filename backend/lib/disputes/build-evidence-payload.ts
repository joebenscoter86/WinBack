import type Stripe from "stripe";
import type { PlaybookData, EvidenceChecklistItem } from "../playbooks/types";
import {
  type SubmissionWarning,
  UNCATEGORIZED_TEXT_MAX,
  COMBINED_TEXT_MAX,
} from "./types";

export interface EvidenceFileInput {
  checklist_item_key: string;
  stripe_file_id: string;
}

export interface BuildEvidenceInput {
  dispute: Stripe.Dispute;
  playbook: PlaybookData;
  evidenceFiles: EvidenceFileInput[];
  narrativeText: string | null;
  charge: Stripe.Charge;
}

export interface BuildEvidenceResult {
  evidence: Stripe.DisputeUpdateParams.Evidence;
  warnings: SubmissionWarning[];
}

function flattenAddress(
  addr: Stripe.Address | null | undefined,
): string | undefined {
  if (!addr) return undefined;
  const parts = [
    addr.line1,
    addr.line2,
    addr.city,
    addr.state,
    addr.postal_code,
    addr.country,
  ].filter((p): p is string => Boolean(p && p.trim()));
  return parts.length ? parts.join(", ") : undefined;
}

function setIfPresent<K extends keyof Stripe.DisputeUpdateParams.Evidence>(
  evidence: Stripe.DisputeUpdateParams.Evidence,
  key: K,
  value: Stripe.DisputeUpdateParams.Evidence[K] | null | undefined,
): void {
  if (value != null && value !== "") {
    evidence[key] = value;
  }
}

function totalTextLength(
  evidence: Stripe.DisputeUpdateParams.Evidence,
): number {
  let total = 0;
  for (const value of Object.values(evidence)) {
    if (typeof value === "string") total += value.length;
  }
  return total;
}

export function buildEvidencePayload(
  input: BuildEvidenceInput,
): BuildEvidenceResult {
  const { dispute, playbook, evidenceFiles, narrativeText, charge } = input;
  const evidence: Stripe.DisputeUpdateParams.Evidence = {};
  const warnings: SubmissionWarning[] = [];

  // 1. Auto-populated from charge billing details
  setIfPresent(
    evidence,
    "customer_name",
    charge.billing_details?.name ?? undefined,
  );
  setIfPresent(
    evidence,
    "customer_email_address",
    charge.billing_details?.email ?? undefined,
  );
  setIfPresent(
    evidence,
    "billing_address",
    flattenAddress(charge.billing_details?.address),
  );
  setIfPresent(
    evidence,
    "product_description",
    charge.description ?? undefined,
  );

  // 2. Narrative -> uncategorized_text (capped at 20k chars)
  if (narrativeText && narrativeText.length > 0) {
    if (narrativeText.length > UNCATEGORIZED_TEXT_MAX) {
      evidence.uncategorized_text = narrativeText.slice(0, UNCATEGORIZED_TEXT_MAX);
      warnings.push({
        code: "field_truncated",
        field: "uncategorized_text",
        original_length: narrativeText.length,
        truncated_length: UNCATEGORIZED_TEXT_MAX,
      });
    } else {
      evidence.uncategorized_text = narrativeText;
    }
  }

  // 3. File mapping with collision handling
  // Build a lookup map from checklist item name -> checklist item
  const itemByKey = new Map<string, EvidenceChecklistItem>();
  for (const item of playbook.evidence_checklist) {
    itemByKey.set(item.item, item);
  }

  // Sort files so lower urgency_order (more urgent) wins collisions; null = lowest priority
  const sortedFiles = [...evidenceFiles].sort((a, b) => {
    const ia = itemByKey.get(a.checklist_item_key);
    const ib = itemByKey.get(b.checklist_item_key);
    const oa = ia?.urgency_order ?? Number.MAX_SAFE_INTEGER;
    const ob = ib?.urgency_order ?? Number.MAX_SAFE_INTEGER;
    return oa - ob;
  });

  // Track which item name currently owns each field.
  const fieldOwner = new Map<string, string>(); // field -> winning item name
  // uncategorized_file is special: it can be claimed directly by a checklist
  // item OR used as a fallback for collision losers. Direct claims take
  // priority, so we do two passes: first place all direct field claims, then
  // route collision losers to uncategorized_file if it remains unclaimed.

  type PendingCollision = {
    file: EvidenceFileInput;
    item: EvidenceChecklistItem;
    field: string;
    winner: string;
  };
  const collisionLosers: PendingCollision[] = [];

  // Pass 1: each file claims its stripe_evidence_field directly.
  for (const file of sortedFiles) {
    const item = itemByKey.get(file.checklist_item_key);
    if (!item) continue; // orphan file, skip

    const field = item.stripe_evidence_field;

    if (!fieldOwner.has(field)) {
      (evidence as Record<string, unknown>)[field] = file.stripe_file_id;
      fieldOwner.set(field, item.item);
    } else {
      // Collision -- queue for second pass
      collisionLosers.push({
        file,
        item,
        field,
        winner: fieldOwner.get(field)!,
      });
    }
  }

  // Pass 2: collision losers try uncategorized_file. Direct claims on
  // uncategorized_file (settled in pass 1) take priority over fallbacks;
  // at most one loser can use it, additional losers are dropped.
  for (const { file, item, field, winner } of collisionLosers) {
    if (!fieldOwner.has("uncategorized_file")) {
      evidence.uncategorized_file = file.stripe_file_id;
      fieldOwner.set("uncategorized_file", item.item);
      warnings.push({
        code: "field_collision",
        winning_item: winner,
        losing_item: item.item,
        field,
        resolution: "uncategorized_file",
      });
    } else {
      warnings.push({
        code: "field_collision",
        winning_item: winner,
        losing_item: item.item,
        field,
        resolution: "dropped",
      });
    }
  }

  // 4. Visa CE 3.0 pass-through: copy dispute.evidence.enhanced_evidence for visa/10.4
  if (playbook.network === "visa" && playbook.reason_code === "10.4") {
    const enhanced = (
      dispute.evidence as { enhanced_evidence?: unknown }
    )?.enhanced_evidence;
    if (enhanced && typeof enhanced === "object") {
      (evidence as Record<string, unknown>).enhanced_evidence = enhanced;
    }
  }

  // 5. Combined text cap (150k) -- truncate uncategorized_text first if over limit
  if (totalTextLength(evidence) > COMBINED_TEXT_MAX) {
    const overBy = totalTextLength(evidence) - COMBINED_TEXT_MAX;
    const original = evidence.uncategorized_text ?? "";
    if (original.length >= overBy) {
      const newLen = original.length - overBy;
      evidence.uncategorized_text = original.slice(0, newLen);
      warnings.push({
        code: "field_truncated",
        field: "uncategorized_text",
        original_length: original.length,
        truncated_length: newLen,
      });
    }
  }

  return { evidence, warnings };
}
