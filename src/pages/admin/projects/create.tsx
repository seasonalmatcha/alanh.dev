import { AuthLayout, DashboardTemplate, ProjectForm } from '@/components';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateProjectPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Project</title>
      </Head>

      <DashboardTemplate
        title="Create new Project"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Project',
            path: '/admin/projects',
          },
          {
            label: 'Create',
            path: '/admin/projects/create',
            active: true,
          },
        ]}
      >
        <ProjectForm />
      </DashboardTemplate>
    </>
  );
};

CreateProjectPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateProjectPage;
