import type { PromptContext, NarrativeOutput } from "@/lib/prompts/types";

export interface Fixture {
  id: string;
  description: string;
  context: PromptContext;
}

export interface CriterionResult {
  name: string;
  pass: boolean;
  detail: string;
}

export interface FixtureScore {
  fixtureId: string;
  output: NarrativeOutput;
  criteria: CriterionResult[];
  pass: boolean;
  wordCount: number;
  durationMs: number;
}

export interface Baseline {
  fixtureId: string;
  criteria: Record<string, boolean>;
  wordCount: number;
  generatedAt: string;
}

export interface EvalRunOptions {
  mock: boolean;
  updateBaselines: boolean;
  fixtureFilter?: string;
}
