import { BookmarkCard, Commentize, Section } from '@/components';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { motion } from 'framer-motion';
import { staggerAnimation } from '@/animations';
import { useMemo } from 'react';

const BookmarksIndexPage: NextPage = () => {
  const { data: bookmarks } = trpc.useQuery(['bookmarks.index']);

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

  return (
    <>
      <Head>
        <title>Bookmarks - Alan Habibullah</title>
      </Head>

      <Section
        subtitle={
          <motion.h1
            className="text-4xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Bookmarks
          </motion.h1>
        }
        inLineTitle
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }}>
          <Commentize text={['A place to store website I always forget or frequently visit']} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          variants={stagger.parent}
          initial="hidden"
          animate="show"
        >
          {bookmarks?.map((bookmark) => (
            <motion.div key={bookmark.id} variants={stagger.children}>
              <BookmarkCard {...bookmark} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
};

export default BookmarksIndexPage;
