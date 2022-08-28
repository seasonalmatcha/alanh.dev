import { createRouter } from './context';
import { createProtectedRouter } from './protected-router';
import { z } from 'zod';
import { languageSchema } from '@/schemas';

export const languagesRouter = createRouter()
  .query('index', {
    async resolve({ ctx }) {
      const data = await ctx.prisma.language.findMany();

      return data;
    },
  })
  .query('findOne', {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.language.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  });

export const protectedLanguagesRouter = createProtectedRouter()
  .mutation('upsert', {
    input: languageSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.language.upsert({
        where: {
          id: input.id ?? '',
        },
        create: input,
        update: input,
      });
    },
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ ctx, input }) {
      await ctx.prisma.language.delete({ where: { id: input } });
    },
  });
