import { describe, it, expect } from "vitest";
import { validateHallucinations } from "../validate-hallucinations";
import type { NarrativeOutput, EvidenceFileRef } from "../../prompts/types";

describe("validateHallucinations", () => {
  it("returns narrative unchanged when all evidence keys are present in uploaded files", () => {
    const output: NarrativeOutput = {
      narrative:
        'The merchant provided a tracking number confirming delivery. See "tracking_number" for proof of shipment.\n\n**Delivery Evidence**\n\nDelivery was confirmed on the expected date.',
      annotations: [
        {
          section: "Delivery Evidence",
          reasoning: "Tracking confirms delivery to cardholder address.",
        },
      ],
    };

    const evidenceFiles: EvidenceFileRef[] = [
      { checklist_item_key: "tracking_number", file_name: "tracking.pdf" },
    ];

    const result = validateHallucinations(output, evidenceFiles);

    expect(result.narrative).toEqual(output);
    expect(result.strippedReferences).toEqual([]);
  });

  it("strips sentences referencing evidence keys not in uploaded files", () => {
    const output: NarrativeOutput = {
      narrative:
        'The merchant provided a tracking number confirming delivery. See "tracking_number" for proof of shipment.\nA refund was issued as shown in "refund_receipt".\n\n**Delivery Evidence**\n\nDelivery was confirmed on the expected date.',
      annotations: [
        {
          section: "Delivery Evidence",
          reasoning: "Tracking confirms delivery to cardholder address.",
        },
      ],
    };

    const evidenceFiles: EvidenceFileRef[] = [
      { checklist_item_key: "tracking_number", file_name: "tracking.pdf" },
    ];

    const result = validateHallucinations(output, evidenceFiles);

    expect(result.strippedReferences).toContain("refund_receipt");
    expect(result.narrative.narrative).not.toContain("refund_receipt");
    expect(result.narrative.narrative).toContain("tracking_number");
  });

  it("handles narrative with no quoted evidence key references (pure prose)", () => {
    const output: NarrativeOutput = {
      narrative:
        "The merchant fulfilled the order in good faith. The customer received the goods and the transaction was legitimate. There is no basis for the dispute.",
      annotations: [
        {
          section: "Transaction Summary",
          reasoning: "Order was fulfilled and goods received.",
        },
      ],
    };

    const evidenceFiles: EvidenceFileRef[] = [
      { checklist_item_key: "tracking_number", file_name: "tracking.pdf" },
    ];

    const result = validateHallucinations(output, evidenceFiles);

    expect(result.narrative).toEqual(output);
    expect(result.strippedReferences).toEqual([]);
  });

  it("handles empty evidence files list by stripping all quoted key references", () => {
    const output: NarrativeOutput = {
      narrative:
        'The merchant provided documentation. See "tracking_number" for shipping proof. The "signed_delivery_confirmation" confirms receipt.\n\n**Evidence Summary**\n\nAll evidence was reviewed.',
      annotations: [
        {
          section: "Evidence Summary",
          reasoning: "Multiple pieces of evidence reviewed.",
        },
      ],
    };

    const evidenceFiles: EvidenceFileRef[] = [];

    const result = validateHallucinations(output, evidenceFiles);

    expect(result.strippedReferences).toContain("tracking_number");
    expect(result.strippedReferences).toContain("signed_delivery_confirmation");
    expect(result.narrative.narrative).not.toContain("tracking_number");
    expect(result.narrative.narrative).not.toContain(
      "signed_delivery_confirmation",
    );
  });
});
