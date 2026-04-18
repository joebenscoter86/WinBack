import { describe, it, expect } from "vitest";
import {
  sanitizeFeedbackTags,
  composeFeedback,
  isFeedbackTag,
  FEEDBACK_TAGS,
} from "../feedback-tags";

describe("isFeedbackTag", () => {
  it("accepts every allowed tag", () => {
    for (const tag of FEEDBACK_TAGS) {
      expect(isFeedbackTag(tag)).toBe(true);
    }
  });

  it("rejects unknown strings and non-strings", () => {
    expect(isFeedbackTag("not_a_tag")).toBe(false);
    expect(isFeedbackTag(42)).toBe(false);
    expect(isFeedbackTag(undefined)).toBe(false);
  });
});

describe("sanitizeFeedbackTags", () => {
  it("returns undefined for null/undefined/non-array", () => {
    expect(sanitizeFeedbackTags(undefined)).toBeUndefined();
    expect(sanitizeFeedbackTags(null)).toBeUndefined();
    expect(sanitizeFeedbackTags("too_long")).toBeUndefined();
    expect(sanitizeFeedbackTags({ tags: ["too_long"] })).toBeUndefined();
  });

  it("filters out unknown values and keeps known tags", () => {
    const input = ["too_long", "hacker_attack", "inaccurate", 42, null];
    expect(sanitizeFeedbackTags(input)).toEqual(["too_long", "inaccurate"]);
  });

  it("dedupes while preserving first-occurrence order", () => {
    const input = ["too_long", "inaccurate", "too_long", "too_formal"];
    expect(sanitizeFeedbackTags(input)).toEqual([
      "too_long",
      "inaccurate",
      "too_formal",
    ]);
  });

  it("returns an empty array when no valid tags remain", () => {
    expect(sanitizeFeedbackTags(["junk", "more_junk"])).toEqual([]);
  });
});

describe("composeFeedback", () => {
  it("returns undefined when both tags and free text are empty", () => {
    expect(composeFeedback(undefined, undefined)).toBeUndefined();
    expect(composeFeedback([], "")).toBeUndefined();
    expect(composeFeedback([], "   ")).toBeUndefined();
  });

  it("expands a single tag into its canonical guidance phrase", () => {
    const out = composeFeedback(["too_long"], undefined);
    expect(out).toBeDefined();
    expect(out).toMatch(/too long/i);
    expect(out).toMatch(/^- /);
  });

  it("joins multiple tags as bullet lines", () => {
    const out = composeFeedback(["too_formal", "too_long"], undefined)!;
    const bullets = out.split("\n").filter((line) => line.startsWith("- "));
    expect(bullets).toHaveLength(2);
    expect(bullets[0]).toMatch(/formal/i);
    expect(bullets[1]).toMatch(/long/i);
  });

  it("appends free text under a clearly attributed heading", () => {
    const out = composeFeedback(
      ["inaccurate"],
      "The $50 was actually $45",
    )!;
    expect(out).toMatch(/Merchant's own words/);
    expect(out).toMatch(/\$50 was actually \$45/);
  });

  it("trims whitespace-only free text", () => {
    const out = composeFeedback(["too_long"], "   ")!;
    expect(out).not.toMatch(/Merchant's own words/);
  });

  it("emits only free-text section when no tags are selected", () => {
    const out = composeFeedback([], "specific note")!;
    expect(out).not.toMatch(/^- /);
    expect(out).toMatch(/Merchant's own words: specific note/);
  });
});
