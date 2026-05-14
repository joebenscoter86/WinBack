// backend/app/components/install-cta.tsx

import { MARKETPLACE_URL } from "../lib/marketing";

type InstallCTAProps = {
  primary?: boolean;
  label?: string;
};

export function InstallCTA({
  primary = false,
  label = "Install from Stripe Marketplace",
}: InstallCTAProps) {
  const classes = primary
    ? "primary-cta-gradient text-on-primary-container px-8 py-4 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all whitespace-nowrap inline-flex items-center justify-center gap-2"
    : "primary-cta-gradient text-on-primary-container px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity inline-flex items-center gap-2";

  return (
    <a
      href={MARKETPLACE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {label}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
}
