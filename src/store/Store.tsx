import React, { useEffect, useReducer } from 'react';
import { Status } from '../enums/Status';
import { getTodos } from '../api/todos';
import { FilterBy } from '../enums/FilterBy';
import { State } from '../types/State';
import { Action } from '../types/Action';

const initialState: State = {
  todos: [],
  sortBy: FilterBy.All,
  status: Status.SUCCESS,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SHOW_ALL':
      return {
        ...state,
        sortBy: FilterBy.All,
      };
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'LOAD_TODOS_FAILED':
      return {
        ...state,
        status: Status.LOAD_FAILED,
      };
    case 'SHOW_COMPLETED':
      return {
        ...state,
        sortBy: FilterBy.Completed,
      };
    case 'SHOW_ACTIVE':
      return {
        ...state,
        sortBy: FilterBy.Active,
      };
    default:
      return state;
  }
}

export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {},
);
export const StateContext = React.createContext<State>(initialState);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getTodos()
      .then(response => {
        return dispatch({ type: 'LOAD_TODOS', payload: response });
      })
      .catch(() => dispatch({ type: 'LOAD_TODOS_FAILED' }));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
