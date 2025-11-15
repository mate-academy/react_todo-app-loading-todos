export const ERROR_MESSAGES = {
  LOAD: 'Unable to load todos',
  EMPTY_TITLE: 'Title should not be empty',
  ADD: 'Unable to add a todo',
  DELETE: 'Unable to delete a todo',
  UPDATE: 'Unable to update a todo',
};

export type ErrorMessageType = keyof typeof ERROR_MESSAGES;
