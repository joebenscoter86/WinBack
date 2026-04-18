import { fixtures } from "./fixtures";
import { runFixture } from "./runner";
import { loadBaseline, writeBaseline, detectRegressions } from "./baseline";
import type { EvalRunOptions, FixtureScore } from "./types";
import type { Regression } from "./baseline";

function parseArgs(argv: string[]): EvalRunOptions {
  const opts: EvalRunOptions = { mock: false, updateBaselines: false };
  for (const arg of argv) {
    if (arg === "--mock") opts.mock = true;
    else if (arg === "--update-baselines") opts.updateBaselines = true;
    else if (arg.startsWith("--only=")) opts.fixtureFilter = arg.slice("--only=".length);
  }
  return opts;
}

function fmtDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function printScore(score: FixtureScore, regressions: Regression[]): void {
  const status = score.pass ? "PASS" : "FAIL";
  console.log(
    `\n[${status}] ${score.fixtureId}  ${score.wordCount} words  ${fmtDuration(score.durationMs)}`,
  );
  for (const c of score.criteria) {
    const mark = c.pass ? "  ok  " : "  FAIL";
    console.log(`  ${mark}  ${c.name.padEnd(22)} ${c.detail}`);
  }
  if (regressions.length > 0) {
    console.log(`  REGRESSIONS vs baseline:`);
    for (const r of regressions) {
      console.log(`    - ${r.criterion}: baseline=pass, current=fail`);
    }
  }
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));
  const selected = opts.fixtureFilter
    ? fixtures.filter((f) => f.id.includes(opts.fixtureFilter!))
    : fixtures;

  if (selected.length === 0) {
    console.error(`No fixtures match filter: ${opts.fixtureFilter}`);
    process.exit(2);
  }

  const mode = opts.mock ? "mock" : "live";
  console.log(
    `Running ${selected.length} eval fixture${selected.length === 1 ? "" : "s"} (${mode}${opts.updateBaselines ? ", updating baselines" : ""})`,
  );

  let totalFailures = 0;
  let totalRegressions = 0;
  let totalCrashes = 0;

  for (const fx of selected) {
    try {
      const score = await runFixture(fx, opts.mock);
      const baseline = await loadBaseline(fx.id);
      const regressions = baseline ? detectRegressions(baseline, score) : [];
      printScore(score, regressions);

      if (!score.pass) totalFailures++;
      totalRegressions += regressions.length;

      if (opts.updateBaselines) {
        await writeBaseline(score);
        console.log(`  -> baseline updated`);
      } else if (!baseline) {
        console.log(`  (no baseline on file -- run with --update-baselines to snapshot)`);
      }
    } catch (err) {
      totalCrashes++;
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`\n[FAIL] ${fx.id}  threw during generation`);
      console.log(`  error: ${msg}`);
    }
  }

  console.log(
    `\n${selected.length - totalFailures - totalCrashes}/${selected.length} fixtures passed, ${totalRegressions} regression${totalRegressions === 1 ? "" : "s"}`,
  );

  // Gate: regressions and crashes fail the run. Pre-existing criteria
  // failures captured in the baseline do not fail the run -- the baseline
  // is the quality floor, and the job of this eval is to flag anything
  // that gets worse than that floor when prompts change.
  //
  // --update-baselines suppresses the regression gate: we're rewriting the
  // floor, not testing against it. Crashes still fail.
  const regressionGate = opts.updateBaselines ? 0 : totalRegressions;
  if (regressionGate > 0 || totalCrashes > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Eval runner crashed:", err);
  process.exit(2);
});
