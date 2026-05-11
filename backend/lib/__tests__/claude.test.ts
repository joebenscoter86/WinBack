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

  // WIN-81: pre-fix, the error message included `First 500: ${rawText.slice(0, 500)}`
  // which leaked PII-laden Claude output (customer name, last4, billing address)
  // into Sentry on every double-malformed response.
  describe("WIN-81: error messages must not leak Claude's raw output", () => {
    const PII_MARKER = "CARDHOLDER_PII_TEST_TOKEN_AB12";

    it("retry-also-failed throw omits raw text and includes a non-PII fingerprint", async () => {
      const malformedWithPii = `not valid json {{{ ${PII_MARKER} customer billing data here`;
      // First call returns malformed JSON. Retry also returns malformed JSON.
      // Falls into the "retry also failed" branch.
      mockCreate.mockResolvedValue(makeSuccessResponse(malformedWithPii));

      const err = await generateNarrative(VALID_PROMPT).catch((e: Error) => e);
      expect(err).toBeInstanceOf(Error);
      const message = (err as Error).message;

      expect(message).toMatch(/invalid json.*after retry/i);
      expect(message).toContain(`${malformedWithPii.length} chars`);
      // Critical: no part of the raw text -- especially the PII marker --
      // may appear in the message that ships to Sentry.
      expect(message).not.toContain(PII_MARKER);
      expect(message).not.toContain("customer billing data");
      expect(message).not.toContain("not valid json");
      // Fingerprint for Sentry dedupe is included.
      expect(message).toMatch(/sha256:[0-9a-f]{8,}/);
    });

    it("retry-no-text-block throw omits raw text and includes a non-PII fingerprint", async () => {
      const malformedWithPii = `also bad ${PII_MARKER} more PII here`;
      // First call returns malformed JSON; retry returns a response with no
      // text block. Falls into the "no text block on retry" branch.
      mockCreate
        .mockResolvedValueOnce(makeSuccessResponse(malformedWithPii))
        .mockResolvedValueOnce({ content: [] });

      const err = await generateNarrative(VALID_PROMPT).catch((e: Error) => e);
      expect(err).toBeInstanceOf(Error);
      const message = (err as Error).message;

      expect(message).toMatch(/invalid json/i);
      expect(message).toContain(`${malformedWithPii.length} chars`);
      expect(message).not.toContain(PII_MARKER);
      expect(message).not.toContain("more PII here");
      expect(message).not.toContain("also bad");
      expect(message).toMatch(/sha256:[0-9a-f]{8,}/);
    });
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
    expect(mockCreate).toHaveBeenCalledWith(
      {
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: VALID_PROMPT.system,
        messages: [{ role: "user", content: VALID_PROMPT.user }],
      },
      { timeout: 60_000 },
    );
  });
});
