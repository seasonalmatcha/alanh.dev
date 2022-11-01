import SparkPost from 'sparkpost';
import { env } from '@/env/server.mjs';

declare global {
  var sparkpost: SparkPost | undefined;
}

export const sparkpost = global.sparkpost || new SparkPost(env.SPARKPOST_API_KEY);

if (env.NODE_ENV !== 'production') {
  global.sparkpost = sparkpost;
}
