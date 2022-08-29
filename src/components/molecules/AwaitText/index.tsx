import { HTMLMotionProps, motion } from 'framer-motion';
import { useMemo } from 'react';
import { staggerAnimation } from '@/animations';

export const AwaitText = ({ text }: { text: string }) => {
  const stagger = useMemo(() => {
    return staggerAnimation({
      parent: {
        hidden: {
          opacity: 0,
        },
        show: {
          display: 'block',
          transition: {
            delayChildren: 0.15,
            staggerChildren: 0.035,
          },
        },
        exit: {
          opacity: 0,
        },
      },
      children: {
        hidden: {
          opacity: 1,
          display: 'none',
        },
        show: {
          display: 'inline-block',
        },
      },
    });
  }, []);

  const splitChars = (chars: string, props?: HTMLMotionProps<'span'>) => {
    return chars.split('').map((char, i) => (
      <motion.span key={i} {...props} variants={stagger.children}>
        {char}
      </motion.span>
    ));
  };

  return (
    <>
      <motion.div
        variants={stagger.parent}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-wrap font-mono text-xl"
      >
        {splitChars('await', { className: 'text-red-400' })}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars(text)}
        {splitChars('()', { className: 'text-blue-400' })}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars('{', { className: 'text-blue-400' })}
        <motion.div variants={stagger.children} className="w-full"></motion.div>
        <motion.span variants={stagger.children}>&nbsp;&nbsp;</motion.span>
        {splitChars('please')}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars('wait')}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars('for')}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars('a')}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars('moment')}
        <motion.span variants={stagger.children}>&nbsp;</motion.span>
        {splitChars('...')}
        <motion.div variants={stagger.children} className="w-full"></motion.div>
        {splitChars('}', { className: 'text-blue-400' })}
        <span className="animate-pulse">&#9613;</span>
      </motion.div>
    </>
  );
};
