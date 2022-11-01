import { z } from 'zod';

export const serverSchema = z.object({
  // FOO: z.string()
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  HASH_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  SPARKPOST_API_KEY: z.string(),
  SPARKPOST_EMAIL_ADDRESS: z.string(),
  SPARKPOST_EMAIL_TARGET: z.string(),
  GOOGLE_RECAPTCHA_SECRET: z.string(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_FOO: z.string()
  NEXT_PUBLIC_SITE_URL: z.string(),
  NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY: z.string(),
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */

export const clientEnv = {
  // NEXT_PUBLIC_FOO: process.env.NEXT_PUBLIC_FOO
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY,
};
