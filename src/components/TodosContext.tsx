import React from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodosFilter';
import { TodoFromServer } from '../types/TodoFromServer';

type Props = {
  DEFAULT_DATA: TodoFromServer,
  todosAfterFiltering: Todo[],
  todosFilter: TodosFilter,
  setTodos: (todos: (prev: Todo[]) => Todo[]) => void,
  setTodosFilter: (filter: TodosFilter) => void,
};
export const TodosContext = React.createContext<Props>({
  DEFAULT_DATA: {
    userId: 11891,
    title: '',
    completed: false,
  },
  todosAfterFiltering: [],
  todosFilter: TodosFilter.all,
  setTodos: () => {},
  setTodosFilter: () => {},
});
