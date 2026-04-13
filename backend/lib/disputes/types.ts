export type SubmissionWarning =
  | {
      code: "field_truncated";
      field: string;
      original_length: number;
      truncated_length: number;
    }
  | {
      code: "field_collision";
      winning_item: string;
      losing_item: string;
      field: string;
      resolution: "uncategorized_file" | "dropped";
    }
  | { code: "missing_mandatory_items"; items: string[] }
  | { code: "deadline_passed"; due_by: number }
  | { code: "stripe_field_missing"; item: string; fallback: "uncategorized_file" };

export const UNCATEGORIZED_TEXT_MAX = 20_000;
export const COMBINED_TEXT_MAX = 150_000;

/**
 * Shape of a row from the evidence_files table as consumed by the guard and
 * the assembler. Originally defined in build-evidence-payload.ts (now deleted).
 */
export interface EvidenceFileInput {
  id: string;
  checklist_item_key: string;
  stripe_file_id: string;
  file_name: string;
  file_size: number;
  mime_type: string;
}
