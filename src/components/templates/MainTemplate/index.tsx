import { Commentize, ICommentizeProps, Section } from '@/components';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export interface IMainTemplateProps {
  title: string;
  introDescription?: ICommentizeProps['text'];
}

export const MainTemplate = ({
  children,
  title,
  introDescription,
}: PropsWithChildren<IMainTemplateProps>) => {
  return (
    <Section
      subtitle={
        <motion.h1
          className="text-4xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {title}
        </motion.h1>
      }
      inLineTitle
    >
      {introDescription && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }}>
          <Commentize text={introDescription} />
        </motion.div>
      )}

      {children}
    </Section>
  );
};
