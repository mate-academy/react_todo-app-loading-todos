export const BoxErrorMessages = {
  load: 'Unable to load todos',
  title: 'Title should not be empty',
  add: 'Unable to delete a todo',
  delete: 'Unable to delete a todo',
  update: 'Unable to update a todo',
} as const;

export type ErrorMessages =
  (typeof BoxErrorMessages)[keyof typeof BoxErrorMessages];
