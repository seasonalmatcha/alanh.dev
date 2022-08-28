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

const AdminPostIndexPage: NextPageWithLayout = () => {
  const { data: posts, isLoading, refetch } = trpc.useQuery(['posts.index']);
  const { mutate: deletePostMutation } = trpc.useMutation(['protected.posts.delete']);
  const deleteIds = useMemo<Set<string>>(() => new Set(), []);
  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  const deletePost = (id: string) => {
    return () => {
      deleteIds.add(id);
      deletePostMutation(id, {
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
        <title>Post Collection</title>
      </Head>

      <DashboardTemplate
        actionAddPath="/admin/blog/create"
        title="Post Collection"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Posts',
            path: '/admin/blog',
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
          {posts?.map((post) => (
            <motion.div
              variants={stagger.children}
              key={post.id}
              className="border rounded p-2 flex justify-between"
            >
              <Link href={`/blog/${post.slug}`} passHref>
                <a className="link-secondary w-full">{post.title}</a>
              </Link>
              <div className="flex items-center space-x-2">
                <Link href={`/admin/blog/edit/${post.slug}`} passHref>
                  <a className="btn-action primary">
                    <FiEdit />
                  </a>
                </Link>
                <button
                  className="btn-action danger"
                  onClick={deletePost(post.id)}
                  disabled={deleteIds.has(post.id)}
                >
                  {deleteIds.has(post.id) ? (
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

AdminPostIndexPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminPostIndexPage;
