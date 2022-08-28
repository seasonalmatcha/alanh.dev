import { createRouter } from './context';
import { z } from 'zod';
import { snippetSchema } from '@/schemas';
import { createProtectedRouter } from './protected-router';

export const snippetsRouter = createRouter()
  .query('index', {
    input: z
      .object({
        query: z.string().nullish(),
      })
      .nullish(),
    resolve({ ctx, input }) {
      return ctx.prisma.snippet.findMany({
        where: {
          title: {
            contains: input?.query ?? '',
          },
        },
        select: {
          id: true,
          excerpt: true,
          logo: true,
          slug: true,
          title: true,
          language: {
            select: {
              id: true,
              alias: true,
              logo: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
  })
  .query('findOne', {
    input: z.object({
      id: z.string().optional(),
      slug: z.string().optional(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.snippet.findFirst({
        where: {
          OR: {
            id: input.id,
            slug: input.slug,
          },
        },
        include: {
          language: true,
        },
      });
    },
  });

export const protectedSnippetsRouter = createProtectedRouter()
  .mutation('upsert', {
    input: snippetSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.snippet.upsert({
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
      await ctx.prisma.snippet.delete({ where: { id: input } });
    },
  });
