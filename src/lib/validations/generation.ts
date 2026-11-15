import { z } from 'zod';

export const GenerationResponseSchema = z.object({
  product_name: z.string(),
  seo_title: z.string(),
  meta_description: z.string(),
  product_description: z.string(),
  bullet_points: z.array(z.string()).length(5),
  keywords: z.array(z.string()),
  hashtags: z.array(z.string()),
  instagram_caption: z.string(),
  tiktok_caption: z.string(),
  call_to_action: z.string(),
});

export type GenerationResult = z.infer<typeof GenerationResponseSchema>;
