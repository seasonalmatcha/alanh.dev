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

const AdminProjectsPage: NextPageWithLayout = () => {
  const { data: projects, isLoading, refetch } = trpc.useQuery(['projects.index']);
  const { mutate: deleteProjectMutation } = trpc.useMutation(['protected.projects.delete']);
  const deleteIds = useMemo<Set<string>>(() => new Set(), []);

  const stagger = useMemo(
    () =>
      staggerAnimation({
        parent: { show: { transition: { staggerChildren: 0.15 } } },
      }),
    [],
  );

  const deleteProject = (id: string) => {
    return () => {
      deleteIds.add(id);
      deleteProjectMutation(id, {
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
        <title>Projects Collection</title>
      </Head>

      <DashboardTemplate
        actionAddPath="/admin/projects/create"
        title="Projects Collection"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Projects',
            path: '/admin/projects',
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
          {projects?.map((project) => (
            <motion.div
              variants={stagger.children}
              key={project.id}
              className="border rounded p-2 flex justify-between"
            >
              <div className="flex space-x-2 items-center">
                <span>{project.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/admin/projects/edit/${project.id}`} passHref>
                  <a className="btn-action primary">
                    <FiEdit />
                  </a>
                </Link>
                <button
                  className="btn-action danger"
                  onClick={deleteProject(project.id)}
                  disabled={deleteIds.has(project.id)}
                >
                  {deleteIds.has(project.id) ? (
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

AdminProjectsPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminProjectsPage;
