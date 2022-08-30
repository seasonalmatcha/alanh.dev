import { AuthLayout, DashboardTemplate, PostForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';

const CreatePostPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>

      <DashboardTemplate
        title="Create new Post"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Posts',
            path: '/admin/blog',
          },
          {
            label: 'Create',
            path: '/admin/blog/create',
            active: true,
          },
        ]}
      >
        <PostForm />
      </DashboardTemplate>
    </>
  );
};

CreatePostPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreatePostPage;
