import { createRouter } from './context';
import { z } from 'zod';

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
