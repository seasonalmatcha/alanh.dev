/**
 * Not needed for now but I'll keep it just in case
 */

import { signUpSchema } from '@/schemas';
import { createRouter } from './context';
import argon2 from 'argon2';
import { env } from '@/env/server.mjs';

export const usersRouter = createRouter().mutation('create', {
  input: signUpSchema,
  async resolve({ ctx, input }) {
    const hashedPassword = await argon2.hash(input.password, {
      secret: Buffer.from(env.HASH_SECRET),
    });

    await ctx.prisma.user.create({
      data: {
        username: input.username,
        password: hashedPassword,
      },
    });
  },
});
