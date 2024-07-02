import { FilterStatus } from './FilterStatus';
import { Todo } from './Todo';

export enum ActionType {
  SetTodos = 'setTodos',
  SetFilter = 'setFilter',
  SetErrorMessage = 'setErrorMessage',
}

export type Action =
  | { type: ActionType.SetTodos; payload: Todo[] }
  | { type: ActionType.SetFilter; payload: FilterStatus }
  | { type: ActionType.SetErrorMessage; payload: string };
