import { AwaitText, BookmarkCard, MainTemplate } from '@/components';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp } from '@/animations';
import { useMemo } from 'react';

const BookmarksIndexPage: NextPage = () => {
  const { data: bookmarks, isLoading } = trpc.useQuery(['bookmarks.index']);
  const fadeUpAnimation = useMemo(() => fadeUp(), []);

  return (
    <>
      <Head>
        <title>Bookmarks - Alan Habibullah</title>
      </Head>

      <MainTemplate
        title="Bookmarks"
        introDescription={['A place to store website I always forget or frequently visit']}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <AwaitText text="myBookmarks" />
            ) : (
              bookmarks?.map((bookmark) => (
                <motion.div
                  key={bookmark.id}
                  variants={fadeUpAnimation}
                  initial="hidden"
                  animate="show"
                >
                  <BookmarkCard {...bookmark} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </MainTemplate>
    </>
  );
};

export default BookmarksIndexPage;
