import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { createElement, useCallback } from 'react';
import { refractor } from 'refractor';
import { toH } from 'hast-to-hyperscript';
import { Commentize, XMLize } from '@/components';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

const SnippetDetail: NextPage = () => {
  const router = useRouter();
  const { isLoading, data: snippet } = trpc.useQuery([
    'snippets.findOne',
    { slug: router.query.slug! as string },
  ]);

  const renderSnippet = useCallback((content: string, language?: string) => {
    const tree = refractor.highlight(content.replace(/^\\n$/gm, '\n'), language ?? 'plain');
    const hyper = toH(createElement, tree);
    return hyper;
  }, []);

  if (isLoading) {
    return <div>Fetching data ...</div>;
  }

  if (!snippet) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Head>
        <title>Snippet - Alan Habibullah</title>
      </Head>

      {snippet.logo && (
        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
          <Image alt={snippet.title} src={snippet.logo} layout="fill" />
        </div>
      )}

      <XMLize
        text={<h1 className="text-2xl dark:text-white font-bold">{snippet.title}</h1>}
        textProps={{
          className: 'pl-0',
        }}
        inLine
      />

      <Commentize text={snippet.description ?? ''} />

      <div className="text-sm mt-4">
        <pre className="language-" data-language={snippet.language?.name ?? ''}>
          {renderSnippet(snippet.content, snippet.language?.alias)}
        </pre>
      </div>
    </>
  );
};

export default SnippetDetail;
