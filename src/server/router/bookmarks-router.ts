import { createRouter } from './context';
import { createProtectedRouter } from './protected-router';
import { z } from 'zod';
import { bookmarkSchema } from '@/schemas';

export const bookmarksRouter = createRouter()
  .query('index', {
    async resolve({ ctx }) {
      const data = await ctx.prisma.bookmark.findMany();

      return data;
    },
  })
  .query('findOne', {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.bookmark.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  });

export const protectedBookmarksRouter = createProtectedRouter()
  .mutation('upsert', {
    input: bookmarkSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.bookmark.upsert({
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
      await ctx.prisma.bookmark.delete({ where: { id: input } });
    },
  });
