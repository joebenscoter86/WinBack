import type Stripe from "stripe";
import type { NarrativeOutput } from "@/lib/prompts/types";

// Fake identifiers that nothing else in dev uses. All DB cleanup
// filters on TEST_ACCOUNT_ID cascade.
export const TEST_ACCOUNT_ID = "acct_WIN43_TEST";
export const TEST_USER_ID = "usr_WIN43_TEST";
export const TEST_DISPUTE_ID = "du_WIN43_TEST";
export const TEST_CHARGE_ID = "ch_WIN43_TEST";

// The checklist item key we upload evidence under. Matches the stable key
// `delivery_to_billing_address` defined in the visa-10.4 playbook (WIN-40).
export const TEST_CHECKLIST_ITEM_KEY = "delivery_to_billing_address";

// Fake Stripe file ID for the evidence upload metadata row.
export const TEST_STRIPE_FILE_ID = "file_WIN43_TEST_abc";

/**
 * Canned Stripe.Dispute object returned by the mocked `getDispute`.
 * Includes full payment_method_details.card.checks, outcome, and
 * three_d_secure data so this fixture is WIN-44-ready: when WIN-44 lands
 * and threads those fields into the narrative prompt, step 9 of the test
 * will be able to assert on their presence without fixture changes.
 */
export const CANNED_STRIPE_DISPUTE = {
  id: TEST_DISPUTE_ID,
  object: "dispute",
  amount: 14900,
  currency: "usd",
  reason: "fraudulent",
  status: "needs_response",
  evidence_due_by: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  network_reason_code: "10.4",
  payment_intent: null,
  charge: {
    id: TEST_CHARGE_ID,
    object: "charge",
    amount: 14900,
    currency: "usd",
    created: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60,
    description: "Test order #WIN43",
    billing_details: {
      address: {
        line1: "123 Test Street",
        city: "Testville",
        state: "CA",
        postal_code: "94000",
        country: "US",
      },
      email: "test@winback-integration.example",
      name: "Test Customer",
    },
    customer: null,
    outcome: {
      network_status: "approved_by_network",
      reason: null,
      risk_level: "normal",
      seller_message: "Payment complete.",
      type: "authorized",
    },
    payment_method_details: {
      card: {
        brand: "visa",
        network: "visa",
        last4: "4242",
        authorization_code: "AUTH42WIN",
        checks: {
          address_line1_check: "pass",
          address_postal_code_check: "pass",
          cvc_check: "pass",
        },
        three_d_secure: {
          authentication_flow: "challenge",
          result: "authenticated",
          result_reason: null,
          version: "2.2.0",
        },
      },
      type: "card",
    },
    refunds: { data: [] },
  },
} as unknown as Stripe.Dispute;

/**
 * Canned Anthropic messages.create response. The mock returns this
 * structure verbatim; generateNarrative parses it into NarrativeOutput.
 */
export const CANNED_NARRATIVE_OUTPUT: NarrativeOutput = {
  narrative:
    `**Delivery Confirmation**\n` +
    `We have uploaded the delivery confirmation document ` +
    `showing the order was delivered to the cardholder's verified billing address.\n\n` +
    `**Summary**\n` +
    `This transaction is legitimate and should not be treated as fraud.`,
  annotations: [
    {
      section: "Delivery Confirmation",
      reasoning:
        "References the uploaded evidence file for the verified billing address delivery.",
    },
  ],
};

/**
 * Wrapped in the shape Anthropic SDK's messages.create returns.
 * generateNarrative reads response.content[0].text and JSON.parses it.
 */
export const CANNED_ANTHROPIC_RESPONSE = {
  id: "msg_WIN43_TEST",
  type: "message",
  role: "assistant",
  model: "claude-sonnet-4-6",
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(CANNED_NARRATIVE_OUTPUT),
    },
  ],
  stop_reason: "end_turn",
  stop_sequence: null,
  usage: { input_tokens: 100, output_tokens: 200 },
};
