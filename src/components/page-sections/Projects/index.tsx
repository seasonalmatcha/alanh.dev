import { fadeUp } from '@/animations';
import { InView, Section, ProjectCard } from '@/components';
import { trpc } from '@/utils/trpc';
import { useMemo } from 'react';

export const ProjectSection = () => {
  const { data: projects } = trpc.useQuery(['projects.index']);
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
