import Image from 'next/image';
import { Commentize, ICommentizeProps } from '@/components';
import { Project } from '@prisma/client';

type IProjectCardProps = Pick<Project, 'id' | 'href' | 'thumbnail' | 'title'> & {
  description: ICommentizeProps['text'];
};

export const ProjectCard = ({ description, href, thumbnail, title }: IProjectCardProps) => {
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
