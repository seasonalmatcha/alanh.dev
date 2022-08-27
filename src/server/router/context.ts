import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@/server/db/client';

type CreateContextOptions = Record<string, unknown>;

export const createContextInner = async (opts: CreateContextOptions) => {
  return { prisma, ...opts };
};

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  return await createContextInner(opts);
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
