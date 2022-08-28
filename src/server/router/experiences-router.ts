import { createRouter } from './context';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';
import { experienceSchema } from '@/schemas';

export const experiencesRouter = createRouter()
  .query('index', {
    async resolve({ ctx }) {
      const data = await ctx.prisma.experience.findMany();

      return data.map((project) => ({
        ...project,
        description: project.description.split('\\n'),
      }));
    },
  })
  .query('findOne', {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.experience.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  });

export const protectedExperiencesRouter = createProtectedRouter()
  .mutation('upsert', {
    input: experienceSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.experience.upsert({
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
      await ctx.prisma.experience.delete({ where: { id: input } });
    },
  });
