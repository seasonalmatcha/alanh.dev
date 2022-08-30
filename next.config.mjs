import { env } from './src/env/server.mjs';
import { withSuperjson } from 'next-superjson';
import withBundleAnalyzer from '@next/bundle-analyzer';

/**
 *
 * @param {((config: import('next').NextConfig) => import('next').NextConfig)[]} plugins
 * @param {import('next').NextConfig} config
 * @returns {import('next').NextConfig}
 */
const withPlugins = (plugins, config) => {
  return plugins.reduce((configPhase, plugin) => {
    return plugin(configPhase);
  }, config);
};

const plugins = [
  withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true', openAnalyzer: true }),
  withSuperjson(),
];

/**
 *
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'res.cloudinary.com', 'techblog.revivaltv.id'],
  },
};

export default withPlugins(plugins, config);
