import { AuthLayout, DashboardTemplate, LanguageForm } from '@/components';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateLanguagePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Language</title>
      </Head>

      <DashboardTemplate
        title="Create new Language"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Languages',
            path: '/admin/languages',
          },
          {
            label: 'Create',
            path: '/admin/languages/create',
            active: true,
          },
        ]}
      >
        <LanguageForm />
      </DashboardTemplate>
    </>
  );
};

CreateLanguagePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateLanguagePage;
