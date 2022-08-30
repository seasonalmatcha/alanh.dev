import { AuthLayout, DashboardTemplate, ExperienceForm } from '@/components';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateExperiencePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Experience</title>
      </Head>

      <DashboardTemplate
        title="Create new Experience"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Experience',
            path: '/admin/experience',
          },
          {
            label: 'Create',
            path: '/admin/experience/create',
            active: true,
          },
        ]}
      >
        <ExperienceForm />
      </DashboardTemplate>
    </>
  );
};

CreateExperiencePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateExperiencePage;
