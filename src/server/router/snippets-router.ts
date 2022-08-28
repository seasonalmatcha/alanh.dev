import { createRouter } from './context';
import { z } from 'zod';
import { newSnippetSchema, updateSnippetSchema } from '@/schemas';
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
      slug: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.snippet.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          language: true,
        },
      });
    },
  });

export const protectedSnippetsRouter = createProtectedRouter()
  .mutation('create', {
    input: newSnippetSchema,
    async resolve({ ctx, input }) {
      await ctx.prisma.snippet.create({
        data: input,
      });
    },
  })
  .mutation('update', {
    input: updateSnippetSchema,
    async resolve({ ctx, input }) {
      await ctx.prisma.snippet.update({ where: { id: input.id }, data: { ...input } });
    },
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ ctx, input }) {
      await ctx.prisma.snippet.delete({ where: { id: input } });
    },
  });
