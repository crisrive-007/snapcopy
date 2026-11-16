import ProductGenerator from '@/components/generator/ProductGenerator';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Generador de Contenido
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Convierte las características de tu producto en copy persuasivo optimizado para SEO y redes sociales.
        </p>
      </div>

      <ProductGenerator />
    </div>
  );
}
