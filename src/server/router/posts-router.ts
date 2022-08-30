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
      id: z.string().optional(),
      slug: z.string().optional(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.post.findFirst({
        where: {
          OR: {
            id: input.id,
            slug: input.slug,
          },
        },
        include: {
          categories: true,
        },
      });
    },
  })
  .mutation('view', {
    input: z.string(),
    resolve({ ctx, input }) {
      return ctx.prisma.post.update({
        where: { id: input },
        data: { views: { increment: 1 } },
        select: {
          views: true,
        },
      });
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

      const data = await ctx.prisma.post.upsert({
        where: {
          id: input.id ?? '',
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

      ctx.res.revalidate(`/blog/${data.slug}`);

      return data;
    },
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ ctx, input }) {
      await ctx.prisma.post.delete({ where: { id: input } });
    },
  });
