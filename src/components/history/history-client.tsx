'use client';

import { useState } from 'react';

interface Generation {
  id: string;
  product_name: string;
  platform: string;
  generated_content: any; // JSON con los resultados de la IA
  created_at: string;
}

export function HistoryClient({ generations }: { generations: Generation[] }) {
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  if (!generations || generations.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-xl border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-500">Aún no tienes generaciones registradas.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {generations.map((gen) => (
          <div
            key={gen.id}
            onClick={() => setSelectedGeneration(gen)}
            className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {gen.product_name}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 capitalize">Plataforma: {gen.platform}</p>
            </div>
            <span className="text-xs text-zinc-400">
              {new Date(gen.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {selectedGeneration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{selectedGeneration.product_name}</h2>
                <p className="text-xs text-zinc-500 capitalize">{selectedGeneration.platform}</p>
              </div>
              <button
                onClick={() => setSelectedGeneration(null)}
                className="text-zinc-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              {Object.entries(selectedGeneration.generated_content as object).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{key.replace('_', ' ')}</h4>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-sm text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
                    {Array.isArray(value) ? value.join(', ') : (value as string)}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end bg-zinc-50 dark:bg-zinc-900/50">
              <button
                onClick={() => handleCopy(JSON.stringify(selectedGeneration.generated_content, null, 2))}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-blue-500/20"
              >
                {copied ? '¡Copiado!' : 'Copiar todo el contenido'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
