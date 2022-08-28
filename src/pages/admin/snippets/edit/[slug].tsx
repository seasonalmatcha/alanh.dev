import { AuthLayout, Breadcrumb, SnippetForm } from '@/components';
import { NextPageWithLayout } from '@/pages/page';
import Head from 'next/head';
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

      <Breadcrumb
        links={[
          {
            label: 'Collections',
            path: '/admin',
          },
          {
            label: 'Snippets',
            path: '/admin/snippets',
          },
          {
            label: snippet.title,
            path: `/admin/snippets/edit/${router.query.slug}`,
            active: true,
          },
        ]}
      />

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
