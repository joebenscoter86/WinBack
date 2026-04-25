import { describe, it, expect, vi, beforeEach } from "vitest";
import Stripe from "stripe";

const { supabaseMock, billingMock, stripeMock } = vi.hoisted(() => {
  const customersUpdate = vi.fn();
  class MockStripe {
    customers = { update: customersUpdate };
    webhooks = { constructEvent: vi.fn() };
  }
  return {
    supabaseMock: { from: vi.fn() },
    billingMock: { cancelUsageSubscription: vi.fn() },
    stripeMock: {
      default: MockStripe,
      customersUpdate,
    },
  };
});
vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);
vi.mock("stripe", () => ({ default: stripeMock.default }));

import { handleBillingEvent } from "../handle-billing-event";
import { __resetEnvCacheForTests } from "../../env";

const MERCHANT_ID = "m-1";

function setRequiredEnvVars() {
  process.env.STRIPE_SECRET_KEY = "sk_test_x";
  process.env.STRIPE_APP_SECRET = "absec_x";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_x";
  process.env.STRIPE_BILLING_WEBHOOK_SECRET = "whsec_b";
  process.env.STRIPE_PRICE_PRO_MONTHLY = "price_pro";
  process.env.STRIPE_PRICE_USAGE_FEE = "price_usage";
  process.env.UPGRADE_LINK_SECRET = "a".repeat(32);
  process.env.SUPABASE_URL = "https://x.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
  process.env.ANTHROPIC_API_KEY = "sk-ant-x";
}

function makeEvent(
  type: Stripe.Event.Type,
  sub: Partial<Stripe.Subscription>,
): Stripe.Event {
  return {
    id: "evt_billing_1",
    type,
    created: 1700000000,
    data: { object: sub },
  } as unknown as Stripe.Event;
}

function mockMerchantLookup(row: { id: string; pro_since_at: string | null } | null) {
  const updateEq: ReturnType<typeof vi.fn> = vi.fn().mockResolvedValue({ error: null });
  const update: ReturnType<typeof vi.fn> = vi.fn(() => ({
    eq: Object.assign(updateEq, { eq: updateEq }),
  }));
  supabaseMock.from.mockImplementation((_table: string) => ({
    select: () => ({
      eq: () => ({
        maybeSingle: vi.fn().mockResolvedValue({ data: row, error: null }),
      }),
    }),
    update,
  }));
  return { update, updateEq };
}

function firstUpdateArg(update: ReturnType<typeof vi.fn>): Record<string, unknown> {
  return update.mock.calls[0]![0] as Record<string, unknown>;
}

describe("handleBillingEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setRequiredEnvVars();
    __resetEnvCacheForTests();
  });

  it("flips merchant to Pro tier on subscription.created with Pro price and active status", async () => {
    const { update } = mockMerchantLookup({ id: MERCHANT_ID, pro_since_at: null });
    const sub = {
      id: "sub_pro_1",
      customer: "cus_1",
      status: "active",
      metadata: { tier: "pro" },
      items: { data: [{ price: { id: "price_pro" } }] },
    } as unknown as Stripe.Subscription;

    await handleBillingEvent(makeEvent("customer.subscription.created", sub));

    expect(update).toHaveBeenCalled();
    const updatePayload = firstUpdateArg(update);
    expect(updatePayload.billing_tier).toBe("pro");
    expect(updatePayload.stripe_subscription_id).toBe("sub_pro_1");
    expect(updatePayload.pro_since_at).toBeTruthy();
    expect(billingMock.cancelUsageSubscription).toHaveBeenCalledWith(MERCHANT_ID);
  });

  it("ignores usage subscriptions (no tier change) on subscription.updated", async () => {
    const { update } = mockMerchantLookup({ id: MERCHANT_ID, pro_since_at: null });
    const sub = {
      id: "sub_usage_1",
      customer: "cus_1",
      status: "active",
      metadata: { tier: "usage" },
      items: { data: [{ price: { id: "price_usage" } }] },
    } as unknown as Stripe.Subscription;

    await handleBillingEvent(makeEvent("customer.subscription.updated", sub));

    expect(update).not.toHaveBeenCalled();
    expect(billingMock.cancelUsageSubscription).not.toHaveBeenCalled();
  });

  it("reverts merchant to usage tier on Pro subscription.deleted", async () => {
    const { update } = mockMerchantLookup({
      id: MERCHANT_ID,
      pro_since_at: "2026-04-01T00:00:00Z",
    });
    const sub = {
      id: "sub_pro_1",
      customer: "cus_1",
      status: "canceled",
      metadata: { tier: "pro" },
      items: { data: [{ price: { id: "price_pro" } }] },
    } as unknown as Stripe.Subscription;

    await handleBillingEvent(makeEvent("customer.subscription.deleted", sub));

    const payload = firstUpdateArg(update);
    expect(payload.billing_tier).toBe("usage");
    expect(payload.pro_since_at).toBeNull();
    expect(payload.stripe_subscription_id).toBeNull();
    expect(payload.subscription_status).toBe("canceled");
  });

  it("does not flip to Pro when status is incomplete", async () => {
    const { update } = mockMerchantLookup({ id: MERCHANT_ID, pro_since_at: null });
    const sub = {
      id: "sub_pro_1",
      customer: "cus_1",
      status: "incomplete",
      metadata: { tier: "pro" },
      items: { data: [{ price: { id: "price_pro" } }] },
    } as unknown as Stripe.Subscription;

    await handleBillingEvent(makeEvent("customer.subscription.created", sub));

    const payload = firstUpdateArg(update);
    expect(payload.billing_tier).toBeUndefined();
    expect(payload.subscription_status).toBe("incomplete");
    expect(billingMock.cancelUsageSubscription).not.toHaveBeenCalled();
  });

  it("preserves existing pro_since_at when subscription.updated fires while already Pro", async () => {
    const existing = "2026-04-01T00:00:00Z";
    const { update } = mockMerchantLookup({ id: MERCHANT_ID, pro_since_at: existing });
    const sub = {
      id: "sub_pro_1",
      customer: "cus_1",
      status: "active",
      metadata: { tier: "pro" },
      items: { data: [{ price: { id: "price_pro" } }] },
    } as unknown as Stripe.Subscription;

    await handleBillingEvent(makeEvent("customer.subscription.updated", sub));

    const payload = firstUpdateArg(update);
    expect(payload.pro_since_at).toBeUndefined();
  });
});

describe("setup_intent.succeeded", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setRequiredEnvVars();
    __resetEnvCacheForTests();
  });

  it("attaches the PaymentMethod as the customer's default", async () => {
    stripeMock.customersUpdate.mockResolvedValue({});

    const event = {
      type: "setup_intent.succeeded",
      data: {
        object: {
          id: "seti_1",
          customer: "cus_123",
          payment_method: "pm_1",
        },
      },
    } as unknown as Stripe.Event;

    const { handleBillingEvent } = await import("../handle-billing-event");
    await handleBillingEvent(event);

    expect(stripeMock.customersUpdate).toHaveBeenCalledWith("cus_123", {
      invoice_settings: { default_payment_method: "pm_1" },
    });
  });

  it("is a no-op if the SetupIntent has no payment_method or no customer", async () => {
    const event = {
      type: "setup_intent.succeeded",
      data: { object: { id: "seti_2", customer: null, payment_method: null } },
    } as unknown as Stripe.Event;

    const { handleBillingEvent } = await import("../handle-billing-event");
    await handleBillingEvent(event);
    expect(stripeMock.customersUpdate).not.toHaveBeenCalled();
  });
});
