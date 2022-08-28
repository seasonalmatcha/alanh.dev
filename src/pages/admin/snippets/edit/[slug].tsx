import { AuthLayout, SnippetForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
import Link from 'next/link';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const EditSnippetPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: snippet, isLoading } = trpc.useQuery([
    'snippets.findOne',
    { slug: router.query.slug as string },
  ]);

  if (isLoading) {
    return <div>Loading snippet ..</div>;
  }

  if (!snippet) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit Snippet</title>
      </Head>

      <Link href="/admin/snippets" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

      <h1 className="text-4xl my-8">Edit Snippet</h1>

      <SnippetForm
        snippet={{
          content: snippet.content,
          slug: snippet.slug,
          title: snippet.title,
          description: snippet.description ?? undefined,
          excerpt: snippet.excerpt ?? undefined,
          languageId: snippet.languageId ?? undefined,
          logo: snippet.logo ?? undefined,
        }}
      />
    </>
  );
};

EditSnippetPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditSnippetPage;
