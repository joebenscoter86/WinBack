import { describe, it, expect, beforeEach } from "vitest";

const SECRET = "a".repeat(32);

describe("upgrade-token", () => {
  beforeEach(() => {
    process.env.UPGRADE_LINK_SECRET = SECRET;
  });

  it("signToken returns a token that verifyToken accepts", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const payload = verifyToken(token);
    expect(payload.merchant_id).toBe("m-1");
    expect(payload.kind).toBe("upgrade");
  });

  it("verifyToken rejects tampered payload", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const [h, p, s] = token.split(".");
    // Replace payload with a different merchant id, keep original signature.
    const badPayload = Buffer.from(
      JSON.stringify({ merchant_id: "m-2", kind: "upgrade", iat: 1, exp: 1e12 }),
    )
      .toString("base64url");
    const tampered = [h, badPayload, s].join(".");
    expect(() => verifyToken(tampered)).toThrow(/signature/i);
  });

  it("verifyToken rejects wrong secret", async () => {
    const { signToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    process.env.UPGRADE_LINK_SECRET = "b".repeat(32);
    const { verifyToken } = await import("../upgrade-token");
    expect(() => verifyToken(token)).toThrow(/signature/i);
  });

  it("verifyToken rejects expired tokens", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" }, { ttlSeconds: -1 });
    expect(() => verifyToken(token)).toThrow(/expired/i);
  });

  it("verifyToken rejects malformed tokens", async () => {
    const { verifyToken } = await import("../upgrade-token");
    expect(() => verifyToken("not-a-token")).toThrow();
    expect(() => verifyToken("a.b")).toThrow();
    expect(() => verifyToken("")).toThrow();
  });

  it("signToken kind='setup' round-trips correctly", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const token = signToken({ merchant_id: "m-2", kind: "setup" });
    expect(verifyToken(token).kind).toBe("setup");
  });

  it("default ttl is 15 minutes", async () => {
    const { signToken, verifyToken } = await import("../upgrade-token");
    const before = Math.floor(Date.now() / 1000);
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const payload = verifyToken(token);
    const ttl = payload.exp - before;
    expect(ttl).toBeGreaterThan(14 * 60);
    expect(ttl).toBeLessThanOrEqual(15 * 60 + 2);
  });
});
