-- SnapCopy AI Database Schema
-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Subscriptions Table
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free' not null,
  status text default 'active' not null,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Credit Balances Table
create table if not exists public.credit_balances (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  balance integer default 3 not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Credit Transactions Table
create table if not exists public.credit_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount integer not null,
  transaction_type text not null, -- 'signup_bonus', 'generation', 'subscription_grant', 'purchase'
  description text,
  reference_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Generations Table
create table if not exists public.generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_name text not null,
  product_image text,
  platform text not null,
  tone text not null,
  language text not null,
  input_data jsonb,
  generated_content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Stripe Events Table for Idempotency
create table if not exists public.stripe_events (
  id uuid default gen_random_uuid() primary key,
  stripe_event_id text unique not null,
  event_type text not null,
  processed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.credit_balances enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.generations enable row level security;

-- Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);

create policy "Users can view own credit balance" on public.credit_balances for select using (auth.uid() = user_id);

create policy "Users can view own credit transactions" on public.credit_transactions for select using (auth.uid() = user_id);

create policy "Users can view own generations" on public.generations for select using (auth.uid() = user_id);
create policy "Users can insert own generations" on public.generations for insert with check (auth.uid() = user_id);
create policy "Users can delete own generations" on public.generations for delete using (auth.uid() = user_id);

-- Trigger to create profile and initial credits on signup
create or function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  insert into public.credit_balances (user_id, balance)
  values (new.id, 3);

  insert into public.credit_transactions (user_id, amount, transaction_type, description)
  values (new.id, 3, 'signup_bonus', 'Bono de bienvenida inicial de 3 créditos gratuitos');

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
