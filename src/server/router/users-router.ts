import { newUserSchema } from '@/schemas';
import { createRouter } from './context';
import argon2 from 'argon2';
import { env } from '@/env/server.mjs';

export const usersRouter = createRouter().mutation('create', {
  input: newUserSchema,
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
