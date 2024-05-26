import { FilterField } from './FilterField';
import { Todo } from './Todo';

export enum ActionType {
  SetTodos = 'setTodos',
  SetFilterField = 'setFilterField',
}

export interface State {
  todos: Todo[];
  filterField: FilterField;
}

export type Action =
  | { type: ActionType.SetTodos; payload: Todo[] }
  | { type: ActionType.SetFilterField; payload: FilterField };
