import { Commentize, Section } from '@/components';
import { trpc } from '@/utils/trpc';

export const ExperienceSection = () => {
  const { data: experiences } = trpc.useQuery(['experiences.index']);

  return (
    <Section title="Experience" subtitle="My journey as a frontend engineer">
      <ul className="experience-list">
        {experiences?.map((experience) => (
          <li key={experience.id}>
            <h5 className="experience-title">{experience.title}</h5>
            <span className="text-sm">{experience.subtitle}</span>
            <Commentize text={experience.description} />
          </li>
        ))}
      </ul>
    </Section>
  );
};
