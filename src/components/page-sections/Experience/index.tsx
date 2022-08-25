import { fadeUp } from '@/animations';
import { Commentize, InView, Section } from '@/components';
import { trpc } from '@/utils/trpc';
import { useMemo } from 'react';

export const ExperienceSection = () => {
  const { data: experiences } = trpc.useQuery(['experiences.index']);
  const variants = useMemo(() => fadeUp(), []);

  return (
    <InView options={{ once: true }} variants={variants} initial="hidden" animate="show">
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
    </InView>
  );
};
