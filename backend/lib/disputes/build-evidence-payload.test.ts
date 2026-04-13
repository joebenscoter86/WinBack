import { describe, it, expect } from "vitest";
import type Stripe from "stripe";
import { buildEvidencePayload } from "./build-evidence-payload";
import type { PlaybookData } from "../playbooks/types";

function mkPlaybook(overrides: Partial<PlaybookData> = {}): PlaybookData {
  return {
    network: "visa",
    reason_code: "10.4",
    display_name: "Fraud CNP",
    category: "fraud",
    legacy_code: null,
    description: "",
    coach_headline: "",
    coach_summary: "",
    coach_issuer_summary: "",
    coach_acquirer_summary: "",
    issuer_evaluation: "",
    acquirer_prereview: "",
    evidence_checklist: [],
    common_mistakes: [],
    pro_tips: [],
    urgency_essentials: { summary: "", ordered_items: [] },
    narrative_template: "",
    response_deadline_days: 30,
    filing_window_days: 120,
    key_differences: null,
    ...overrides,
  };
}

function mkCharge(overrides: Partial<Stripe.Charge> = {}): Stripe.Charge {
  return {
    id: "ch_test",
    object: "charge",
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      address: {
        line1: "123 Main St",
        line2: null,
        city: "Brooklyn",
        state: "NY",
        postal_code: "11201",
        country: "US",
      },
      phone: null,
    },
    description: "Widget subscription",
    ...overrides,
  } as unknown as Stripe.Charge;
}

describe("buildEvidencePayload", () => {
  it("auto-populates customer fields from charge.billing_details", () => {
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: mkPlaybook(),
      evidenceFiles: [],
      narrativeText: null,
      charge: mkCharge(),
    });
    expect(result.evidence.customer_name).toBe("Jane Doe");
    expect(result.evidence.customer_email_address).toBe("jane@example.com");
    expect(result.evidence.billing_address).toContain("123 Main St");
    expect(result.evidence.billing_address).toContain("Brooklyn");
    expect(result.evidence.product_description).toBe("Widget subscription");
  });

  it("puts narrativeText into uncategorized_text", () => {
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: mkPlaybook(),
      evidenceFiles: [],
      narrativeText: "Hello issuer, this is our defense.",
      charge: mkCharge(),
    });
    expect(result.evidence.uncategorized_text).toBe(
      "Hello issuer, this is our defense.",
    );
  });

  it("truncates uncategorized_text at 20,000 chars and warns", () => {
    const long = "a".repeat(25_000);
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: mkPlaybook(),
      evidenceFiles: [],
      narrativeText: long,
      charge: mkCharge(),
    });
    expect(result.evidence.uncategorized_text?.length).toBe(20_000);
    expect(result.warnings).toContainEqual(
      expect.objectContaining({ code: "field_truncated", field: "uncategorized_text" }),
    );
  });

  it("maps file evidence by stripe_evidence_field from playbook", () => {
    const pb = mkPlaybook({
      evidence_checklist: [
        {
          item: "Shipping proof",
          category: "mandatory",
          context: "all",
          required: true,
          why_matters: "",
          stripe_evidence_field: "shipping_documentation",
          urgency_essential: true,
          urgency_order: 1,
        },
      ],
    });
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: pb,
      evidenceFiles: [
        { checklist_item_key: "Shipping proof", stripe_file_id: "file_123" },
      ],
      narrativeText: null,
      charge: mkCharge(),
    });
    expect(result.evidence.shipping_documentation).toBe("file_123");
  });

  it("resolves collisions: lower urgency_order wins, loser -> uncategorized_file", () => {
    const pb = mkPlaybook({
      evidence_checklist: [
        {
          item: "Email thread",
          category: "mandatory",
          context: "all",
          required: true,
          why_matters: "",
          stripe_evidence_field: "customer_communication",
          urgency_essential: true,
          urgency_order: 1,
        },
        {
          item: "Support ticket",
          category: "recommended",
          context: "all",
          required: false,
          why_matters: "",
          stripe_evidence_field: "customer_communication",
          urgency_essential: false,
          urgency_order: 3,
        },
      ],
    });
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: pb,
      evidenceFiles: [
        { checklist_item_key: "Email thread", stripe_file_id: "file_A" },
        { checklist_item_key: "Support ticket", stripe_file_id: "file_B" },
      ],
      narrativeText: null,
      charge: mkCharge(),
    });
    expect(result.evidence.customer_communication).toBe("file_A");
    expect(result.evidence.uncategorized_file).toBe("file_B");
    expect(result.warnings).toContainEqual(
      expect.objectContaining({
        code: "field_collision",
        winning_item: "Email thread",
        losing_item: "Support ticket",
        resolution: "uncategorized_file",
      }),
    );
  });

  it("drops second colliding file when uncategorized_file is also taken", () => {
    const pb = mkPlaybook({
      evidence_checklist: [
        { item: "A", category: "mandatory", context: "all", required: true, why_matters: "", stripe_evidence_field: "customer_communication", urgency_essential: true, urgency_order: 1 },
        { item: "B", category: "mandatory", context: "all", required: true, why_matters: "", stripe_evidence_field: "customer_communication", urgency_essential: true, urgency_order: 2 },
        { item: "C", category: "recommended", context: "all", required: false, why_matters: "", stripe_evidence_field: "uncategorized_file", urgency_essential: false, urgency_order: 3 },
      ],
    });
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: pb,
      evidenceFiles: [
        { checklist_item_key: "A", stripe_file_id: "file_A" },
        { checklist_item_key: "B", stripe_file_id: "file_B" },
        { checklist_item_key: "C", stripe_file_id: "file_C" },
      ],
      narrativeText: null,
      charge: mkCharge(),
    });
    expect(result.evidence.customer_communication).toBe("file_A");
    expect(result.evidence.uncategorized_file).toBe("file_C");
    expect(result.warnings).toContainEqual(
      expect.objectContaining({
        code: "field_collision",
        losing_item: "B",
        resolution: "dropped",
      }),
    );
  });

  it("passes through Visa CE 3.0 enhanced_evidence for visa/10.4", () => {
    const result = buildEvidencePayload({
      dispute: {
        id: "dp_1",
        evidence: {
          enhanced_evidence: {
            visa_compelling_evidence_3: {
              disputed_transaction: {},
              prior_undisputed_transactions: [],
            },
          },
        },
      } as never,
      playbook: mkPlaybook({ network: "visa", reason_code: "10.4" }),
      evidenceFiles: [],
      narrativeText: null,
      charge: mkCharge(),
    });
    expect((result.evidence as { enhanced_evidence?: unknown }).enhanced_evidence).toBeDefined();
  });

  it("does NOT set enhanced_evidence for non-10.4 playbooks", () => {
    const result = buildEvidencePayload({
      dispute: {
        id: "dp_1",
        evidence: {
          enhanced_evidence: {
            visa_compelling_evidence_3: { foo: "bar" },
          },
        },
      } as never,
      playbook: mkPlaybook({ reason_code: "13.1" }),
      evidenceFiles: [],
      narrativeText: null,
      charge: mkCharge(),
    });
    expect((result.evidence as { enhanced_evidence?: unknown }).enhanced_evidence).toBeUndefined();
  });

  it("falls back to uncategorized_file when stripe_evidence_field is missing on a playbook item", () => {
    // Simulates the DB-schema-drift case: playbooks row was seeded before
    // WIN-20's backfill and is missing stripe_evidence_field on an item.
    const pb = mkPlaybook({
      evidence_checklist: [
        {
          item: "Stale item without field",
          category: "mandatory",
          context: "all",
          required: true,
          why_matters: "",
          // @ts-expect-error -- simulating missing field at runtime
          stripe_evidence_field: undefined,
          urgency_essential: true,
          urgency_order: 1,
        },
      ],
    });
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: pb,
      evidenceFiles: [
        { checklist_item_key: "Stale item without field", stripe_file_id: "file_stale" },
      ],
      narrativeText: null,
      charge: {
        id: "ch_empty",
        object: "charge",
        billing_details: { name: null, email: null, address: null, phone: null },
        description: null,
      } as unknown as Stripe.Charge,
    });
    // File lands in uncategorized_file, not evidence[undefined]
    expect(result.evidence.uncategorized_file).toBe("file_stale");
    expect((result.evidence as Record<string, unknown>).undefined).toBeUndefined();
    // And a warning is emitted so ops can catch the drift
    expect(result.warnings).toContainEqual({
      code: "stripe_field_missing",
      item: "Stale item without field",
      fallback: "uncategorized_file",
    });
  });

  it("returns empty evidence when no narrative, no files, and charge has no billing details", () => {
    const result = buildEvidencePayload({
      dispute: { id: "dp_1", evidence: {} } as never,
      playbook: mkPlaybook(),
      evidenceFiles: [],
      narrativeText: null,
      charge: {
        id: "ch_empty",
        object: "charge",
        billing_details: { name: null, email: null, address: null, phone: null },
        description: null,
      } as unknown as Stripe.Charge,
    });
    expect(Object.keys(result.evidence).length).toBe(0);
    expect(result.warnings).toEqual([]);
  });
});
