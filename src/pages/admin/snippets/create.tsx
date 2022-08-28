import { AuthLayout, DashboardTemplate, SnippetForm } from '@/components';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateSnippetPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Snippet</title>
      </Head>

      <DashboardTemplate
        title="Create new snippet"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Snippets',
            path: '/admin/snippets',
          },
          {
            label: 'Create',
            path: '/admin/snippets/create',
            active: true,
          },
        ]}
      >
        <SnippetForm />
      </DashboardTemplate>
    </>
  );
};

CreateSnippetPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateSnippetPage;
