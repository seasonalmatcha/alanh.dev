import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Commentize, MarkdownPreview, XMLize } from '@/components';
import { motion } from 'framer-motion';
import { prisma } from '@/server/db/client';
import { Language, Snippet } from '@prisma/client';
import { generateMetatags } from '@/utils/generateMetatags';

export const getStaticPaths = async () => {
  const slugs = await prisma.snippet.findMany({ select: { slug: true }, take: 1 });

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

type SnippetDetailPageProps = {
  snippet: Snippet & { language: Language | null };
};

export const getStaticProps: GetStaticProps<SnippetDetailPageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug || typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const snippet = await prisma.snippet.findFirst({
    where: {
      slug,
    },
    include: {
      language: true,
    },
  });

  if (!snippet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      snippet,
    },
  };
};

const SnippetDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ snippet }) => {
  return (
    <>
      <Head>
        {generateMetatags({
          title: snippet.title,
          url: `/snippets/${snippet.slug}`,
          description: snippet.excerpt ?? undefined,
        })}
      </Head>

      <motion.div>
        <motion.div layoutId={`${snippet.id}`}>
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
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }}>
          {snippet.description && <Commentize text={snippet.description} />}
          <div className="mt-4">
            <MarkdownPreview value={snippet.content} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SnippetDetail;
