import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, stripeMock } = vi.hoisted(() => {
  const customersCreate = vi.fn();
  const subscriptionsCreate = vi.fn();
  const subscriptionsUpdate = vi.fn();
  const meterEventsCreate = vi.fn();
  const checkoutSessionsCreate = vi.fn();

  class MockStripe {
    customers = { create: customersCreate };
    subscriptions = { create: subscriptionsCreate, update: subscriptionsUpdate };
    billing = { meterEvents: { create: meterEventsCreate } };
    checkout = { sessions: { create: checkoutSessionsCreate } };
  }

  return {
    supabaseMock: { from: vi.fn() },
    stripeMock: {
      default: MockStripe,
      customersCreate,
      subscriptionsCreate,
      subscriptionsUpdate,
      meterEventsCreate,
      checkoutSessionsCreate,
    },
  };
});

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("stripe", () => ({ default: stripeMock.default }));

import {
  calculateSuccessFeeCents,
  getOrCreateBillingCustomer,
  reportDisputeWonFee,
  createProCheckoutSession,
  cancelUsageSubscription,
} from "../billing";
import { __resetEnvCacheForTests } from "../env";

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

function mockMerchantLookup(row: Record<string, unknown> | null) {
  const updateChain = {
    update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) })),
  };
  supabaseMock.from.mockImplementation((_table: string) => ({
    select: () => ({
      eq: () => ({
        maybeSingle: vi.fn().mockResolvedValue({ data: row, error: null }),
      }),
    }),
    ...updateChain,
  }));
  return updateChain;
}

describe("calculateSuccessFeeCents", () => {
  it("returns 15% of the amount, rounded", () => {
    expect(calculateSuccessFeeCents(10000)).toBe(1500);
    expect(calculateSuccessFeeCents(333)).toBe(50); // 49.95 → 50
    expect(calculateSuccessFeeCents(0)).toBe(0);
  });
});

describe("getOrCreateBillingCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setRequiredEnvVars();
    __resetEnvCacheForTests();
  });

  it("reuses existing customer id when already set", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: "a@b.co",
      business_name: "Biz",
      stripe_billing_customer_id: "cus_123",
    });
    const id = await getOrCreateBillingCustomer(MERCHANT_ID);
    expect(id).toBe("cus_123");
    expect(stripeMock.customersCreate).not.toHaveBeenCalled();
  });

  it("creates and persists a new customer when missing", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: "a@b.co",
      business_name: "Biz",
      stripe_billing_customer_id: null,
    });
    stripeMock.customersCreate.mockResolvedValue({ id: "cus_new" });

    const id = await getOrCreateBillingCustomer(MERCHANT_ID);
    expect(id).toBe("cus_new");
    expect(stripeMock.customersCreate).toHaveBeenCalledWith({
      email: "a@b.co",
      name: "Biz",
      metadata: { merchant_id: MERCHANT_ID, stripe_account_id: "acct_1" },
    });
  });
});

describe("reportDisputeWonFee", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setRequiredEnvVars();
    __resetEnvCacheForTests();
  });

  it("reports a meter event keyed by dispute id", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_billing_customer_id: "cus_1",
      stripe_usage_subscription_id: "sub_1",
    });

    await reportDisputeWonFee({
      merchantId: MERCHANT_ID,
      disputeId: "dp_1",
      amountRecoveredCents: 10000,
    });

    expect(stripeMock.meterEventsCreate).toHaveBeenCalledWith({
      event_name: "dispute_won_fee",
      payload: { stripe_customer_id: "cus_1", value: "1500" },
      identifier: "dispute_won:dp_1",
    });
  });

  it("lazily creates a usage subscription when none exists", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_billing_customer_id: "cus_1",
      stripe_usage_subscription_id: null,
    });
    stripeMock.subscriptionsCreate.mockResolvedValue({ id: "sub_new" });

    await reportDisputeWonFee({
      merchantId: MERCHANT_ID,
      disputeId: "dp_2",
      amountRecoveredCents: 5000,
    });

    expect(stripeMock.subscriptionsCreate).toHaveBeenCalledWith({
      customer: "cus_1",
      items: [{ price: "price_usage" }],
      metadata: { merchant_id: MERCHANT_ID, tier: "usage" },
    });
    expect(stripeMock.meterEventsCreate).toHaveBeenCalledOnce();
  });
});

describe("createProCheckoutSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setRequiredEnvVars();
    __resetEnvCacheForTests();
  });

  it("creates a subscription-mode Checkout session and returns its URL", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_billing_customer_id: "cus_1",
    });
    stripeMock.checkoutSessionsCreate.mockResolvedValue({
      id: "cs_1",
      url: "https://checkout.stripe.com/c/pay/cs_1",
    });

    const result = await createProCheckoutSession({
      merchantId: MERCHANT_ID,
      successUrl: "https://dash/ok",
      cancelUrl: "https://dash/no",
    });

    expect(result.url).toBe("https://checkout.stripe.com/c/pay/cs_1");
    const call = stripeMock.checkoutSessionsCreate.mock.calls[0][0];
    expect(call.mode).toBe("subscription");
    expect(call.customer).toBe("cus_1");
    expect(call.line_items).toEqual([{ price: "price_pro", quantity: 1 }]);
  });
});

describe("cancelUsageSubscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setRequiredEnvVars();
    __resetEnvCacheForTests();
  });

  it("no-ops when no usage subscription exists", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_usage_subscription_id: null,
    });
    await cancelUsageSubscription(MERCHANT_ID);
    expect(stripeMock.subscriptionsUpdate).not.toHaveBeenCalled();
  });

  it("cancels at period end when a usage subscription exists", async () => {
    mockMerchantLookup({
      id: MERCHANT_ID,
      stripe_account_id: "acct_1",
      email: null,
      business_name: null,
      stripe_usage_subscription_id: "sub_usage_1",
    });
    stripeMock.subscriptionsUpdate.mockResolvedValue({ id: "sub_usage_1" });
    await cancelUsageSubscription(MERCHANT_ID);
    expect(stripeMock.subscriptionsUpdate).toHaveBeenCalledWith(
      "sub_usage_1",
      { cancel_at_period_end: true },
    );
  });
});
