import { z } from 'zod';

export const languageSchema = z.object({
  id: z.string().trim().optional(),
  alias: z.string().trim().min(1, { message: 'Alias is required' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  logo: z.string().trim().optional(),
});
