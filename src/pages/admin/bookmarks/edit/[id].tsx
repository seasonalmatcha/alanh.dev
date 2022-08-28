import { AuthLayout, DashboardTemplate, BookmarkForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const EditBookmarkPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: bookmark, isLoading } = trpc.useQuery([
    'bookmarks.findOne',
    { id: router.query.id as string },
  ]);

  if (isLoading) {
    return <div>Loading bookmark ..</div>;
  }

  if (!bookmark) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit Bookmark</title>
      </Head>

      <DashboardTemplate
        title="Edit bookmark"
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
            label: bookmark.title,
            path: `/admin/bookmarks/edit/${router.query.id}`,
            active: true,
          },
        ]}
      >
        <BookmarkForm
          initialState={{
            id: bookmark.id,
            title: bookmark.title,
            excerpt: bookmark.excerpt ?? undefined,
            thumbnail: bookmark.thumbnail ?? undefined,
            url: bookmark.url,
            urlText: bookmark.urlText,
          }}
        />
      </DashboardTemplate>
    </>
  );
};

EditBookmarkPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditBookmarkPage;
