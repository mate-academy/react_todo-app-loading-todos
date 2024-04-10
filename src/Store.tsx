import React, { useReducer } from 'react';
import { Todo } from './types/Todo';

export enum Actions {
  markCompleted = 'markCompleted',
  changeTodosStatus = 'changeTodosStatus',
  setErrorLoad = 'setErrorLoad',
  loadTodos = 'loadTodos',
}

type Action =
  | { type: Actions.loadTodos; todos: Todo[] }
  | { type: Actions.markCompleted; id: number }
  | { type: Actions.changeTodosStatus; filterValue: string }
  | { type: Actions.setErrorLoad; payload: string };

export enum FilterValue {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

interface State {
  todos: Todo[];
  filterStatus: string;
  errorLoad: string;
}

function reducer(state: State, action: Action) {
  const { todos } = state;

  switch (action.type) {
    case Actions.markCompleted:
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      };
    case Actions.changeTodosStatus:
      return {
        ...state,
        filterStatus: action.filterValue,
      };
    case Actions.setErrorLoad:
      return {
        ...state,
        errorLoad: action.payload,
      };
    case Actions.loadTodos:
      return { ...state, todos: action.todos };
    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filterStatus: FilterValue.All,
  errorLoad: '',
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterStatus, errorLoad }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ todos, filterStatus, errorLoad }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
