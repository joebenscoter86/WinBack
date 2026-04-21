import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
// Use vi.stubEnv / vi.unstubAllEnvs for NODE_ENV — Node marks it non-configurable.
import { NextRequest } from "next/server";

vi.mock("@/lib/webhooks/reconcile-disputes", () => ({
  reconcileDisputes: vi.fn().mockResolvedValue({ processed: 0 }),
}));

vi.mock("@/lib/sentry", () => ({
  captureRouteError: vi.fn(),
}));

import { GET } from "../route";

function mkReq(authHeader?: string): NextRequest {
  const headers: Record<string, string> = {};
  if (authHeader) headers.authorization = authHeader;
  return new NextRequest("http://localhost/api/cron/reconcile-disputes", {
    method: "GET",
    headers,
  });
}

describe("GET /api/cron/reconcile-disputes", () => {
  const originalSecret = process.env.CRON_SECRET;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = originalSecret;
    vi.unstubAllEnvs();
  });

  it("accepts a valid Bearer token", async () => {
    process.env.CRON_SECRET = "supersecret";
    const res = await GET(mkReq("Bearer supersecret"));
    expect(res.status).toBe(200);
  });

  it("rejects a wrong Bearer token with 401", async () => {
    process.env.CRON_SECRET = "supersecret";
    const res = await GET(mkReq("Bearer wrong"));
    expect(res.status).toBe(401);
  });

  it("rejects missing Authorization header with 401 when CRON_SECRET is set", async () => {
    process.env.CRON_SECRET = "supersecret";
    const res = await GET(mkReq());
    expect(res.status).toBe(401);
  });

  // WIN-64: the fix.
  it("WIN-64: fails closed with 500 when CRON_SECRET is unset in production", async () => {
    delete process.env.CRON_SECRET;
    vi.stubEnv("NODE_ENV", "production");
    const res = await GET(mkReq());
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("CRON_SECRET");
  });

  it("WIN-64: remains open when CRON_SECRET is unset in development", async () => {
    delete process.env.CRON_SECRET;
    vi.stubEnv("NODE_ENV", "development");
    const res = await GET(mkReq());
    expect(res.status).toBe(200);
  });

  it("WIN-64: remains open when CRON_SECRET is unset in test", async () => {
    delete process.env.CRON_SECRET;
    vi.stubEnv("NODE_ENV", "test");
    const res = await GET(mkReq());
    expect(res.status).toBe(200);
  });
});
