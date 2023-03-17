export enum ErrorMessage {
  NONE = '',
  LOAD = 'Unable to load todos',
  ADD = 'Unable to add a todo',
  DELETE = 'Unable to delete a todo',
  UPDATE = 'Unable to update a todo',
}

export type Error = {
  status: boolean,
  message: ErrorMessage,
};
