import { fadeUp } from '@/animations';
import { AwaitText, Commentize, InView, Section } from '@/components';
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
                    <h5 className="experience-title">{experience.title}</h5>
                    <span className="text-sm">{experience.subtitle}</span>
                    <Commentize text={experience.description} />
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
