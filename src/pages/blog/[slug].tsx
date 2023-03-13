import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';
import { MarkdownPreview, Meta, XMLize } from '@/components';
import { motion } from 'framer-motion';
import { prisma } from '@/server/db/client';
import { Category, Post } from '@prisma/client';
import { trpc } from '@/utils/trpc';
import { useEffect } from 'react';
import Link from 'next/link';

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
  const { mutate } = trpc.useMutation(['posts.view'], { ssr: true });
  useEffect(() => {
    mutate(post.id, {
      onSuccess: (data) => {
        post.views = data.views;
      },
    });
  }, [mutate, post]);

  return (
    <>
      <Meta
        title={post.title}
        url={`/blog/${post.slug}`}
        description={post.excerpt ?? undefined}
        thumbnails={post.thumbnail ?? undefined}
      />

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
            <time dateTime={post.createdAt.toLocaleDateString()}>
              {post.createdAt.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden>&#8226;</span>
            <span>{post.views} views</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }}>
          <div className="mt-8">
            <MarkdownPreview value={post.content} />
          </div>
        </motion.div>
      </motion.div>
      <div className="flex flex-wrap mt-8">
        {post.categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog/categories/${category.name}`}
            passHref
            className="px-4 py-1 rounded-full border mr-2 hover:border-teal-400"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PostDetail;
