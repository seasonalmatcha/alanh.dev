import { Commentize, Section, SnippetCard } from '@/components';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { motion } from 'framer-motion';
import { staggerAnimation } from '@/animations';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

const Snippets: NextPage = () => {
  const router = useRouter();
  const { data: snippets } = trpc.useQuery(['snippets.index']);
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
    const handler = (...args: any[]) => {
      const path = args[0] as string;
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
        <title>Snippets - Alan Habibullah</title>
      </Head>

      <Section
        subtitle={
          <motion.h1
            className="text-4xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Code Snippets
          </motion.h1>
        }
        inLineTitle
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }}>
          <Commentize
            text={[
              "There are so many things I do repeteadly when doing projects, most of the time writing the config files and there are multiple times when I revisit my old project just to copy the configs. I guess it's time to gather those stuff and put it here",
              '',
              'This snippet feature is inspired by Lee Robinson',
            ]}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
          variants={stagger.parent}
          initial="hidden"
          animate="show"
        >
          {snippets?.map((snippet, i) => (
            <motion.div key={i} variants={stagger.children} layoutId={`${snippet.id}`}>
              <SnippetCard {...snippet} bounce={i === fetchingIndex} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
};

export default Snippets;
