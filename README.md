# SnapCopy AI - Micro-SaaS de Generación de Contenido con IA

SnapCopy AI es una plataforma SaaS diseñada para vendedores de comercio electrónico que automatiza la creación de contenido comercial profesional (descripciones, SEO, redes sociales) utilizando inteligencia artificial multimodal.

## 🚀 Tecnologías

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Next.js Server Actions & Route Handlers.
- **Base de Datos & Auth**: Supabase (PostgreSQL).
- **IA**: OpenAI API (GPT-4o / GPT-4o-mini).
- **Pagos**: Stripe (Suscripciones y Webhooks).

## 🛠️ Configuración Local

1. **Clonar el repositorio** e instalar dependencias:
   ```bash
   npm install
   ```

2. **Variables de Entorno**:
   Copia `.env.example` a `.env.local` y completa las credenciales:
   - `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Desde el dashboard de Supabase.
   - `OPENAI_API_KEY`: Desde OpenAI Platform.
   - `STRIPE_SECRET_KEY`: Desde el dashboard de Stripe.

3. **Base de Datos**:
   Ejecuta el script SQL ubicado en `supabase/migrations/20261114000000_initial_schema.sql` en el SQL Editor de tu proyecto Supabase.

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## 📂 Estructura del Proyecto

- `src/app`: Rutas de la aplicación y APIs.
- `src/components`: Componentes de UI (Landing, Dashboard, Generador).
- `src/lib`: Configuraciones de clientes (Supabase, Stripe, AI).
- `src/services`: Lógica de negocio (Generación, Créditos, Suscripciones).
- `supabase/migrations`: Esquema de base de datos.

## 🔒 Seguridad

- **RLS (Row Level Security)**: Implementado en Supabase para proteger los datos de los usuarios.
- **Validación**: Uso de Zod para validar entradas y respuestas de IA.
- **Créditos**: Transacciones atómicas en el servidor para evitar duplicidad o consumos incorrectos.

---
🤖 Desarrollado por el equipo de SnapCopy AI (vía Claude Code).
🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude Code <noreply@anthropic.com>
