export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];
