import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';

interface State {
  todos: Todo[];
  newTodo: string;
  focusNewTodo: boolean;
  useTodos: 'All' | 'Active' | 'Completed';
  changerTodo: string;
  changerId: number;
  errorsInTodo: string;
  idTodoSubmitting: number;
}

export type Action =
  | { type: 'setAllTodos'; todos: Todo[] }
  | { type: 'add' }
  | { type: 'changeTodo'; text: string }
  | { type: 'remove'; id: number }
  | { type: 'checked'; id: number }
  | { type: 'setChanged'; id: number }
  | { type: 'changed'; id: number; text: string }
  | { type: 'setAllCompleate'; use: boolean }
  | { type: 'setUseTodos'; name: 'All' | 'Active' | 'Completed' }
  | { type: 'clearAll' }
  | { type: 'setTodos'; tod: Todo[] }
  | { type: 'setFocudNewTodo' }
  | { type: 'escapeChangedText'; id: number }
  | { type: 'setError'; error: string }
  | { type: 'setIdTodoSelection'; id: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setAllTodos':
      return {
        ...state,
        todos: action.todos,
      };

    case 'changeTodo':
      return {
        ...state,
        newTodo: action.text,
      };

    case 'add':
      const todoId = +new Date();

      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId,
            title: state.newTodo.trim(),
            completed: false,
            userId: USER_ID,
          },
        ],
        idTodoSubmitting: todoId,
      };

    case 'remove':
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => {
            return action.id !== 0
              ? todo.id !== action.id
              : todo.id !== state.idTodoSubmitting;
          }),
        ],
        focusNewTodo: !state.focusNewTodo,
      };

    case 'checked':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setChanged':
      return {
        ...state,
        changerId: action.id,
        changerTodo:
          state.todos.find(todo => todo.id === action.id)?.title || '',
      };

    case 'changed':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: action.text,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setAllCompleate':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            return {
              ...todo,
              completed: !action.use,
            };
          }),
        ],
      };

    case 'setUseTodos':
      return {
        ...state,
        useTodos: action.name,
      };

    case 'clearAll':
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => {
            return !todo.completed;
          }),
        ],
        focusNewTodo: !state.focusNewTodo,
      };

    case 'setTodos':
      return {
        ...state,
        todos: [...action.tod],
      };

    case 'setFocudNewTodo':
      return {
        ...state,
        focusNewTodo: !state.focusNewTodo,
      };

    case 'escapeChangedText':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: state.changerTodo,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setError':
      return {
        ...state,
        errorsInTodo: action.error,
      };

    case 'setIdTodoSelection':
      return {
        ...state,
        idTodoSubmitting: action.id,
      };

    default:
      return state;
  }
};

const initialState: State = {
  todos: [],
  newTodo: '',
  useTodos: 'All',
  focusNewTodo: true,
  changerTodo: '',
  changerId: 0,
  errorsInTodo: '',
  idTodoSubmitting: 0,
};

const defaultDispatch: React.Dispatch<Action> = () => {};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};

export const GlobalstateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
