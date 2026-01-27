export const noun = (
  count: number,
  [singular, plural]: [string, string],
): string => {
  return `${count} ${count === 1 ? singular : plural}`;
};
