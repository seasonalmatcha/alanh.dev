import { fadeUp } from '@/animations';
import { InView, Section, ProjectCard, AwaitText } from '@/components';
import { trpc } from '@/utils/trpc';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

export const ProjectSection = () => {
  const { isLoading, data: projects } = trpc.useQuery(['projects.index']);
  const variants = useMemo(() => fadeUp(), []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <AwaitText text="myProjects" />
      ) : (
        <motion.div variants={variants} initial="hidden" animate="show">
          <Section title="Projects" subtitle="Personal and client projects">
            <div className="projects-container">
              {projects?.map((project) => (
                <InView
                  options={{ once: true }}
                  key={project.id}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                >
                  <ProjectCard {...project} />
                </InView>
              ))}
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
