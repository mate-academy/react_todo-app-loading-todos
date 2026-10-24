export const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

export type Status = (typeof FILTERS)[keyof typeof FILTERS];

export enum TODOMessages {
  EmptyTitle = 'Title should not be empty',
  UnableToAdd = 'Unable to add a todo',
  UnableToDelete = 'Unable to delete a todo',
  UnableToLoad = 'Unable to load todos',
  UnableToUpdate = 'Unable to update a todo',
}
