import { fadeUp } from '@/animations';
import { AwaitText, ExperienceCard, InView, Section } from '@/components';
import { trpc } from '@/utils/trpc';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

export const ExperienceSection = () => {
  const { isLoading, data: experiences } = trpc.useQuery(['experiences.index']);
  const variants = useMemo(() => fadeUp(), []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <AwaitText text="myExperience" />
      ) : (
        <motion.div variants={variants} initial="hidden" animate="show">
          <Section title="Experience" subtitle="My journey as a frontend engineer">
            <ul className="experience-list">
              {experiences?.map((experience) => (
                <InView
                  options={{ once: true }}
                  key={experience.id}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                >
                  <li>
                    <ExperienceCard {...experience} />
                  </li>
                </InView>
              ))}
            </ul>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
