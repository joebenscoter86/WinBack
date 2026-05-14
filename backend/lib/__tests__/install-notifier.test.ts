import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { mockSend, mockAccountsRetrieve } = vi.hoisted(() => ({
  mockSend: vi.fn(),
  mockAccountsRetrieve: vi.fn(),
}));

vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: mockSend } }),
}));

vi.mock("stripe", () => ({
  default: class FakeStripe {
    accounts = { retrieve: mockAccountsRetrieve };
  },
}));

import { notifyNewInstall } from "../install-notifier";

describe("notifyNewInstall", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.WAITLIST_NOTIFY_EMAIL = "owner@example.com";
    process.env.RESEND_FROM_EMAIL = "hello@winbackpay.com";
    process.env.STRIPE_SECRET_KEY_LIVE = "sk_live_x";
    process.env.STRIPE_SECRET_KEY_TEST = "sk_test_x";
    mockSend.mockResolvedValue({ id: "email_1" });
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("is a no-op when WAITLIST_NOTIFY_EMAIL is unset", async () => {
    delete process.env.WAITLIST_NOTIFY_EMAIL;

    await notifyNewInstall("acct_123");

    expect(mockSend).not.toHaveBeenCalled();
  });

  it("sends an enriched email when the live-key account fetch succeeds", async () => {
    mockAccountsRetrieve.mockResolvedValueOnce({
      business_profile: { name: "Acme Storefront" },
      country: "US",
      email: "merchant@acme.test",
    });

    await notifyNewInstall("acct_live_123");

    expect(mockAccountsRetrieve).toHaveBeenCalledWith("acct_live_123");
    expect(mockSend).toHaveBeenCalledTimes(1);

    const call = mockSend.mock.calls[0][0];
    expect(call.to).toBe("owner@example.com");
    expect(call.subject).toBe("New WinBack install: Acme Storefront");
    expect(call.html).toContain("Acme Storefront");
    expect(call.html).toContain("US");
    expect(call.html).toContain("merchant@acme.test");
    expect(call.html).toContain("acct_live_123");
    expect(call.html).toContain("https://dashboard.stripe.com/acct_live_123");
  });

  it("falls back to the test key when the live key rejects", async () => {
    mockAccountsRetrieve
      .mockRejectedValueOnce(new Error("No such account in live mode"))
      .mockResolvedValueOnce({
        business_profile: { name: "Test Acct" },
        country: "CA",
        email: null,
      });

    await notifyNewInstall("acct_test_456");

    expect(mockAccountsRetrieve).toHaveBeenCalledTimes(2);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend.mock.calls[0][0].subject).toBe("New WinBack install: Test Acct");
  });

  it("still sends an un-enriched email when no key can fetch the account", async () => {
    mockAccountsRetrieve.mockRejectedValue(new Error("Permission denied"));

    await notifyNewInstall("acct_unknown");

    expect(mockSend).toHaveBeenCalledTimes(1);
    const call = mockSend.mock.calls[0][0];
    // Falls back to account ID in subject when business name is unknown.
    expect(call.subject).toBe("New WinBack install: acct_unknown");
    expect(call.html).toContain("acct_unknown");
  });

  it("escapes HTML in any string interpolated into the body", async () => {
    mockAccountsRetrieve.mockResolvedValueOnce({
      business_profile: { name: "<script>alert('x')</script>" },
      country: null,
      email: null,
    });

    await notifyNewInstall("acct_xss");

    const html = mockSend.mock.calls[0][0].html as string;
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
