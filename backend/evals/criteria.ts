import type { NarrativeOutput } from "@/lib/prompts/types";
import { validateHallucinations } from "@/lib/narratives/validate-hallucinations";
import { getPromptTemplate } from "@/lib/prompts";
import type { Fixture, CriterionResult } from "./types";

const BOLD_HEADER = /\*\*([^*]+)\*\*/g;
const EVIDENCE_KEY = /"([a-z][a-z0-9_]+)"/g;
const ISO_DATE = /\b(\d{4}-\d{2}-\d{2})\b/g;
const DOLLAR_AMOUNT = /\$\d+(?:\.\d{2})?/g;
const TRACKING = /\b([A-Z0-9]{10,})\b/g;

// Phrases the system prompt explicitly bans. Kept conservative -- a single
// "unfortunately" in a factual sentence is not a failure, but these are
// emotional registers we want the narrative to avoid entirely.
const BANNED_PHRASES = [
  "valued customer",
  "we appreciate",
  "thank you for your",
  "we understand your",
  "we apologize",
  "regret to inform",
  "pleased to inform",
];

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractAll(re: RegExp, text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(re)) out.push(m[1] ?? m[0]);
  return out;
}

function formatDate(ts: number): string {
  return new Date(ts * 1000).toISOString().split("T")[0];
}

function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function gatherInputCorpus(fx: Fixture): string {
  // Raw context as JSON, plus formatted renderings of every timestamp and
  // amount the buildPrompt template will emit. The "no_fabricated_facts"
  // check uses this as the allowed source set, so formatted forms must be
  // present even though the context stores raw cents and Unix seconds.
  const formatted: string[] = [formatAmount(fx.context.amount)];
  if (fx.context.transaction_date !== undefined) {
    formatted.push(formatDate(fx.context.transaction_date));
  }
  for (const r of fx.context.refunds ?? []) {
    formatted.push(formatAmount(r.amount));
    formatted.push(formatDate(r.created));
  }
  return JSON.stringify(fx.context) + "\n" + formatted.join("\n");
}

// ---------------------------------------------------------------------------
// Criteria
// ---------------------------------------------------------------------------

export function checkHallucination(
  output: NarrativeOutput,
  fx: Fixture,
): CriterionResult {
  const { strippedReferences } = validateHallucinations(
    output,
    fx.context.evidence_files,
  );
  return {
    name: "no_hallucination",
    pass: strippedReferences.length === 0,
    detail:
      strippedReferences.length === 0
        ? "no references outside uploaded evidence"
        : `hallucinated keys: ${strippedReferences.join(", ")}`,
  };
}

export function checkEvidenceGrounding(
  output: NarrativeOutput,
  fx: Fixture,
): CriterionResult {
  const uploaded = new Set(
    fx.context.evidence_files.map((f) => f.checklist_item_key),
  );
  // Also allow references to auto-pull fields (avs_address_check etc.) --
  // those are verified Stripe data, not merchant-uploaded evidence.
  const template = getPromptTemplate(fx.context.network, fx.context.reason_code);
  const autoPull = new Set(
    template?.sections.flatMap((s) => s.auto_pull_fields) ?? [],
  );

  const referenced = new Set(extractAll(EVIDENCE_KEY, output.narrative));
  const bad: string[] = [];
  for (const key of referenced) {
    if (uploaded.has(key) || autoPull.has(key)) continue;
    bad.push(key);
  }
  return {
    name: "evidence_grounding",
    pass: bad.length === 0,
    detail:
      bad.length === 0
        ? `all ${referenced.size} keys grounded`
        : `ungrounded keys: ${bad.join(", ")}`,
  };
}

export function checkNoFabricatedFacts(
  output: NarrativeOutput,
  fx: Fixture,
): CriterionResult {
  const corpus = gatherInputCorpus(fx);
  const fabricatedDates = extractAll(ISO_DATE, output.narrative).filter(
    (d) => !corpus.includes(d),
  );
  const fabricatedAmounts = extractAll(DOLLAR_AMOUNT, output.narrative).filter(
    (a) => !corpus.includes(a),
  );
  // Tracking-shape tokens: 10+ uppercase alphanum. Skip common false positives
  // like "MERCHANT" by requiring at least one digit.
  const fabricatedTracking = extractAll(TRACKING, output.narrative)
    .filter((t) => /\d/.test(t))
    .filter((t) => !corpus.includes(t));

  const issues = [
    ...fabricatedDates.map((d) => `date ${d}`),
    ...fabricatedAmounts.map((a) => `amount ${a}`),
    ...fabricatedTracking.map((t) => `tracking-shape ${t}`),
  ];
  return {
    name: "no_fabricated_facts",
    pass: issues.length === 0,
    detail:
      issues.length === 0
        ? "no fabricated dates/amounts/tracking"
        : `fabricated: ${issues.join(", ")}`,
  };
}

export function checkSectionCoverage(
  output: NarrativeOutput,
  fx: Fixture,
): CriterionResult {
  const template = getPromptTemplate(
    fx.context.network,
    fx.context.reason_code,
  );
  if (!template) {
    return {
      name: "section_coverage",
      pass: false,
      detail: "no template for reason code",
    };
  }
  const headers = new Set(
    extractAll(BOLD_HEADER, output.narrative).map((h) => h.trim().toLowerCase()),
  );
  const p1Sections = template.sections.filter((s) => s.priority === 1);
  const covered = p1Sections.filter((s) => headers.has(s.name.toLowerCase()));
  // Require at least 2 of the P1 sections or half (whichever is lower) --
  // the system prompt tells the model to skip sections where evidence is
  // missing, so demanding every P1 is too strict.
  const threshold = Math.min(2, Math.ceil(p1Sections.length / 2));
  return {
    name: "section_coverage",
    pass: covered.length >= threshold,
    detail: `${covered.length}/${p1Sections.length} P1 sections covered (need ${threshold})`,
  };
}

export function checkAnnotations(
  output: NarrativeOutput,
): CriterionResult {
  if (output.annotations.length === 0) {
    return {
      name: "annotations_valid",
      pass: false,
      detail: "no annotations returned",
    };
  }
  const headers = new Set(
    extractAll(BOLD_HEADER, output.narrative).map((h) => h.trim().toLowerCase()),
  );
  const orphans = output.annotations.filter(
    (a) => !headers.has(a.section.trim().toLowerCase()),
  );
  return {
    name: "annotations_valid",
    pass: orphans.length === 0,
    detail:
      orphans.length === 0
        ? `${output.annotations.length} annotations, all matched`
        : `orphan annotations: ${orphans.map((o) => o.section).join(", ")}`,
  };
}

// Word-count band. The system prompt says "target 400-1,200 words, shorter
// is better if evidence is strong" -- the floor is loose to honor "shorter
// is better," the ceiling catches runaway padding. Calibrated off baseline
// runs where Claude averaged ~250 words on these fixtures.
const MIN_WORDS = 150;
const MAX_WORDS = 1500;

export function checkConciseness(
  output: NarrativeOutput,
): CriterionResult {
  const words = countWords(output.narrative);
  const pass = words >= MIN_WORDS && words <= MAX_WORDS;
  return {
    name: "conciseness",
    pass,
    detail: `${words} words (band ${MIN_WORDS}-${MAX_WORDS})`,
  };
}

export function checkTone(output: NarrativeOutput): CriterionResult {
  const lower = output.narrative.toLowerCase();
  const hits = BANNED_PHRASES.filter((p) => lower.includes(p));
  return {
    name: "tone",
    pass: hits.length === 0,
    detail:
      hits.length === 0
        ? "no banned phrases"
        : `banned phrases: ${hits.join(", ")}`,
  };
}

export function runAllCriteria(
  output: NarrativeOutput,
  fx: Fixture,
): CriterionResult[] {
  return [
    checkHallucination(output, fx),
    checkEvidenceGrounding(output, fx),
    checkNoFabricatedFacts(output, fx),
    checkSectionCoverage(output, fx),
    checkAnnotations(output),
    checkConciseness(output),
    checkTone(output),
  ];
}
