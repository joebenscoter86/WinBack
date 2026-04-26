import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getClientIp,
  checkBillingTokenRateLimit,
  checkPreflightRateLimit,
} from "../rate-limit";

function mkReq(headers: Record<string, string>): Request {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers,
  });
}

describe("getClientIp", () => {
  it("returns the first comma-separated entry of x-forwarded-for", () => {
    const req = mkReq({ "x-forwarded-for": "203.0.113.5, 10.0.0.1, 10.0.0.2" });
    expect(getClientIp(req)).toBe("203.0.113.5");
  });

  it("trims whitespace from the first x-forwarded-for entry", () => {
    const req = mkReq({ "x-forwarded-for": "  203.0.113.5  ,10.0.0.1" });
    expect(getClientIp(req)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const req = mkReq({ "x-real-ip": "198.51.100.7" });
    expect(getClientIp(req)).toBe("198.51.100.7");
  });

  it("returns 'anonymous' when neither header is present", () => {
    const req = mkReq({});
    expect(getClientIp(req)).toBe("anonymous");
  });

  it("prefers x-forwarded-for over x-real-ip", () => {
    const req = mkReq({
      "x-forwarded-for": "203.0.113.5",
      "x-real-ip": "198.51.100.7",
    });
    expect(getClientIp(req)).toBe("203.0.113.5");
  });
});

describe("checkBillingTokenRateLimit (Upstash unconfigured)", () => {
  let savedUrl: string | undefined;
  let savedToken: string | undefined;

  beforeEach(() => {
    savedUrl = process.env.UPSTASH_REDIS_REST_URL;
    savedToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterEach(() => {
    if (savedUrl !== undefined) process.env.UPSTASH_REDIS_REST_URL = savedUrl;
    if (savedToken !== undefined)
      process.env.UPSTASH_REDIS_REST_TOKEN = savedToken;
  });

  it("fails open when Upstash credentials are missing", async () => {
    const result = await checkBillingTokenRateLimit("203.0.113.5");
    expect(result.success).toBe(true);
  });
});

describe("checkPreflightRateLimit (Upstash unconfigured)", () => {
  let savedUrl: string | undefined;
  let savedToken: string | undefined;

  beforeEach(() => {
    savedUrl = process.env.UPSTASH_REDIS_REST_URL;
    savedToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterEach(() => {
    if (savedUrl !== undefined) process.env.UPSTASH_REDIS_REST_URL = savedUrl;
    if (savedToken !== undefined)
      process.env.UPSTASH_REDIS_REST_TOKEN = savedToken;
  });

  it("fails open when Upstash credentials are missing", async () => {
    const result = await checkPreflightRateLimit("203.0.113.5");
    expect(result.success).toBe(true);
  });
});
