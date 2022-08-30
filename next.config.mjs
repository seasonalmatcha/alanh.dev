import { env } from './src/env/server.mjs';
import { withSuperjson } from 'next-superjson';
import withBundleAnalyzer from '@next/bundle-analyzer';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})(
  withSuperjson()(
    defineNextConfig({
      reactStrictMode: true,
      swcMinify: true,
      images: {
        domains: ['picsum.photos', 'res.cloudinary.com', 'techblog.revivaltv.id'],
      },
    }),
  ),
);
