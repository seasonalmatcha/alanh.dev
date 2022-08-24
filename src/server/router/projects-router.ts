import { createRouter } from './context';

export const projectsRouter = createRouter().query('index', {
  async resolve({ ctx }) {
    const data = await ctx.prisma.project.findMany();

    return data
      .map((project) => ({
        ...project,
        description: project.description.split('\\n'),
      }))
      .sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime());
  },
});
