import { AwaitText, PostCard, Section } from '@/components';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { motion } from 'framer-motion';
import { staggerAnimation } from '@/animations';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

const PostsByCategoryPage: NextPage = () => {
  const router = useRouter();
  const categoryName = router.query?.name as string;
  const { data: posts, isLoading } = trpc.useQuery([
    'posts.byCategory',
    { category: categoryName },
  ]);
  const [fetchingIndex, setFetchingIndex] = useState<number | undefined>(undefined);

  const stagger = useMemo(() => {
    return staggerAnimation({
      parent: {
        show: {
          transition: {
            delayChildren: 0.25,
            staggerChildren: 0.05,
          },
        },
      },
      children: {
        hidden: { y: 50 },
        show: { y: 0 },
      },
    });
  }, []);

  useEffect(() => {
    const handler = (...args: string[]) => {
      const path = args[0];
      const index = posts?.findIndex((s) => s.slug === path.split('/').pop());
      setFetchingIndex(index);
    };

    router.events.on('routeChangeStart', handler);

    return () => {
      router.events.off('routeChangeStart', handler);
    };
  }, [router, posts]);

  return (
    <>
      <Head>
        <title>Blog - Alan Habibullah</title>
      </Head>

      <Section
        subtitle={
          <motion.h1
            className="text-4xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Post category: {categoryName}
          </motion.h1>
        }
        inLineTitle
      >
        <motion.div
          className="flex flex-col space-y-8 mt-10"
          variants={stagger.parent}
          initial="hidden"
          animate="show"
        >
          {isLoading && (
            <motion.div variants={stagger.children}>
              <AwaitText text="myArticles" />
            </motion.div>
          )}
          {posts?.map((post, i) => (
            <motion.div key={i} variants={stagger.children} layoutId={`${post.id}`}>
              <PostCard {...post} bounce={i === fetchingIndex} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
};

export default PostsByCategoryPage;
