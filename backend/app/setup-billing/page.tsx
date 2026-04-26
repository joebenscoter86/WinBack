import { verifyToken } from "@/lib/upgrade-token";
import { supabase } from "@/lib/supabase";
import { ContinueButton } from "./ContinueButton";

type SearchParams = { t?: string };

async function resolveMerchant(token: string) {
  try {
    const payload = verifyToken(token);
    if (payload.kind !== "setup") return { ok: false as const, reason: "wrong_kind" as const };
    const { data } = await supabase
      .from("merchants")
      .select("id, business_name")
      .eq("id", payload.merchant_id)
      .maybeSingle();
    if (!data) return { ok: false as const, reason: "not_found" as const };
    const row = data as { id: string; business_name: string | null };
    return { ok: true as const, merchantId: row.id, businessName: row.business_name };
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : "";
    return { ok: false as const, reason: msg.includes("expired") ? "expired" : "invalid" } as const;
  }
}

export default async function SetupBillingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = params.t ?? "";
  if (!token) return <InvalidState reason="invalid" />;
  const resolved = await resolveMerchant(token);
  if (!resolved.ok) return <InvalidState reason={resolved.reason} />;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Add a payment method for {resolved.businessName ?? "your account"}
        </h1>
        <p className="mt-4 text-slate-300">
          WinBack charges the 15% success fee only when a dispute is won.
          Adding a card now does not charge you anything. It lets us settle
          future wins instantly instead of failing on an invoice.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-400">
          <li>No charge today.</li>
          <li>Card is held securely by Stripe.</li>
          <li>You can change or remove it later from your Stripe billing portal.</li>
        </ul>
        <div className="mt-8">
          <ContinueButton token={token} />
        </div>
        <p className="mt-6 text-xs text-slate-500">
          This link expires 15 minutes after you open it.
        </p>
      </div>
    </main>
  );
}

function InvalidState({
  reason,
}: {
  reason: "invalid" | "expired" | "wrong_kind" | "not_found";
}) {
  const copy: Record<string, { title: string; body: string }> = {
    invalid: {
      title: "This link is not valid",
      body: "Please return to the WinBack app in your Stripe Dashboard and try again.",
    },
    expired: {
      title: "This link has expired",
      body: "Setup links expire after 15 minutes. Please return to the WinBack app in your Stripe Dashboard and try again.",
    },
    wrong_kind: {
      title: "This link is not a setup link",
      body: "The link you followed is for a different action.",
    },
    not_found: {
      title: "Account not found",
      body: "We could not find the account for this link. If you think this is a mistake, email support@winbackpay.com.",
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
