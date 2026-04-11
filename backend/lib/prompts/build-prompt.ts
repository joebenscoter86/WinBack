import { SYSTEM_PROMPT } from "./system-prompt";
import { getPromptTemplate } from "./templates";
import type { PromptContext, PromptSection } from "./types";

export interface PromptResult {
  system: string;
  user: string | null;
}

function formatAmount(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(2);
  const upper = currency.toUpperCase();
  if (upper === "USD") return `$${amount}`;
  return `${upper} ${amount}`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}

function formatStripeField(value: string | undefined): string {
  if (!value) return "not available";
  return value;
}

function formatRefunds(
  refunds: Array<{ amount: number; created: number; status: string }> | undefined
): string {
  if (!refunds || refunds.length === 0) return "none";
  return refunds
    .map(
      (r) =>
        `${formatAmount(r.amount, "usd")} on ${formatDate(r.created)} (${r.status})`
    )
    .join("; ");
}

function buildSectionsBlock(
  sections: PromptSection[],
  evidenceFiles: Array<{ checklist_item_key: string; file_name: string }>
): string {
  const uploadedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));

  return sections
    .map((section, i) => {
      const availableEvidence = section.evidence_keys.filter((key) =>
        uploadedKeys.has(key)
      );
      const hasAutoPull = section.auto_pull_fields.length > 0;
      const evidenceList =
        availableEvidence.length > 0
          ? availableEvidence.join(", ")
          : hasAutoPull
            ? "auto-pulled Stripe data"
            : "none";

      return `${i + 1}. ${section.name} -- ${section.instruction} -- Evidence available: ${evidenceList}`;
    })
    .join("\n");
}

export function buildPrompt(context: PromptContext): PromptResult {
  const template = getPromptTemplate(context.network, context.reason_code);

  if (!template) {
    return { system: SYSTEM_PROMPT, user: null };
  }

  const uploadedKeys = new Set(
    context.evidence_files.map((f) => f.checklist_item_key)
  );

  const allEvidenceKeys = [
    ...new Set(template.sections.flatMap((s) => s.evidence_keys)),
  ];

  const evidenceFilesList = [
    ...context.evidence_files.map(
      (f) => `- "${f.checklist_item_key}": ${f.file_name}`
    ),
    ...allEvidenceKeys
      .filter((key) => !uploadedKeys.has(key))
      .map((key) => `- "${key}": (not uploaded)`),
  ].join("\n");

  const checklistNotesList = Object.entries(context.checklist_notes)
    .map(([key, note]) => `- "${key}": "${note}"`)
    .join("\n");

  const threeDSecure = context.three_d_secure_result
    ? `${context.three_d_secure_result}${context.three_d_secure_version ? ` (version ${context.three_d_secure_version})` : ""}`
    : "not available";

  const feedbackBlock = context.merchant_feedback
    ? `\nMERCHANT FEEDBACK ON PREVIOUS GENERATION:\n${context.merchant_feedback}\nIncorporate this feedback into the new narrative.\n`
    : "";

  const user = `DISPUTE CONTEXT:
- Reason code: ${context.network} ${context.reason_code} (${context.display_name})
- Amount: ${formatAmount(context.amount, context.currency)}
- Transaction date: ${context.transaction_date ? formatDate(context.transaction_date) : "not available"}
- Customer: ${context.customer_name ?? "not available"} (${context.customer_email ?? "not available"})
- Card: ${context.card_brand ?? "not available"} ending ${context.card_last4 ?? "not available"}
- Billing address: ${context.billing_address ?? "not available"}
- Charge description: ${context.charge_description ?? "not available"}

STRIPE TRANSACTION DATA (verified by payment network):
- AVS address check: ${formatStripeField(context.avs_address_check)}
- AVS zip check: ${formatStripeField(context.avs_zip_check)}
- CVC check: ${formatStripeField(context.cvc_check)}
- Network status: ${formatStripeField(context.network_status)}
- Authorization code: ${formatStripeField(context.authorization_code)}
- 3D Secure: ${threeDSecure}
- Refunds: ${formatRefunds(context.refunds)}

BANK EVALUATION CRITERIA:
${context.issuer_evaluation}

ARGUMENTATION STRATEGY:
${template.strategy}

NARRATIVE SECTIONS (in priority order):
${buildSectionsBlock(template.sections, context.evidence_files)}

MERCHANT-UPLOADED EVIDENCE:
${evidenceFilesList || "(no files uploaded)"}

CHECKLIST NOTES (merchant's own words):
${checklistNotesList || "(no notes provided)"}
${feedbackBlock}
Generate the narrative following the system instructions.`;

  return { system: SYSTEM_PROMPT, user };
}
