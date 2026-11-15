// src/components/dashboard/Sidebar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, History, CreditCard, Coins } from 'lucide-react';
import { createClient } from '@/lib/supabase/client'; // Ajusta esta ruta según tu cliente de Supabase

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    label: 'Generador',
    href: '/dashboard',
    icon: Sparkles,
  },
  {
    label: 'Mis Generaciones',
    href: '/dashboard/history',
    icon: History,
  },
  {
    label: 'Suscripción',
    href: '/dashboard/subscription',
    icon: CreditCard,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [credits, setCredits] = useState<number | null>(null);
  const [loadingCredits, setLoadingCredits] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    async function fetchCredits() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (isMounted) setLoadingCredits(false);
          return;
        }

        const { data, error } = await supabase
          .from('credit_balances')
          .select('balance') // Cambia 'balance' si tu columna se llama 'credits' o 'remaining_credits'
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching credit balance:', error.message);
        } else if (isMounted && data) {
          setCredits(data.balance);
        }
      } catch (err) {
        console.error('Unexpected error fetching credits:', err);
      } finally {
        if (isMounted) setLoadingCredits(false);
      }
    }

    fetchCredits();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Sección Superior: Logo y Navegación */}
      <div className="space-y-6">
        <div className="px-2">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>SnapCopy AI</span>
          </Link>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sección Inferior: Display de Créditos */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Créditos
          </span>
          <Coins className="h-4 w-4 text-amber-500" />
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          {loadingCredits ? (
            <div className="h-7 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          ) : (
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              {credits !== null ? credits : 0}
            </span>
          )}
          <span className="text-xs text-zinc-500 dark:text-zinc-400">restantes</span>
        </div>

        <Link
          href="/dashboard/subscription"
          className="mt-3 block w-full rounded-lg bg-zinc-900 px-3 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Obtener más
        </Link>
      </div>
    </aside>
  );
}