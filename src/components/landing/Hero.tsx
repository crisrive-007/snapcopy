import React from 'react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
      <div className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs text-blue-400 font-medium mb-6">
        🚀 Revoluciona tu E-commerce con IA Multimodal
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
        Convierte cualquier producto en <br />
        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
          contenido que vende
        </span>
      </h1>
      <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
        Genera descripciones profesionales, títulos SEO y contenido optimizado para redes sociales en segundos pegando un enlace o subiendo una imagen.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition shadow-xl shadow-blue-500/25"
        >
          Empezar gratis (3 créditos)
        </Link>
        <Link
          href="#how-it-works"
          className="border border-gray-800 hover:border-gray-700 bg-gray-900/50 text-gray-300 font-semibold px-8 py-4 rounded-xl text-lg transition"
        >
          Ver cómo funciona
        </Link>
      </div>
      <div className="relative border border-gray-800 bg-gray-900/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="aspect-video bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-center text-gray-500">
          [ Demostración interactiva del Dashboard y Generador ]
        </div>
      </div>
    </section>
  );
}
