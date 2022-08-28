import { AuthLayout, SnippetForm } from '@/components';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/page';

const CreateSnippetPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Snippet</title>
      </Head>

      <Link href="/admin/snippets" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

      <h1 className="text-4xl mt-8">Create new snippet</h1>

      <SnippetForm />
    </>
  );
};

CreateSnippetPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CreateSnippetPage;
