import { AwaitText, MainTemplate, Meta, PostCard } from '@/components';
import { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { motion } from 'framer-motion';
import { fadeUp } from '@/animations';
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

  const fadeAnimation = useMemo(() => fadeUp(), []);

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
      <Meta
        title="Blog - Alan Habibullah"
        url={`/categories/${categoryName}`}
        description={`See article related to ${categoryName}`}
      />

      <MainTemplate title={`Post category: ${categoryName}`}>
        <div className="flex flex-col space-y-8 mt-10">
          {isLoading ? (
            <AwaitText text="myArticles" />
          ) : (
            <>
              {posts?.map((post, i) => (
                <motion.div
                  key={i}
                  variants={fadeAnimation}
                  initial="hidden"
                  animate="show"
                  layoutId={`${post.id}`}
                >
                  <PostCard {...post} bounce={i === fetchingIndex} />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </MainTemplate>
    </>
  );
};

export default PostsByCategoryPage;
