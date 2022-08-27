import { createRouter } from './context';

export const experiencesRouter = createRouter().query('index', {
  async resolve({ ctx }) {
    const data = await ctx.prisma.experience.findMany();

    return data.map((project) => ({
      ...project,
      description: project.description.split('\\n'),
    }));
  },
});
