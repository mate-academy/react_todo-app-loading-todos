export const ErrorMessages = {
  Load: 'Unable to load todos',
  Title: 'Title should not be empty',
  Add: 'Unable to add a todo',
  DOMParserelete: 'Unable to delete a todo',
  Update: 'Unable to update a todo',
} as const;

export type ErrorMessage = (typeof ErrorMessages)[keyof typeof ErrorMessages];
