import { describe, it, expect } from "vitest";
import { validatePlaybookChecklist, PlaybookInvariantError } from "./validate";
import type { EvidenceChecklistItem } from "./types";

function baseItem(overrides: Partial<EvidenceChecklistItem> = {}): EvidenceChecklistItem {
  return {
    key: "test_key",
    item: "Test item",
    category: "recommended",
    context: "all",
    required: false,
    why_matters: "because",
    where_to_find: "somewhere",
    urgency_essential: false,
    urgency_order: null,
    ...overrides,
  };
}

describe("validatePlaybookChecklist", () => {
  it("accepts a stripe_field only item (category A)", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [baseItem({ stripe_field: "authorization" })]),
    ).not.toThrow();
  });

  it("accepts a narrative_only item (category T)", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [baseItem({ narrative_only: true })]),
    ).not.toThrow();
  });

  it("accepts a stripe_evidence_field item (slot upload)", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ stripe_evidence_field: "receipt" }),
      ]),
    ).not.toThrow();
  });

  it("rejects an item with both stripe_field and stripe_evidence_field", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ stripe_field: "authorization", stripe_evidence_field: "uncategorized_file" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });

  it("rejects an item with both narrative_only and stripe_evidence_field", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ narrative_only: true, stripe_evidence_field: "receipt" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });

  it("rejects an item with none of the three", () => {
    expect(() => validatePlaybookChecklist("visa-10.4", [baseItem({})])).toThrow(
      PlaybookInvariantError,
    );
  });

  it("reports the offending item and playbook in the error message", () => {
    try {
      validatePlaybookChecklist("visa-10.4", [baseItem({ item: "bad item" })]);
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(PlaybookInvariantError);
      expect((err as Error).message).toContain("visa-10.4");
      expect((err as Error).message).toContain("bad item");
    }
  });

  it("rejects a playbook with two items sharing the same key", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ key: "shared_key", item: "First", stripe_field: "authorization" }),
        baseItem({ key: "shared_key", item: "Second", stripe_field: "avs_result" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });

  it("rejects a playbook with an empty-string key", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ key: "", stripe_field: "authorization" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });
});
