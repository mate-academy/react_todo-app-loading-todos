import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type State = {
  updatedAt: Date;
  errorMessage: string | null;
  todos: Todo[];
  clearAll: boolean;
  filterBy: Filter;
  isSubmitting: boolean;
  isEscapeKeyup: boolean;
  todosStatus: Omit<Filter, 'all'>,
};

type Props = {
  children: React.ReactNode;
};

export type Action
  = { type: 'updatedAt' }
  | { type: 'setError', payload: string | null }
  | { type: 'clearAll', payload: boolean }
  | { type: 'saveTodos', payload: Todo[] }
  | { type: 'setFilter', payload: Filter }
  | { type: 'setIsSubmitting', payload: boolean }
  | { type: 'setEscape', payload: boolean }
  | { type: 'setTodosStatus', payload: Omit<Filter, 'all'> };

export const initialState: State = {
  updatedAt: new Date(),
  errorMessage: null,
  todos: [],
  clearAll: false,
  filterBy: Filter.all,
  isSubmitting: false,
  isEscapeKeyup: false,
  todosStatus: Filter.active,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'saveTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'updatedAt':
      return {
        ...state,
        updatedAt: new Date(),
      };

    case 'clearAll':
      return {
        ...state,
        clearAll: action.payload,
      };

    case 'setError':
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'setFilter':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'setIsSubmitting':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'setEscape':
      return {
        ...state,
        isEscapeKeyup: action.payload,
      };

    case 'setTodosStatus':
      return {
        ...state,
        todosStatus: action.payload,
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext((() => { }) as React.Dispatch<Action>);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
