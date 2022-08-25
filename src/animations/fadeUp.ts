import { TargetAndTransition, Variants } from 'framer-motion';

interface FadeUpAnimationOverrides {
  hidden: TargetAndTransition;
  show: TargetAndTransition;
  exit: TargetAndTransition;
}

export const fadeUp = (overrides?: Partial<FadeUpAnimationOverrides>): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 50,
      ...(overrides?.hidden ?? {}),
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
      },
      ...(overrides?.show ?? {}),
    },
    exit: {
      opacity: 0,
      ...(overrides?.exit ?? {}),
    },
  };
};
