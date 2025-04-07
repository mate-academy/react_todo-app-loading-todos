export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum Filterby {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export enum ErrorMessage {
  NONE = '',
  LOAD = 'Unable to load todos',
  EMPTY = 'Title should not be empty',
  ADD = 'Unable to add a todo',
  UPDATE = 'Unable to update a todo',
  DELETE = 'Unable to delete a todo',
}
