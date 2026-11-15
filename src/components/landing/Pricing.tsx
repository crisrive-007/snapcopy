import React from 'react';
import Link from 'next/link';

export function Pricing() {
  const plans = [
    {
      name: 'FREE',
      price: '$0',
      period: 'para siempre',
      credits: '3 créditos iniciales',
      features: [
        'Generación de contenido completa',
        'Análisis visual básico con IA',
        'Acceso al dashboard',
        'Historial limitado (últimos 3)'
      ],
      cta: 'Empezar gratis',
      href: '/register',
      highlight: false
    },
    {
      name: 'STARTER',
      price: '$9',
      period: 'al mes',
      credits: '100 créditos mensuales',
      features: [
        'Todas las funciones de generación',
        'Análisis multimodal avanzado',
        'Historial de generaciones completo',
        'Acceso a todos los tonos y plataformas',
        'Soporte estándar'
      ],
      cta: 'Suscribirse a Starter',
      href: '/register?plan=starter',
      highlight: true
    },
    {
      name: 'PRO',
      price: '$19',
      period: 'al mes',
      credits: '300 créditos mensuales',
      features: [
        'Todas las funciones de generación',
        'Historial ilimitado',
        'Prioridad de procesamiento rápida',
        'Formatos personalizados de salida',
        'Soporte prioritario'
      ],
      cta: 'Suscribirse a Pro',
      href: '/register?plan=pro',
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Planes diseñados para hacer crecer tu negocio</h2>
        <p className="text-gray-400">Elige el plan que mejor se adapte al volumen de tu tienda online.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 border ${
              plan.highlight
                ? 'border-blue-500 bg-gray-900/80 shadow-2xl shadow-blue-500/10 relative'
                : 'border-gray-800 bg-gray-950'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Más popular
              </span>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black text-white">{plan.price}</span>
              <span className="text-gray-400 text-sm">{plan.period}</span>
            </div>
            <p className="text-blue-400 font-medium text-sm mb-6">{plan.credits}</p>
            <ul className="space-y-3 mb-8 text-sm text-gray-300">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> {feature}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`w-full text-center block py-3 rounded-xl font-semibold transition ${
                plan.highlight
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
