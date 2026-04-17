import { describe, it, expect } from "vitest";
import type Stripe from "stripe";
import { evaluateSubmissionGuard } from "./submission-guard";
import type { PlaybookData } from "../playbooks/types";

function mkDispute(overrides: Partial<Stripe.Dispute> = {}): Stripe.Dispute {
  return {
    id: "dp_1",
    status: "needs_response",
    evidence_details: { due_by: Math.floor(Date.now() / 1000) + 86_400 * 3 },
    ...overrides,
  } as unknown as Stripe.Dispute;
}

function mkPlaybook(): PlaybookData {
  return {
    network: "visa",
    reason_code: "10.4",
    evidence_checklist: [
      {
        key: "Mandatory A",
        item: "Mandatory A",
        category: "mandatory",
        context: "all",
        required: true,
        why_matters: "",
        stripe_evidence_field: "customer_communication",
        urgency_essential: true,
        urgency_order: 1,
      },
    ],
  } as unknown as PlaybookData;
}

describe("evaluateSubmissionGuard", () => {
  it.each(["needs_response", "warning_needs_response"] as const)(
    "allows when status is %s with evidence present",
    (status) => {
      const result = evaluateSubmissionGuard({
        stripeDispute: mkDispute({ status }),
        playbook: mkPlaybook(),
        evidenceFiles: [{ checklist_item_key: "Mandatory A" }],
        narrativeText: "defense",
      });
      expect(result.action).toBe("allow");
      expect(result.warnings).toEqual([]);
    },
  );

  it.each(["under_review", "won", "lost", "warning_closed", "charge_refunded"] as const)(
    "blocks when status is %s",
    (status) => {
      const result = evaluateSubmissionGuard({
        stripeDispute: mkDispute({ status }),
        playbook: mkPlaybook(),
        evidenceFiles: [{ checklist_item_key: "Mandatory A" }],
        narrativeText: "defense",
      });
      expect(result.action).toBe("block");
      expect(result.blockCode).toBe("dispute_not_submittable");
      expect(result.blockMessage).toContain(status);
    },
  );

  it("warns (not blocks) when due_by is in the past", () => {
    const past = Math.floor(Date.now() / 1000) - 86_400;
    const result = evaluateSubmissionGuard({
      stripeDispute: mkDispute({ evidence_details: { due_by: past } as never }),
      playbook: mkPlaybook(),
      evidenceFiles: [{ checklist_item_key: "Mandatory A" }],
      narrativeText: "defense",
    });
    expect(result.action).toBe("allow");
    expect(result.warnings).toContainEqual(
      expect.objectContaining({ code: "deadline_passed", due_by: past }),
    );
  });

  it("warns when mandatory items have no evidence file", () => {
    const result = evaluateSubmissionGuard({
      stripeDispute: mkDispute(),
      playbook: mkPlaybook(),
      evidenceFiles: [],
      narrativeText: "defense",
    });
    expect(result.action).toBe("allow");
    expect(result.warnings).toContainEqual(
      expect.objectContaining({ code: "missing_mandatory_items", items: ["Mandatory A"] }),
    );
  });

  it("silently passes narrative_only mandatory items (no missing_mandatory_items warning)", () => {
    const playbook = {
      network: "visa",
      reason_code: "10.4",
      evidence_checklist: [
        {
          key: "IP match",
          item: "IP match",
          category: "mandatory" as const,
          context: "all",
          required: true,
          why_matters: "",
          where_to_find: "",
          narrative_only: true,
          urgency_essential: true,
          urgency_order: 1,
        },
        {
          key: "Delivery",
          item: "Delivery",
          category: "mandatory" as const,
          context: "all",
          required: true,
          why_matters: "",
          where_to_find: "",
          stripe_evidence_field: "shipping_documentation" as const,
          urgency_essential: true,
          urgency_order: 2,
        },
      ],
    } as unknown as Parameters<typeof evaluateSubmissionGuard>[0]["playbook"];

    const result = evaluateSubmissionGuard({
      stripeDispute: { status: "needs_response", evidence_details: { due_by: Math.floor(Date.now() / 1000) + 100000 } } as unknown as Parameters<typeof evaluateSubmissionGuard>[0]["stripeDispute"],
      playbook,
      evidenceFiles: [
        { checklist_item_key: "Delivery" },
      ],
      narrativeText: "something",
    });

    expect(result.action).toBe("allow");
    const missing = result.warnings.filter((w) => w.code === "missing_mandatory_items");
    expect(missing).toHaveLength(0);
  });

  it("blocks with validation_failed when evidence AND narrative are both empty", () => {
    const result = evaluateSubmissionGuard({
      stripeDispute: mkDispute(),
      playbook: mkPlaybook(),
      evidenceFiles: [],
      narrativeText: null,
    });
    expect(result.action).toBe("block");
    expect(result.blockCode).toBe("validation_failed");
  });

  it("handles missing evidence_details entirely (no deadline warning, no block)", () => {
    const result = evaluateSubmissionGuard({
      stripeDispute: mkDispute({ evidence_details: null as never }),
      playbook: mkPlaybook(),
      evidenceFiles: [{ checklist_item_key: "Mandatory A" }],
      narrativeText: "defense",
    });
    expect(result.action).toBe("allow");
    expect(result.warnings.find((w) => w.code === "deadline_passed")).toBeUndefined();
  });
});
