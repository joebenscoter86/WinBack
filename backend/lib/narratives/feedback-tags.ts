/**
 * Structured feedback tags from the regeneration UI (WIN-35).
 *
 * The merchant can click one or more chips when regenerating a narrative.
 * Each chip maps to a canonical guidance phrase that gets prepended to
 * the merchant's free-text feedback and sent to Claude as part of the
 * regeneration prompt.
 *
 * Tags are stored as strings in narrative_generations.merchant_feedback_tags
 * so feedback patterns can be analyzed across merchants without parsing
 * free text.
 */

export const FEEDBACK_TAGS = [
  "too_formal",
  "missing_evidence",
  "inaccurate",
  "too_long",
  "other",
] as const;

export type FeedbackTag = (typeof FEEDBACK_TAGS)[number];

const TAG_GUIDANCE: Record<FeedbackTag, string> = {
  too_formal:
    "The previous narrative felt too formal. Use a more direct, plain-professional tone.",
  missing_evidence:
    "The previous narrative did not reference the uploaded evidence thoroughly enough. Weave the uploaded documentation into the strongest sections.",
  inaccurate:
    "The previous narrative contained inaccuracies. Ground every claim in the provided dispute context, evidence files, and Stripe transaction data.",
  too_long:
    "The previous narrative was too long. Tighten it and lead with the strongest evidence.",
  other:
    "The merchant flagged the previous narrative as unsatisfactory. See their written feedback below for specifics.",
};

export function isFeedbackTag(value: unknown): value is FeedbackTag {
  return (
    typeof value === "string" && (FEEDBACK_TAGS as readonly string[]).includes(value)
  );
}

export function sanitizeFeedbackTags(raw: unknown): FeedbackTag[] | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (!Array.isArray(raw)) return undefined;
  const tags = raw.filter(isFeedbackTag);
  // Dedupe; keep first-occurrence order.
  return Array.from(new Set(tags));
}

/**
 * Combine structured tags and free-text feedback into a single string
 * suitable for the merchant_feedback prompt block. Returns undefined when
 * there is nothing to inject.
 */
export function composeFeedback(
  tags: FeedbackTag[] | undefined,
  freeText: string | undefined,
): string | undefined {
  const guidance = (tags ?? []).map((t) => `- ${TAG_GUIDANCE[t]}`);
  const trimmedFree = freeText?.trim();
  if (guidance.length === 0 && !trimmedFree) return undefined;

  const parts: string[] = [];
  if (guidance.length > 0) {
    parts.push(guidance.join("\n"));
  }
  if (trimmedFree) {
    parts.push(`Merchant's own words: ${trimmedFree}`);
  }
  return parts.join("\n\n");
}
