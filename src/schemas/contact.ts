import { z } from 'zod';

export const messageSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email('Please provide a valid email'),
  message: z
    .string({ required_error: 'Please provide the message' })
    .min(1, { message: 'Please provide the message' }),
  recaptchaToken: z.string().optional(),
});

export type MessageSchemaErrorType = z.inferFormattedError<typeof messageSchema>;
