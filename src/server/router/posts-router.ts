import { createRouter } from './context';
import { z } from 'zod';
import { newPostSchema, updatePostSchema } from '@/schemas';
import { createProtectedRouter } from './protected-router';

export const postsRouter = createRouter()
  .query('index', {
    input: z
      .object({
        query: z.string(),
      })
      .nullish(),
    resolve({ ctx, input }) {
      return ctx.prisma.post.findMany({
        where: {
          title: {
            contains: input?.query ?? '',
          },
        },
        select: {
          id: true,
          excerpt: true,
          slug: true,
          title: true,
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
      return ctx.prisma.post.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          categories: true,
        },
      });
    },
  });

export const protectedPostsRouter = createProtectedRouter()
  .mutation('create', {
    input: newPostSchema,
    async resolve({ ctx, input }) {
      await ctx.prisma.post.create({
        data: input,
      });
    },
  })
  .mutation('update', {
    input: updatePostSchema,
    async resolve({ ctx, input }) {
      await ctx.prisma.post.update({ where: { id: input.id }, data: { ...input } });
    },
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ ctx, input }) {
      await ctx.prisma.post.delete({ where: { id: input } });
    },
  });
