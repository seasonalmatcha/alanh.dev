import { Section, ProjectCard } from '@/components';

export interface IProject {
  description: string | string[];
  href: string;
  title: string;
  thumbnail: string;
}

const projects: IProject[] = [
  {
    description: [
      'A simple app to help me playing game called Phasmophobia',
      'It was an impulsive action to build this project',
      'This project was also made when I was trying out vue 3',
    ],
    href: 'https://phasmopedia.netlify.app',
    title: 'Phasmopedia',
    thumbnail: 'https://picsum.photos/720',
  },
  {
    description: [
      'Client project to build company profile website',
      'Collaborate with UI designer and backend engineer to develop features',
      'Translate UI design into frontend code',
      'Integrate backend API to frontend',
    ],
    href: 'https://bersaudara.com',
    title: 'Bersaudara Group Website',
    thumbnail: 'https://picsum.photos/720',
  },
  {
    description: [
      'Client project to build company profile website',
      'Collaborate with UI designer and backend engineer to develop features',
      'Translate UI design into frontend code',
      'Integrate backend API to frontend',
    ],
    href: 'https://globalpromedika.co.id/',
    title: 'Global Promedika Service Website',
    thumbnail: 'https://picsum.photos/720',
  },
  {
    description: [
      'Client project to build company profile website',
      'Collaborate with UI designer and backend engineer to develop features',
      'Translate UI design into frontend code',
      'Integrate backend API to frontend',
    ],
    href: '#',
    title: 'Titans Paint Website',
    thumbnail: 'https://picsum.photos/720',
  },
];

export const ProjectSection = () => {
  return (
    <Section title="Projects" subtitle="Personal and client projects">
      <div className="projects-container">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </Section>
  );
};
