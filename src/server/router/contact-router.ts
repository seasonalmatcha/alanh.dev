import { createRouter } from './context';
import { messageSchema } from '@/schemas';
import { env } from '@/env/server.mjs';
import { TRPCError } from '@trpc/server';

const GOOGLE_RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

const verifyRecaptchaToken = async (token?: string) => {
  try {
    const response = await fetch(GOOGLE_RECAPTCHA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${env.GOOGLE_RECAPTCHA_SECRET}&response=${token}`,
    });
    const reCaptchaRes = await response.json();

    return reCaptchaRes?.score > 0.5 || reCaptchaRes?.success;
  } catch (e) {
    return false;
  }
};

export const contactRouter = createRouter().mutation('index', {
  input: messageSchema,
  async resolve({ ctx, input }) {
    const message = `Name: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`;

    try {
      const validRecaptchaToken = await verifyRecaptchaToken(input.recaptchaToken);

      if (!validRecaptchaToken) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to verify recaptcha token. Are you human?',
        });
      }

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
