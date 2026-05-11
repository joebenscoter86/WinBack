import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

vi.mock("@/lib/resend", () => ({
  getResend: vi.fn(),
}));

// WIN-68: mock rate-limit and turnstile so existing tests hit the happy
// path. Individual tests override per-case for the 429 and captcha cases.
const { rateLimitMock, turnstileMock } = vi.hoisted(() => ({
  rateLimitMock: vi.fn(),
  turnstileMock: vi.fn(),
}));
vi.mock("@/lib/rate-limit", () => ({
  checkWaitlistRateLimit: rateLimitMock,
  getClientIp: () => "1.2.3.4",
}));
vi.mock("@/lib/turnstile", () => ({
  verifyTurnstileToken: turnstileMock,
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
    // Default: rate limit allows, captcha passes (skipped in dev).
    rateLimitMock.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 60_000,
    });
    turnstileMock.mockResolvedValue({ success: true, skipped: true });
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

  // -------------------------------------------------------------------------
  // WIN-68: rate limit + captcha
  // -------------------------------------------------------------------------
  describe("abuse protection (WIN-68)", () => {
    it("returns 429 with Retry-After header when rate limit exceeded", async () => {
      rateLimitMock.mockResolvedValue({
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 30_000,
      });

      const res = await POST(makeRequest({ email: "test@example.com" }));
      expect(res.status).toBe(429);
      const retryAfter = res.headers.get("Retry-After");
      expect(retryAfter).toBeTruthy();
      expect(Number(retryAfter)).toBeGreaterThan(0);
      // Must short-circuit before hitting Supabase or Resend.
      expect(supabase.from).not.toHaveBeenCalled();
    });

    it("returns 400 when Turnstile verification fails", async () => {
      turnstileMock.mockResolvedValue({
        success: false,
        skipped: false,
        errors: ["invalid-input-response"],
      });

      const res = await POST(
        makeRequest({ email: "test@example.com", turnstileToken: "bad" }),
      );
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toContain("Captcha");
      // Must short-circuit before hitting Supabase.
      expect(supabase.from).not.toHaveBeenCalled();
    });

    it("allows request when Turnstile verifier reports skipped (dev mode)", async () => {
      mockSupabaseInsert(null);
      mockResendSend();
      turnstileMock.mockResolvedValue({ success: true, skipped: true });

      const res = await POST(makeRequest({ email: "dev@example.com" }));
      expect(res.status).toBe(200);
    });

    it("rate limit runs BEFORE captcha verification", async () => {
      rateLimitMock.mockResolvedValue({
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 30_000,
      });

      await POST(makeRequest({ email: "test@example.com", turnstileToken: "x" }));
      // Captcha should not be checked if the request was already rate-limited.
      expect(turnstileMock).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // WIN-80: HTML injection + length cap on the admin notification path
  // -------------------------------------------------------------------------
  describe("admin notification HTML safety (WIN-80)", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it("HTML-escapes the email when interpolating into admin notification body", async () => {
      vi.stubEnv("WAITLIST_NOTIFY_EMAIL", "owner@winbackpay.com");
      mockSupabaseInsert(null);
      const mockSend = mockResendSend();

      // EMAIL_REGEX permits <, >, ", ', & in the local-part (anything that
      // isn't whitespace or @). A no-space payload like <b>x</b>@a.b passes
      // validation, gets stored verbatim, and pre-fix landed raw in the
      // admin email body. Use a payload that exercises every escape target.
      const malicious = `<b>"x"&'y'</b>@a.b`;
      const res = await POST(makeRequest({ email: malicious }));
      expect(res.status).toBe(200);

      // Two sends fire: welcome email (to: user) and notification (to: owner).
      const notificationCall = mockSend.mock.calls.find(
        (call) => (call[0] as { to: string }).to === "owner@winbackpay.com",
      );
      expect(notificationCall).toBeDefined();
      const html = (notificationCall![0] as { html: string }).html;

      // Critical: raw markup characters must not survive into the HTML body.
      expect(html).not.toContain("<b>");
      expect(html).not.toContain("</b>");
      // Allow the route's own static <p><strong> wrapper, but every char from
      // the user-supplied email must be escaped.
      expect(html).toContain("&lt;b&gt;");
      expect(html).toContain("&lt;/b&gt;");
      expect(html).toContain("&quot;x&quot;");
      expect(html).toContain("&amp;");
      expect(html).toContain("&#39;y&#39;");
    });

    it("rejects emails longer than 254 chars (RFC 5321)", async () => {
      // 255-char email that would otherwise pass EMAIL_REGEX.
      const longLocal = "a".repeat(245);
      const longEmail = `${longLocal}@a.bcd`; // 245 + 1 + 5 = 251... need >254
      const tooLong = `${"a".repeat(250)}@a.bcd`; // 250 + 1 + 5 = 256
      expect(tooLong.length).toBeGreaterThan(254);
      const res = await POST(makeRequest({ email: tooLong }));
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json).toEqual({ success: false, error: "Invalid email address" });
      // Must short-circuit before hitting Supabase.
      expect(supabase.from).not.toHaveBeenCalled();
      expect(longEmail.length).toBe(251); // sanity
    });

    it("accepts an email exactly at the 254-char limit", async () => {
      vi.stubEnv("WAITLIST_NOTIFY_EMAIL", "owner@winbackpay.com");
      mockSupabaseInsert(null);
      mockResendSend();

      const okLocal = "a".repeat(248); // 248 + 1 + 5 = 254
      const okEmail = `${okLocal}@a.bcd`;
      expect(okEmail.length).toBe(254);

      const res = await POST(makeRequest({ email: okEmail }));
      expect(res.status).toBe(200);
    });
  });
});
