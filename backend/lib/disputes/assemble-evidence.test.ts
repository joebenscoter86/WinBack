import { describe, it, expect, vi } from "vitest";
import { assembleEvidence } from "./assemble-evidence";
import type { PlaybookData, EvidenceChecklistItem } from "../playbooks/types";
import type Stripe from "stripe";

function mockCharge(): Stripe.Charge {
  return {
    id: "ch_test",
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      address: { line1: "123 Main St", city: "Boston", state: "MA", postal_code: "02101", country: "US" },
    },
    payment_method_details: {
      card: {
        checks: {
          address_line1_check: "pass",
          address_postal_code_check: "pass",
          cvc_check: "pass",
        },
        three_d_secure: { result: "authenticated", version: "2.2.0" },
      },
    },
    calculated_statement_descriptor: "JKBTECH LLC",
    refunds: { data: [] },
    description: "Test purchase",
  } as unknown as Stripe.Charge;
}

function baseItem(overrides: Partial<EvidenceChecklistItem> = {}): EvidenceChecklistItem {
  return {
    key: "test_item",
    item: "Test",
    category: "recommended",
    context: "all",
    required: false,
    why_matters: "",
    where_to_find: "",
    urgency_essential: false,
    urgency_order: null,
    ...overrides,
  };
}

function mockPlaybook(items: EvidenceChecklistItem[]): PlaybookData {
  return {
    network: "visa",
    reason_code: "10.4",
    display_name: "Test",
    evidence_checklist: items,
  } as unknown as PlaybookData;
}

function mockStripeClient(overrides: {
  downloadStripeFile?: (id: string) => Promise<Buffer>;
  uploadCombinedEvidence?: (pdf: Buffer, name: string) => Promise<string>;
} = {}) {
  return {
    downloadStripeFile: overrides.downloadStripeFile ?? vi.fn(async (id: string) => Buffer.from(`fake-${id}`)),
    uploadCombinedEvidence: overrides.uploadCombinedEvidence ?? vi.fn(async () => "file_combined_abc"),
  };
}

describe("assembleEvidence", () => {
  it("pulls autofilled fields and narrative into evidence", async () => {
    const playbook = mockPlaybook([baseItem({ item: "AVS", stripe_field: "avs_result" })]);
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [],
      narrativeText: "my narrative",
      stripeClient: mockStripeClient(),
    });
    expect(result.evidence.uncategorized_text).toContain("my narrative");
  });

  it("does not populate any file slot for narrative_only items", async () => {
    const playbook = mockPlaybook([baseItem({ item: "IP match", narrative_only: true })]);
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [],
      narrativeText: "n",
      stripeClient: mockStripeClient(),
    });
    const fileSlotKeys = [
      "receipt", "customer_communication", "shipping_documentation",
      "service_documentation", "customer_signature", "refund_policy",
      "cancellation_policy", "uncategorized_file", "duplicate_charge_documentation",
    ];
    for (const key of fileSlotKeys) expect(result.evidence[key]).toBeUndefined();
  });

  it("passes a single-file slot through without concat", async () => {
    const playbook = mockPlaybook([baseItem({ key: "Delivery", item: "Delivery", stripe_evidence_field: "shipping_documentation" })]);
    const client = mockStripeClient();
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "Delivery", stripe_file_id: "file_existing_1", file_name: "tracking.pdf", file_size: 1000, mime_type: "application/pdf" },
      ],
      narrativeText: "n",
      stripeClient: client,
    });
    expect(result.evidence.shipping_documentation).toBe("file_existing_1");
    expect(client.uploadCombinedEvidence).not.toHaveBeenCalled();
    expect(result.concat_receipts).toHaveLength(0);
  });

  it("concats 2+ files into a single slot via PDF merge + upload", async () => {
    const playbook = mockPlaybook([
      baseItem({ key: "Email", item: "Email", stripe_evidence_field: "customer_communication" }),
      baseItem({ key: "Chat", item: "Chat", stripe_evidence_field: "customer_communication" }),
    ]);
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const jpg = await fs.readFile(path.join(__dirname, "../../__tests__/fixtures/concat/sample.jpg"));
    const downloadSpy = vi.fn(async () => jpg);
    const uploadSpy = vi.fn(async () => "file_merged_xyz");
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "Email", stripe_file_id: "file_1", file_name: "email.jpg", file_size: 1000, mime_type: "image/jpeg" },
        { id: "ef2", checklist_item_key: "Chat", stripe_file_id: "file_2", file_name: "chat.jpg", file_size: 1000, mime_type: "image/jpeg" },
      ],
      narrativeText: "n",
      stripeClient: { downloadStripeFile: downloadSpy, uploadCombinedEvidence: uploadSpy },
    });
    expect(downloadSpy).toHaveBeenCalledTimes(2);
    expect(uploadSpy).toHaveBeenCalledTimes(1);
    expect(result.evidence.customer_communication).toBe("file_merged_xyz");
    expect(result.concat_receipts).toHaveLength(1);
    expect(result.concat_receipts[0]).toMatchObject({
      slot: "customer_communication",
      input_file_ids: ["file_1", "file_2"],
      combined_file_id: "file_merged_xyz",
    });
  });

  it("skips a corrupted file with concat_skipped warning and continues", async () => {
    const playbook = mockPlaybook([
      baseItem({ key: "A", item: "A", stripe_evidence_field: "customer_communication" }),
      baseItem({ key: "B", item: "B", stripe_evidence_field: "customer_communication" }),
    ]);
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const goodJpg = await fs.readFile(path.join(__dirname, "../../__tests__/fixtures/concat/sample.jpg"));
    const badBuf = Buffer.from("not a real image");
    const downloadSpy = vi.fn(async (id: string) => (id === "file_bad" ? badBuf : goodJpg));
    const uploadSpy = vi.fn(async () => "file_merged");
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "A", stripe_file_id: "file_bad", file_name: "bad.jpg", file_size: 100, mime_type: "image/jpeg" },
        { id: "ef2", checklist_item_key: "B", stripe_file_id: "file_ok", file_name: "ok.jpg", file_size: 100, mime_type: "image/jpeg" },
      ],
      narrativeText: "n",
      stripeClient: { downloadStripeFile: downloadSpy, uploadCombinedEvidence: uploadSpy },
    });
    const skipWarnings = result.warnings.filter((w) => w.code === "concat_skipped");
    expect(skipWarnings).toHaveLength(1);
    // After skip, only one file remains — per spec, single-file pass-through.
    expect(result.evidence.customer_communication).toBe("file_ok");
  });

  it("treats files with mime_type 'pdf' (bare extension) as PDFs during concat", async () => {
    const playbook = mockPlaybook([
      baseItem({ key: "A", item: "A", stripe_evidence_field: "service_documentation" }),
      baseItem({ key: "B", item: "B", stripe_evidence_field: "service_documentation" }),
    ]);
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const pdf = await fs.readFile(path.join(__dirname, "../../__tests__/fixtures/concat/sample.pdf"));
    const downloadSpy = vi.fn(async () => pdf);
    const uploadSpy = vi.fn(async () => "file_combined_pdf");
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [
        { id: "ef1", checklist_item_key: "A", stripe_file_id: "file_1", file_name: "a.pdf", file_size: 1000, mime_type: "pdf" },
        { id: "ef2", checklist_item_key: "B", stripe_file_id: "file_2", file_name: "b.pdf", file_size: 1000, mime_type: "pdf" },
      ],
      narrativeText: "n",
      stripeClient: { downloadStripeFile: downloadSpy, uploadCombinedEvidence: uploadSpy },
    });
    const skipWarnings = result.warnings.filter((w) => w.code === "concat_skipped");
    expect(skipWarnings).toHaveLength(0);
    expect(uploadSpy).toHaveBeenCalledTimes(1);
    expect(result.evidence.service_documentation).toBe("file_combined_pdf");
    expect(result.concat_receipts).toHaveLength(1);
  });

  it("truncates narrative to 20000 chars and emits field_truncated warning", async () => {
    const playbook = mockPlaybook([]);
    const longNarrative = "x".repeat(25000);
    const result = await assembleEvidence({
      charge: mockCharge(),
      playbook,
      evidenceFiles: [],
      narrativeText: longNarrative,
      stripeClient: mockStripeClient(),
    });
    expect((result.evidence.uncategorized_text as string).length).toBe(20000);
    const truncWarnings = result.warnings.filter((w) => w.code === "field_truncated");
    expect(truncWarnings).toHaveLength(1);
  });
});
