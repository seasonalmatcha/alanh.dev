import { AuthLayout, DashboardTemplate, ExperienceForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const EditExperiencePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: experience, isLoading } = trpc.useQuery([
    'experiences.findOne',
    { id: router.query.id as string },
  ]);

  if (isLoading) {
    return <div>Loading Experience ..</div>;
  }

  if (!experience) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit Experience</title>
      </Head>

      <DashboardTemplate
        title="Edit Experience"
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
            label: experience.title,
            path: `/admin/experience/edit/${router.query.id}`,
            active: true,
          },
        ]}
      >
        <ExperienceForm
          initialState={{
            id: experience.id,
            title: experience.title,
            subtitle: experience.subtitle,
            description: experience.description,
          }}
        />
      </DashboardTemplate>
    </>
  );
};

EditExperiencePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditExperiencePage;
