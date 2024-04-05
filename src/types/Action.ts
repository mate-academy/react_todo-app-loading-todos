import { Todo } from './Todo';

export type Action =
  | { type: 'SHOW_ALL' }
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'SHOW_ACTIVE' }
  | { type: 'LOAD_TODOS_FAILED' }
  | { type: 'SHOW_COMPLETED' };
