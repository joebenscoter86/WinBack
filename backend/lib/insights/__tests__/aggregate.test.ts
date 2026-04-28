import { describe, it, expect } from "vitest";
import { computeInsights, type DisputeRow } from "../aggregate";

function row(overrides: Partial<DisputeRow>): DisputeRow {
  return {
    status: "needs_response",
    reason_code: "fraudulent",
    created_at: "2026-04-01T00:00:00Z",
    ...overrides,
  };
}

describe("computeInsights", () => {
  describe("overall win rate", () => {
    it("returns null win rate and zero counts when there are no disputes", () => {
      const result = computeInsights([], { now: new Date("2026-04-27T00:00:00Z") });

      expect(result.overall.won).toBe(0);
      expect(result.overall.lost).toBe(0);
      expect(result.overall.total_resolved).toBe(0);
      expect(result.overall.win_rate).toBeNull();
    });

    it("returns null win rate when no disputes have resolved yet", () => {
      const result = computeInsights(
        [
          row({ status: "needs_response" }),
          row({ status: "under_review" }),
        ],
        { now: new Date("2026-04-27T00:00:00Z") },
      );

      expect(result.overall.total_resolved).toBe(0);
      expect(result.overall.win_rate).toBeNull();
    });

    it("calculates win rate from won and lost disputes only", () => {
      const result = computeInsights(
        [
          row({ status: "won" }),
          row({ status: "won" }),
          row({ status: "won" }),
          row({ status: "lost" }),
          row({ status: "needs_response" }),
        ],
        { now: new Date("2026-04-27T00:00:00Z") },
      );

      expect(result.overall.won).toBe(3);
      expect(result.overall.lost).toBe(1);
      expect(result.overall.total_resolved).toBe(4);
      expect(result.overall.win_rate).toBe(0.75);
    });

    it("excludes warning_closed and charge_refunded from the win-rate denominator", () => {
      const result = computeInsights(
        [
          row({ status: "won" }),
          row({ status: "lost" }),
          row({ status: "warning_closed" }),
          row({ status: "charge_refunded" }),
        ],
        { now: new Date("2026-04-27T00:00:00Z") },
      );

      expect(result.overall.total_resolved).toBe(2);
      expect(result.overall.win_rate).toBe(0.5);
    });

    it("returns 1.0 for all wins and 0.0 for all losses", () => {
      const allWins = computeInsights(
        [row({ status: "won" }), row({ status: "won" })],
        { now: new Date("2026-04-27T00:00:00Z") },
      );
      expect(allWins.overall.win_rate).toBe(1);

      const allLosses = computeInsights(
        [row({ status: "lost" }), row({ status: "lost" })],
        { now: new Date("2026-04-27T00:00:00Z") },
      );
      expect(allLosses.overall.win_rate).toBe(0);
    });
  });

  describe("per-reason breakdown", () => {
    it("groups won/lost by reason code with per-reason win rate", () => {
      const result = computeInsights(
        [
          row({ status: "won", reason_code: "product_not_received" }),
          row({ status: "won", reason_code: "product_not_received" }),
          row({ status: "won", reason_code: "product_not_received" }),
          row({ status: "lost", reason_code: "product_not_received" }),
          row({ status: "won", reason_code: "fraudulent" }),
          row({ status: "lost", reason_code: "fraudulent" }),
        ],
        { now: new Date("2026-04-27T00:00:00Z") },
      );

      const pnr = result.by_reason.find((r) => r.reason_code === "product_not_received");
      expect(pnr).toBeDefined();
      expect(pnr!.won).toBe(3);
      expect(pnr!.lost).toBe(1);
      expect(pnr!.win_rate).toBe(0.75);
      expect(pnr!.label).toBe("Product not received");

      const fraud = result.by_reason.find((r) => r.reason_code === "fraudulent");
      expect(fraud).toBeDefined();
      expect(fraud!.win_rate).toBe(0.5);
      expect(fraud!.label).toBe("Fraudulent");
    });

    it("omits reasons that have no resolved disputes", () => {
      const result = computeInsights(
        [
          row({ status: "needs_response", reason_code: "fraudulent" }),
          row({ status: "won", reason_code: "duplicate" }),
        ],
        { now: new Date("2026-04-27T00:00:00Z") },
      );

      expect(result.by_reason.find((r) => r.reason_code === "fraudulent")).toBeUndefined();
      expect(result.by_reason.find((r) => r.reason_code === "duplicate")).toBeDefined();
    });

    it("sorts by_reason by total resolved disputes descending", () => {
      const result = computeInsights(
        [
          row({ status: "won", reason_code: "fraudulent" }),
          row({ status: "won", reason_code: "product_not_received" }),
          row({ status: "won", reason_code: "product_not_received" }),
          row({ status: "lost", reason_code: "product_not_received" }),
        ],
        { now: new Date("2026-04-27T00:00:00Z") },
      );

      expect(result.by_reason[0].reason_code).toBe("product_not_received");
      expect(result.by_reason[1].reason_code).toBe("fraudulent");
    });
  });

  describe("pattern detection", () => {
    const NOW = new Date("2026-04-27T00:00:00Z");
    const recent = (daysAgo: number) =>
      new Date(NOW.getTime() - daysAgo * 86_400_000).toISOString();

    it("returns no patterns when fewer than 3 of any reason in the window", () => {
      const result = computeInsights(
        [
          row({ reason_code: "product_not_received", created_at: recent(5) }),
          row({ reason_code: "product_not_received", created_at: recent(10) }),
          row({ reason_code: "fraudulent", created_at: recent(15) }),
        ],
        { now: NOW },
      );

      expect(result.patterns).toEqual([]);
    });

    it("detects a pattern when 3+ disputes share a reason within the 90-day window", () => {
      const result = computeInsights(
        [
          row({ reason_code: "product_not_received", created_at: recent(5) }),
          row({ reason_code: "product_not_received", created_at: recent(20) }),
          row({ reason_code: "product_not_received", created_at: recent(60) }),
          row({ reason_code: "fraudulent", created_at: recent(10) }),
        ],
        { now: NOW },
      );

      expect(result.patterns).toHaveLength(1);
      expect(result.patterns[0].reason_code).toBe("product_not_received");
      expect(result.patterns[0].count).toBe(3);
      expect(result.patterns[0].label).toBe("Product not received");
      expect(result.patterns[0].prevention_tip).toBeTruthy();
    });

    it("excludes disputes older than the 90-day window from pattern counts", () => {
      const result = computeInsights(
        [
          row({ reason_code: "product_not_received", created_at: recent(5) }),
          row({ reason_code: "product_not_received", created_at: recent(20) }),
          row({ reason_code: "product_not_received", created_at: recent(120) }),
        ],
        { now: NOW },
      );

      expect(result.patterns).toEqual([]);
    });

    it("counts in-flight and resolved disputes equally for pattern detection", () => {
      const result = computeInsights(
        [
          row({ reason_code: "fraudulent", status: "needs_response", created_at: recent(2) }),
          row({ reason_code: "fraudulent", status: "won", created_at: recent(20) }),
          row({ reason_code: "fraudulent", status: "lost", created_at: recent(40) }),
        ],
        { now: NOW },
      );

      expect(result.patterns).toHaveLength(1);
      expect(result.patterns[0].count).toBe(3);
    });

    it("counts inquiry (warning_*) statuses toward pattern detection", () => {
      const result = computeInsights(
        [
          row({ reason_code: "fraudulent", status: "warning_needs_response", created_at: recent(2) }),
          row({ reason_code: "fraudulent", status: "warning_under_review", created_at: recent(10) }),
          row({ reason_code: "fraudulent", status: "warning_closed", created_at: recent(30) }),
        ],
        { now: NOW },
      );

      expect(result.patterns).toHaveLength(1);
      expect(result.patterns[0].count).toBe(3);
    });

    it("returns at most the top 3 patterns sorted by count", () => {
      const disputes: DisputeRow[] = [];
      const reasons = ["fraudulent", "product_not_received", "duplicate", "credit_not_processed"];
      const counts = [5, 4, 3, 3];
      reasons.forEach((reason, idx) => {
        for (let i = 0; i < counts[idx]; i++) {
          disputes.push(row({ reason_code: reason, created_at: recent(i + 1) }));
        }
      });

      const result = computeInsights(disputes, { now: NOW });

      expect(result.patterns).toHaveLength(3);
      expect(result.patterns[0].reason_code).toBe("fraudulent");
      expect(result.patterns[0].count).toBe(5);
      expect(result.patterns[1].reason_code).toBe("product_not_received");
    });

    it("does not surface a pattern for reasons without a known prevention tip", () => {
      const result = computeInsights(
        [
          row({ reason_code: "general", created_at: recent(2) }),
          row({ reason_code: "general", created_at: recent(5) }),
          row({ reason_code: "general", created_at: recent(10) }),
        ],
        { now: NOW },
      );

      expect(result.patterns).toEqual([]);
    });
  });
});
