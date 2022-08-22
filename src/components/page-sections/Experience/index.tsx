import { Commentize, Section } from '@/components';

interface IExperience {
  title: string;
  period: string;
  responsibility: string[];
}

const experience: IExperience[] = [
  {
    title: 'Lead Frontend Engineer at RevivaLTV',
    period: 'September 2021 - Present',
    responsibility: [
      'Lead the frontend team in building and maintaining new and existing products',
      'Collaborate with Product Owners and the backend team in assessing features',
      'Assessing design from the UI/UX team',
      'Translate UI design into code and integrate with API from the backend team',
      'Research on new stack technologies',
    ],
  },
  {
    title: 'Frontend Engineer at RevivaLTV',
    period: 'August 2020 - September 2021',
    responsibility: [
      'Develop company products including company profile, revivalpedia.com, and revivaltv.id',
      'Translate UI design into frontend code',
      'Integrate API from the backend team',
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <Section title="Experience" subtitle="My journey as a frontend engineer">
      <ul className="experience-list">
        {experience.map(({ title, period, responsibility }, i) => (
          <li key={i}>
            <h5 className="experience-title">{title}</h5>
            <span className="text-sm">{period}</span>
            <Commentize text={responsibility} />
          </li>
        ))}
      </ul>
    </Section>
  );
};
