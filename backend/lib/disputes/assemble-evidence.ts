import type Stripe from "stripe";
import type { PlaybookData, EvidenceChecklistItem, StripeEvidenceFileField } from "../playbooks/types";
import type { EvidenceFileInput, SubmissionWarning, ConcatReceipt, AssemblyResult } from "./types";
import { concatFilesToPDF, type ConcatInput } from "./pdf-concat";

const UNCATEGORIZED_TEXT_CAP = 20000;

/**
 * Classify a file as PDF or image. Historically the `evidence_files.mime_type`
 * column has held a mix of full MIME types (`application/pdf`) and bare
 * extensions (`pdf`, `jpg`) depending on what the Stripe uploader surfaced.
 * Accept any of those forms plus a filename-extension fallback.
 */
function isPdfFile(file: EvidenceFileInput): boolean {
  const mime = file.mime_type?.toLowerCase() ?? "";
  if (mime === "application/pdf" || mime === "pdf") return true;
  if (file.file_name?.toLowerCase().endsWith(".pdf")) return true;
  return false;
}

export interface AssembleInput {
  charge: Stripe.Charge;
  playbook: PlaybookData;
  evidenceFiles: EvidenceFileInput[];
  narrativeText: string | null;
  stripeClient: {
    downloadStripeFile(fileId: string): Promise<Buffer>;
    uploadCombinedEvidence(pdf: Buffer, filename: string): Promise<string>;
  };
}

/**
 * Build the Stripe dispute evidence payload. Pulls autofilled fields from the
 * charge, truncates the narrative into uncategorized_text, groups uploaded files
 * by their target Stripe slot, concats any slot with 2+ files via PDF merge,
 * and returns the finished evidence object plus diagnostics.
 *
 * Per-file errors during concat (corrupt PDF, unreadable image, download
 * failure) are caught and reported as concat_skipped warnings — the bad file
 * is excluded from its slot and assembly continues. A final combined-PDF
 * upload failure is NOT caught here; the route classifies it as concat_failed
 * and aborts the submission.
 */
export async function assembleEvidence(input: AssembleInput): Promise<AssemblyResult> {
  const { charge, playbook, evidenceFiles, narrativeText, stripeClient } = input;
  const warnings: SubmissionWarning[] = [];
  const evidence: Record<string, unknown> = {};

  // 1. Autofilled fields from the charge. Pulled per-item via stripe_field.
  for (const item of playbook.evidence_checklist) {
    if (!item.stripe_field) continue;
    const value = readChargeField(charge, item.stripe_field);
    if (value !== undefined && value !== null) {
      writeAutofilledEvidenceField(evidence, item.stripe_field, value, charge);
    }
  }

  // 2. Narrative → uncategorized_text with truncation warning
  if (narrativeText && narrativeText.trim().length > 0) {
    let narrative = narrativeText;
    if (narrative.length > UNCATEGORIZED_TEXT_CAP) {
      warnings.push({
        code: "field_truncated",
        field: "uncategorized_text",
        original_length: narrative.length,
        truncated_length: UNCATEGORIZED_TEXT_CAP,
      });
      narrative = narrative.slice(0, UNCATEGORIZED_TEXT_CAP);
    }
    evidence.uncategorized_text = narrative;
  }

  // 3. Group evidence files by target slot
  const slotGroups = new Map<
    StripeEvidenceFileField,
    Array<{ file: EvidenceFileInput; item: EvidenceChecklistItem }>
  >();
  const itemByKey = new Map<string, EvidenceChecklistItem>();
  for (const item of playbook.evidence_checklist) {
    itemByKey.set(item.item, item);
  }

  for (const file of evidenceFiles) {
    const item = itemByKey.get(file.checklist_item_key);
    if (!item || !item.stripe_evidence_field) continue;
    const slot = item.stripe_evidence_field;
    const list = slotGroups.get(slot) ?? [];
    list.push({ file, item });
    slotGroups.set(slot, list);
  }

  // 4. Resolve each slot: single files pass through; multi-file slots are concat'd
  const concat_receipts: ConcatReceipt[] = [];

  for (const [slot, group] of slotGroups) {
    if (group.length === 1) {
      evidence[slot] = group[0].file.stripe_file_id;
      continue;
    }

    // Multi-file: download, concat, upload
    const concatInputs: ConcatInput[] = [];
    const inputFileIds: string[] = [];

    for (const { file } of group) {
      try {
        const buf = await stripeClient.downloadStripeFile(file.stripe_file_id);
        const kind = isPdfFile(file) ? "pdf" : "image";
        concatInputs.push({ name: file.file_name, buffer: buf, kind });
        inputFileIds.push(file.stripe_file_id);
      } catch (err) {
        warnings.push({
          code: "concat_skipped",
          file_name: file.file_name,
          slot,
          reason: `download failed: ${(err as Error).message}`,
        });
      }
    }

    // Per-file concat wrap: validate each input individually so one bad file
    // doesn't tank the slot.
    const validInputs: ConcatInput[] = [];
    const validInputIds: string[] = [];
    for (let i = 0; i < concatInputs.length; i++) {
      try {
        await concatFilesToPDF([concatInputs[i]]);
        validInputs.push(concatInputs[i]);
        validInputIds.push(inputFileIds[i]);
      } catch (err) {
        warnings.push({
          code: "concat_skipped",
          file_name: concatInputs[i].name,
          slot,
          reason: `concat failed: ${(err as Error).message}`,
        });
      }
    }

    if (validInputs.length === 0) continue;

    if (validInputs.length === 1) {
      // After filtering, only one valid file remains — pass through original id
      evidence[slot] = validInputIds[0];
      continue;
    }

    // Real concat + upload path
    const combined = await concatFilesToPDF(validInputs);
    const combinedId = await stripeClient.uploadCombinedEvidence(combined, `${slot}-combined.pdf`);
    evidence[slot] = combinedId;
    concat_receipts.push({ slot, input_file_ids: validInputIds, combined_file_id: combinedId });
  }

  return { evidence, warnings, concat_receipts };
}

/**
 * Read a named field from the Charge object. Known stripe_field values map to
 * specific paths. Unknown values return undefined and the assembler silently
 * skips them — the invariant validator caught this case at seed time.
 */
function readChargeField(charge: Stripe.Charge, field: string): unknown {
  const card = charge.payment_method_details?.card;
  switch (field) {
    case "authorization":
      return charge.id;
    case "avs_result":
      return card?.checks?.address_line1_check ?? null;
    case "cvc_check":
      return card?.checks?.cvc_check ?? null;
    case "three_d_secure":
      return card?.three_d_secure?.result ?? null;
    case "customer_email":
      return charge.billing_details?.email ?? null;
    case "refund_data":
      return charge.refunds?.data?.length ?? 0;
    case "calculated_statement_descriptor":
      return charge.calculated_statement_descriptor ?? null;
    default:
      return undefined;
  }
}

/**
 * Write an autofilled value into the right spot in the evidence object. Most
 * stripe_field values flow through the WIN-19 narrative pre-gen template, so
 * only a few map to dedicated dispute evidence fields here. Customer name and
 * billing address are always populated from billing_details when available.
 */
function writeAutofilledEvidenceField(
  evidence: Record<string, unknown>,
  field: string,
  value: unknown,
  charge: Stripe.Charge,
): void {
  switch (field) {
    case "customer_email":
      if (typeof value === "string") evidence.customer_email_address = value;
      break;
    case "refund_data":
    case "calculated_statement_descriptor":
      // Consumed by narrative template; no dedicated evidence field.
      break;
    default:
      // AVS, CVC, 3DS, authorization land in the narrative via WIN-19 pre-gen.
      break;
  }

  if (charge.billing_details?.name && !evidence.customer_name) {
    evidence.customer_name = charge.billing_details.name;
  }
  if (charge.billing_details?.address) {
    const a = charge.billing_details.address;
    const line = [a.line1, a.line2, a.city, a.state, a.postal_code, a.country]
      .filter(Boolean)
      .join(", ");
    if (line && !evidence.billing_address) evidence.billing_address = line;
  }
}
