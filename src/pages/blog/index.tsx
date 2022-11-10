import { AwaitText, MainTemplate, Meta, PostCard } from '@/components';
import { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp } from '@/animations';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from '@/hooks';

const PostsIndex: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { data: posts, isLoading } = trpc.useQuery(['posts.index', { query }]);
  const [fetchingIndex, setFetchingIndex] = useState<number | undefined>(undefined);
  const fadeAnimation = useMemo(() => fadeUp(), []);
  const [updateQuery] = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  }, 500);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isTyping, setIsTyping] = useState(false);
  const handleOnTyping = useCallback(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    setIsTyping(() => true);

    typingTimeout.current = setTimeout(() => {
      setIsTyping(() => false);
    }, 3000);
  }, []);

  useEffect(() => {
    setIsTyping(() => false);
  }, [posts]);

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
        url="/blog"
        description="I write articles from time to time depending on what happen and my mood"
      />

      <MainTemplate
        title="Blog"
        introDescription={[
          "I've started writing blog since working at Revival TV",
          'Frendhi Saido, the VP of Engineering at the said company had encouraged the engineers to do so',
          "I don't have knowledge of how to write a good articles whatsoever, but Mr. Frendhi said we don't have to worry about the quality, just focus on putting down anything. The quality will get better overtime!",
          'The focus of writing article is not limited to share the knowledge, but also to help us writer to revisit in the future',
          "And that's it, I've started to write a little bit and kinda enjoy it",
        ]}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25 } }}
          className="mt-8 relative"
        >
          <input
            placeholder="Search article ..."
            className="w-full !pl-10"
            onChange={updateQuery}
            onInput={handleOnTyping}
          />
          <FiSearch className="absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5" />
        </motion.div>

        <div className="flex flex-col space-y-8 mt-10">
          <AnimatePresence mode="wait">
            {isLoading || isTyping ? (
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
          </AnimatePresence>
        </div>
      </MainTemplate>
    </>
  );
};

export default PostsIndex;
