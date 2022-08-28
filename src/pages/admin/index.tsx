import { staggerAnimation } from '@/animations';
import { AuthLayout, DashboardTemplate } from '@/components';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import { NextPageWithLayout } from '../page';

const collections = [
  {
    label: 'Snippets',
    path: 'snippets',
  },
  {
    label: 'Projects',
    path: 'projects',
  },
  {
    label: 'Experience',
    path: 'experience',
  },
  {
    label: 'Blog',
    path: 'blog',
  },
  {
    label: 'Bookmarks',
    path: 'bookmarks',
  },
];

const AdminIndexPage: NextPageWithLayout = () => {
  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.05 } } },
      }),
    [],
  );

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <DashboardTemplate title="Collection">
        <div className="flex flex-col space-y-2">
          <motion.div
            variants={stagger.parent}
            initial="hidden"
            animate="show"
            className="flex flex-col space-y-2"
          >
            {collections.map((collection) => (
              <Link key={collection.label} href={`/admin/${collection.path}`} passHref>
                <motion.a
                  variants={stagger.children}
                  className="link-secondary w-full border rounded p-2"
                >
                  {collection.label}
                </motion.a>
              </Link>
            ))}
          </motion.div>
        </div>
      </DashboardTemplate>
    </>
  );
};

AdminIndexPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminIndexPage;
