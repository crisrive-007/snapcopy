-- Add stripe_customer_id to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_stripe_customer_id_key ON public.profiles(stripe_customer_id);
