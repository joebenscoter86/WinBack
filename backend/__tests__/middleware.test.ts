import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

function req(
  pathname: string,
  {
    method = "GET",
    origin,
  }: { method?: string; origin?: string } = {},
): NextRequest {
  const headers: Record<string, string> = {};
  if (origin) headers.origin = origin;
  return new NextRequest(`http://localhost:3000${pathname}`, { method, headers });
}

// WIN-62: verify the tight per-route CORS allowlists replace the old wildcard.
describe("middleware CORS allowlist (WIN-62)", () => {
  describe("Stripe App iframe routes (default)", () => {
    const path = "/api/disputes/dp_test/submit";

    it("echoes dashboard.stripe.com when origin matches", () => {
      const res = middleware(
        req(path, { origin: "https://dashboard.stripe.com" }),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
        "https://dashboard.stripe.com",
      );
      expect(res.headers.get("Vary")).toBe("Origin");
    });

    it("omits ACAO for a non-allowlisted origin", () => {
      const res = middleware(req(path, { origin: "https://evil.example.com" }));
      expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
    });

    it("omits ACAO when no Origin header is sent (server-to-server)", () => {
      const res = middleware(req(path));
      expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
    });

    it("preflight returns 204 with ACAO only for allowlisted origin", () => {
      const ok = middleware(
        req(path, { method: "OPTIONS", origin: "https://dashboard.stripe.com" }),
      );
      expect(ok.status).toBe(204);
      expect(ok.headers.get("Access-Control-Allow-Origin")).toBe(
        "https://dashboard.stripe.com",
      );

      const bad = middleware(
        req(path, { method: "OPTIONS", origin: "https://evil.example.com" }),
      );
      expect(bad.status).toBe(204);
      expect(bad.headers.get("Access-Control-Allow-Origin")).toBeNull();
    });
  });

  describe("/api/waitlist (marketing form)", () => {
    it("allows the marketing origin", () => {
      const res = middleware(
        req("/api/waitlist", { method: "POST", origin: "https://winbackpay.com" }),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
        "https://winbackpay.com",
      );
    });

    it("also allows www.winbackpay.com", () => {
      const res = middleware(
        req("/api/waitlist", {
          method: "POST",
          origin: "https://www.winbackpay.com",
        }),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
        "https://www.winbackpay.com",
      );
    });

    it("does not allow dashboard.stripe.com on the waitlist route", () => {
      const res = middleware(
        req("/api/waitlist", {
          method: "POST",
          origin: "https://dashboard.stripe.com",
        }),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
    });
  });

  describe("/api/webhooks/* (server-to-server)", () => {
    it("emits no CORS headers even for the dashboard origin", () => {
      const res = middleware(
        req("/api/webhooks/stripe", {
          method: "POST",
          origin: "https://dashboard.stripe.com",
        }),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
      expect(res.headers.get("Access-Control-Allow-Methods")).toBeNull();
    });

    it("preflight on a webhook path returns 204 without CORS headers", () => {
      const res = middleware(
        req("/api/webhooks/stripe", {
          method: "OPTIONS",
          origin: "https://dashboard.stripe.com",
        }),
      );
      expect(res.status).toBe(204);
      expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
    });
  });

  it("no longer emits wildcard ACAO on any /api path", () => {
    for (const path of [
      "/api/health",
      "/api/waitlist",
      "/api/disputes/dp_test/submit",
      "/api/webhooks/stripe",
    ]) {
      const res = middleware(req(path, { origin: "https://anyone.example" }));
      expect(res.headers.get("Access-Control-Allow-Origin")).not.toBe("*");
    }
  });
});
