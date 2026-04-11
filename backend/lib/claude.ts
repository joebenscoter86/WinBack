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

  const response = await anthropic.messages.create(
    {
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
    },
    { timeout: 60_000 },
  );

  const textBlock = response.content.find((block: any) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  let rawText = (textBlock as { type: "text"; text: string }).text;

  // Strip markdown code fences if Claude wraps the JSON in ```json ... ```
  rawText = rawText.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");

  // Trim any trailing whitespace or incomplete trailing content after the JSON
  rawText = rawText.trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    // Retry once: ask Claude to fix its own JSON
    const fixResponse = await anthropic.messages.create(
      {
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [
          { role: "user", content: prompt.user },
          { role: "assistant", content: rawText },
          {
            role: "user",
            content:
              "Your previous response was not valid JSON. Return the SAME content as valid JSON. No code fences, no explanation, just the raw JSON object.",
          },
        ],
      },
      { timeout: 60_000 },
    );

    const fixBlock = fixResponse.content.find((b: any) => b.type === "text");
    if (fixBlock && fixBlock.type === "text") {
      let fixText = fixBlock.text
        .replace(/^```(?:json)?\s*\n?/i, "")
        .replace(/\n?```\s*$/i, "")
        .trim();
      try {
        parsed = JSON.parse(fixText);
      } catch {
        throw new Error(
          `Invalid JSON in Claude response after retry (${rawText.length} chars). First 500: ${rawText.slice(0, 500)}`,
        );
      }
    } else {
      throw new Error(
        `Invalid JSON in Claude response (${rawText.length} chars). First 500: ${rawText.slice(0, 500)}`,
      );
    }
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
