import { fadeUp } from '@/animations';
import { InView, Section, ProjectCard } from '@/components';
import { Project } from '@prisma/client';
import { useMemo } from 'react';

interface IProject extends Omit<Project, 'description'> {
  description: string[];
}

export type IProjectSection = {
  projects: IProject[];
};

export const ProjectSection = ({ projects }: IProjectSection) => {
  const variants = useMemo(() => fadeUp(), []);

  return (
    <InView options={{ once: true }} variants={variants} initial="hidden" animate="show">
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
    </InView>
  );
};
