import React, { useReducer } from 'react';
import { Todo } from './types/Todo';

type Action =
  | { type: 'loadTodos'; todos: Todo[] }
  | { type: 'addTodo'; todo: Todo }
  | { type: 'markCompleted'; id: number }
  | { type: 'removeTodo'; id: number }
  | { type: 'changeTodosStatus'; filterValue: string }
  | { type: 'updateTodo'; id: number; title: string }
  | { type: 'toggleAll' }
  | { type: 'removeAll' }
  | { type: 'setErrorLoad'; payload: string };

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
    case 'addTodo':
      return {
        ...state,
        todos: [...todos, action.todo],
      };
    case 'markCompleted':
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      };
    case 'removeTodo':
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.id),
      };
    case 'removeAll':
      return {
        ...state,
        todos: todos.filter(todo => !todo.completed),
      };
    case 'changeTodosStatus':
      return {
        ...state,
        filterStatus: action.filterValue,
      };
    case 'updateTodo':
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, title: action.title } : t,
        ),
      };
    case 'toggleAll':
      return {
        ...state,
        todos: todos.map(todo => ({
          ...todo,
          completed: !todos.every(t => t.completed),
        })),
      };
    case 'setErrorLoad':
      return {
        ...state,
        errorLoad: action.payload,
      };
    case 'loadTodos':
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
