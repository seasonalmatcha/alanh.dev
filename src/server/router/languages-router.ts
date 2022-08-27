import { createRouter } from './context';

export const languagesRouter = createRouter().query('index', {
  async resolve({ ctx }) {
    const data = await ctx.prisma.language.findMany();

    return data;
  },
});
