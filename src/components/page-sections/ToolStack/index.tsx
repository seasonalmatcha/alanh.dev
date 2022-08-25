import { fadeUp } from '@/animations';
import { InView, Section } from '@/components';
import { useMemo } from 'react';
import { tools } from './tools';
import { motion } from 'framer-motion';
import { staggerAnimation } from '@/animations';

export const ToolStackSection = () => {
  const variants = useMemo(() => fadeUp(), []);
  const stagger = useMemo(() => {
    return staggerAnimation({
      parent: {
        show: {
          transition: {
            delayChildren: 0.25,
            staggerChildren: 0.05,
          },
        },
      },
      children: {
        hidden: {
          opacity: 1,
          scale: 0,
        },
        show: {
          scale: 1,
        },
      },
    });
  }, []);

  return (
    <InView options={{ once: true }} variants={variants} initial="hidden" animate="show">
      <Section
        title="Tools and Stack"
        subtitle="Tools and tech stack I use personally and professionally"
      >
        <InView
          options={{ once: true, margin: '0px 0px 80px 0px' }}
          variants={stagger.parent}
          initial="hidden"
          animate="show"
          className="tools-stack-container mt-20"
        >
          {tools.map(({ col, href, icon, row, title }, i) => (
            <motion.div
              key={i}
              variants={stagger.children}
              className="tool-item"
              style={{ gridColumnStart: col, gridRowStart: row }}
            >
              <a
                href={href}
                aria-label={title}
                title={title}
                className="block"
                target="_blank"
                rel="noreferrer"
              >
                {icon.call(null, { className: 'w-full h-full' })}
              </a>
            </motion.div>
          ))}
        </InView>
      </Section>
    </InView>
  );
};
