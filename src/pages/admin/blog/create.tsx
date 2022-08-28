import { AuthLayout } from '@/components';
import { PostForm } from '@/components/organisms/PostForm';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import Link from 'next/link';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const CreatePostPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>

      <Link href="/admin/blog" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

      <h1 className="text-4xl my-8">Create New Post</h1>

      <PostForm />
    </>
  );
};

CreatePostPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreatePostPage;
