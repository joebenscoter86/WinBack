import { getReasonLabel, getPreventionTip } from "./prevention-tips";

export interface DisputeRow {
  status: string;
  reason_code: string;
  created_at: string;
}

export interface OverallStats {
  won: number;
  lost: number;
  total_resolved: number;
  total_disputes: number;
  win_rate: number | null;
}

export interface ReasonStats {
  reason_code: string;
  label: string;
  won: number;
  lost: number;
  total_resolved: number;
  win_rate: number;
}

export interface Pattern {
  reason_code: string;
  label: string;
  count: number;
  window_days: number;
  prevention_tip: string;
}

export interface InsightsResult {
  overall: OverallStats;
  by_reason: ReasonStats[];
  patterns: Pattern[];
}

const PATTERN_WINDOW_DAYS = 90;
const PATTERN_MIN_COUNT = 3;
const PATTERN_MAX_RESULTS = 3;

interface ComputeOptions {
  /** Reference time for the pattern window. Defaults to `new Date()`. */
  now?: Date;
}

export function computeInsights(
  disputes: DisputeRow[],
  opts: ComputeOptions = {},
): InsightsResult {
  const now = opts.now ?? new Date();

  let overallWon = 0;
  let overallLost = 0;
  const byReason = new Map<string, { won: number; lost: number }>();

  for (const d of disputes) {
    if (d.status === "won") {
      overallWon++;
      const bucket = byReason.get(d.reason_code) ?? { won: 0, lost: 0 };
      bucket.won++;
      byReason.set(d.reason_code, bucket);
    } else if (d.status === "lost") {
      overallLost++;
      const bucket = byReason.get(d.reason_code) ?? { won: 0, lost: 0 };
      bucket.lost++;
      byReason.set(d.reason_code, bucket);
    }
  }

  const totalResolved = overallWon + overallLost;
  const overall: OverallStats = {
    won: overallWon,
    lost: overallLost,
    total_resolved: totalResolved,
    total_disputes: disputes.length,
    win_rate: totalResolved === 0 ? null : overallWon / totalResolved,
  };

  const by_reason: ReasonStats[] = Array.from(byReason.entries())
    .map(([reasonCode, { won, lost }]) => ({
      reason_code: reasonCode,
      label: getReasonLabel(reasonCode),
      won,
      lost,
      total_resolved: won + lost,
      win_rate: won / (won + lost),
    }))
    .sort((a, b) => b.total_resolved - a.total_resolved);

  const windowStart = now.getTime() - PATTERN_WINDOW_DAYS * 86_400_000;
  const recentByReason = new Map<string, number>();
  for (const d of disputes) {
    const created = Date.parse(d.created_at);
    if (Number.isNaN(created) || created < windowStart) continue;
    recentByReason.set(d.reason_code, (recentByReason.get(d.reason_code) ?? 0) + 1);
  }

  const patterns: Pattern[] = Array.from(recentByReason.entries())
    .filter(([, count]) => count >= PATTERN_MIN_COUNT)
    .map(([reasonCode, count]) => {
      const tip = getPreventionTip(reasonCode);
      return tip
        ? {
            reason_code: reasonCode,
            label: getReasonLabel(reasonCode),
            count,
            window_days: PATTERN_WINDOW_DAYS,
            prevention_tip: tip,
          }
        : null;
    })
    .filter((p): p is Pattern => p !== null)
    .sort((a, b) => b.count - a.count)
    .slice(0, PATTERN_MAX_RESULTS);

  return { overall, by_reason, patterns };
}
