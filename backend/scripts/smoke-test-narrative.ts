/**
 * Smoke test: generate a narrative via Claude using the real prompt pipeline.
 *
 * Usage:
 *   cd backend
 *   ANTHROPIC_API_KEY=sk-ant-xxx npx tsx scripts/smoke-test-narrative.ts
 *
 * This bypasses the API route layer (no Stripe auth needed) and calls the
 * prompt builder + Claude client directly with realistic test data.
 */

import { buildPrompt } from "../lib/prompts";
import { generateNarrative } from "../lib/claude";
import type { PromptContext } from "../lib/prompts/types";
import { validateHallucinations } from "../lib/narratives/validate-hallucinations";

const TEST_CONTEXT: PromptContext = {
  reason_code: "13.1",
  network: "visa",
  display_name: "Merchandise / Services Not Received",
  amount: 12750,
  currency: "usd",
  transaction_date: 1710460800, // 2024-03-15
  customer_name: "Jane Smith",
  customer_email: "jane@example.com",
  card_brand: "visa",
  card_last4: "4242",
  billing_address: "123 Main St, Springfield, IL 62704, US",
  charge_description: "Order #1234 - Blue Widget (qty 2)",
  avs_address_check: "pass",
  avs_zip_check: "pass",
  cvc_check: "pass",
  network_status: "approved_by_network_rules",
  authorization_code: "AUTH123",
  evidence_files: [
    {
      checklist_item_key: "Carrier tracking confirmation with delivery scan",
      file_name: "fedex-tracking-screenshot.pdf",
    },
    {
      checklist_item_key: "Signed delivery confirmation or proof of delivery",
      file_name: "delivery-photo.jpg",
    },
  ],
  checklist_notes: {
    "Carrier tracking confirmation with delivery scan":
      "FedEx tracking 789456123, delivered March 18 at 2:14 PM, left at front door",
    "Signed delivery confirmation or proof of delivery":
      "FedEx delivery photo shows package at front door of 123 Main St",
  },
  issuer_evaluation:
    "The bank checks for carrier confirmation of delivery to the correct address. " +
    "A tracking number with delivery scan is the single most important piece of evidence. " +
    "Address match between shipping and billing strengthens the case.",
};

async function main() {
  console.log("=== WinBack Narrative Smoke Test ===\n");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: Set ANTHROPIC_API_KEY environment variable");
    process.exit(1);
  }

  // Step 1: Build prompt
  console.log("1. Building prompt for Visa 13.1 (Not Received)...");
  const prompt = buildPrompt(TEST_CONTEXT);

  if (!prompt.user) {
    console.error("ERROR: No prompt template found for visa 13.1");
    process.exit(1);
  }

  console.log(`   System prompt: ${prompt.system.length} chars`);
  console.log(`   User prompt: ${prompt.user.length} chars\n`);

  // Step 2: Call Claude
  console.log("2. Calling Claude (claude-sonnet-4-6)...");
  const start = Date.now();

  try {
    const rawOutput = await generateNarrative(prompt);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`   Done in ${elapsed}s\n`);

    // Step 3: Validate hallucinations
    console.log("3. Validating hallucinations...");
    const { narrative: validated, strippedReferences } = validateHallucinations(
      rawOutput,
      TEST_CONTEXT.evidence_files,
    );

    if (strippedReferences.length > 0) {
      console.log(`   STRIPPED ${strippedReferences.length} hallucinated references:`);
      strippedReferences.forEach((ref) => console.log(`   - "${ref}"`));
    } else {
      console.log("   No hallucinations detected");
    }

    // Step 4: Display results
    console.log("\n=== GENERATED NARRATIVE ===\n");
    console.log(validated.narrative);

    console.log("\n=== ANNOTATIONS ===\n");
    for (const ann of validated.annotations) {
      console.log(`[${ann.section}]`);
      console.log(`  ${ann.reasoning}\n`);
    }

    console.log("=== STATS ===");
    console.log(`  Word count: ${validated.narrative.split(/\s+/).length}`);
    console.log(`  Sections: ${validated.annotations.length}`);
    console.log(`  Hallucinations stripped: ${strippedReferences.length}`);
  } catch (err) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.error(`\nERROR after ${elapsed}s:`, err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
