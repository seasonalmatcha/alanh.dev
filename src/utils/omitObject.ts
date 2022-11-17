export const omitObject = <T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> => {
  return Object.keys(object)
    .filter((k) => !keys.includes(k as K))
    .reduce((acc, key) => {
      acc[key] = object[key];
      return acc;
    }, {} as Record<string, unknown>) as Omit<T, K>;
};
