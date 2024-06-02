/* eslint-disable @typescript-eslint/indent */
import { FilterButtons } from './FilterType';
import { Todo } from './Todo';

export type Action =
  | { type: 'LOAD_FROM_SERVER'; payload: Todo[] }
  | {
      type: 'CHANGE_ERROR_STATUS';
      error: {
        type: string;
      };
    }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_ALL_COMPLETED' }
  | { type: 'ADD_TODO'; addTodo: Todo }
  | { type: 'FOCUS_TODO' }
  | { type: 'CHANGE_TODO'; changedTitle: string }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'SET_FILTER'; filterName: FilterButtons }
  | { type: 'CHANGE_TODO_STATUS'; payload: number }
  | { type: 'SET_EDITTED_TITLE'; id: number }
  | { type: 'TARGET_EDITTED_TITLE'; id: number; changedTitle: string }
  | { type: 'ESCAPE_CHANGED_TITLE'; id: number }
  | { type: 'CHECK_ALL_COMPLETED'; checked: boolean };
