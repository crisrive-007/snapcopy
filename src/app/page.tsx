import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Pricing } from '@/components/landing/Pricing';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        {/* Features & How it works placeholder sections */}
        <Pricing />
      </main>
      <footer className="border-t border-gray-900 py-8 text-center text-gray-500 text-sm">
        © 2026 SnapCopy AI. Todos los derechos reservados.
      </footer>
    </div>
  );
}
