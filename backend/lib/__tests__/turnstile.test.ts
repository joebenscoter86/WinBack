import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyTurnstileToken } from "../turnstile";

describe("verifyTurnstileToken", () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = originalSecret;
    global.fetch = originalFetch;
  });

  it("skips verification (success: true, skipped: true) when no secret is configured", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const result = await verifyTurnstileToken("any-token");
    expect(result).toEqual({ success: true, skipped: true });
  });

  it("fails when secret is set but token is missing", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const result = await verifyTurnstileToken(undefined);
    expect(result.success).toBe(false);
    expect(result.skipped).toBe(false);
    expect(result.errors).toContain("missing-input-response");
  });

  it("calls Cloudflare siteverify with secret + token + remoteip", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret-xyz";
    const fetchMock = vi
      .fn()
      .mockResolvedValue({
        json: async () => ({ success: true }),
      });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await verifyTurnstileToken("token-abc", "203.0.113.5");

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    const body = init.body as string;
    expect(body).toContain("secret=secret-xyz");
    expect(body).toContain("response=token-abc");
    expect(body).toContain("remoteip=203.0.113.5");
  });

  it("returns success: false when Cloudflare returns success: false", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret-xyz";
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    }) as unknown as typeof fetch;

    const result = await verifyTurnstileToken("bad-token");
    expect(result.success).toBe(false);
    expect(result.errors).toEqual(["invalid-input-response"]);
  });

  it("returns success: false when fetch throws", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret-xyz";
    global.fetch = vi
      .fn()
      .mockRejectedValue(new Error("network down")) as unknown as typeof fetch;

    const result = await verifyTurnstileToken("token");
    expect(result.success).toBe(false);
    expect(result.errors?.[0]).toBe("verify-network-error");
  });

  it("omits remoteip when client IP is 'anonymous'", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret-xyz";
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ json: async () => ({ success: true }) });
    global.fetch = fetchMock as unknown as typeof fetch;

    await verifyTurnstileToken("token", "anonymous");
    const body = fetchMock.mock.calls[0][1].body as string;
    expect(body).not.toContain("remoteip");
  });
});
