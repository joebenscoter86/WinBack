import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import type { Baseline, FixtureScore } from "./types";

const BASELINE_DIR = join(__dirname, "baselines");

function baselinePath(fixtureId: string): string {
  return join(BASELINE_DIR, `${fixtureId}.json`);
}

export async function loadBaseline(
  fixtureId: string,
): Promise<Baseline | null> {
  try {
    const raw = await readFile(baselinePath(fixtureId), "utf-8");
    return JSON.parse(raw) as Baseline;
  } catch {
    return null;
  }
}

export async function writeBaseline(score: FixtureScore): Promise<void> {
  const criteria: Record<string, boolean> = {};
  for (const c of score.criteria) criteria[c.name] = c.pass;
  const baseline: Baseline = {
    fixtureId: score.fixtureId,
    criteria,
    wordCount: score.wordCount,
    generatedAt: new Date().toISOString(),
  };
  const path = baselinePath(score.fixtureId);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(baseline, null, 2) + "\n", "utf-8");
}

export interface Regression {
  criterion: string;
  baselineValue: boolean;
  currentValue: boolean;
}

/**
 * A regression is a criterion that was passing in the baseline and now fails.
 * Criteria that were already failing are tracked as known issues, not
 * regressions -- they'll surface in the main pass/fail output.
 */
export function detectRegressions(
  baseline: Baseline,
  score: FixtureScore,
): Regression[] {
  const regressions: Regression[] = [];
  for (const c of score.criteria) {
    const baselineValue = baseline.criteria[c.name];
    if (baselineValue === true && c.pass === false) {
      regressions.push({
        criterion: c.name,
        baselineValue,
        currentValue: c.pass,
      });
    }
  }
  return regressions;
}
