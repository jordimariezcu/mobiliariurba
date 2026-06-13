import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    titol: z.string(),
    descripcio: z.string().optional(),
    categoria: z.string().optional(),
    data: z.string().optional(),
    imatge: z.string().optional(),
    destacat: z.boolean().optional(),
  }),
});

export const collections = { blog };
