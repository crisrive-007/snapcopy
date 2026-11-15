import Link from 'next/link';
import { signup } from '../actions';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-md space-y-8 bg-zinc-950 p-8 border border-zinc-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            SnapCopy AI
          </Link>
          <h2 className="mt-4 text-xl font-semibold tracking-tight">Crear una cuenta</h2>
          <p className="mt-1 text-sm text-zinc-400">Recibe 3 créditos gratuitos al registrarte</p>
        </div>

        {params?.message && (
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-sm text-blue-400 text-center">
            {params.message}
          </div>
        )}

        <form className="mt-8 space-y-6" action={signup}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nombre completo</label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Correo electrónico</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Contraseña</label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
            >
              Registrarse gratis
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-zinc-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
