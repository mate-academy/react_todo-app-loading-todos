import { Todo } from '../types/Todo';
import { GlobalState } from '../types/GlobalState';
import { ErrorType } from '../types/ErrorType';

export enum ActionType {
  Create,
  Set,
  Update,
  Delete,
  ToggleError,
  ResetErrors,
}

export type Action = { type: ActionType.Create, payload: { todo: Todo } }
| { type: ActionType.Set, payload: { todos: Todo[] } }
| {
  type: ActionType.Update,
  payload: { id: number, content?: string, completed?: boolean }
}
| { type: ActionType.Delete, payload: { id: number } }
| { type: ActionType.ToggleError, payload: { errorType: ErrorType } }
| { type: ActionType.ResetErrors, payload: { } };

export const reducer = (
  state: GlobalState,
  { type, payload }: Action,
): GlobalState => {
  switch (type) {
    case ActionType.Create:
      return {
        ...state,
        todos: [...state.todos, payload.todo],
      };

    case ActionType.Set:
      return {
        ...state,
        todos: payload.todos,
      };

    case ActionType.Update: {
      const todoToUpdate = state.todos.find(
        todo => todo.id === payload.id,
      );

      if (todoToUpdate && payload.content) {
        todoToUpdate.title = payload.content;
      }

      if (todoToUpdate && payload.completed) {
        todoToUpdate.completed = payload.completed;
      }

      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === todoToUpdate?.id) {
            return todoToUpdate;
          }

          return todo;
        }),
      };
    }

    case ActionType.Delete:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload.id),
      };

    case ActionType.ToggleError:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.errorType]: !state.errors[payload.errorType],
        },
      };

    case ActionType.ResetErrors:
      return {
        ...state,
        errors: {
          titleError: false,
          loadError: false,
          createError: false,
          deleteError: false,
          updateError: false,
        },
      };

    default:
      return state;
  }
};
