export const ErrorMessages = {
  load: 'Unable to load todos',
  title: 'Title should not be empty',
  add: 'Unable to delete a todo',
  delete: 'Unable to delete a todo',
  update: 'Unable to update a todo',
} as const;

export type ErrorMessage =
  (typeof ErrorMessages)[keyof typeof ErrorMessages];
