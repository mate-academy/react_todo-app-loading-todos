import React, { createContext, Dispatch, useReducer } from 'react';

import { IAction } from '../types/Action.interface';
import { EAction } from '../types/Action.enum';
import { IError } from '../types/Error.interface';
import { ILoader } from '../types/Loader.interface';
import { ITodo } from '../types/Todo.interface';
import { IUser } from '../types/User.interface';
import { EFilterBy } from '../types/FilterBy.enum';
import { ITodoAnimation } from '../types/TodoAnimation.interface';

type State = {
  user: IUser | null;
  todos: ITodo[];
  loaders: ILoader[];
  animations: ITodoAnimation[];
  error: IError;
  filterBy: EFilterBy;
};

type Reducer = (state: State, action: IAction) => State;

const editTodoReducer: Reducer = (state, action) => {
  if (!action.todo) {
    return { ...state };
  }

  return {
    ...state,
    todos: state.todos
      .map(todo => (todo.id === action.todo?.id
        ? action.todo
        : todo
      )),
  };
};

const setLoaderReducer: Reducer = (state, action) => {
  if (!action.loader) {
    return { ...state };
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
};

const actionReducer: Reducer = (state, action) => {
  switch (action.type) {
    case EAction.SET_USER:
      if (!action.user) {
        return state;
      }

      return {
        ...state,
        user: action.user,
      };
    case EAction.SET_TODOS:
      if (!action.todos) {
        return state;
      }

      return {
        ...state,
        todos: action.todos,
      };
    case EAction.ADD_TODO:
      if (!action.todo) {
        return state;
      }

      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case EAction.EDIT_TODO:
      return editTodoReducer(state, action);
    case EAction.DELETE_TODO:
      if (!action.todo) {
        return state;
      }

      return {
        ...state,
        todos: state.todos
          .filter(todo => todo.id !== action.todo?.id),
      };
    case EAction.SET_FILTER:
      if (!action.filterBy) {
        return state;
      }

      return {
        ...state,
        filterBy: action.filterBy,
      };
    case EAction.SET_ANIMATIONS:
      if (!action.animations) {
        return state;
      }

      return {
        ...state,
        animations: action.animations,
      };
    case EAction.SET_ERROR:
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
    case EAction.SET_LOADER:
      return setLoaderReducer(state, action);
    case EAction.ON_ALL_LOADERS:
      return {
        ...state,
        loaders: state.todos.map(todo => ({
          id: todo.id,
          on: true,
        })),
      };
    case EAction.OFF_ALL_LOADERS:
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
  animations: [],
  error: {
    message: '',
    show: false,
  },
  filterBy: EFilterBy.ALL,
};

export const DispatchContext = createContext<Dispatch<IAction>>(
  () => {},
);
export const StateContext = createContext(intialState);

type Props = {
  children: React.ReactNode;
};

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, intialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
