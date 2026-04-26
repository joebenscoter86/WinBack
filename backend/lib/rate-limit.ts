// WIN-68: IP-based rate limiting for unauthenticated endpoints.
//
// Backed by Upstash Ratelimit (sliding-window in Redis). The waitlist route
// is the first consumer. If UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// are missing we fail open — that's fine for local development where abuse
// isn't a concern. Production deploys must set both.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const ALLOWED_WHEN_UNCONFIGURED: RateLimitResult = {
  success: true,
  limit: 0,
  remaining: 0,
  reset: 0,
};

let waitlistLimiter: Ratelimit | null = null;

function getWaitlistLimiter(): Ratelimit | null {
  if (waitlistLimiter) return waitlistLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  waitlistLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // 5 requests per minute per key. Human form submitters stay well under;
    // scripted abuse gets throttled fast.
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: false,
    prefix: "ratelimit:waitlist",
  });
  return waitlistLimiter;
}

/**
 * Check and consume one token against the waitlist rate limiter.
 * `identifier` should be the client IP. Fails open if Upstash isn't
 * configured (dev/test).
 */
export async function checkWaitlistRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const limiter = getWaitlistLimiter();
  if (!limiter) return ALLOWED_WHEN_UNCONFIGURED;

  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  return { success, limit, remaining, reset };
}

let billingTokenLimiter: Ratelimit | null = null;

function getBillingTokenLimiter(): Ratelimit | null {
  if (billingTokenLimiter) return billingTokenLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  billingTokenLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // 30 requests per minute per IP. Legitimate users hit these routes
    // at most a handful of times per session (open page, click Continue).
    // Scripted abuse gets throttled at 30/min.
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: false,
    prefix: "ratelimit:billing-token",
  });
  return billingTokenLimiter;
}

/**
 * Check and consume one token against the billing-token rate limiter.
 * `identifier` should be the client IP. Fails open if Upstash isn't
 * configured (dev/test).
 */
export async function checkBillingTokenRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const limiter = getBillingTokenLimiter();
  if (!limiter) return ALLOWED_WHEN_UNCONFIGURED;

  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  return { success, limit, remaining, reset };
}

let preflightLimiter: Ratelimit | null = null;

function getPreflightLimiter(): Ratelimit | null {
  if (preflightLimiter) return preflightLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  preflightLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // 60 requests per minute per IP. More permissive than billing-token
    // because uptime monitors may legitimately poll this endpoint.
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    analytics: false,
    prefix: "ratelimit:preflight",
  });
  return preflightLimiter;
}

/**
 * Check and consume one token against the preflight rate limiter.
 * `identifier` should be the client IP. Fails open if Upstash isn't
 * configured (dev/test).
 */
export async function checkPreflightRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const limiter = getPreflightLimiter();
  if (!limiter) return ALLOWED_WHEN_UNCONFIGURED;

  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  return { success, limit, remaining, reset };
}

/**
 * Extract the client IP from the request. Vercel and most reverse proxies
 * set `x-forwarded-for` with the client IP as the first comma-separated
 * entry. Falls back to "anonymous" so unconfigured edge cases still key
 * the limiter consistently (rather than hitting every caller with the
 * same synthetic key and rate-limiting legitimate users).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "anonymous";
}
