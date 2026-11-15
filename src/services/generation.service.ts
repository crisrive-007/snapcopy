import { GenerationResult, GenerationResponseSchema } from '@/lib/validations/generation';
import { openai } from '@/lib/ai/openai';

export interface GenerateInput {
  productName: string;
  category?: string;
  description?: string;
  targetAudience?: string;
  tone: string;
  platform: string;
  language: string;
  imageUrl?: string;
}

export async function generateProductContent(input: GenerateInput): Promise<GenerationResult> {
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const systemPrompt = `
    Eres un experto de nivel mundial en copywriting de conversión, marketing digital y SEO para E-commerce.
    Tu objetivo es analizar la información o imagen de un producto y generar contenido altamente persuasivo,
    estructurado y optimizado para ventas en plataformas digitales.

    Reglas estrictas:
    1. No inventes certificaciones, materiales ni especificaciones no respaldadas por los datos provistos.
    2. El tono debe ser estrictamente: ${input.tone}.
    3. Optimiza especialmente para la plataforma de destino: ${input.platform}.
    4. Responde ÚNICAMENTE en el idioma especificado: ${input.language}.
    5. Devuelve la información exclusivamente estructurada según el JSON Schema solicitado.
  `;

  const userMessages: any[] = [
    {
      type: 'text',
      text: `Producto: ${input.productName}
             Categoría: ${input.category || 'N/A'}
             Descripción/Detalles: ${input.description || 'N/A'}
             Público Objetivo: ${input.targetAudience || 'General'}`
    }
  ];

  if (input.imageUrl) {
    userMessages.push({
      type: 'image_url',
      image_url: { url: input.imageUrl }
    });
  }

  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessages }
    ],
    response_format: { type: 'json_object' }
  });

  const rawJson = JSON.parse(response.choices[0].message.content || '{}');

  // Validate JSON schema output
  return GenerationResponseSchema.parse(rawJson);
}
