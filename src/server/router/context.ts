import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@/server/db/client';
import { Session, unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { sparkpost } from '@/server/mailing/client';

type CreateContextOptions = {
  session: Session | null;
  req: NextApiRequest;
  res: NextApiResponse;
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return { prisma, sparkpost, session: opts.session, req: opts.req, res: opts.res };
};

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  const session = await getServerSession(opts.req, opts.res, nextAuthOptions);
  return await createContextInner({ session, req: opts.req, res: opts.res });
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
