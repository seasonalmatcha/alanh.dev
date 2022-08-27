import { NextPage } from 'next';
import Head from 'next/head';
import { ExperienceSection, IntroSection, ProjectSection, ToolStackSection } from '@/components';
import { motion } from 'framer-motion';
import { staggerAnimation } from '@/animations';
import { useMemo } from 'react';

const Home: NextPage = () => {
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
          <ExperienceSection />
        </motion.div>
        <motion.div variants={stagger.children}>
          <ProjectSection />
        </motion.div>
        <motion.div variants={stagger.children}>
          <ToolStackSection />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
