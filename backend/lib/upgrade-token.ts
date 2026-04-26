/**
 * Compact HMAC-signed token for the upgrade / setup-billing handoff pages.
 *
 * Format: base64url(header).base64url(payload).base64url(sig)
 *  - header: { alg: "HS256", typ: "UB" }  (UB = upgrade-billing)
 *  - payload: { merchant_id, kind: "upgrade"|"setup", iat, exp }
 *  - sig: HMAC-SHA256(header + "." + payload, UPGRADE_LINK_SECRET)
 *
 * The "kind" claim differentiates upgrade-to-Pro links from add-payment-method
 * links so a token minted for one purpose cannot be replayed against the other.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export type TokenKind = "upgrade" | "setup";

export type TokenPayload = {
  merchant_id: string;
  kind: TokenKind;
  iat: number; // seconds since epoch
  exp: number; // seconds since epoch
};

const HEADER = { alg: "HS256", typ: "UB" };
const DEFAULT_TTL_SECONDS = 15 * 60;

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function hmac(data: string): Buffer {
  const secret = process.env.UPGRADE_LINK_SECRET;
  if (!secret) throw new Error("UPGRADE_LINK_SECRET not configured");
  return createHmac("sha256", secret).update(data).digest();
}

export function signToken(
  claims: { merchant_id: string; kind: TokenKind },
  opts: { ttlSeconds?: number } = {},
): string {
  const ttl = opts.ttlSeconds ?? DEFAULT_TTL_SECONDS;
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    merchant_id: claims.merchant_id,
    kind: claims.kind,
    iat: now,
    exp: now + ttl,
  };
  const h = b64url(Buffer.from(JSON.stringify(HEADER)));
  const p = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(hmac(`${h}.${p}`));
  return `${h}.${p}.${sig}`;
}

export function verifyToken(token: string): TokenPayload {
  if (typeof token !== "string" || token === "") {
    throw new Error("Token missing");
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Token malformed");
  }
  const [h, p, s] = parts;
  const expectedSig = b64url(hmac(`${h}.${p}`));
  const a = Buffer.from(s);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("Token signature invalid");
  }
  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
  } catch {
    throw new Error("Token payload malformed");
  }
  if (
    typeof payload.merchant_id !== "string" ||
    (payload.kind !== "upgrade" && payload.kind !== "setup") ||
    typeof payload.iat !== "number" ||
    typeof payload.exp !== "number"
  ) {
    throw new Error("Token payload malformed");
  }
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    throw new Error("Token expired");
  }
  return payload;
}
