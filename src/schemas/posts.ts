import { z } from 'zod';

export const postSchema = z.object({
  id: z.string().trim().optional(),
  content: z.string().trim().min(1, { message: 'Content is required' }),
  excerpt: z
    .string()
    .trim()
    .max(255, { message: 'Excerpt must be less than 255 characters' })
    .optional(),
  thumbnail: z.string().trim().optional(),
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
  categories: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
    }),
  ),
});
