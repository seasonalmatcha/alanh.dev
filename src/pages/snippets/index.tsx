import { AwaitText, MainTemplate, SnippetCard } from '@/components';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { fadeUp } from '@/animations';
import { generateMetatags } from '@/utils/generateMetatags';

const Snippets: NextPage = () => {
  const router = useRouter();
  const { data: snippets, isLoading } = trpc.useQuery(['snippets.index']);
  const [fetchingIndex, setFetchingIndex] = useState<number | undefined>(undefined);
  const fadeAnimation = useMemo(() => fadeUp(), []);

  useEffect(() => {
    const handler = (...args: string[]) => {
      const path = args[0];
      const index = snippets?.findIndex((s) => s.slug === path.split('/').pop());
      setFetchingIndex(index);
    };

    router.events.on('routeChangeStart', handler);

    return () => {
      router.events.off('routeChangeStart', handler);
    };
  }, [router, snippets]);

  return (
    <>
      <Head>
        {generateMetatags({
          title: 'Snippets - Alan Habibullah',
          url: '/snippets',
          description: 'Code snippets I frequently use in various projects',
        })}
      </Head>

      <MainTemplate
        title="Code Snippets"
        introDescription={[
          "There are so many things I do repeteadly when doing projects, most of the time writing the config files and there are multiple times when I revisit my old project just to copy the configs. I guess it's time to gather those stuff and put it here",
          '',
          'This snippet feature is inspired by Lee Robinson',
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <AwaitText text="mySnippets" />
            ) : (
              <>
                {snippets?.map((snippet, i) => (
                  <motion.div
                    variants={fadeAnimation}
                    initial="hidden"
                    animate="show"
                    key={i}
                    layoutId={`${snippet.id}`}
                  >
                    <SnippetCard {...snippet} bounce={i === fetchingIndex} />
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

export default Snippets;
