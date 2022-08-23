import { Commentize, Section, SnippetCard } from '@/components';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';

const Snippets: NextPage = () => {
  const { data: snippets } = trpc.useQuery(['snippets.index']);

  return (
    <>
      <Head>
        <title>Snippets - Alan Habibullah</title>
      </Head>

      <Section subtitle={<h1 className="text-4xl font-bold">Code Snippets</h1>} inLineTitle>
        <Commentize
          text={[
            "There are so many things I do repeteadly when doing projects, most of the time writing the config files and there are multiple times when I revisit my old project just to copy the configs. I guess it's time to gather those stuff and put it here",
            '',
            'This snippet feature is inspired by Lee Robinson',
          ]}
        />

        <div className="mt-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {snippets?.map((snippet, i) => (
              <SnippetCard key={i} {...snippet} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Snippets;
