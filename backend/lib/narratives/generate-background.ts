import { generateNarrative } from "@/lib/claude";
import { buildPrompt } from "@/lib/prompts";
import { getPlaybook } from "@/lib/playbooks";
import { supabase } from "@/lib/supabase";
import { getDispute, normalizeDispute } from "@/lib/stripe";
import { validateHallucinations } from "./validate-hallucinations";
import type { PromptContext, EvidenceFileRef } from "@/lib/prompts/types";

export interface BackgroundGenerationParams {
  generationId: string;
  accountId: string;       // Stripe account id (for Connect-scoped fetches)
  disputeId: string;       // internal UUID from disputes table
  stripeDisputeId: string; // dp_xxx
  reasonCode: string;
  network: string;
  merchantFeedback?: string;
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

async function markFailed(generationId: string, errorMessage: string): Promise<void> {
  try {
    await supabase
      .from("narrative_generations")
      .update({
        status: "failed",
        error: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq("id", generationId);
  } catch (err) {
    console.error(
      `[generate-background] Failed to mark generation ${generationId} as failed:`,
      err,
    );
  }
}

function classifyError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("timeout") || lower.includes("timed out")) {
    return "Narrative generation timed out. Please try again.";
  }
  if (lower.includes("rate limit") || lower.includes("429")) {
    return "AI service is busy. Please try again in a moment.";
  }
  if (lower.includes("refus") || lower.includes("content policy")) {
    return "Unable to generate narrative for this dispute. You can write one manually.";
  }
  return "Generation failed unexpectedly. Please try again.";
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------

/**
 * Runs the full narrative generation pipeline in the background (via waitUntil).
 * Never throws -- all errors are caught and written to the DB.
 */
export async function runBackgroundGeneration(
  params: BackgroundGenerationParams,
): Promise<void> {
  const {
    generationId,
    accountId,
    disputeId,
    stripeDisputeId,
    reasonCode,
    network,
    merchantFeedback,
  } = params;

  try {
    // Step 1: Fetch playbook
    const playbook = await getPlaybook(network, reasonCode);
    if (!playbook) {
      await markFailed(generationId, "Playbook not found for this reason code");
      return;
    }

    // Step 2: Fetch dispute (DB row — used for checklist_notes only)
    const { data: dispute, error: disputeError } = await supabase
      .from("disputes")
      .select("*")
      .eq("id", disputeId)
      .single();

    if (disputeError || !dispute) {
      const msg = disputeError?.message ?? "Dispute not found";
      await markFailed(generationId, classifyError(msg));
      return;
    }

    // Step 2b: Re-fetch the live Stripe dispute so the prompt sees the real
    // AVS/CVC/3DS/authorization/refund data the merchant sees in the Review
    // tab. Same code path the Review tab uses (normalizeDispute), so the two
    // surfaces can't drift. See WIN-44.
    const stripeDispute = await getDispute(accountId, stripeDisputeId, [
      "charge.customer",
      "payment_intent",
    ]);
    const normalized = normalizeDispute(stripeDispute);

    // Step 3: Fetch evidence files
    const { data: evidenceRows, error: evidenceError } = await supabase
      .from("evidence_files")
      .select("checklist_item_key, file_name")
      .eq("dispute_id", disputeId);

    const files: EvidenceFileRef[] = evidenceError
      ? []
      : (evidenceRows ?? []).map(
          (row: { checklist_item_key: string; file_name: string }) => ({
            checklist_item_key: row.checklist_item_key,
            file_name: row.file_name,
          }),
        );

    // Step 4: Build PromptContext — live Stripe data is the source of truth
    // for transaction fields; the Supabase row only contributes checklist_notes
    // (merchant-authored content that isn't on the Stripe object).
    const context: PromptContext = {
      reason_code: reasonCode,
      network,
      display_name: String(playbook.display_name ?? ""),
      amount: normalized.amount,
      currency: normalized.currency,
      transaction_date: normalized.transaction_date,
      customer_name: normalized.customer_name,
      customer_email: normalized.customer_email,
      card_brand: normalized.card_brand,
      card_last4: normalized.card_last4,
      billing_address: normalized.billing_address,
      charge_description: normalized.charge_description,
      avs_address_check: normalized.avs_address_check,
      avs_zip_check: normalized.avs_zip_check,
      cvc_check: normalized.cvc_check,
      three_d_secure_result: normalized.three_d_secure_result,
      three_d_secure_version: normalized.three_d_secure_version,
      authorization_code: normalized.authorization_code,
      network_status: normalized.network_status,
      refunds: normalized.refunds,
      evidence_files: files,
      checklist_notes: (dispute.checklist_notes ?? {}) as Record<string, string>,
      issuer_evaluation: String(playbook.issuer_evaluation ?? ""),
      merchant_feedback: merchantFeedback,
    };

    // Step 5: Build prompt
    const prompt = buildPrompt(context);
    if (prompt.user === null) {
      await markFailed(generationId, "No prompt template found for this reason code");
      return;
    }

    // Step 6: Call Claude
    const rawOutput = await generateNarrative(prompt);

    // Step 7: Validate hallucinations
    const { narrative: validatedOutput, strippedReferences } = validateHallucinations(
      rawOutput,
      files,
    );

    if (strippedReferences.length > 0) {
      console.warn(
        `[generate-background] Stripped hallucinated references for generation ${generationId}:`,
        strippedReferences,
      );
    }

    // Step 8: Save completed generation
    await supabase
      .from("narrative_generations")
      .update({
        status: "completed",
        narrative_output: validatedOutput,
        completed_at: new Date().toISOString(),
      })
      .eq("id", generationId);

    // Step 9: Write narrative to disputes
    await supabase
      .from("disputes")
      .update({ narrative_text: validatedOutput.narrative })
      .eq("id", disputeId);
  } catch (err) {
    console.error(
      `[generate-background] generation ${generationId} failed:`,
      err,
    );
    const message = err instanceof Error ? err.message : String(err);
    await markFailed(generationId, classifyError(message));
  }
}
