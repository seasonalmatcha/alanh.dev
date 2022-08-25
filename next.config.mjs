// eslint-disable-next-line no-unused-vars
import { env } from './src/env/server.mjs';
import { withSuperjson } from 'next-superjson';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default withSuperjson()(
  defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['picsum.photos', 'res.cloudinary.com'],
    },
  }),
);
