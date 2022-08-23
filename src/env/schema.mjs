import { z } from 'zod';

export const serverSchema = z.object({
  // FOO: z.string()
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_FOO: z.string()
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */

export const clientEnv = {
  // NEXT_PUBLIC_FOO: process.env.NEXT_PUBLIC_FOO
};
