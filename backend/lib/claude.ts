import Anthropic from "@anthropic-ai/sdk";
import type { NarrativeOutput } from "./prompts/types";
import type { PromptResult } from "./prompts/build-prompt";

let _client: Anthropic | null = null;

/**
 * Lazy-initialized Anthropic client.
 * Throws at call time if ANTHROPIC_API_KEY is missing, not at import time.
 */
const anthropic = new Proxy({} as Anthropic, {
  get(_target, prop) {
    if (!_client) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error("Missing ANTHROPIC_API_KEY environment variable");
      }
      _client = new Anthropic({ apiKey, maxRetries: 2 });
    }
    return (_client as any)[prop];
  },
});

/**
 * Generate a dispute narrative using Claude.
 *
 * @param prompt - The built prompt from buildPrompt()
 * @returns Parsed NarrativeOutput with narrative text and optional annotations
 * @throws If prompt.user is null, API call fails, or response cannot be parsed
 */
export async function generateNarrative(
  prompt: PromptResult,
): Promise<NarrativeOutput> {
  if (prompt.user === null) {
    throw new Error(
      "prompt.user is null -- no prompt template found for this reason code",
    );
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    timeout: 60_000,
    system: prompt.system,
    messages: [{ role: "user", content: prompt.user }],
  });

  const textBlock = response.content.find((block: any) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  const rawText = (textBlock as { type: "text"; text: string }).text;

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error(
      `Invalid JSON in Claude response: ${rawText.slice(0, 200)}`,
    );
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as Record<string, unknown>).narrative !== "string"
  ) {
    throw new Error(
      "Claude response missing required 'narrative' string field",
    );
  }

  const raw = parsed as Record<string, unknown>;
  const annotations = Array.isArray(raw.annotations)
    ? (raw.annotations as NarrativeOutput["annotations"])
    : [];

  return {
    narrative: raw.narrative as string,
    annotations,
  };
}
