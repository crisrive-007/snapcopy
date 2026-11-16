'use client';

import React, { useState } from 'react';

// Definimos la estructura de la respuesta del backend
interface GenerationResult {
  seo_title: string;
  meta_description: string;
  product_description: string;
  bullet_points: string[];
  keywords: string[];
  hashtags: string[];
  instagram_caption: string;
  tiktok_caption: string;
  call_to_action: string;
}

export default function ProductGenerator() {
  const [productName, setProductName] = useState<string>('');
  const [features, setFeatures] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [tone, setTone] = useState('professional');
  const [platform, setPlatform] = useState('shopify');
  const [language, setLanguage] = useState('español');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          description: features,
          tone,
          platform,
          language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar el contenido.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, fieldKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Formulario */}
      <form onSubmit={handleGenerate} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                Nombre del Producto
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ej. Cafetera Espresso Pro"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                Características o descripción básica
              </label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Ej. 15 bares de presión, acero inoxidable, molinillo integrado..."
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
              Tono de voz
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
            >
              <option value="professional">Profesional</option>
              <option value="persuasive">Persuasivo</option>
              <option value="casual">Casual / Divertido</option>
              <option value="elegant">Elegante</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
              Plataforma
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
            >
              <option value="shopify">Shopify / Web</option>
              <option value="amazon">Amazon</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook Ads</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generando contenido...
            </>
          ) : (
            'Generar Contenido (1 crédito)'
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Skeleton Screen */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      )}

      {/* Resultados */}
      {!loading && result && (
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="Título SEO"
              content={result.seo_title}
              isCopied={copiedField === 'seo_title'}
              onCopy={() => handleCopy(result.seo_title, 'seo_title')}
            />
            <ResultCard
              title="Llamada a la Acción (CTA)"
              content={result.call_to_action}
              isCopied={copiedField === 'cta'}
              onCopy={() => handleCopy(result.call_to_action, 'cta')}
            />
          </div>

          <ResultCard
            title="Descripción Comercial"
            content={result.product_description}
            isCopied={copiedField === 'desc'}
            onCopy={() => handleCopy(result.product_description, 'desc')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="Beneficios (Bullet Points)"
              content={Array.isArray(result.bullet_points) ? result.bullet_points.join('\n• ') : result.bullet_points}
              isCopied={copiedField === 'bullets'}
              onCopy={() => handleCopy(Array.isArray(result.bullet_points) ? result.bullet_points.join('\n') : '', 'bullets')}
            />
            <div className="space-y-6">
              <ResultCard
                title="Keywords"
                content={result.keywords?.join(', ')}
                isCopied={copiedField === 'keywords'}
                onCopy={() => handleCopy(result.keywords?.join(', '), 'keywords')}
              />
              <ResultCard
                title="Hashtags"
                content={result.hashtags?.map(h => h.startsWith('#') ? h : `#${h}`).join(' ')}
                isCopied={copiedField === 'hashtags'}
                onCopy={() => handleCopy(result.hashtags?.join(' '), 'hashtags')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="Instagram Caption"
              content={result.instagram_caption}
              isCopied={copiedField === 'ig'}
              onCopy={() => handleCopy(result.instagram_caption, 'ig')}
            />
            <ResultCard
              title="TikTok Copy"
              content={result.tiktok_caption}
              isCopied={copiedField === 'tt'}
              onCopy={() => handleCopy(result.tiktok_caption, 'tt')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponente tipado
interface ResultCardProps {
  title: string;
  content?: string;
  isCopied: boolean;
  onCopy: () => void;
}

function ResultCard({ title, content, isCopied, onCopy }: ResultCardProps) {
  if (!content) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </h3>
        <button
          onClick={onCopy}
          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
            isCopied
              ? 'bg-green-50 text-green-700 border-green-300'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          {isCopied ? '✓ Copiado' : 'Copiar al portapapeles'}
        </button>
      </div>
      <p className="text-gray-800 whitespace-pre-line leading-relaxed">{content}</p>
    </div>
  );
}