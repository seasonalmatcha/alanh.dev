import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import argon2 from 'argon2';
import { prisma } from '@/server/db/client';
import { env } from '@/env/server.mjs';
import { TRPCError } from '@trpc/server';
import { signInSchema } from '@/schemas';
import { omitObject } from '@/utils/omitObject';

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: {
          label: 'Username or email',
          type: 'text',
          placeholder: 'e.g username or me@mail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const validation = signInSchema.safeParse(credentials);

        if (!validation.success) {
          return null;
        }

        const { identifier, password } = validation.data;

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                username: identifier,
              },
              {
                email: identifier,
              },
            ],
          },
        });

        if (!user) {
          return null;
        }

        try {
          const isValid = await argon2.verify(user.password, password, {
            secret: Buffer.from(env.HASH_SECRET),
          });

          if (!isValid) {
            return null;
          }

          return omitObject(user, ['password']);
        } catch (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
};

export default NextAuth(authOptions);
