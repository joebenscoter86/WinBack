export type NarrativePhase = 'idle' | 'generating' | 'review' | 'error';

export interface NarrativeAnnotation {
  section: string;
  reasoning: string;
}

export interface GenerateResponse {
  generation_id: string;
  status: 'pending';
}

export type StatusResponse =
  | { status: 'pending' }
  | { status: 'completed'; narrative: string; annotations: NarrativeAnnotation[] }
  | { status: 'failed'; error: string };

export interface ApiErrorResponse {
  error: string;
  code: string;
}

export const MAX_GENERATIONS = 5;
export const POLL_INTERVAL_MS = 3000;
export const MAX_POLL_DURATION_MS = 60000;

// Structured feedback chips on the regeneration UI (WIN-35). Values mirror
// the backend's FEEDBACK_TAGS list in backend/lib/narratives/feedback-tags.ts
// -- keep them in sync.
export const FEEDBACK_TAGS = [
  { id: 'too_formal', label: 'Too formal' },
  { id: 'missing_evidence', label: 'Missing key evidence' },
  { id: 'inaccurate', label: 'Inaccurate details' },
  { id: 'too_long', label: 'Too long' },
  { id: 'other', label: 'Other' },
] as const;

export type FeedbackTag = (typeof FEEDBACK_TAGS)[number]['id'];
