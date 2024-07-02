import React, { createContext, useReducer } from 'react';

import { State } from '../types/State';
import { FilterStatus } from '../types/FilterStatus';
import { Action, ActionType } from '../types/Actions';

const initialState: State = {
  todos: [],
  filterStatus: FilterStatus.All,
  errorMessage: '',
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SetTodos:
      return { ...state, todos: action.payload };
    case ActionType.SetFilter:
      return { ...state, filterStatus: action.payload };
    case ActionType.SetErrorMessage:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

type GlobalStateProviderProps = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
