import Link from "next/link";
import type { ReactNode } from "react";

function LegalNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(7,13,31,0.4)]">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white font-[family-name:var(--font-plus-jakarta)]">
            WinBack
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors font-[family-name:var(--font-inter)] text-sm tracking-wide"
          >
            Home
          </Link>
          <a
            href="mailto:support@winbackpay.com"
            className="text-slate-300 hover:text-white transition-colors font-[family-name:var(--font-inter)] text-sm tracking-wide"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function LegalFooter() {
  return (
    <footer className="bg-background w-full py-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link
            href="/"
            className="text-lg font-bold text-slate-100 font-[family-name:var(--font-plus-jakarta)] tracking-tighter"
          >
            WinBack
          </Link>
          <p className="text-slate-500 font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px]">
            &copy; 2026 JB Technology LLC
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            href="/terms"
            className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px]"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px]"
          >
            Privacy
          </Link>
          <a
            href="mailto:support@winbackpay.com"
            className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <LegalNavbar />
      <main className="relative pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12 space-y-3">
            <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-plus-jakarta)] font-extrabold tracking-tighter text-white">
              {title}
            </h1>
            <p className="text-slate-500 font-[family-name:var(--font-inter)] text-sm tracking-wide">
              Last updated: {lastUpdated}
            </p>
          </header>
          <div className="space-y-6 text-on-surface-variant font-[family-name:var(--font-inter)] leading-relaxed [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-[family-name:var(--font-plus-jakarta)] [&_h2]:font-bold [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-200 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:leading-relaxed [&_a]:text-cyan-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-cyan-300 [&_strong]:text-slate-100 [&_strong]:font-semibold">
            {children}
          </div>
        </article>
      </main>
      <LegalFooter />
    </>
  );
}
