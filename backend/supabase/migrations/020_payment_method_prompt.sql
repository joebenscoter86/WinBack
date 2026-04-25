-- WIN-xx (billing lockdown): track when the merchant dismisses the in-app
-- "add a payment method" banner so we don't re-surface it every session.
-- Re-surfaces after 30 days if still unresolved (enforced in app code).

alter table public.merchants
  add column if not exists payment_method_prompt_dismissed_at timestamptz null;

comment on column public.merchants.payment_method_prompt_dismissed_at is
  'When the merchant last dismissed the "add a payment method" banner. App code re-surfaces the banner after 30 days if the merchant still has no default payment method.';
