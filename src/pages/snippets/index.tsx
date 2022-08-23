import { Commentize, Section, SnippetCard } from '@/components';
import { ISnippet } from '@/types';
import { NextPage } from 'next';
import Head from 'next/head';

const snippets: ISnippet[] = [
  {
    excerpt: 'Typescript config file for next js',
    language: {
      alias: 'json',
      logo: 'https://picsum.photos/56',
      name: 'JSON',
    },
    title: 'Next JS tsconfig',
    slug: 'next-js-ts-config',
    content: '',
  },
  {
    excerpt: 'Typescript config file for next js',
    language: {
      alias: 'json',
      logo: 'https://picsum.photos/56',
      name: 'JSON',
    },
    title: 'Next JS tsconfig',
    slug: '#',
    content: '',
  },
  {
    excerpt: 'Typescript config file for next js',
    language: {
      alias: 'json',
      logo: 'https://picsum.photos/56',
      name: 'JSON',
    },
    title: 'Next JS tsconfig',
    slug: '#',
    content: '',
  },
];

const Snippets: NextPage = () => {
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
            {snippets.map((snippet, i) => (
              <SnippetCard key={i} snippet={snippet} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Snippets;
