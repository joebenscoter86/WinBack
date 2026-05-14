// backend/app/content/faq.ts

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is WinBack live in the Stripe App Marketplace?",
    answer:
      "Yes. WinBack was published live on the Stripe App Marketplace and is available to install today.",
  },
  {
    question: "How does WinBack price?",
    answer:
      "Two options. Pay-Per-Win is $0/month and a 15% success fee on disputes you win. Pro is $79/month flat with zero success fee. You pick which fits your dispute volume.",
  },
  {
    question: "What dispute reason codes do you cover?",
    answer:
      "The major card-network dispute reason codes across Visa, Mastercard, Amex, and Discover. Each covered reason code gets its own playbook with the evidence the issuer actually evaluates.",
  },
  {
    question: "Where are evidence files stored?",
    answer:
      "Evidence files go directly from your browser to Stripe. WinBack never stores file bytes on its servers. We keep the dispute metadata and the Stripe file ID, nothing else.",
  },
  {
    question: "Do I need a Stripe account to use WinBack?",
    answer:
      "Yes. WinBack is a Stripe App that runs inside the Stripe Dashboard. If you process payments on Stripe, you can install WinBack today.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A few minutes. Install from the Stripe App Marketplace, grant the requested permissions, and WinBack is ready the next time a dispute lands.",
  },
  {
    question: "Can WinBack move money out of my Stripe account?",
    answer:
      "No. WinBack cannot initiate charges, refunds, or transfers. The only write WinBack makes to your Stripe account is your dispute response, and only when you choose to submit it.",
  },
];
