import type { NarrativeOutput, EvidenceFileRef } from "../prompts/types";

export interface ValidationResult {
  narrative: NarrativeOutput;
  strippedReferences: string[];
}

// Matches double-quoted snake_case identifiers, e.g. "tracking_number"
const EVIDENCE_KEY_PATTERN = /"([a-z][a-z0-9_]+)"/g;

/**
 * Splits narrative text into sentences. A sentence ends at `.`, `!`, or a
 * newline character. The delimiter is kept at the end of the returned chunk.
 */
function splitSentences(text: string): string[] {
  // Split on sentence-ending punctuation OR newline, keeping the delimiter
  return text.split(/(?<=[.!])\s*|\n/).filter((s) => s.length > 0);
}

/**
 * Validates that a Claude-generated narrative does not reference evidence keys
 * that were not actually uploaded. Any sentence containing a hallucinated key
 * reference is stripped, along with the corresponding annotation.
 */
export function validateHallucinations(
  output: NarrativeOutput,
  evidenceFiles: EvidenceFileRef[],
): ValidationResult {
  const uploadedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));

  // Find all unique evidence keys referenced in the narrative
  const referencedKeys = new Set<string>();
  for (const match of output.narrative.matchAll(EVIDENCE_KEY_PATTERN)) {
    referencedKeys.add(match[1]);
  }

  // Determine which referenced keys are hallucinated (not in uploaded set)
  const hallucinatedKeys = [...referencedKeys].filter(
    (key) => !uploadedKeys.has(key),
  );

  if (hallucinatedKeys.length === 0) {
    return { narrative: output, strippedReferences: [] };
  }

  const hallucinatedSet = new Set(hallucinatedKeys);

  // Strip sentences that contain any hallucinated key reference.
  // We process line-by-line first to preserve structure, then sentence-split
  // within each line.
  const lines = output.narrative.split("\n");
  const cleanedLines: string[] = [];

  for (const line of lines) {
    // Check if this line contains any hallucinated reference
    const lineHasHallucination = [...hallucinatedSet].some((key) =>
      line.includes(`"${key}"`),
    );

    if (!lineHasHallucination) {
      cleanedLines.push(line);
      continue;
    }

    // The line contains a hallucination. Split into sentences and strip only
    // the offending ones so we preserve any clean content on the same line.
    const sentences = line.split(/(?<=[.!]) +/);
    const cleanSentences = sentences.filter((sentence) => {
      return ![...hallucinatedSet].some((key) =>
        sentence.includes(`"${key}"`),
      );
    });

    if (cleanSentences.length > 0) {
      cleanedLines.push(cleanSentences.join(" "));
    }
    // If all sentences on the line were stripped, the line is dropped entirely
  }

  let cleanedNarrative = cleanedLines.join("\n");

  // Collapse triple+ newlines left behind by stripped lines
  cleanedNarrative = cleanedNarrative.replace(/\n{3,}/g, "\n\n");

  // Determine which annotation sections were fully removed from the narrative.
  // Annotations reference sections by their "**Section Name**" header.
  const cleanedAnnotations = output.annotations.filter((annotation) => {
    const sectionHeader = `**${annotation.section}**`;
    return cleanedNarrative.includes(sectionHeader);
  });

  return {
    narrative: {
      narrative: cleanedNarrative,
      annotations: cleanedAnnotations,
    },
    strippedReferences: hallucinatedKeys,
  };
}
