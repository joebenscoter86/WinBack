import { describe, it, expect, vi, beforeEach } from "vitest";
import Stripe from "stripe";

const { supabaseMock, billingMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { cancelUsageSubscription: vi.fn() },
}));
vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);

import { handleBillingEvent } from "../handle-billing-event";

const MERCHANT_ID = "m-1";

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
    process.env.STRIPE_PRICE_PRO_MONTHLY = "price_pro";
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
