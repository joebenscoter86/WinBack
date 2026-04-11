import { describe, it, expect } from "vitest";
import { buildPrompt } from "../build-prompt";
import type { PromptContext } from "../types";
import { SYSTEM_PROMPT } from "../system-prompt";

function makeContext(overrides: Partial<PromptContext> = {}): PromptContext {
  return {
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
    charge_description: "Order #1234",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    network_status: "approved_by_network_rules",
    evidence_files: [
      {
        checklist_item_key: "Carrier tracking confirmation with delivery scan",
        file_name: "tracking-screenshot.pdf",
      },
    ],
    checklist_notes: {
      "Carrier tracking confirmation with delivery scan":
        "FedEx tracking 7891234, delivered Mar 18",
    },
    issuer_evaluation: "The bank checks for carrier confirmation of delivery.",
    ...overrides,
  };
}

describe("buildPrompt", () => {
  it("returns system and user messages", () => {
    const result = buildPrompt(makeContext());
    expect(result.system).toBe(SYSTEM_PROMPT);
    expect(result.user).toBeTruthy();
    expect(typeof result.user).toBe("string");
  });

  it("includes dispute context in user message", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("visa 13.1");
    expect(result.user).toContain("Merchandise / Services Not Received");
    expect(result.user).toContain("$127.50");
    expect(result.user).toContain("Jane Smith");
    expect(result.user).toContain("jane@example.com");
    expect(result.user).toContain("4242");
  });

  it("includes auto-pulled Stripe data", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("AVS address check: pass");
    expect(result.user).toContain("AVS zip check: pass");
    expect(result.user).toContain("CVC check: pass");
  });

  it("includes issuer evaluation criteria", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain(
      "The bank checks for carrier confirmation of delivery."
    );
  });

  it("includes argumentation strategy from template", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("Prove delivery was completed");
  });

  it("includes evidence files", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("tracking-screenshot.pdf");
    expect(result.user).toContain(
      "Carrier tracking confirmation with delivery scan"
    );
  });

  it("includes checklist notes", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("FedEx tracking 7891234, delivered Mar 18");
  });

  it("formats amount correctly for different currencies", () => {
    const result = buildPrompt(makeContext({ amount: 5000, currency: "eur" }));
    expect(result.user).toContain("EUR 50.00");
  });

  it("handles missing optional fields gracefully", () => {
    const result = buildPrompt(
      makeContext({
        customer_name: undefined,
        customer_email: undefined,
        card_brand: undefined,
        card_last4: undefined,
        transaction_date: undefined,
        avs_address_check: undefined,
        cvc_check: undefined,
        three_d_secure_result: undefined,
        authorization_code: undefined,
        evidence_files: [],
        checklist_notes: {},
      })
    );
    expect(result.user).toContain("not available");
    expect(result.user).not.toContain("undefined");
  });

  it("returns null user message for unknown reason code", () => {
    const result = buildPrompt(
      makeContext({ network: "visa", reason_code: "99.9" })
    );
    expect(result.system).toBe(SYSTEM_PROMPT);
    expect(result.user).toBeNull();
  });

  it("includes refunds summary when refunds exist", () => {
    const result = buildPrompt(
      makeContext({
        reason_code: "13.6",
        display_name: "Credit Not Processed",
        refunds: [
          { amount: 5000, created: 1710460800, status: "succeeded" },
        ],
      })
    );
    expect(result.user).toContain("$50.00");
    expect(result.user).toContain("succeeded");
  });

  it("includes merchant feedback when present", () => {
    const result = buildPrompt(
      makeContext({
        merchant_feedback: "Too formal, make it more concise",
      })
    );
    expect(result.user).toContain("Too formal, make it more concise");
    expect(result.user).toContain("MERCHANT FEEDBACK");
  });

  it("omits merchant feedback section when not present", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).not.toContain("MERCHANT FEEDBACK");
  });
});
