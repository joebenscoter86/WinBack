export default function SetupBillingSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl border border-white/10 p-8 text-center">
        <h1 className="text-2xl font-bold">Payment method added</h1>
        <p className="mt-4 text-slate-300">
          You are all set. You can close this tab and return to the WinBack app
          in your Stripe Dashboard. You will not be charged until you win a
          dispute.
        </p>
      </div>
    </main>
  );
}
