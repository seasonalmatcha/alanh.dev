import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: 'Username is required' })
    .max(32, { message: 'Username must be less than 32 characters' })
    .regex(/^[a-zA-Z0-9_.]+$/, {
      message: 'Username can only contain alphanumeric, periods, and underscores',
    }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]+/, {
      message: 'Password must contain at least one lowercase character',
    })
    .regex(/[A-Z]+/, {
      message: 'Password must contain at least one uppercase character',
    })
    .regex(/[~!@#$%^&*()_+=-]+/, {
      message: 'Password must contain at least one special character (~!@#$%^&*()_+=-)',
    }),
});

export const signInSchema = z.object({
  identifier: z.string().trim().min(1, { message: 'Username or email is required' }),
  password: z.string().trim().min(1, { message: 'Password is required' }),
});
