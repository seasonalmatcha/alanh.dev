import { Section, ProjectCard } from '@/components';
import { trpc } from '@/utils/trpc';

export const ProjectSection = () => {
  const { data: projects } = trpc.useQuery(['projects.index']);

  return (
    <Section title="Projects" subtitle="Personal and client projects">
      <div className="projects-container">
        {projects?.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </Section>
  );
};
