import Image from 'next/image';
import { Commentize, ICommentizeProps } from '@/components';

export interface IProjectCardProps {
  href: string;
  thumbnail: string;
  title: string;
  description: ICommentizeProps['text'];
}

export const ProjectCard = ({ description, href, thumbnail, title }: IProjectCardProps) => {
  return (
    <div>
      <a href={href} target="_blank" rel="noreferrer" className="project-card-thumbnail link">
        <div className="project-card-thumbnail-image">
          <Image
            alt={title}
            src={thumbnail}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <span className="text-lg">{title}</span>
      </a>
      <Commentize text={description} />
    </div>
  );
};
