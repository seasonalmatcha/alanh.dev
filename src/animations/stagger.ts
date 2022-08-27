import { TargetAndTransition } from 'framer-motion';

interface StaggerAnimation {
  parent: {
    hidden: TargetAndTransition;
    show: TargetAndTransition;
    exit: TargetAndTransition;
  };
  children: {
    hidden: TargetAndTransition;
    show: TargetAndTransition;
    exit: TargetAndTransition;
  };
}

interface StaggerAnimationOverrides {
  parent: Partial<StaggerAnimation['parent']>;
  children: Partial<StaggerAnimation['children']>;
}

export const staggerAnimation = (
  overrides?: Partial<StaggerAnimationOverrides>,
): StaggerAnimation => {
  return {
    parent: {
      hidden: {
        opacity: 0,
        ...(overrides?.parent?.hidden ?? {}),
      },
      show: {
        opacity: 1,
        transition: {
          delayChildren: 0.25,
          staggerChildren: 0.5,
        },
        ...(overrides?.parent?.show ?? {}),
      },
      exit: {
        ...(overrides?.parent?.exit ?? {}),
      },
    },
    children: {
      hidden: {
        opacity: 0,
        ...(overrides?.children?.hidden ?? {}),
      },
      show: {
        opacity: 1,
        ...(overrides?.children?.show ?? {}),
      },
      exit: {
        ...(overrides?.children?.exit ?? {}),
      },
    },
  };
};
