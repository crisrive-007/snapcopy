'use client';

import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      alert('Error al iniciar el pago.');
    } finally {
      setLoading(false);
    }
  };

  const handlePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      alert('Error al acceder al portal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Suscripción</h1>
        <p className="text-zinc-500">Gestiona tu plan y facturación.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900">
          <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">Plan Starter</h3>
          <p className="text-sm text-zinc-500 mb-4">$9/mes - 100 créditos</p>
          <button
            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!)}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
          >
            Suscribirse a Starter
          </button>
        </div>

        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900">
          <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">Plan Pro</h3>
          <p className="text-sm text-zinc-500 mb-4">$19/mes - 300 créditos</p>
          <button
            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!)}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition"
          >
            Suscribirse a Pro
          </button>
        </div>
      </div>

      <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
        <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">Gestionar suscripción</h3>
        <p className="text-sm text-zinc-500 mb-4">¿Ya tienes un plan? Gestiona tu método de pago o cancela desde aquí.</p>
        <button
          onClick={handlePortal}
          disabled={loading}
          className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-lg transition text-sm"
        >
          Ir al portal de cliente
        </button>
      </div>
    </div>
  );
}
