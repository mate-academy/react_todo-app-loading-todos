import React, { useEffect, useReducer } from 'react';
import { State } from '../types/State';
import { Action, reducer } from './reducer';
import { Filter } from '../types/Filter';
import { USER_ID, getTodos } from '../api/todos';

const initialState: State = {
  todos: [],
  filterBy: Filter.all,
  errorMessage: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<React.Dispatch<Action>>(() => { });

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userId = USER_ID;

  useEffect(() => {
    dispatch({ type: 'errorMessage', payload: '' });

    getTodos(userId)
      .then(todosFromServer => {
        const todos = todosFromServer.map(todo => ({
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
  }, [userId]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
