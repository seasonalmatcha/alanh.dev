import { z } from 'zod';

export const bookmarkSchema = z.object({
  id: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  thumbnail: z.string().trim().optional(),
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' }),
  url: z
    .string()
    .trim()
    .min(1, { message: 'Url is required' })
    .max(1024, { message: 'Url must be less than 1024 characters' }),
  urlText: z
    .string()
    .trim()
    .min(1, { message: 'Url Text is required' })
    .max(255, { message: 'Url Text must be less than 255 characters' }),
});
