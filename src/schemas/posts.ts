import { z } from 'zod';

export const newPostSchema = z.object({
  content: z.string().trim().min(1, { message: 'Content is required' }),
  excerpt: z.string().trim().optional(),
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
});

export const updatePostSchema = z.object({
  id: z.string().trim().min(1, { message: 'Id is required ' }),
  content: z.string().trim().min(1, { message: 'Content is required' }).optional(),
  excerpt: z.string().trim().optional(),
  thumbnail: z.string().trim().optional(),
  slug: z
    .string()
    .trim()
    .min(1, { message: 'Slug is required' })
    .max(255, { message: 'Slug must be less than 255 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug can only contain alphanumeric and dashes',
    })
    .optional(),
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' })
    .optional(),
});
