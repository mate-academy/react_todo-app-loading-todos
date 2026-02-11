export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];
