import { IState } from '../types/State.interface';
import { IError } from '../types/Error.interface';
import { ILoader } from '../types/Loader.interface';
import { ITodo } from '../types/Todo.interface';
import { IUser } from '../types/User.interface';
import { EFilterBy } from '../types/FilterBy.enum';
import { ITodoAnimation } from '../types/TodoAnimation.interface';
import { RequireAtLeastOne } from '../types/helpers';

export const setUserReducer = (state: IState, newUser: IUser) => {
  return {
    ...state,
    user: newUser,
  };
};

export const setTodosReducer = (state: IState, newTodos: ITodo[]) => {
  return {
    ...state,
    todos: newTodos,
  };
};

export const addTodoReducer = (state: IState, newTodo: ITodo) => {
  return {
    ...state,
    todos: [...state.todos, newTodo],
  };
};

export const editTodoReducer = (state: IState, newTodo: ITodo) => {
  return {
    ...state,
    todos: state.todos
      .map(todo => (todo.id === newTodo.id
        ? newTodo
        : todo
      )),
  };
};

export const deleteTodoReducer = (state: IState, deleteId: number) => {
  return {
    ...state,
    todos: state.todos
      .filter(todo => todo.id !== deleteId),
  };
};

export const setFilterReducer = (state: IState, filterBy: EFilterBy) => {
  return {
    ...state,
    filterBy,
  };
};

export const setAnimationsReducer = (
  state: IState,
  animations: ITodoAnimation[],
) => {
  return {
    ...state,
    animations,
  };
};

export const setErrorReducer = (
  state: IState,
  error: RequireAtLeastOne<IError, 'message' | 'show'>,
) => {
  return {
    ...state,
    error: {
      ...state.error,
      ...error,
    },
  };
};

export const setLoaderReducer = (state: IState, newLoader: ILoader) => {
  const newLoaders = [...state.loaders];

  const loaderIndex = newLoaders
    .findIndex(loader => loader.id === newLoader.id);

  if (loaderIndex !== -1) {
    newLoaders[loaderIndex].on = newLoader.on;
  } else {
    newLoaders.push(newLoader);
  }

  return {
    ...state,
    loaders: newLoaders,
  };
};

export const onAllLoadersReducer = (state: IState) => {
  return {
    ...state,
    loaders: state.todos.map(todo => ({
      id: todo.id,
      on: true,
    })),
  };
};

export const offAllLoadersReducer = (state: IState) => {
  return {
    ...state,
    loaders: state.todos.map(todo => ({
      id: todo.id,
      on: false,
    })),
  };
};
