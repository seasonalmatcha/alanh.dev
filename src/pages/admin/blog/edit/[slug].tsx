import { AuthLayout, PostForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import Link from 'next/link';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
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

      <Link href="/admin/blog" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

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
