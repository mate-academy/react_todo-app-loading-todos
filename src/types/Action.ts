/* eslint-disable @typescript-eslint/indent */
import { Filter } from './Filter';
import { Todo } from './Todo';

export type Action =
  | { type: 'LOAD_TODOS_FROM_SERVER'; payload: Todo[] }
  | {
      type: 'UPDATE_ERROR_STATUS';
      payload: {
        type: string;
      };
    }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'SET_TARGET_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: Filter };
