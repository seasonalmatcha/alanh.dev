import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { ExperienceSection, IntroSection, ProjectSection, ToolStackSection } from '@/components';
import { motion } from 'framer-motion';
import { staggerAnimation } from '@/animations';
import { useMemo } from 'react';
import { prisma } from '@/server/db/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const [projects, experiences] = await Promise.all([
    prisma.project.findMany().then((projects) => {
      return projects
        .map((project) => ({
          ...project,
          description: project.description.split('\\n'),
        }))
        .sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime());
    }),
    prisma.experience.findMany().then((experiences) => {
      return experiences.map((project) => ({
        ...project,
        description: project.description.split('\\n'),
      }));
    }),
  ]);

  return {
    props: {
      projects,
      experiences,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  projects,
  experiences,
}) => {
  const stagger = useMemo(() => {
    return staggerAnimation({
      parent: {
        show: {
          transition: {
            staggerChildren: 1,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title>Alan Habibullah</title>
      </Head>

      <motion.div
        variants={stagger.parent}
        initial="hidden"
        animate="show"
        className="flex flex-col space-y-10 lg:space-y-24"
      >
        <motion.div variants={stagger.children}>
          <IntroSection />
        </motion.div>
        <motion.div variants={stagger.children}>
          <ExperienceSection experiences={experiences} />
        </motion.div>
        <motion.div variants={stagger.children}>
          <ProjectSection projects={projects} />
        </motion.div>
        <motion.div variants={stagger.children}>
          <ToolStackSection />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
