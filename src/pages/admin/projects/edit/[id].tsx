import { AuthLayout, DashboardTemplate, ProjectForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const EditProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: project, isLoading } = trpc.useQuery([
    'projects.findOne',
    { id: router.query.id as string },
  ]);

  if (isLoading) {
    return <div>Loading Project ..</div>;
  }

  if (!project) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit Project</title>
      </Head>

      <DashboardTemplate
        title="Edit Project"
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
            label: project.title,
            path: `/admin/projects/edit/${router.query.id}`,
            active: true,
          },
        ]}
      >
        <ProjectForm
          initialState={{
            id: project.id,
            title: project.title,
            description: project.description,
            href: project.href,
            thumbnail: project.thumbnail ?? undefined,
          }}
        />
      </DashboardTemplate>
    </>
  );
};

EditProjectPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditProjectPage;
