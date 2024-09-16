export type TodoError =
  | ''
  | 'Unable to load todos'
  | 'Title should not be empty'
  | 'Unable to add a todo'
  | 'Unable to update a todo'
  | 'Unable to delete a todo';
