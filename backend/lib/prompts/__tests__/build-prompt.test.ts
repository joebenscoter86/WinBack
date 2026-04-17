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
        checklist_item_key: "tracking_delivery_scan",
        file_name: "tracking-screenshot.pdf",
      },
    ],
    checklist_notes: {
      tracking_delivery_scan: "FedEx tracking 7891234, delivered Mar 18",
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
    expect(result.user).toContain("tracking_delivery_scan");
  });

  it("shows not-uploaded entries for missing evidence", () => {
    const result = buildPrompt(makeContext());
    // The default context only uploads "tracking_delivery_scan".
    // Other evidence keys from the 13.1 template should show as (not uploaded).
    expect(result.user).toContain("(not uploaded)");
    expect(result.user).toContain('"shipping_address_match": (not uploaded)');
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

  describe("narrative-only assertions (WIN-49)", () => {
    it("uses merchant note verbatim when present in checklist_notes", () => {
      const result = buildPrompt(
        makeContext({
          checklist_notes: {
            device_and_ip:
              "Device fingerprint matched on Mar 15 and Mar 28 purchases",
          },
          narrative_only_items: [
            {
              key: "device_and_ip",
              item: "Device identifier and IP address of the transaction",
              fallback: "Standard fallback text that should NOT appear",
            },
          ],
        })
      );
      expect(result.user).toContain("NARRATIVE-ONLY ASSERTIONS");
      expect(result.user).toContain(
        "Device fingerprint matched on Mar 15 and Mar 28 purchases"
      );
      expect(result.user).toContain("(merchant's own words)");
      expect(result.user).not.toContain("Standard fallback text that should NOT appear");
    });

    it("uses per-playbook fallback when no merchant note present", () => {
      const result = buildPrompt(
        makeContext({
          checklist_notes: {},
          narrative_only_items: [
            {
              key: "currency_conversion",
              item: "Currency conversion documentation",
              fallback:
                "Any difference falls within Mastercard's currency conversion allowance.",
            },
          ],
        })
      );
      expect(result.user).toContain("NARRATIVE-ONLY ASSERTIONS");
      expect(result.user).toContain(
        "Any difference falls within Mastercard's currency conversion allowance."
      );
      expect(result.user).toContain("(standard assertion for this reason code)");
    });

    it("skips items with neither merchant note nor fallback", () => {
      const result = buildPrompt(
        makeContext({
          checklist_notes: {},
          narrative_only_items: [
            { key: "test_no_fallback", item: "Item with no fallback and no note" },
          ],
        })
      );
      expect(result.user).toContain("NARRATIVE-ONLY ASSERTIONS");
      expect(result.user).toContain("(none for this reason code)");
      expect(result.user).not.toContain("Item with no fallback and no note");
    });

    it("renders empty placeholder when narrative_only_items is undefined", () => {
      const result = buildPrompt(makeContext());
      expect(result.user).toContain("NARRATIVE-ONLY ASSERTIONS");
      expect(result.user).toContain("(none for this reason code)");
    });
  });
});
