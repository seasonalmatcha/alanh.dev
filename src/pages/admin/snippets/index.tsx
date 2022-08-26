import { trpc } from '@/utils/trpc';
import { NextPage } from 'next';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { staggerAnimation } from '@/animations';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { FiPaperclip } from 'react-icons/fi';

const AdminSnippetIndexPage: NextPage = () => {
  const { data: snippets, isLoading } = trpc.useQuery(['snippets.index']);
  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  return (
    <>
      <Head>
        <title>Snippets Collection</title>
      </Head>

      <h1 className="text-4xl mb-4">Snippets Collection</h1>

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
            <Link href={`/admin/snippets/edit/${snippet.slug}`} passHref>
              <a className="flex justify-center items-center border rounded p-2 hover:ring-2">
                <FiEdit />
              </a>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default AdminSnippetIndexPage;
