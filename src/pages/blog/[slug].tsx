import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { MarkdownPreview, XMLize } from '@/components';
import { motion } from 'framer-motion';
import { prisma } from '@/server/db/client';
import { Category, Post } from '@prisma/client';

export const getStaticPaths = async () => {
  const slugs = await prisma.post.findMany({ select: { slug: true }, take: 1 });

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

type PostDetailPageProps = {
  post: Post & { categories: Category[] };
};

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug || typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

const PostDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} - Alan Habibullah</title>
      </Head>

      {post.thumbnail && (
        <div className="relative w-full aspect-video overflow-hidden mb-4">
          <Image alt={post.title} src={post.thumbnail} layout="fill" objectFit="cover" />
        </div>
      )}
      <motion.div>
        <motion.div layoutId={`${post.id}`}>
          <XMLize
            text={<h1 className="text-2xl dark:text-white font-bold">{post.title}</h1>}
            textProps={{
              className: 'pl-0',
            }}
            inLine
          />
          <div className="flex space-x-2 mt-2 italic">
            <span>Published at</span>
            <time dateTime={post.createdAt.toLocaleDateString()}>
              {post.createdAt.toLocaleDateString()}
            </time>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }}>
          <div className="mt-8">
            <MarkdownPreview value={post.content} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PostDetail;
