import { createRouter } from './context';
import { createProtectedRouter } from './protected-router';
import { projectSchema } from '@/schemas';
import { z } from 'zod';

export const projectsRouter = createRouter()
  .query('index', {
    async resolve({ ctx }) {
      const data = await ctx.prisma.project.findMany();

      return data
        .map((project) => ({
          ...project,
          description: project.description.split('\\n'),
        }))
        .sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime());
    },
  })
  .query('findOne', {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.project.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  });

export const protectedProjectsRouter = createProtectedRouter()
  .mutation('upsert', {
    input: projectSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.project.upsert({
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
      await ctx.prisma.project.delete({ where: { id: input } });
    },
  });
