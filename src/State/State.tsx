import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
// import { getCompletedTodo } from '../services/todos';

type State = {
  updatedAt: Date;
  errorMessage: string | null;
  todos: Todo[];
  clearAll: boolean;
};

type Props = {
  children: React.ReactNode;
};

type Action
  = { type: 'updatedAt' }
  | { type: 'setError', payload: string | null }
  | { type: 'clearAll', payload: boolean }
  | { type: 'saveTodos', payload: Todo[] };

export const initialState: State = {
  updatedAt: new Date(),
  errorMessage: null,
  todos: [],
  clearAll: false,
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
