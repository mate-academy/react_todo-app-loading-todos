import { Dispatch, SetStateAction } from 'react';
import { Todo } from './Todo';
import { Status } from '../enums/Status';
import { Errors } from '../enums/Errors';

export type TodoContext = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filter: Status;
  setFilter: Dispatch<SetStateAction<Status>>;
  error: Errors;
  setError: Dispatch<SetStateAction<Errors>>;
  showError: (message: Errors) => void;
  notCompletedCount: number;
  completedCount: number;
};
