import React, { createContext, useEffect, useReducer } from 'react';

import { useAutoClearError } from './ClearError';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { TodoErrors } from '../types/TodoErrors';
import { USER_ID, getTodos } from '../api/todos';

export type Action =
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; title: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'TOGGLE_ALL' }
  | { type: 'SET_FILTER'; filter: TodoStatus }
  | { type: 'EDIT_TODO'; id: number; title: string }
  | { type: 'SET_ERROR'; error: TodoErrors | null };

const todoReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.title.trim(),
            completed: false,
            userId: USER_ID,
          },
        ],
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(todo => !todo.completed) };

    case 'TOGGLE_ALL':
      const areAllCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllCompleted,
        })),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.filter };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, title: action.title.trim() }
            : todo,
        ),
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

const initialState: {
  todos: Todo[];
  filter: TodoStatus;
  error: TodoErrors | null;
} = {
  todos: [],
  filter: TodoStatus.All,
  error: null,
};

export const TodoContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useAutoClearError(dispatch, state.error);

  useEffect(() => {
    (async () => {
      try {
        const todos = await getTodos();

        dispatch({ type: 'LOAD_TODOS', payload: todos });
        dispatch({ type: 'SET_ERROR', error: null });
      } catch {
        dispatch({ type: 'SET_ERROR', error: TodoErrors.LOAD_TODOS });
      }
    })();
  }, [dispatch]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
