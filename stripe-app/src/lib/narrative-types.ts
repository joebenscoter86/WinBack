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
