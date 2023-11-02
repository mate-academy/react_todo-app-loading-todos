import { Todo } from './Todo';

export const USER_ID = 11822;

export enum ActionState {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const initialValue: Context = {
  todos: [],
  setTodos: () => { },
  filterTodos: ActionState.ALL,
  setFilterTodos: () => { },
  visibleTodos: [],
  errorMessage: '',
  setErrorMessage: () => { },
  isVisible: false,
  setIsVisible: () => { },
};

export interface Context {
  todos: Todo[],
  setTodos: (val: any) => void,
  filterTodos: ActionState,
  setFilterTodos: (val: ActionState) => void,
  visibleTodos: Todo[],
  errorMessage: string,
  setErrorMessage: (val: string) => void,
  isVisible: boolean,
  setIsVisible: (val: boolean) => void,

}

export enum ErrorType {
  Loading = 'Title should not be empty',
  CreateTodo = 'Unable to add a todo',
  DeleteTodo = 'Unable to delete a todo',
  UpdateTodo = 'Unable to update a todo',
}
