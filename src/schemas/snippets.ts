import { z } from 'zod';

export const snippetSchema = z.object({
  id: z.string().trim().optional(),
  content: z.string().trim().min(1, { message: 'Content is required' }),
  description: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  logo: z.string().trim().optional(),
  languageId: z.string().trim().optional(),
  slug: z
    .string()
    .trim()
    .min(1, { message: 'Slug is required' })
    .max(255, { message: 'Slug must be less than 255 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug can only contain alphanumeric and dashes',
    }),
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' }),
});
