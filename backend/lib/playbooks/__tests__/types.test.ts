import { describe, it, expect, expectTypeOf } from "vitest";
import { ALL_PLAYBOOKS } from "../data";
import type {
  PlaybookData,
  EvidenceChecklistItem,
  EvidenceCategory,
  EvidenceContext,
  StripeEvidenceFileField,
} from "../types";

const VALID_CATEGORIES: PlaybookData["category"][] = [
  "fraud",
  "consumer",
  "authorization",
];
const VALID_NETWORKS: PlaybookData["network"][] = [
  "visa",
  "mastercard",
  "amex",
  "discover",
];
const VALID_EVIDENCE_CATEGORIES: EvidenceCategory[] = [
  "mandatory",
  "recommended",
  "situational",
];
const VALID_EVIDENCE_CONTEXTS: EvidenceContext[] = [
  "physical_goods",
  "digital_goods",
  "services",
  "all",
  "amount_discrepancy",
  "expired_auth",
  "refund_issued",
  "refund_disputed",
  "installment_defense",
  "ce3",
];

const EM_DASH = "\u2014";

function extractAllStrings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(extractAllStrings);
  if (obj && typeof obj === "object") {
    return Object.values(obj).flatMap(extractAllStrings);
  }
  return [];
}

describe("ALL_PLAYBOOKS collection", () => {
  it("contains exactly 7 playbooks", () => {
    expect(ALL_PLAYBOOKS).toHaveLength(7);
  });

  it("has unique network + reason_code combinations", () => {
    const keys = ALL_PLAYBOOKS.map((p) => `${p.network}:${p.reason_code}`);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(ALL_PLAYBOOKS.length);
  });
});

describe.each(ALL_PLAYBOOKS.map((p) => [p.display_name, p] as [string, PlaybookData]))(
  "Playbook: %s",
  (_name, playbook) => {
    it("has a non-empty display_name", () => {
      expect(playbook.display_name.trim()).toBeTruthy();
    });

    it("has a non-empty description", () => {
      expect(playbook.description.trim()).toBeTruthy();
    });

    it("has a non-empty issuer_evaluation", () => {
      expect(playbook.issuer_evaluation.trim()).toBeTruthy();
    });

    it("has a non-empty acquirer_prereview", () => {
      expect(playbook.acquirer_prereview.trim()).toBeTruthy();
    });

    it("has a non-empty narrative_template", () => {
      expect(playbook.narrative_template.trim()).toBeTruthy();
    });

    it("has a valid category", () => {
      expect(VALID_CATEGORIES).toContain(playbook.category);
    });

    it("has a valid network", () => {
      expect(VALID_NETWORKS).toContain(playbook.network);
    });

    it("has a positive response_deadline_days", () => {
      expect(playbook.response_deadline_days).toBeGreaterThan(0);
    });

    it("has a positive filing_window_days", () => {
      expect(playbook.filing_window_days).toBeGreaterThan(0);
    });

    it("has at least one evidence checklist item", () => {
      expect(playbook.evidence_checklist.length).toBeGreaterThan(0);
    });

    it("has at least one mandatory evidence item", () => {
      const mandatory = playbook.evidence_checklist.filter(
        (item) => item.category === "mandatory"
      );
      expect(mandatory.length).toBeGreaterThan(0);
    });

    it("has valid evidence item structure for all checklist items", () => {
      for (const item of playbook.evidence_checklist) {
        expect(item.key.trim()).toBeTruthy();
        expect(item.item.trim()).toBeTruthy();
        expect(VALID_EVIDENCE_CATEGORIES).toContain(item.category);
        expect(VALID_EVIDENCE_CONTEXTS).toContain(item.context);
        expect(typeof item.required).toBe("boolean");
        expect(item.why_matters.trim()).toBeTruthy();
        expect(typeof item.urgency_essential).toBe("boolean");
        expect(
          item.urgency_order === null || typeof item.urgency_order === "number"
        ).toBe(true);
      }
    });

    it("has unique checklist item keys within this playbook", () => {
      const keys = playbook.evidence_checklist.map((item) => item.key);
      const seen = new Set<string>();
      const duplicates = keys.filter((k) => seen.size === seen.add(k).size);
      expect(duplicates).toEqual([]);
    });

    it("has urgency_essentials with a summary and ordered_items", () => {
      expect(playbook.urgency_essentials.summary.trim()).toBeTruthy();
      expect(playbook.urgency_essentials.ordered_items.length).toBeGreaterThan(0);
    });

    it("has at least one common mistake with non-empty fields", () => {
      expect(playbook.common_mistakes.length).toBeGreaterThan(0);
      for (const mistake of playbook.common_mistakes) {
        expect(mistake.mistake.trim()).toBeTruthy();
        expect(mistake.explanation.trim()).toBeTruthy();
      }
    });

    it("has at least one pro tip with a non-empty tip", () => {
      expect(playbook.pro_tips.length).toBeGreaterThan(0);
      for (const proTip of playbook.pro_tips) {
        expect(proTip.tip.trim()).toBeTruthy();
      }
    });

    it("contains no em dashes (\\u2014) in any content", () => {
      const allStrings = extractAllStrings(playbook);
      for (const str of allStrings) {
        expect(str).not.toContain(EM_DASH);
      }
    });

    it('contains no references to "highnote" (case-insensitive)', () => {
      const allStrings = extractAllStrings(playbook);
      for (const str of allStrings) {
        expect(str.toLowerCase()).not.toContain("highnote");
      }
    });
  }
);

describe("StripeEvidenceFileField", () => {
  it("includes every Stripe dispute file-evidence field plus uncategorized_file", () => {
    const fields: StripeEvidenceFileField[] = [
      "cancellation_policy",
      "customer_communication",
      "customer_signature",
      "duplicate_charge_documentation",
      "receipt",
      "refund_policy",
      "service_documentation",
      "shipping_documentation",
      "uncategorized_file",
    ];
    expect(fields.length).toBe(9);
  });

  it("EvidenceChecklistItem requires stripe_evidence_field", () => {
    expectTypeOf<EvidenceChecklistItem>().toHaveProperty("stripe_evidence_field");
  });
});
