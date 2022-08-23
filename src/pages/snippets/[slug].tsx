import { ISnippet } from '@/types';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { createElement } from 'react';
import { refractor } from 'refractor';
import { toH } from 'hast-to-hyperscript';
import js from 'refractor/lang/javascript';
import { Commentize, XMLize } from '@/components';

refractor.register(js);

const code = `{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "prefer-const": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
  }
}
`;

const snippet: ISnippet = {
  content: code,
  description: 'eslint config for next js project with typescript',
  language: {
    alias: 'json',
    logo: 'https://picsum.photos/32',
    name: 'JSON',
  },
  slug: 'eslint-next-js',
  title: 'Eslint config next js, typescript, prettier',
  logo: 'https://picsum.photos/96',
};

const SnippetDetail: NextPage = () => {
  const tree = refractor.highlight(snippet.content, snippet.language.alias ?? 'plain');
  const hyper = toH(createElement, tree);

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
        <pre className="language-">{hyper}</pre>
      </div>
    </>
  );
};

export default SnippetDetail;
