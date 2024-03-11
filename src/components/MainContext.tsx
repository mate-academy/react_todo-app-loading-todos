import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Select } from '../types/Select';
import { ActionTypes } from '../types/ActionTypes';

type Props = {
  children: React.ReactNode;
};

type Action =
  | { type: ActionTypes.SetTodos; payload: Todo[] }
  | { type: ActionTypes.SetTypeOfFilter; payload: Select }
  | { type: ActionTypes.SetErrorMessage; payload: ErrorMessage };

type DispatchType = (action: Action) => void;

type ErrorMessage =
  | ''
  | 'Unable to load todos'
  | 'Title should not be empty'
  | 'Unable to add a todo'
  | 'Unable to delete a todo'
  | 'Unable to update a todo';

interface State {
  todos: Todo[];
  selectPage: Select;
  errorMessage: ErrorMessage | '';
}

export interface StateProvider extends State {
  setSelectPage: React.Dispatch<React.SetStateAction<Select>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<'' | ErrorMessage>>;
}

const initialValues: State = {
  todos: [],
  errorMessage: '',
  selectPage: Select.ALL,
};

export const StateContext = React.createContext(initialValues);
export const DispatchContext = React.createContext<DispatchType>(() => {});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };

    case ActionTypes.SetTypeOfFilter:
      return {
        ...state,
        selectPage: action.payload,
      };

    case ActionTypes.SetErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
