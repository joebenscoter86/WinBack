import { vi } from "vitest";
import {
  CANNED_STRIPE_DISPUTE,
  CANNED_ANTHROPIC_RESPONSE,
  TEST_ACCOUNT_ID,
  TEST_USER_ID,
} from "./fixtures";

// Captures every call to anthropic.messages.create so the test can
// inspect what prompt got built. Reset between test runs by importing
// and clearing this array in beforeEach/afterEach if needed.
export const capturedAnthropicCalls: Array<{
  system: string;
  user: string;
  model: string;
}> = [];

// ---- @/lib/stripe ----
// Mock the Stripe client helpers the routes use. getDispute returns the
// canned fixture; normalizeDispute is the real implementation because
// it's a pure function that operates on the already-canned input.
// submitDispute is a vi.fn() so submit-route tests can override it per-step.
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    getDispute: vi.fn().mockResolvedValue(CANNED_STRIPE_DISPUTE),
    submitDispute: vi.fn().mockResolvedValue({
      id: "du_mock_default",
      status: "under_review",
      evidence: {},
    }),
    // normalizeDispute, classifyStripeError stay real
  };
});

// ---- @anthropic-ai/sdk ----
// Capture the messages.create args into capturedAnthropicCalls, then
// return the canned response. Using default-export Anthropic class so
// the lazy Proxy in lib/claude.ts picks it up.
vi.mock("@anthropic-ai/sdk", () => {
  const MessagesCreate = vi.fn(async (params: unknown) => {
    const { system, messages, model } = params as {
      system: string;
      messages: Array<{ role: string; content: string }>;
      model: string;
    };
    const userMessage = messages.find((m) => m.role === "user");
    capturedAnthropicCalls.push({
      system: system ?? "",
      user: userMessage?.content ?? "",
      model: model ?? "",
    });
    return CANNED_ANTHROPIC_RESPONSE;
  });

  class MockAnthropic {
    messages = { create: MessagesCreate };
    constructor(_opts?: unknown) {}
  }

  return { default: MockAnthropic };
});

// ---- @/lib/stripe-auth ----
// Bypass signature verification and inject the test identity. Copies
// the exact shape from backend/app/api/narratives/__tests__/generate.test.ts
// so auth behavior is identical to other route unit tests.
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: unknown, ctx: unknown) => unknown) =>
    async (req: Request) => {
      // Safely parse body: route handlers call request.clone().json() or
      // read query params. If body is absent or not JSON, pass empty object.
      let body: unknown = {};
      try {
        body = await (req as Request & { clone: () => Request })
          .clone()
          .json();
      } catch {
        body = {};
      }
      return handler(req, {
        identity: { userId: TEST_USER_ID, accountId: TEST_ACCOUNT_ID },
        body,
      });
    },
  fetchStripeSignature: vi.fn(),
}));

// ---- next/server after() ----
// The narrative generate route calls after(runBackgroundGeneration(...))
// to fire-and-forget the Claude call. In tests we need the background
// work to complete before the HTTP response resolves, so we replace
// after() to await the promise inline.
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    after: (promise: Promise<unknown>) => promise,
  };
});
