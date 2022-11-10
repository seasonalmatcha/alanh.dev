import { useCallback, useRef } from 'react';

export const useDebounce = <Args = unknown, Return = void>(
  fn: (args: Args) => Return,
  time: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debouncedFunction = useCallback(
    (args: Args) => {
      return new Promise((resolve) => {
        if (timer) {
          clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
          resolve(fn(args));
        }, time);
      });
    },
    [fn, time],
  );

  const teardown = useCallback(() => clearTimeout(timer.current), []);

  return [debouncedFunction, teardown];
};
