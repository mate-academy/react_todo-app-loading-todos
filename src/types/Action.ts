import { Filter } from './Filter';
import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'changeTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: Filter };
