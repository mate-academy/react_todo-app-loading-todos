import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Select } from '../types/Select';
import { ActionTypes } from '../types/ActionTypes';

type Props = {
  children: React.ReactNode;
};

type Action = { type: ActionTypes.SetValuesByKeys; payload: Partial<State> };

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
    case ActionTypes.SetValuesByKeys:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (state.errorMessage) {
      timeout = setTimeout(() => {
        dispatch({
          type: ActionTypes.SetValuesByKeys,
          payload: {
            errorMessage: '',
          },
        });
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [state.errorMessage]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
