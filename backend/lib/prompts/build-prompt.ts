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

/**
 * WIN-61: Sanitize merchant-controlled text before it flows into the Claude
 * user message. Strips the characters that could close a wrapper tag or
 * switch the model into a different parsing mode:
 *   - `<` and `>` become `&lt;` / `&gt;` so the merchant can't forge
 *     pseudo-tags like `</merchant_note><system>...`.
 *   - backticks are neutralized so the merchant can't flip the model into a
 *     code-fence interpretation.
 *
 * This is defense-in-depth on top of the system-prompt instruction that
 * anything inside <merchant_*> / <evidence_*> tags is data, not instructions.
 */
function sanitizeUntrusted(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`/g, "'");
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

  // WIN-61: evidence_files.file_name is merchant-controlled (they name their
  // uploads), so the value is wrapped in <evidence_filename> and sanitized.
  // The checklist_item_key is ours (from the playbook) so it's not wrapped.
  const evidenceFilesList = [
    ...context.evidence_files.map(
      (f) =>
        `- "${f.checklist_item_key}": <evidence_filename>${sanitizeUntrusted(f.file_name)}</evidence_filename>`
    ),
    ...allEvidenceKeys
      .filter((key) => !uploadedKeys.has(key))
      .map((key) => `- "${key}": (not uploaded)`),
  ].join("\n");

  // WIN-61: checklist_notes values are merchant free-text. Wrap in
  // <merchant_note> and sanitize before concatenation.
  const checklistNotesList = Object.entries(context.checklist_notes)
    .map(
      ([key, note]) =>
        `- "${key}": <merchant_note>${sanitizeUntrusted(note)}</merchant_note>`
    )
    .join("\n");

  // Narrative-only (T-category) items: prefer merchant notes from
  // checklist_notes; fall back to the per-playbook canned assertion. Items
  // with neither are skipped to avoid emitting empty keys to the LLM. (WIN-49)
  // WIN-61: merchant notes are wrapped in <merchant_note> and sanitized;
  // playbook fallbacks are our own data and don't need wrapping.
  const narrativeOnlyItems = context.narrative_only_items ?? [];
  const narrativeAssertionsList = narrativeOnlyItems
    .map((item) => {
      // checklist_notes in Supabase is now keyed by the stable key (WIN-40
      // migration 011). The display label is kept in the emitted line so the
      // LLM sees a human-readable anchor, not an opaque identifier.
      const merchantNote = context.checklist_notes[item.key]?.trim();
      if (merchantNote) {
        return `- "${item.item}": <merchant_note>${sanitizeUntrusted(merchantNote)}</merchant_note> (merchant's own words)`;
      }
      if (item.fallback) {
        return `- "${item.item}": "${item.fallback}" (standard assertion for this reason code)`;
      }
      return null;
    })
    .filter((line): line is string => line !== null)
    .join("\n");

  const threeDSecure = context.three_d_secure_result
    ? `${context.three_d_secure_result}${context.three_d_secure_version ? ` (version ${context.three_d_secure_version})` : ""}`
    : "not available";

  // WIN-61: merchant_feedback is free-text from the merchant; wrap in
  // <merchant_feedback> and sanitize so injection attempts inside can't
  // escape the tag or forge new instructions.
  const feedbackBlock = context.merchant_feedback
    ? `\nMERCHANT FEEDBACK ON PREVIOUS GENERATION:\n<merchant_feedback>${sanitizeUntrusted(context.merchant_feedback)}</merchant_feedback>\nIncorporate this feedback into the new narrative.\n`
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
- Statement descriptor (what the cardholder saw on their statement): ${formatStripeField(context.calculated_statement_descriptor)}
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

NARRATIVE-ONLY ASSERTIONS (weave these into the narrative; use the merchant's words verbatim when marked, otherwise paraphrase the standard assertion naturally):
${narrativeAssertionsList || "(none for this reason code)"}
${feedbackBlock}
Generate the narrative following the system instructions.`;

  return { system: SYSTEM_PROMPT, user };
}
