import { AuthLayout, Breadcrumb, PostForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const EditPostPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: post, isLoading } = trpc.useQuery([
    'posts.findOne',
    { slug: router.query.slug as string },
  ]);

  if (isLoading) {
    return <div>Loading post ..</div>;
  }

  if (!post) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>

      <Breadcrumb
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Snippets',
            path: '/admin/blog',
          },
          {
            label: post.title,
            path: `/admin/blog/edit/${router.query.slug}`,
            active: true,
          },
        ]}
      />

      <h1 className="text-4xl my-8">Edit Post</h1>

      <PostForm
        post={{
          categories: post.categories,
          content: post.content,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? undefined,
          id: post.id,
          thumbnail: post.thumbnail ?? undefined,
        }}
      />
    </>
  );
};

EditPostPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditPostPage;
