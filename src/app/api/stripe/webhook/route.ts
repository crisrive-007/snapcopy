import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase con permisos de servicio (Server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Error de firma en el Webhook: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Manejar el evento invoice.paid
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as any;
    const customerId = invoice.customer;

    // Determinar la cantidad de créditos basada en el precio o metadatos del producto
    // (Ejemplo: leyendo metadata del price en Stripe, o asignando por defecto)
    const priceId = invoice.lines.data[0]?.price?.id;
    const creditsToAdd = priceId === process.env.STRIPE_PRICE_ID_300 ? 300 : 100;

    // 1. Buscar al usuario por su stripe_customer_id
    const { data: userProfile, error: userError } = await supabase
      .from('profiles') // Ajusta el nombre de tu tabla de usuarios
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (userError || !userProfile) {
      console.error('No se encontró un usuario con el customer ID:', customerId);
      return new NextResponse('User not found', { status: 404 });
    }

    const userId = userProfile.id;

    // 2. Obtener el balance actual y sumar los créditos en credit_balances
    const { data: currentBalance } = await supabase
      .from('credit_balances')
      .select('balance')
      .eq('user_id', userId)
      .single();

    const newBalance = (currentBalance?.balance || 0) + creditsToAdd;

    const { error: balanceError } = await supabase
      .from('credit_balances')
      .upsert({ user_id: userId, balance: newBalance, updated_at: new Date() });

    if (balanceError) {
      console.error('Error al actualizar credit_balances:', balanceError);
      return new NextResponse('Database error', { status: 500 });
    }

    // 3. Registrar la transacción en credit_transactions
    const { error: txError } = await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount: creditsToAdd,
      type: 'purchase',
      description: `Acreditación por factura pagada (Invoice: ${invoice.id})`,
    });

    if (txError) {
      console.error('Error al registrar credit_transactions:', txError);
      return new NextResponse('Database error', { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}