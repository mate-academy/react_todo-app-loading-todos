export const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

export type Filter = keyof typeof FILTERS;
