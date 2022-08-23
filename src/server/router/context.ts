import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@/server/db/client';

type CreateContextOptions = {};

export const createContextInner = async (_opts: CreateContextOptions) => {
  return { prisma };
};

export const createContext = async (_opts: trpcNext.CreateNextContextOptions) => {
  return await createContextInner({});
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
