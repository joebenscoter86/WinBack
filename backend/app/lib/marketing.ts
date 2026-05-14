// backend/app/lib/marketing.ts

export const MARKETPLACE_URL =
  "https://marketplace.stripe.com/apps/winback";

export const SITE_URL = "https://winbackpay.com";

export const SUPPORT_EMAIL = "support@winbackpay.com";

export const PRICING = {
  payPerWin: {
    name: "Pay-Per-Win",
    monthlyPriceUsd: 0,
    description:
      "$0/month base price. 15% success fee on disputes you win, charged through Stripe billing. No fee on disputes you lose.",
    shortLabel: "15%",
    shortNote: "$0/month. Only pay when you win.",
  },
  pro: {
    name: "Pro",
    monthlyPriceUsd: 79,
    description:
      "Flat $79 per month, zero success fee, unlimited disputes.",
    shortLabel: "$79",
    shortNote: "Unlimited disputes. Zero success fee.",
  },
} as const;

export const ORGANIZATION = {
  legalName: "JB Technology LLC",
  url: SITE_URL,
} as const;
