/**
 * Smoke test: generate narratives via Claude using the real prompt pipeline.
 *
 * Usage:
 *   cd backend
 *   ANTHROPIC_API_KEY=sk-ant-xxx npx tsx scripts/smoke-test-narrative.ts
 *
 * Runs three test cases:
 *   1. Visa 13.1 (Not Received) -- happy path with evidence
 *   2. Visa 10.4 (Fraud) -- different argumentation strategy
 *   3. Visa 13.1 with no evidence -- auto-pull data only
 */

import { buildPrompt } from "../lib/prompts";
import { generateNarrative } from "../lib/claude";
import { validateHallucinations } from "../lib/narratives/validate-hallucinations";
import type { PromptContext } from "../lib/prompts/types";

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------

const CASE_1_NOT_RECEIVED: PromptContext = {
  reason_code: "13.1",
  network: "visa",
  display_name: "Merchandise / Services Not Received",
  amount: 12750,
  currency: "usd",
  transaction_date: 1710460800,
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
      checklist_item_key: "tracking_delivery_scan",
      file_name: "fedex-tracking-screenshot.pdf",
    },
    {
      checklist_item_key: "signed_delivery",
      file_name: "delivery-photo.jpg",
    },
  ],
  checklist_notes: {
    tracking_delivery_scan:
      "FedEx tracking 789456123, delivered March 18 at 2:14 PM, left at front door",
    signed_delivery:
      "FedEx delivery photo shows package at front door of 123 Main St",
  },
  issuer_evaluation:
    "The bank checks for carrier confirmation of delivery to the correct address. " +
    "A tracking number with delivery scan is the single most important piece of evidence. " +
    "Address match between shipping and billing strengthens the case.",
};

const CASE_2_FRAUD: PromptContext = {
  reason_code: "10.4",
  network: "visa",
  display_name: "Fraud / Unauthorized Transaction",
  amount: 34900,
  currency: "usd",
  transaction_date: 1711065600,
  customer_name: "Robert Chen",
  customer_email: "robert.chen@email.com",
  card_brand: "visa",
  card_last4: "1881",
  billing_address: "456 Oak Ave, Portland, OR 97201, US",
  charge_description: "Annual subscription - Pro plan",
  avs_address_check: "pass",
  avs_zip_check: "pass",
  cvc_check: "pass",
  three_d_secure_result: "authenticated",
  three_d_secure_version: "2.2.0",
  network_status: "approved_by_network_rules",
  authorization_code: "AUTH789",
  evidence_files: [
    {
      checklist_item_key: "delivery_communication",
      file_name: "support-chat-transcript.pdf",
    },
  ],
  checklist_notes: {
    delivery_communication:
      "Customer emailed support on March 25 asking about upgrading their plan, 3 days after the disputed charge. Used same email as on the account.",
  },
  issuer_evaluation:
    "The bank evaluates whether the legitimate cardholder authorized this transaction. " +
    "3D Secure authentication is strong evidence of cardholder participation. " +
    "Prior undisputed transactions and post-purchase engagement strengthen the case.",
};

const CASE_3_NO_EVIDENCE: PromptContext = {
  reason_code: "13.1",
  network: "visa",
  display_name: "Merchandise / Services Not Received",
  amount: 5999,
  currency: "usd",
  transaction_date: 1710806400,
  customer_name: "Pat Johnson",
  customer_email: "pat.j@gmail.com",
  card_brand: "visa",
  card_last4: "9012",
  billing_address: "789 Elm St, Austin, TX 78701, US",
  charge_description: "Digital download - Design templates pack",
  avs_address_check: "pass",
  avs_zip_check: "pass",
  cvc_check: "pass",
  network_status: "approved_by_network_rules",
  authorization_code: "AUTH456",
  evidence_files: [],
  checklist_notes: {},
  issuer_evaluation:
    "The bank checks for carrier confirmation of delivery to the correct address. " +
    "For digital goods, access logs or download confirmation serve as delivery proof.",
};

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

interface TestCase {
  name: string;
  context: PromptContext;
}

const CASES: TestCase[] = [
  { name: "Case 1: Visa 13.1 -- Not Received (with evidence)", context: CASE_1_NOT_RECEIVED },
  { name: "Case 2: Visa 10.4 -- Fraud (different strategy)", context: CASE_2_FRAUD },
  { name: "Case 3: Visa 13.1 -- Not Received (NO evidence, auto-pull only)", context: CASE_3_NO_EVIDENCE },
];

async function runCase(testCase: TestCase): Promise<boolean> {
  console.log(`\n${"=".repeat(60)}`);
  console.log(testCase.name);
  console.log("=".repeat(60));

  // Build prompt
  console.log("\n  Building prompt...");
  const prompt = buildPrompt(testCase.context);

  if (!prompt.user) {
    console.error("  ERROR: No prompt template found");
    return false;
  }

  console.log(`  System: ${prompt.system.length} chars | User: ${prompt.user.length} chars`);

  // Call Claude
  console.log("  Calling Claude...");
  const start = Date.now();

  try {
    const rawOutput = await generateNarrative(prompt);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  Response in ${elapsed}s`);

    // Validate hallucinations
    const { narrative: validated, strippedReferences } = validateHallucinations(
      rawOutput,
      testCase.context.evidence_files,
    );

    if (strippedReferences.length > 0) {
      console.log(`  HALLUCINATIONS STRIPPED: ${strippedReferences.join(", ")}`);
    } else {
      console.log("  Hallucination check: clean");
    }

    // Output
    console.log("\n--- NARRATIVE ---\n");
    console.log(validated.narrative);

    console.log("\n--- ANNOTATIONS ---\n");
    for (const ann of validated.annotations) {
      console.log(`  [${ann.section}]`);
      console.log(`    ${ann.reasoning}\n`);
    }

    const wordCount = validated.narrative.split(/\s+/).length;
    console.log(`--- Stats: ${wordCount} words, ${validated.annotations.length} sections, ${strippedReferences.length} hallucinations stripped ---`);

    return true;
  } catch (err) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.error(`  ERROR after ${elapsed}s:`, err instanceof Error ? err.message : err);
    return false;
  }
}

async function main() {
  console.log("=== WinBack Narrative Smoke Test Suite ===");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("\nERROR: Set ANTHROPIC_API_KEY environment variable");
    process.exit(1);
  }

  const results: { name: string; passed: boolean }[] = [];

  for (const testCase of CASES) {
    const passed = await runCase(testCase);
    results.push({ name: testCase.name, passed });
  }

  // Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log("SUMMARY");
  console.log("=".repeat(60));
  for (const r of results) {
    console.log(`  ${r.passed ? "PASS" : "FAIL"}  ${r.name}`);
  }

  const failed = results.filter((r) => !r.passed).length;
  if (failed > 0) {
    console.log(`\n${failed} case(s) failed.`);
    process.exit(1);
  } else {
    console.log("\nAll cases passed.");
  }
}

main();
