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
import Image from 'next/image';

const AdminLanguagesIndexPage: NextPageWithLayout = () => {
  const { data: languages, isLoading, refetch } = trpc.useQuery(['languages.index']);
  const { mutate: deleteLanguageMutation } = trpc.useMutation(['protected.languages.delete']);
  const deleteIds = useMemo<Set<string>>(() => new Set(), []);

  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  const deleteLanguage = (id: string) => {
    return () => {
      deleteIds.add(id);
      deleteLanguageMutation(id, {
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
        <title>Languages Collection</title>
      </Head>

      <DashboardTemplate
        actionAddPath="/admin/languages/create"
        title="Languages Collection"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Languages',
            path: '/admin/languages',
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
          {languages?.map((language) => (
            <motion.div
              variants={stagger.children}
              key={language.id}
              className="border rounded p-2 flex justify-between"
            >
              <div className="flex space-x-2 items-center">
                {language.logo && (
                  <div className="relative w-8 h-8">
                    <Image src={language.logo} layout="fill" alt="" />
                  </div>
                )}
                <span>{language.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/languages/edit/${language.id}`}
                  passHref
                  className="btn-action primary"
                >
                  <FiEdit />
                </Link>
                <button
                  className="btn-action danger"
                  onClick={deleteLanguage(language.id)}
                  disabled={deleteIds.has(language.id)}
                >
                  {deleteIds.has(language.id) ? (
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

AdminLanguagesIndexPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminLanguagesIndexPage;
