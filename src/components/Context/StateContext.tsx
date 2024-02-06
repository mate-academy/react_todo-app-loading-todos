import React, { useEffect, useReducer } from 'react';
import { getTodos } from '../../api/todos';

import { Filter } from '../../types/Filter';
import { State } from '../../types/State';
import { Action, reducer } from './reducer';

export const USER_ID = 79;

const initialState: State = {
  todos: [],
  filterType: Filter.ALL,
  notification: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React
  .createContext<React.Dispatch<Action>>(() => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'showNotification',
      notification: '',
    });

    getTodos(USER_ID)
      .then(todosFromServer => dispatch({
        type: 'getTodos',
        todos: todosFromServer,
      }))
      .catch(() => dispatch({
        type: 'showNotification',
        notification: 'Unable to load todos',
      }));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
