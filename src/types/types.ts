import { Todo } from './Todo';

export interface HeaderProps {
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
  setIsError: (arg: IsActiveError) => void;
}

export interface MainProps {
  filteredTodos: Todo[];
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
}

export interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
}

export interface ErrorsProps {
  isError: IsActiveError;
  setIsError: (arg: IsActiveError) => void;
}

export interface FooterProps {
  todos: Todo[];
  link: IsActiveLink;
  setLink: (arg: IsActiveLink) => void;
}

export enum IsActiveLink {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum IsActiveError {
  NoError = 'no',
  Load = 'load',
  Empty = 'empty',
  Add = 'add',
  Delete = 'delete',
  Update = 'update',
}
