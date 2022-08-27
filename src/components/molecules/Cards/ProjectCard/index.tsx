import Image from 'next/image';
import { Commentize } from '@/components';
import { IProject } from '@/types';

export const ProjectCard = ({ description, href, thumbnail, title }: IProject) => {
  return (
    <div>
      <a href={href} target="_blank" rel="noreferrer" className="project-card-thumbnail link">
        {thumbnail && (
          <div className="project-card-thumbnail-image">
            <Image
              alt={title}
              src={thumbnail}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        )}
        <span className="text-lg">{title}</span>
      </a>
      <Commentize text={description} />
    </div>
  );
};
