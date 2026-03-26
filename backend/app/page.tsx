import Image from "next/image";
import { WaitlistForm } from "./components/waitlist-form";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="WinBack" width={32} height={32} />
          <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg text-on-surface">
            WinBack
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-8">
          <a href="#comparison" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
            Comparison
          </a>
          <a href="#features" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
            Pricing
          </a>
          <a
            href="#waitlist"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-5 py-2 rounded text-sm hover:opacity-90 transition-opacity"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 sm:py-32 flex flex-col sm:flex-row items-center gap-12 sm:gap-16">
      <div className="flex-1">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          Win your Stripe disputes.{" "}
          <span className="text-primary">Keep every dollar.</span>
        </h1>
        <p className="text-on-surface-variant text-lg sm:text-xl mt-6 leading-relaxed max-w-lg">
          Reason-code playbooks built from 10+ years on the issuer side of the
          table. $29/month flat. No success fees. No middlemen.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#waitlist"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-8 py-4 rounded text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <p className="text-outline text-sm mt-4">Early access opening soon</p>
      </div>
      <div className="flex-shrink-0">
        <div className="bg-surface-low rounded-xl p-8 sm:p-12">
          <Image
            src="/logo.png"
            alt="WinBack product"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="font-[family-name:var(--font-space-grotesk)] text-on-surface font-bold text-xl text-center mt-4">
            WINBACK
          </p>
          <p className="text-outline text-xs text-center mt-1 tracking-[0.2em] uppercase">
            Guided dispute resolution for Stripe merchants
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Built into your Stripe Dashboard",
      description:
        "WinBack lives right where your disputes are. Open a dispute, see exactly what the cardholder claimed and what evidence you need. No tab-switching, no copy-pasting.",
      accent: "primary",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Playbooks that know what issuers look for",
      description:
        "Each reason code has different rules. Our playbooks tell you exactly what evidence the issuing bank evaluates, what mistakes to avoid, and how to structure your response.",
      accent: "secondary",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "You keep 100% of what you recover",
      description:
        "Other services take 25-30% of your recovered revenue. That's your money twice over. WinBack is $29/month flat, whether you recover $50 or $5,000.",
      accent: "primary",
    },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface-low rounded-xl p-8"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                feature.accent === "secondary"
                  ? "bg-secondary/10"
                  : "bg-primary/10"
              }`}
            >
              {feature.icon}
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-on-surface font-bold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const competitors = [
    { name: "Smart Disputes", pricing: "30% success fee" },
    { name: "Chargeflow", pricing: "25% success fee" },
    { name: "DisputeNinja", pricing: "$499/month" },
  ];

  return (
    <section id="comparison" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-on-surface text-3xl sm:text-4xl font-bold text-center mb-2">
        WINBACK VS. THE REST
      </h2>
      <p className="text-outline text-center text-sm mb-10">
        Why pay more when you already earned it?
      </p>

      <div className="flex flex-col gap-2 max-w-2xl mx-auto" id="pricing">
        <div className="bg-surface-high rounded-lg px-6 py-4 flex justify-between items-center border-l-[3px] border-primary">
          <span className="text-primary font-bold font-[family-name:var(--font-space-grotesk)]">
            WinBack
          </span>
          <span className="text-primary font-semibold">$29/month flat fee</span>
        </div>

        {competitors.map((comp) => (
          <div
            key={comp.name}
            className="bg-surface-low rounded-lg px-6 py-4 flex justify-between items-center"
          >
            <span className="text-tertiary">{comp.name}</span>
            <span className="text-tertiary-container font-semibold">
              {comp.pricing}
            </span>
          </div>
        ))}
      </div>

      <p className="text-outline text-sm text-center mt-8 max-w-xl mx-auto leading-relaxed">
        Other services charge you a percentage of money that was already yours.
        You earned that revenue. You shouldn't have to share it just because a
        customer filed a dispute.
      </p>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20">
      <div className="bg-gradient-to-b from-surface-low to-background rounded-2xl px-8 sm:px-16 py-16 text-center">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-on-surface text-3xl sm:text-4xl font-bold mb-4">
          Stop losing disputes you should be winning.
        </h2>
        <p className="text-on-surface-variant text-base mb-10 max-w-md mx-auto">
          Join the waitlist for early access. WinBack shows you exactly what to
          submit, why it matters, and how to present it. Like having a payments
          expert in your corner.
        </p>

        <WaitlistForm />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-8">
          <span className="text-outline text-sm flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
              <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No credit card required
          </span>
          <span className="text-outline text-sm flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
              <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Stripe Verified
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="WinBack" width={20} height={20} />
          <span className="text-outline text-sm">
            &copy; 2026 WinBack. Guided dispute resolution for Stripe merchants.
          </span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-outline text-sm hover:text-on-surface transition-colors">
            Terms
          </a>
          <a href="#" className="text-outline text-sm hover:text-on-surface transition-colors">
            Privacy
          </a>
          <a href="#" className="text-outline text-sm hover:text-on-surface transition-colors">
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
      <main>
        <Hero />
        <Features />
        <Comparison />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
