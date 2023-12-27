import { Actions, ErrorMessages } from '../enums';
import { Todo } from './Todo';

export type Action =
  {
    type: Actions.load,
    payload: { todos: Todo[] }
  }
  |
  {
    type: Actions.add | Actions.update,
    payload: { todo: Todo }
  }
  | {
    type: Actions.delete,
    payload: { todoId: number }
  }
  | {
    type: Actions.toggleAll,
    payload: { isCompleted: boolean }
  }
  | {
    type: Actions.clearComleted,
  }
  | {
    type: Actions.setErrorMessage,
    payload: { errorMessage: ErrorMessages }
  };
