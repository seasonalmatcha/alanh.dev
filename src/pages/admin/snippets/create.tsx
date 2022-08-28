import { AuthLayout, Breadcrumb, SnippetForm } from '@/components';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateSnippetPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Snippet</title>
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
          },
          {
            label: 'Create',
            path: '/admin/snippets/create',
            active: true,
          },
        ]}
      />

      <h1 className="text-4xl my-8">Create new snippet</h1>

      <SnippetForm />
    </>
  );
};

CreateSnippetPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateSnippetPage;
