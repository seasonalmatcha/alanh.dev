import { AuthLayout, DashboardTemplate, BookmarkForm } from '@/components';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateBookmarkPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Bookmark</title>
      </Head>

      <DashboardTemplate
        title="Create new Bookmark"
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Bookmarks',
            path: '/admin/bookmarks',
          },
          {
            label: 'Create',
            path: '/admin/bookmarks/create',
            active: true,
          },
        ]}
      >
        <BookmarkForm />
      </DashboardTemplate>
    </>
  );
};

CreateBookmarkPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateBookmarkPage;
