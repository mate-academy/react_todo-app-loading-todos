import React, { useReducer } from 'react';

// TYPES
import { FilterField } from '../types/FilterField';
import { State, Action, ActionType } from '../types/ReducerTypes';

interface Props {
  children: React.ReactNode;
}

const initialState: State = {
  todos: [],
  filterField: FilterField.All,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };
    case ActionType.SetFilterField:
      return {
        ...state,
        filterField: action.payload,
      };
    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
export const DispatchContext = React.createContext((_action: Action) => { });

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
