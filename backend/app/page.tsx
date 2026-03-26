import { WaitlistForm } from "./components/waitlist-form";
import { PlaybookCards } from "./components/playbook-cards";
import { HeroWidget } from "./components/hero-widget";
import { NarrativeDemo } from "@/components/ui/narrative-demo";
import { AlertFeed } from "@/components/ui/alert-feed";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(7,13,31,0.4)]">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white font-[family-name:var(--font-plus-jakarta)]">
            WinBack
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#features"
            className="text-slate-300 hover:text-white transition-colors font-[family-name:var(--font-inter)] text-sm tracking-wide"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-slate-300 hover:text-white transition-colors font-[family-name:var(--font-inter)] text-sm tracking-wide"
          >
            Pricing
          </a>
          <a
            href="#comparison"
            className="text-slate-300 hover:text-white transition-colors font-[family-name:var(--font-inter)] text-sm tracking-wide"
          >
            Compare
          </a>
        </div>
        <a
          href="#waitlist"
          className="primary-cta-gradient text-on-primary-container px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}

function RibbonBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
      <div className="absolute top-[10%] -left-[10%] w-[120%] h-[80%] ribbon-gradient rotate-12 blur-[120px] opacity-40" />
      <div className="absolute top-[40%] -right-[20%] w-[100%] h-[60%] ribbon-gradient -rotate-6 blur-[150px] opacity-30" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/ribbon.png"
        className="absolute top-0 right-0 w-full h-auto object-cover opacity-20 mix-blend-screen"
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-32 text-center md:text-left grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className="space-y-8 relative z-10">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-bright text-primary-container font-[family-name:var(--font-inter)] text-[10px] tracking-widest uppercase font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
          </span>
          Now available on Stripe
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-[family-name:var(--font-plus-jakarta)] font-extrabold tracking-tighter text-white leading-[0.9]">
          Win back your{" "}
          <br />
          <span className="text-primary">revenue.</span>
        </h1>

        <p className="text-on-surface-variant text-xl md:text-2xl max-w-lg leading-relaxed">
          You&apos;re losing disputes you should be winning. WinBack gives you
          step-by-step playbooks that show you exactly what to submit and why
          it wins. $29/month flat. You keep every dollar you recover.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md" id="waitlist">
          <WaitlistForm />
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-6 text-slate-500 font-[family-name:var(--font-inter)] text-xs tracking-widest uppercase">
          <span>Lives in your Stripe Dashboard</span>
          <span className="hidden sm:block w-12 h-px bg-outline-variant/30" />
          <span>No credit card required</span>
        </div>
      </div>

      {/* Product Widget */}
      <div className="hidden md:block">
        <HeroWidget />
      </div>
    </section>
  );
}

function PricingCallout() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-surface-low rounded-[2rem] p-1 shadow-2xl overflow-hidden">
        <div className="bg-background/40 backdrop-blur-md rounded-[1.9rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white tracking-tight">
              Radically simple pricing.
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg">
              Other services take 25-30% of money that was already yours.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-primary font-[family-name:var(--font-plus-jakarta)] font-extrabold text-6xl md:text-7xl">
              $29
              <span className="text-2xl text-slate-500">/mo</span>
            </div>
            <p className="text-slate-400 font-[family-name:var(--font-inter)] text-xs tracking-widest uppercase mt-2">
              Flat fee. No success fees. Ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const competitors = [
    {
      name: "Smart Disputes",
      fee: "30% Success Fee",
      integration: "Internal data only",
      cost: "$3,000",
    },
    {
      name: "Chargeflow",
      fee: "25% Success Fee",
      integration: "Webhooks",
      cost: "$2,500",
    },
    {
      name: "DisputeNinja",
      fee: "$499/mo Base",
      integration: "Manual Upload",
      cost: "$499",
    },
  ];

  return (
    <section id="comparison" className="max-w-7xl mx-auto px-6 py-16 md:py-32">
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter">
          The true cost of disputes.
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          You earned that revenue. You shouldn&apos;t have to share it just
          because a customer filed a dispute.
        </p>
      </div>
      <div className="overflow-x-auto bg-surface-low rounded-2xl sm:rounded-3xl border border-white/5">
        <table className="w-full text-left border-collapse min-w-[480px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-[family-name:var(--font-inter)] uppercase tracking-widest text-slate-500">
                Provider
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-[family-name:var(--font-inter)] uppercase tracking-widest text-slate-500">
                Fee Structure
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-[family-name:var(--font-inter)] uppercase tracking-widest text-slate-500 hidden sm:table-cell">
                Integration
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-xs font-[family-name:var(--font-inter)] uppercase tracking-widest text-slate-500">
                Cost on $10k
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {competitors.map((comp) => (
              <tr
                key={comp.name}
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="px-4 sm:px-8 py-5 sm:py-8 font-[family-name:var(--font-plus-jakarta)] font-bold text-base sm:text-xl text-white">
                  {comp.name}
                </td>
                <td className="px-4 sm:px-8 py-5 sm:py-8 text-on-surface-variant text-sm">
                  {comp.fee}
                </td>
                <td className="px-4 sm:px-8 py-5 sm:py-8 text-on-surface-variant text-sm hidden sm:table-cell">
                  {comp.integration}
                </td>
                <td className="px-4 sm:px-8 py-5 sm:py-8 text-error font-bold">
                  {comp.cost}
                </td>
              </tr>
            ))}
            {/* WinBack row */}
            <tr className="bg-primary/5">
              <td className="px-4 sm:px-8 py-6 sm:py-10 font-[family-name:var(--font-plus-jakarta)] font-extrabold text-xl sm:text-2xl text-primary">
                WinBack
              </td>
              <td className="px-4 sm:px-8 py-6 sm:py-10 text-primary/90 font-medium text-sm">
                Flat $29/mo
              </td>
              <td className="px-4 sm:px-8 py-6 sm:py-10 text-primary/90 font-medium hidden sm:table-cell">
                1-Click Stripe App
              </td>
              <td className="px-4 sm:px-8 py-6 sm:py-10 text-primary font-extrabold text-2xl sm:text-3xl">
                $29
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-16 md:py-32">
      {/* Section header */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-center mb-12 md:mb-24">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter leading-tight">
            Like having a payments expert in your corner.
          </h2>
        </div>
        <p className="text-on-surface-variant text-xl leading-relaxed">
          WinBack lives inside your Stripe Dashboard. Open a dispute, see
          exactly what the issuing bank evaluates, what evidence you need, and
          how to present it. No tab-switching, no guesswork.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Wide */}
        <div className="md:col-span-2 bg-surface-low p-1 rounded-3xl border border-white/5 group overflow-hidden">
          <div className="bg-surface-container p-8 h-full rounded-[1.4rem] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="14 2 14 8 20 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="16"
                    y1="17"
                    x2="8"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white">
                Reason-Code Playbooks
              </h3>
              <p className="text-on-surface-variant">
                A Visa 13.1 &quot;Not Received&quot; needs different evidence than
                a Mastercard 4853 &quot;Not as Described.&quot; Our playbooks
                decode each reason code so you know exactly what to submit, what
                the issuer actually evaluates, and what mistakes sink most
                responses.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <PlaybookCards />
            </div>
          </div>
        </div>

        {/* Card 2: Narrow */}
        <div className="bg-surface-low p-1 rounded-3xl border border-white/5 group">
          <div className="bg-surface-container p-8 h-full rounded-[1.4rem]">
            <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary-container"
              >
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white mb-3">
              Real-time Alerts
            </h3>
            <p className="text-on-surface-variant text-sm mb-4">
              Disputes have hard deadlines. Miss one and you auto-lose.
            </p>
            <AlertFeed />
          </div>
        </div>

        {/* Card 3: Narrow */}
        <div className="bg-surface-low p-1 rounded-3xl border border-white/5 group">
          <div className="bg-surface-container p-8 h-full rounded-[1.4rem]">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white mb-4">
              Read-Only Access
            </h3>
            <p className="text-on-surface-variant">
              WinBack uses read-only Stripe permissions. We can see your
              disputes and evidence but can never initiate charges, refunds, or
              transfers. Your funds stay where they are.
            </p>
          </div>
        </div>

        {/* Card 4: Wide */}
        <div className="md:col-span-2 bg-surface-low p-1 rounded-3xl border border-white/5 group overflow-hidden">
          <div className="bg-surface-container p-8 h-full rounded-[1.4rem] flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-secondary-fixed-dim/10 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-secondary-fixed-dim"
                >
                  <path
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white">
                AI-Generated Narratives
              </h3>
              <p className="text-on-surface-variant">
                AI drafts your dispute narrative using your uploaded evidence
                and the right playbook for your reason code. You review it, edit
                anything you want, and submit on your terms. You stay in
                control.
              </p>
            </div>
            <div className="flex-1 w-full min-h-[240px]">
              <NarrativeDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 md:py-40">
      <div className="relative bg-surface-low rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 md:p-24 overflow-hidden border border-white/5 text-center">
        {/* Internal ribbon glow */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-container/10 blur-[120px] rounded-full" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter">
            Stop losing disputes you should be winning.
          </h2>
          <p className="text-on-surface-variant text-lg sm:text-xl max-w-xl mx-auto">
            The system isn&apos;t rigged. You just need the right playbook.
            Join the waitlist and be first to get issuer-side expertise in your
            Stripe Dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mt-12">
            <WaitlistForm />
          </div>
          <p className="text-slate-500 font-[family-name:var(--font-inter)] text-[10px] tracking-[0.2em] uppercase">
            No credit card required &bull; Secure Stripe connection
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background w-full py-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-lg font-bold text-slate-100 font-[family-name:var(--font-plus-jakarta)] tracking-tighter">
            WinBack
          </span>
          <p className="text-slate-500 font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px]">
            &copy; 2026 WinBack
          </p>
        </div>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px] opacity-80 hover:opacity-100"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px] opacity-80 hover:opacity-100"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px] opacity-80 hover:opacity-100"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-24">
        <RibbonBackground />
        <Hero />
        <PricingCallout />
        <ComparisonTable />
        <FeatureGrid />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
