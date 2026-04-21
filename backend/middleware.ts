import { NextRequest, NextResponse } from "next/server";

// WIN-62: tight per-route CORS allowlists. The previous `Access-Control-Allow-Origin: *`
// let any origin attempt cross-site POSTs against our API. `withStripeAuth` still
// required a valid signature, but the wildcard was Stripe-review bait and left
// `/api/waitlist` (unauthenticated) world-open.
//
// Three regimes:
//   - /api/webhooks/*  — Stripe server-to-server. Browsers never hit these;
//                        omit CORS headers entirely.
//   - /api/waitlist    — Public marketing form. Allow the marketing origin only.
//   - all other /api/* — Stripe App iframe. Allow the dashboard origin only.
//
// For any other origin on an allowlisted path, we simply don't emit the ACAO
// header; the browser then blocks the cross-origin response. Server-to-server
// callers (no Origin header, like Stripe's webhook fetcher) are unaffected.

const STRIPE_DASHBOARD_ORIGIN = "https://dashboard.stripe.com";
const MARKETING_ORIGINS = new Set([
  "https://winbackpay.com",
  "https://www.winbackpay.com",
]);

const ALLOWED_METHODS = "GET, POST, PATCH, OPTIONS";
const ALLOWED_HEADERS = "Content-Type, Stripe-Signature";
const MAX_AGE = "86400";

function allowedOriginFor(pathname: string, origin: string | null): string | null {
  if (pathname.startsWith("/api/webhooks/")) {
    // Webhooks are server-to-server. No browser CORS path.
    return null;
  }
  if (pathname === "/api/waitlist") {
    return origin && MARKETING_ORIGINS.has(origin) ? origin : null;
  }
  // Default: Stripe App iframe.
  //
  // Stripe Apps run in a sandboxed iframe (sandbox="allow-scripts" without
  // allow-same-origin), so fetch calls from inside the extension always carry
  // `Origin: null` per the HTML spec — not `https://dashboard.stripe.com`.
  // We must echo that literal "null" back as ACAO for the preflight to pass.
  //
  // Security isn't harmed: every iframe route is wrapped in withStripeAuth,
  // which verifies a signature cryptographically tied to STRIPE_APP_SECRET.
  // An attacker on a different sandboxed page can send CORS-bypassing
  // requests all day; without the signature they get a 401 before any work
  // runs. CORS here is UX (let the legitimate iframe talk to us), not
  // authorization.
  //
  // dashboard.stripe.com is kept in the allowlist for completeness — some
  // Stripe contexts may drop the sandbox, and same-origin-ish tools like
  // local preview pages may send the real origin.
  if (origin === "null" || origin === STRIPE_DASHBOARD_ORIGIN) {
    return origin;
  }
  return null;
}

function applyCors(response: NextResponse, allowedOrigin: string): void {
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Vary", "Origin");
  response.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS);
  response.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
  response.headers.set("Access-Control-Max-Age", MAX_AGE);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.headers.get("origin");
  const allowedOrigin = allowedOriginFor(pathname, origin);

  if (request.method === "OPTIONS") {
    // Preflight: only acknowledge if the origin is allowlisted for this path.
    if (!allowedOrigin) {
      return new NextResponse(null, { status: 204 });
    }
    const res = new NextResponse(null, { status: 204 });
    applyCors(res, allowedOrigin);
    return res;
  }

  const response = NextResponse.next();
  if (allowedOrigin) {
    applyCors(response, allowedOrigin);
  }
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
