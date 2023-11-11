import { Todo } from './Todo';

export type GlobalState = {
  todos: Todo[],
  userId: number,
  errors: {
    titleError: boolean,
    loadError: boolean,
    createError: boolean
    deleteError: boolean
    updateError: boolean
  }
};
