import Link from 'next/link';
import { login } from '../actions';
import { Suspense } from 'react';

function LoginForm() {
  return (
    <form className="mt-8 space-y-6" action={login}>
      <div className="space-y-4">
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
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-md space-y-8 bg-zinc-950 p-8 border border-zinc-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            SnapCopy AI
          </Link>
          <h2 className="mt-4 text-xl font-semibold tracking-tight">Iniciar sesión</h2>
          <p className="mt-1 text-sm text-zinc-400">Accede a tu cuenta y genera contenido</p>
        </div>

        <Suspense fallback={<div className="text-center text-sm text-zinc-500">Cargando...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-zinc-400">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
