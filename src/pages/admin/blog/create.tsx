import { AuthLayout, Breadcrumb, PostForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';

const CreatePostPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>

      <Breadcrumb
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
      />

      <h1 className="text-4xl my-8">Create New Post</h1>

      <PostForm />
    </>
  );
};

CreatePostPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreatePostPage;
