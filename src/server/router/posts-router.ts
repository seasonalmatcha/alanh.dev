import { createRouter } from './context';
import { z } from 'zod';
import { postSchema } from '@/schemas';
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
          views: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
  })
  .query('byCategory', {
    input: z
      .object({
        category: z.string().optional(),
      })
      .nullish(),
    resolve({ ctx, input }) {
      return ctx.prisma.post.findMany({
        where: {
          categories: {
            some: {
              name: {
                contains: input?.category ?? '',
              },
            },
          },
        },
        select: {
          id: true,
          excerpt: true,
          slug: true,
          title: true,
          views: true,
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
      return ctx.prisma.post.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          categories: true,
        },
      });
    },
  })
  .mutation('view', {
    input: z.string(),
    async resolve({ ctx, input }) {
      await ctx.prisma.post.update({ where: { id: input }, data: { views: { increment: 1 } } });
    },
  });

export const protectedPostsRouter = createProtectedRouter()
  .mutation('upsert', {
    input: postSchema,
    async resolve({ ctx, input }) {
      const postCategories = input.categories.map(({ id, name }) => ({
        where: {
          name,
        },
        create: {
          id,
          name,
        },
      }));

      await ctx.prisma.post.upsert({
        where: {
          slug: input.slug,
        },
        create: {
          ...input,
          categories: {
            connectOrCreate: postCategories,
          },
        },
        update: {
          ...input,
          categories: {
            set: [],
            connectOrCreate: postCategories,
          },
        },
      });
    },
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ ctx, input }) {
      await ctx.prisma.post.delete({ where: { id: input } });
    },
  });
