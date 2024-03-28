import React, { useReducer, useEffect } from 'react';
import { Action, reducer } from './Reducer';
import { Filter, State } from '../types/Types';
import { USER_ID, getTodos } from '../api/todos';

const initialState: State = {
  todos: [],
  filterBy: Filter.All,
  errorMessage: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'errorMessage', payload: '' });

    getTodos(USER_ID)
      .then(response => {
        const todos = response.map(todo => ({
          id: todo.id,
          userId: todo.userId,
          title: todo.title,
          completed: todo.completed,
        }));

        if (todos) {
          dispatch({ type: 'getTodos', payload: todos });
        }
      })
      .catch(() => {
        dispatch({ type: 'errorMessage', payload: 'Unable to load todos' });
      });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
