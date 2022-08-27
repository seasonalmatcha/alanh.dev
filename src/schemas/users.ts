import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z.string().trim().min(1, { message: 'Username or email is required' }),
  password: z.string().trim().min(1, { message: 'Password is required' }),
});
