import { env } from './src/env/client.mjs';

/**
 * @type {import('next-sitemap').IConfig}
 */
const sitemapConfig = {
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
  changefreq: 'daily',
  priority: 0.7,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin*', '/auth*', '/feed*', '/sitemap*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [`${env.NEXT_PUBLIC_SITE_URL}/sitemap/post-sitemap.xml`],
  },
};

export default sitemapConfig;
