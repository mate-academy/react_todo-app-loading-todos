import React from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

type Props = {
  DEFAULT_DATA: Todo,
  todosAfterFiltering: Todo[],
  todosFilter: Status,
  setTodos: (todos: (prev: Todo[]) => Todo[]) => void,
  setTodosFilter: (filter: Status) => void,
};
export const TodosContext = React.createContext<Props>({
  DEFAULT_DATA: {
    userId: 11891,
    title: '',
    completed: false,
  },
  todosAfterFiltering: [],
  todosFilter: Status.ALL,
  setTodos: () => {},
  setTodosFilter: () => {},
});
