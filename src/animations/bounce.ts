import { TargetAndTransition } from 'framer-motion';

export const bounceAnimation: TargetAndTransition = {
  position: 'relative',
  translateY: [0, -20, 0],
  zIndex: 2,
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    duration: 0.65,
    type: 'keyframes',
  },
};
