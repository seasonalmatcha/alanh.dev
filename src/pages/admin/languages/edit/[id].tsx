import { AuthLayout, DashboardTemplate, LanguageForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const EditLanguagePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: language, isLoading } = trpc.useQuery([
    'languages.findOne',
    { id: router.query.id as string },
  ]);

  if (isLoading) {
    return <div>Loading language ..</div>;
  }

  if (!language) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit Language</title>
      </Head>

      <DashboardTemplate
        title="Edit Language"
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
            label: language.name,
            path: `/admin/languages/edit/${router.query.id}`,
            active: true,
          },
        ]}
      >
        <LanguageForm
          initialState={{
            id: language.id,
            alias: language.alias,
            logo: language.logo ?? undefined,
            name: language.name,
          }}
        />
      </DashboardTemplate>
    </>
  );
};

EditLanguagePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditLanguagePage;
