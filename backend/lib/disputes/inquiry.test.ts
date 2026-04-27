import { describe, it, expect } from "vitest";
import { isInquiry, isInquiryToChargebackEscalation } from "./inquiry";

describe("isInquiry", () => {
  it.each([
    ["warning_needs_response", true],
    ["warning_under_review", true],
    ["warning_closed", true],
    ["needs_response", false],
    ["under_review", false],
    ["won", false],
    ["lost", false],
    ["charge_refunded", false],
  ])("returns %s for status %s", (status, expected) => {
    expect(isInquiry(status as string)).toBe(expected);
  });
});

describe("isInquiryToChargebackEscalation", () => {
  it("returns true for warning_needs_response → needs_response", () => {
    expect(isInquiryToChargebackEscalation("warning_needs_response", "needs_response")).toBe(true);
  });

  it("returns true for warning_under_review → needs_response", () => {
    expect(isInquiryToChargebackEscalation("warning_under_review", "needs_response")).toBe(true);
  });

  it("returns true for warning_closed → needs_response", () => {
    // Edge: a closed inquiry that escalates. Stripe generally creates a new
    // dispute, but the predicate is one-directional and should still fire.
    expect(isInquiryToChargebackEscalation("warning_closed", "needs_response")).toBe(true);
  });

  it("returns false for same-status no-op (warning_needs_response → warning_needs_response)", () => {
    expect(
      isInquiryToChargebackEscalation("warning_needs_response", "warning_needs_response"),
    ).toBe(false);
  });

  it("returns false for warning_* → warning_closed (inquiry resolved without escalation)", () => {
    expect(isInquiryToChargebackEscalation("warning_needs_response", "warning_closed")).toBe(false);
  });

  it("returns false for chargeback → chargeback (needs_response → under_review)", () => {
    expect(isInquiryToChargebackEscalation("needs_response", "under_review")).toBe(false);
  });

  it("returns false for null oldStatus", () => {
    expect(isInquiryToChargebackEscalation(null, "needs_response")).toBe(false);
  });

  it("returns false for undefined oldStatus", () => {
    expect(isInquiryToChargebackEscalation(undefined, "needs_response")).toBe(false);
  });

  it("returns false for empty string oldStatus", () => {
    expect(isInquiryToChargebackEscalation("", "needs_response")).toBe(false);
  });
});
