import { Experience } from '@prisma/client';
import { Commentize, ICommentizeProps } from '@/components';

export type IExperienceCardProps = Pick<Experience, 'title' | 'subtitle'> & {
  description: ICommentizeProps['text'];
};

export const ExperienceCard = ({ subtitle, title, description }: IExperienceCardProps) => {
  return (
    <>
      <h5 className="experience-title">{title}</h5>
      <span className="text-sm">{subtitle}</span>
      <Commentize text={description} />
    </>
  );
};
