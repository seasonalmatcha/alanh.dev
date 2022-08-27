import { HTMLMotionProps, motion, useInView } from 'framer-motion';
import { PropsWithChildren, useRef } from 'react';

export interface InViewProps extends HTMLMotionProps<'div'> {
  options?: {
    amount?: number | 'some' | 'all';
    margin?: string;
    once?: boolean;
  };
  initial?: HTMLMotionProps<'div'>['initial'];
  animate?: HTMLMotionProps<'div'>['animate'];
  exit?: HTMLMotionProps<'div'>['exit'];
}

const defaultOptions = {
  margin: '0px 0px 100px 0px',
};

export const InView = ({
  children,
  options = {},
  initial,
  animate,
  exit,
  ...restProps
}: PropsWithChildren<InViewProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { ...defaultOptions, ...options });

  return (
    <motion.div
      ref={ref}
      {...restProps}
      initial={initial}
      animate={inView ? animate : ''}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};
