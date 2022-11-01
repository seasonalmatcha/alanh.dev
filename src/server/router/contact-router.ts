import { createRouter } from './context';
import { messageSchema } from '@/schemas';
import { env } from '@/env/server.mjs';
import { TRPCError } from '@trpc/server';

export const contactRouter = createRouter().mutation('index', {
  input: messageSchema,
  async resolve({ ctx, input }) {
    const message = `Name: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`;

    try {
      ctx.sparkpost.transmissions.send({
        content: {
          from: env.SPARKPOST_EMAIL_ADDRESS,
          subject: 'Message Received!',
          text: message,
        },
        recipients: [
          {
            address: env.SPARKPOST_EMAIL_TARGET,
          },
        ],
      });

      return {
        ok: true,
        message: 'Success!',
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to send message',
      });
    }
  },
});
