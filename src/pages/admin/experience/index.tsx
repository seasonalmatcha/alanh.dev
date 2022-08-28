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

const AdminExperiencePage: NextPageWithLayout = () => {
  const { data: experiences, isLoading, refetch } = trpc.useQuery(['experiences.index']);
  const { mutate: deleteExperienceMutation } = trpc.useMutation(['protected.experiences.delete']);
  const deleteIds = useMemo<Set<string>>(() => new Set(), []);

  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  const deleteExperience = (id: string) => {
    return () => {
      deleteIds.add(id);
      deleteExperienceMutation(id, {
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
        <title>Experience Collection</title>
      </Head>

      <DashboardTemplate
        actionAddPath="/admin/experience/create"
        title="Experience Collection"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Experience',
            path: '/admin/experience',
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
          {experiences?.map((experience) => (
            <motion.div
              variants={stagger.children}
              key={experience.id}
              className="border rounded p-2 flex justify-between"
            >
              <div className="flex space-x-2 items-center">
                <span>{experience.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/admin/experience/edit/${experience.id}`} passHref>
                  <a className="btn-action primary">
                    <FiEdit />
                  </a>
                </Link>
                <button
                  className="btn-action danger"
                  onClick={deleteExperience(experience.id)}
                  disabled={deleteIds.has(experience.id)}
                >
                  {deleteIds.has(experience.id) ? (
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

AdminExperiencePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminExperiencePage;
