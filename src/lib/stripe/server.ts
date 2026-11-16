import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-10-28.endive',
  typescript: true,
});
