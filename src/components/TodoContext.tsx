import { Todo } from '../types/Todo';
import { FilterButtons } from '../types/FilterType';
import { createContext, useEffect, useMemo, useReducer } from 'react';
import React from 'react';
import { type Error } from '../types/Error';
import { Action } from '../types/Action';
import { ErrorHandler } from './ErrorHandler';
import { AppContextType } from '../types/AppContextType';
import { getTodos } from '../api/todos';

const allErrors: Error[] = [
  {
    type: 'UnloadedTodoError',
    errorTitle: 'Unable to load todo',
    value: false,
  },
  {
    type: 'EmptyTitleError',
    errorTitle: 'Title should not be empty',
    value: false,
  },
  {
    type: 'NoAddingTodoError',
    errorTitle: 'Unable to add todo',
    value: false,
  },
  {
    type: 'NoDeletingTodoError',
    errorTitle: 'Unable to delete todo',
    value: false,
  },
  {
    type: 'NoUpdatingTodoError',
    errorTitle: 'Unable to update todo',
    value: false,
  },
];

export type ContextType = {
  todos: Todo[];
  newTitle: string;
  filterButton: FilterButtons;
  errors: Error[];
  focusedTodo: boolean;
  edittedTodo: string;
};

type Props = {
  children: React.ReactNode;
};

const ProvideContext: ContextType = {
  todos: [],
  newTitle: '',
  filterButton: FilterButtons.All,
  errors: allErrors,
  focusedTodo: true,
  edittedTodo: '',
};

const initialContext: AppContextType = {
  state: ProvideContext,
  dispatch: () => null,
};

const reducer = (state: ContextType, action: Action): ContextType => {
  switch (action.type) {
    case 'LOAD_FROM_SERVER':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.addTodo],
      };
    case 'CHANGE_TODO':
      return {
        ...state,
        newTitle: action.changedTitle,
      };
    case 'FOCUS_TODO':
      return {
        ...state,
        focusedTodo: !state.focusedTodo,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.id)],
        focusedTodo: !state.focusedTodo,
      };
    case 'CHANGE_ERROR_STATUS':
      return {
        ...state,
        errors: ErrorHandler(state.errors, action.error.type),
      };
    case 'CHANGE_TODO_STATUS':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.payload) {
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
    case 'SET_EDITTED_TITLE':
      return {
        ...state,
        todos: [
          ...state.todos
            .map(todo => {
              if (todo.id === action.id) {
                return {
                  ...todo,
                  editted: !todo.editted,
                  title: todo.title.trim(),
                };
              } else {
                return todo;
              }
            })
            .filter(todo => todo.title),
        ],
      };
    case 'ESCAPE_CHANGED_TITLE':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: state.edittedTodo,
              };
            } else {
              return todo;
            }
          }),
        ],
      };
    case 'TARGET_EDITTED_TITLE':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: action.changedTitle,
              };
            } else {
              return todo;
            }
          }),
        ],
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: state.errors.map(error => ({ ...error, value: false })),
      };
    case 'CLEAR_ALL_COMPLETED':
      return {
        ...state,
        todos: [...state.todos.filter(todo => !todo.completed)],
        focusedTodo: !state.focusedTodo,
      };
    case 'CHECK_ALL_COMPLETED':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            return {
              ...todo,
              completed: !action.checked,
            };
          }),
        ],
      };
    case 'SET_FILTER':
      return {
        ...state,
        filterButton: action.filterName,
      };
    default:
      return state;
  }
};

export const CreatedContext = createContext(initialContext);

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ProvideContext);

  const initialValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    getTodos()
      .then(serverTodo =>
        dispatch({
          type: 'LOAD_FROM_SERVER',
          payload: serverTodo,
        }),
      )
      .catch(() =>
        dispatch({
          type: 'CHANGE_ERROR_STATUS',
          error: { type: 'UnloadedTodoError' },
        }),
      );
  }, []);

  return (
    <CreatedContext.Provider value={initialValue}>
      {children}
    </CreatedContext.Provider>
  );
};
