import { z } from 'zod';

export const experienceSchema = z.object({
  id: z.string().trim().optional(),
  title: z.string().trim().min(1, { message: 'Title is required' }),
  subtitle: z.string().trim().min(1, { message: 'Subtitle is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
});
