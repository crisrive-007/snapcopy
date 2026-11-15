import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateProductContent, GenerateInput } from '@/services/generation.service';
import { deductCreditAtomically } from '@/services/credit.service';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const input: GenerateInput = body;

    // 2. Credit check and atomic deduction
    const creditDeducted = await deductCreditAtomically(user.id);
    if (!creditDeducted) {
      return NextResponse.json({ error: 'Créditos insuficientes' }, { status: 403 });
    }

    // 3. AI Generation
    const result = await generateProductContent(input);

    // 4. Record generation history
    const { error: dbError } = await supabase.from('generations').insert({
      user_id: user.id,
      product_name: input.productName,
      product_image: input.imageUrl,
      platform: input.platform,
      tone: input.tone,
      language: input.language,
      input_data: input,
      generated_content: result
    });

    if (dbError) {
      console.error('Database record failed', dbError);
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Generation API error:', error);
    return NextResponse.json({ error: error.message || 'Error en el servidor' }, { status: 500 });
  }
}
