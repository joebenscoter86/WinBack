import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

vi.mock("@/lib/resend", () => ({
  getResend: vi.fn(),
}));

import { POST } from "../route";
import { supabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockSupabaseInsert(error: { code: string; message: string } | null) {
  const mockInsert = vi.fn().mockResolvedValue({ error });
  vi.mocked(supabase.from).mockReturnValue({
    insert: mockInsert,
  } as unknown as ReturnType<typeof supabase.from>);
  return mockInsert;
}

function mockResendSend() {
  const mockSend = vi.fn().mockResolvedValue({ data: { id: "email_123" }, error: null });
  vi.mocked(getResend).mockReturnValue({
    emails: { send: mockSend },
  } as unknown as ReturnType<typeof getResend>);
  return mockSend;
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and inserts a valid email", async () => {
    mockSupabaseInsert(null);
    mockResendSend();

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(supabase.from).toHaveBeenCalledWith("waitlist");
  });

  it("sends welcome email on successful insert", async () => {
    mockSupabaseInsert(null);
    const mockSend = mockResendSend();

    await POST(makeRequest({ email: "test@example.com" }));

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@example.com",
        subject: expect.stringContaining("WinBack"),
      })
    );
  });

  it("does NOT send email on duplicate signup", async () => {
    mockSupabaseInsert({ code: "23505", message: "duplicate key" });
    const mockSend = mockResendSend();

    const res = await POST(makeRequest({ email: "existing@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200 even when Resend fails", async () => {
    mockSupabaseInsert(null);
    const mockSend = vi.fn().mockRejectedValue(new Error("Resend is down"));
    vi.mocked(getResend).mockReturnValue({
      emails: { send: mockSend },
    } as unknown as ReturnType<typeof getResend>);

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
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

  it("returns 500 for unexpected Supabase errors", async () => {
    mockSupabaseInsert({ code: "42000", message: "something broke" });
    mockResendSend();

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json).toEqual({ success: false, error: "Something went wrong. Please try again." });
  });
});
