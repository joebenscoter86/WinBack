import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { POST } from "../route";
import { supabase } from "@/lib/supabase";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and inserts a valid email", async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(supabase.from).toHaveBeenCalledWith("waitlist");
    expect(mockInsert).toHaveBeenCalledWith({ email: "test@example.com", source: "landing_page" });
  });

  it("returns 400 for missing email", async () => {
    const res = await POST(makeRequest({}));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json).toEqual({ success: false, error: "Invalid email address" });
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json).toEqual({ success: false, error: "Invalid email address" });
  });

  it("returns 200 for duplicate email (unique constraint violation)", async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: { code: "23505", message: "duplicate key" } });
    vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);

    const res = await POST(makeRequest({ email: "existing@example.com" }));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
  });

  it("returns 500 for unexpected Supabase errors", async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: { code: "42000", message: "something broke" } });
    vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json).toEqual({ success: false, error: "Something went wrong. Please try again." });
  });
});
