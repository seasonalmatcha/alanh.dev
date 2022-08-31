import { prisma } from '@/server/db/client';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { env } from '@/env/client.mjs';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slugs = await prisma.post.findMany({ select: { slug: true } });

  const items = slugs.map(({ slug }) => ({
    loc: `${env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, items);
};

const PostSitemap = () => null;
export default PostSitemap;
