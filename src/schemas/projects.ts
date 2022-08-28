import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().trim().optional(),
  title: z.string().trim().min(1, { message: 'Title is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  href: z.string().trim().min(1, { message: 'Href is required' }),
  thumbnail: z.string().trim().optional(),
});
