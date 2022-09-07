import React, { createContext, Dispatch, useReducer } from 'react';

import { Action } from '../types/Action';
import { ActionTypes } from '../types/ActionTypes';
import { Error } from '../types/Error';
import { Loader } from '../types/Loader';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type State = {
  user: User | null;
  todos: Todo[];
  loaders: Loader[];
  error: Error;
};

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      if (!action.user) {
        return state;
      }

      return {
        ...state,
        user: action.user,
      };
    case ActionTypes.SET_TODOS:
      if (!action.todos) {
        return state;
      }

      return {
        ...state,
        todos: action.todos,
      };
    case ActionTypes.ADD_TODO:
      if (!action.todo) {
        return state;
      }

      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case ActionTypes.EDIT_TODO:
      if (!action.todo) {
        return state;
      }

      return {
        ...state,
        todos: state.todos
          .map(todo => (todo.id === action.todo?.id
            ? action.todo
            : todo
          )),
      };
    case ActionTypes.DELETE_TODO:
      if (!action.todo) {
        return state;
      }

      return {
        ...state,
        todos: state.todos
          .filter(todo => todo.id !== action.todo?.id),
      };
    case ActionTypes.SET_ERROR:
      if (!action.error) {
        return state;
      }

      return {
        ...state,
        error: {
          ...state.error,
          ...action.error,
        },
      };
    case ActionTypes.SET_LOADER: {
      if (!action.loader) {
        return state;
      }

      const newLoaders = [...state.loaders];

      const loaderIndex = newLoaders
        .findIndex(loader => loader.id === action.loader?.id);

      if (loaderIndex !== -1) {
        newLoaders[loaderIndex].on = action.loader?.on || false;
      } else {
        newLoaders.push(action.loader);
      }

      return {
        ...state,
        loaders: newLoaders,
      };
    }

    case ActionTypes.ON_ALL_LOADERS:
      return {
        ...state,
        loaders: state.todos.map(todo => ({
          id: todo.id,
          on: true,
        })),
      };
    case ActionTypes.OFF_ALL_LOADERS:
      return {
        ...state,
        loaders: state.todos.map(todo => ({
          id: todo.id,
          on: false,
        })),
      };
    default:
      return state;
  }
};

const intialState: State = {
  user: null,
  todos: [],
  loaders: [],
  error: {
    message: '',
    show: false,
  },
};

export const DispatchContext = createContext<Dispatch<Action>>(
  () => {},
);
export const StateContext = createContext(intialState);

type Props = {
  children: React.ReactNode;
};

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
