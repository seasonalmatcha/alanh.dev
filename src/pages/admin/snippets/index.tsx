import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { staggerAnimation } from '@/animations';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { FiPaperclip, FiTrash2 } from 'react-icons/fi';
import { AuthLayout, Breadcrumb } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AdminSnippetIndexPage: NextPageWithLayout = () => {
  const { data: snippets, isLoading, refetch } = trpc.useQuery(['snippets.index']);
  const { mutate: deleteSnippetMutation } = trpc.useMutation(['protected.snippets.delete']);
  const deleteIds = useMemo<Set<string>>(() => new Set(), []);

  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  const deleteSnippet = (id: string) => {
    return () => {
      deleteIds.add(id);
      deleteSnippetMutation(id, {
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
        <title>Snippets Collection</title>
      </Head>

      <Breadcrumb
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Snippets',
            path: '/admin/snippets',
            active: true,
          },
        ]}
      />

      <h1 className="text-4xl my-8">Snippets Collection</h1>

      <div className="text-right mb-4">
        <Link href="/admin/snippets/create" passHref>
          <a className="btn-outline">
            <FiPaperclip />
            <span>Add new</span>
          </a>
        </Link>
      </div>

      <motion.div
        variants={stagger.parent}
        initial="hidden"
        animate={isLoading ? '' : 'show'}
        className="flex flex-col space-y-2"
      >
        {snippets?.map((snippet) => (
          <motion.div
            variants={stagger.children}
            key={snippet.id}
            className="border rounded p-2 flex justify-between"
          >
            <Link href={`/snippets/${snippet.slug}`} passHref>
              <a className="link-secondary w-full">{snippet.title}</a>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href={`/admin/snippets/edit/${snippet.slug}`} passHref>
                <a className="btn-action primary">
                  <FiEdit />
                </a>
              </Link>
              <button
                className="btn-action danger"
                onClick={deleteSnippet(snippet.id)}
                disabled={deleteIds.has(snippet.id)}
              >
                {deleteIds.has(snippet.id) ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <FiTrash2 />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

AdminSnippetIndexPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminSnippetIndexPage;
