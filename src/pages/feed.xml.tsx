import RSS from 'rss';
import { prisma } from '@/server/db/client';
import { GetServerSideProps } from 'next';
import { env } from '@/env/client.mjs';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      title: true,
      createdAt: true,
      excerpt: true,
    },
  });

  const feed = new RSS({
    title: 'Alan Habibullah',
    site_url: env.NEXT_PUBLIC_SITE_URL,
    feed_url: `${env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    language: 'en',
  });

  for (const post of posts) {
    feed.item({
      title: post.title,
      url: `${env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      date: post.createdAt,
      description: post.excerpt ?? '',
    });
  }

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
};

const RSSFeed = () => null;
export default RSSFeed;
