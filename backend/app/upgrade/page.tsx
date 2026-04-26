import { verifyToken } from "@/lib/upgrade-token";
import { supabase } from "@/lib/supabase";
import { ContinueButton } from "./ContinueButton";

type SearchParams = { t?: string };

async function resolveMerchant(
  token: string,
): Promise<
  | { ok: true; merchantId: string; businessName: string | null; tier: "usage" | "pro" }
  | { ok: false; reason: "invalid" | "expired" | "wrong_kind" | "not_found" }
> {
  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : "";
    return { ok: false, reason: msg.includes("expired") ? "expired" : "invalid" };
  }
  if (payload.kind !== "upgrade") return { ok: false, reason: "wrong_kind" };
  const { data } = await supabase
    .from("merchants")
    .select("id, business_name, billing_tier")
    .eq("id", payload.merchant_id)
    .maybeSingle();
  if (!data) return { ok: false, reason: "not_found" };
  const row = data as { id: string; business_name: string | null; billing_tier: "usage" | "pro" };
  return {
    ok: true,
    merchantId: row.id,
    businessName: row.business_name,
    tier: row.billing_tier,
  };
}

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = params.t ?? "";

  if (!token) {
    return <InvalidState reason="invalid" />;
  }
  const resolved = await resolveMerchant(token);
  if (!resolved.ok) {
    return <InvalidState reason={resolved.reason} />;
  }
  if (resolved.tier === "pro") {
    return <AlreadyProState />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Upgrade {resolved.businessName ?? "your account"} to WinBack Pro
        </h1>
        <p className="mt-4 text-slate-300">
          You are currently on Pay-Per-Win (15% of each recovered amount).
          Upgrading to Pro removes the success fee entirely.
        </p>

        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">$79</span>
            <span className="text-slate-400">/month</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Unlimited disputes, zero success fee</li>
            <li>Keep 100% of every recovered dollar</li>
            <li>Cancel anytime, pro-rated on current period</li>
            <li>Billed monthly through Stripe</li>
          </ul>
        </div>

        <div className="mt-6">
          <ContinueButton token={token} />
        </div>

        <p className="mt-6 text-xs text-slate-500">
          This link expires 15 minutes after you open it. If it expires, return
          to the WinBack app in your Stripe Dashboard and click Upgrade again.
        </p>
      </div>
    </main>
  );
}

function InvalidState({ reason }: { reason: "invalid" | "expired" | "wrong_kind" | "not_found" }) {
  const copy: Record<string, { title: string; body: string }> = {
    invalid: {
      title: "This link is not valid",
      body: "The upgrade link appears to be corrupted. Please return to the WinBack app in your Stripe Dashboard and click Upgrade again.",
    },
    expired: {
      title: "This link has expired",
      body: "Upgrade links expire after 15 minutes. Please return to the WinBack app in your Stripe Dashboard and click Upgrade again.",
    },
    wrong_kind: {
      title: "This link is not an upgrade link",
      body: "The link you followed is for a different action. Please return to the WinBack app in your Stripe Dashboard.",
    },
    not_found: {
      title: "Account not found",
      body: "We could not find the account associated with this link. If you think this is a mistake, email support@winbackpay.com.",
    },
  };
  const c = copy[reason];
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8">
        <h1 className="text-2xl font-bold">{c.title}</h1>
        <p className="mt-4 text-slate-300">{c.body}</p>
      </div>
    </main>
  );
}

function AlreadyProState() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8">
        <h1 className="text-2xl font-bold">You are already on Pro</h1>
        <p className="mt-4 text-slate-300">
          Your account is already on the Pro plan. Return to the WinBack app in
          your Stripe Dashboard to manage your subscription.
        </p>
      </div>
    </main>
  );
}
