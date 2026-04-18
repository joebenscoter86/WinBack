import { generateNarrative } from "@/lib/claude";
import { buildPrompt, getPromptTemplate } from "@/lib/prompts";
import type { NarrativeOutput } from "@/lib/prompts/types";
import { runAllCriteria, countWords } from "./criteria";
import type { Fixture, FixtureScore } from "./types";

const MOCK_FILLER =
  "The merchant retains documentation of the original order confirmation and fulfillment records. " +
  "Customer account records tie the transaction to the cardholder on file. " +
  "The merchant's policies were disclosed at checkout and accepted as part of the purchase agreement. " +
  "No pre-dispute contact was received from the customer through support channels. " +
  "Stripe transaction data including authorization code and network status corroborate the charge. " +
  "The billing address on file matches the verified payment method for this customer. " +
  "Order confirmations and shipping updates were sent to the customer email on record. " +
  "No prior chargebacks were filed against this customer before the disputed transaction. " +
  "The supporting documentation referenced above addresses each bank evaluation criterion for this reason code. " +
  "These facts together establish the legitimacy of the charge and the merchant's compliance with network rules. " +
  "Records of the transaction are preserved in the merchant's order management system and are available for review. " +
  "Network-level verification checks completed successfully at the time of authorization and capture. " +
  "The evidence presented is drawn from verified system logs and merchant-of-record documentation. " +
  "Each factual claim above can be corroborated by the referenced documentation uploaded with this response. " +
  "The merchant has treated this transaction as legitimate throughout the order lifecycle and has preserved all related records.";

function mockNarrative(fx: Fixture): NarrativeOutput {
  // Deterministic, passes every criterion. The mock validates the harness
  // itself -- criteria, baselines, CLI plumbing -- without calling Claude.
  // It uses real template section names so section_coverage passes, and
  // pads output with generic-but-factual filler to clear 400 words.
  const template = getPromptTemplate(fx.context.network, fx.context.reason_code);
  const p1 = template?.sections.filter((s) => s.priority === 1) ?? [];
  const pickedSections = p1.slice(0, 2).length >= 2 ? p1.slice(0, 2) : p1.slice(0, 1);

  const quotedKeys = fx.context.evidence_files.slice(0, 3).map(
    (f) => `"${f.checklist_item_key}"`,
  );
  const amount = `$${(fx.context.amount / 100).toFixed(2)}`;

  const bodies: string[] = [];
  const annotations: Array<{ section: string; reasoning: string }> = [];

  for (const section of pickedSections) {
    const evidenceLine =
      quotedKeys.length > 0
        ? `Supporting evidence includes ${quotedKeys.join(", ")} which anchor this section to uploaded documentation. `
        : `Verified Stripe transaction data anchors this section. `;
    bodies.push(
      `**${section.name}**\n\nThe transaction was processed for ${amount} and the record addresses the criterion: ${section.bank_criterion} ` +
        evidenceLine +
        MOCK_FILLER,
    );
    annotations.push({
      section: section.name,
      reasoning: `Addresses the bank criterion: ${section.bank_criterion}`,
    });
  }

  return { narrative: bodies.join("\n\n"), annotations };
}

async function generate(fx: Fixture, mock: boolean): Promise<NarrativeOutput> {
  if (mock) return mockNarrative(fx);
  const prompt = buildPrompt(fx.context);
  if (prompt.user === null) {
    throw new Error(`No prompt template for ${fx.context.network}:${fx.context.reason_code}`);
  }
  return await generateNarrative(prompt);
}

export async function runFixture(
  fx: Fixture,
  mock: boolean,
): Promise<FixtureScore> {
  const startedAt = Date.now();
  const output = await generate(fx, mock);
  const criteria = runAllCriteria(output, fx);
  const pass = criteria.every((c) => c.pass);
  return {
    fixtureId: fx.id,
    output,
    criteria,
    pass,
    wordCount: countWords(output.narrative),
    durationMs: Date.now() - startedAt,
  };
}
