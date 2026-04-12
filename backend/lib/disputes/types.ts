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
  | { code: "deadline_passed"; due_by: number };

export const UNCATEGORIZED_TEXT_MAX = 20_000;
export const COMBINED_TEXT_MAX = 150_000;
