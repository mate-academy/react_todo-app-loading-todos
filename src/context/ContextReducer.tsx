/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, getTodosActive, getTodosCompleted } from '../api/todos';

export type Action =
  | { type: 'setTodoApi'; payload: Todo[] }
  | { type: 'setError'; error: string };

interface State {
  todoApi: Todo[];
  select: string;
  selectedAll: boolean;
  error: string;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setTodoApi':
      return {
        ...state,
        todoApi: action.payload,
      };

    case 'setError':
      return {
        ...state,
        error: action.error,
      };
  }
};

const initialState: State = {
  todoApi: [],
  select: 'All',
  selectedAll: false,
  error: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteAfterShowError = () => {
    setTimeout(() => dispatch({ type: 'setError', error: '' }), 3000);
  };

  useEffect(() => {
    let mounted = true;

    switch (state.select) {
      case 'All':
        getTodos()
          .then(todos => {
            if (mounted) {
              dispatch({ type: 'setTodoApi', payload: todos });
            }
          })
          .catch(() => {
            if (mounted) {
              dispatch({ type: 'setTodoApi', payload: [] });
              dispatch({ type: 'setError', error: 'Unable to load todos' });
              deleteAfterShowError();
            }
          });
        break;

      case 'Active':
        getTodosActive()
          .then(todos => {
            if (mounted) {
              dispatch({ type: 'setTodoApi', payload: todos });
            }
          })
          .catch(() => {
            if (mounted) {
              dispatch({ type: 'setTodoApi', payload: [] });
              dispatch({ type: 'setError', error: 'Unable to load todos' });
              deleteAfterShowError();
            }
          });
        break;

      case 'Completed':
        getTodosCompleted()
          .then(todos => {
            if (mounted) {
              dispatch({ type: 'setTodoApi', payload: todos });
            }
          })
          .catch(() => {
            if (mounted) {
              dispatch({ type: 'setTodoApi', payload: [] });
              dispatch({ type: 'setError', error: 'Unable to load todos' });
              deleteAfterShowError();
            }
          });
        break;

      default:
        break;
    }

    return () => {
      mounted = false;
    };
  }, [state.select]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
