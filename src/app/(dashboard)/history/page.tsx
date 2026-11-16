import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { HistoryClient } from '@/components/history/history-client';
import { Suspense } from 'react';

async function HistoryContent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: generations } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <HistoryClient generations={generations || []} />;
}

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Historial de Generaciones
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Revisa y copia tus generaciones pasadas.
        </p>
      </div>
      <Suspense fallback={<div className="text-zinc-500 py-8 text-center">Cargando historial...</div>}>
        <HistoryContent />
      </Suspense>
    </div>
  );
}
