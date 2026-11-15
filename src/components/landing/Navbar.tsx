import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              SnapCopy AI
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm text-gray-300">
            <Link href="#features" className="hover:text-white transition">Características</Link>
            <Link href="#how-it-works" className="hover:text-white transition">Cómo funciona</Link>
            <Link href="#pricing" className="hover:text-white transition">Precios</Link>
            <Link href="#faq" className="hover:text-white transition">FAQ</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow-lg shadow-blue-500/20"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
