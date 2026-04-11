import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockCreate } = vi.hoisted(() => {
  const mockCreate = vi.fn();
  return { mockCreate };
});

vi.mock("@anthropic-ai/sdk", () => {
  class MockAnthropic {
    messages = { create: mockCreate };
    constructor(_opts?: unknown) {}
  }
  return { default: MockAnthropic };
});

import { generateNarrative } from "../claude";
import type { PromptResult } from "../prompts/build-prompt";

const VALID_PROMPT: PromptResult = {
  system: "You are a dispute resolution assistant.",
  user: "Dispute context goes here.",
};

const VALID_OUTPUT = {
  narrative: "The merchant provided sufficient evidence to win this dispute.",
  annotations: [
    { section: "Authorization", reasoning: "CVC match confirms cardholder." },
  ],
};

function makeSuccessResponse(content: string) {
  return {
    content: [{ type: "text", text: content }],
  };
}

describe("generateNarrative", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = "test-key";
  });

  it("returns parsed NarrativeOutput on success", async () => {
    mockCreate.mockResolvedValue(
      makeSuccessResponse(JSON.stringify(VALID_OUTPUT)),
    );

    const result = await generateNarrative(VALID_PROMPT);

    expect(result).toEqual(VALID_OUTPUT);
  });

  it("defaults annotations to [] when missing from response", async () => {
    const outputWithoutAnnotations = { narrative: "Some narrative." };
    mockCreate.mockResolvedValue(
      makeSuccessResponse(JSON.stringify(outputWithoutAnnotations)),
    );

    const result = await generateNarrative(VALID_PROMPT);

    expect(result.narrative).toBe("Some narrative.");
    expect(result.annotations).toEqual([]);
  });

  it("defaults annotations to [] when annotations is not an array", async () => {
    const outputBadAnnotations = {
      narrative: "Some narrative.",
      annotations: "not an array",
    };
    mockCreate.mockResolvedValue(
      makeSuccessResponse(JSON.stringify(outputBadAnnotations)),
    );

    const result = await generateNarrative(VALID_PROMPT);

    expect(result.annotations).toEqual([]);
  });

  it("throws on invalid JSON response", async () => {
    mockCreate.mockResolvedValue(makeSuccessResponse("not valid json {{{"));

    await expect(generateNarrative(VALID_PROMPT)).rejects.toThrow(
      /invalid json/i,
    );
  });

  it("throws on missing narrative field", async () => {
    mockCreate.mockResolvedValue(
      makeSuccessResponse(JSON.stringify({ annotations: [] })),
    );

    await expect(generateNarrative(VALID_PROMPT)).rejects.toThrow(/narrative/i);
  });

  it("throws when prompt.user is null", async () => {
    const nullUserPrompt: PromptResult = {
      system: "System prompt.",
      user: null,
    };

    await expect(generateNarrative(nullUserPrompt)).rejects.toThrow(
      /user.*null/i,
    );
  });

  it("throws when response has no text content block", async () => {
    mockCreate.mockResolvedValue({ content: [] });

    await expect(generateNarrative(VALID_PROMPT)).rejects.toThrow(
      /no text content/i,
    );
  });

  it("passes correct model, max_tokens, system, and messages to SDK", async () => {
    mockCreate.mockResolvedValue(
      makeSuccessResponse(JSON.stringify(VALID_OUTPUT)),
    );

    await generateNarrative(VALID_PROMPT);

    expect(mockCreate).toHaveBeenCalledOnce();
    expect(mockCreate).toHaveBeenCalledWith({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: VALID_PROMPT.system,
      messages: [{ role: "user", content: VALID_PROMPT.user }],
    });
  });
});
