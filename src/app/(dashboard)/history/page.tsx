import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { HistoryClient } from '@/components/history/history-client';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: generations, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

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
      <HistoryClient generations={generations || []} />
    </div>
  );
}
