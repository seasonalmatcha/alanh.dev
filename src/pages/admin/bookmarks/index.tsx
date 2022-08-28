import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { staggerAnimation } from '@/animations';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { FiTrash2 } from 'react-icons/fi';
import { AuthLayout, DashboardTemplate } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AdminBookmarksIndexPage: NextPageWithLayout = () => {
  const { data: bookmarks, isLoading, refetch } = trpc.useQuery(['bookmarks.index']);
  const { mutate: deleteBookmarkMutation } = trpc.useMutation(['protected.bookmarks.delete']);
  const deleteIds = useMemo<Set<string>>(() => new Set(), []);

  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  const deleteBookmark = (id: string) => {
    return () => {
      deleteIds.add(id);
      deleteBookmarkMutation(id, {
        onSuccess() {
          deleteIds.delete(id);
          refetch();
        },
      });
    };
  };

  return (
    <>
      <Head>
        <title>Bookmarks Collection</title>
      </Head>

      <DashboardTemplate
        actionAddPath="/admin/bookmarks/create"
        title="Bookmarks Collection"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Bookmarks',
            path: '/admin/bookmarks',
            active: true,
          },
        ]}
      >
        <motion.div
          variants={stagger.parent}
          initial="hidden"
          animate={isLoading ? '' : 'show'}
          className="flex flex-col space-y-2"
        >
          {bookmarks?.map((bookmark) => (
            <motion.div
              variants={stagger.children}
              key={bookmark.id}
              className="border rounded p-2 flex justify-between"
            >
              <a href={bookmark.url} target="_blank" rel="noreferrer" className="link-secondary">
                {bookmark.title}
              </a>
              <div className="flex items-center space-x-2">
                <Link href={`/admin/bookmarks/edit/${bookmark.id}`} passHref>
                  <a className="btn-action primary">
                    <FiEdit />
                  </a>
                </Link>
                <button
                  className="btn-action danger"
                  onClick={deleteBookmark(bookmark.id)}
                  disabled={deleteIds.has(bookmark.id)}
                >
                  {deleteIds.has(bookmark.id) ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <FiTrash2 />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </DashboardTemplate>
    </>
  );
};

AdminBookmarksIndexPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminBookmarksIndexPage;
