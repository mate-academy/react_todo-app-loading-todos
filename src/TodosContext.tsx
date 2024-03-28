import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const TodosContext = createContext<{
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filterStatus: FilterStatus;
  setFilterStatus: Dispatch<SetStateAction<FilterStatus>>;
}>({
  todos: [],
  setTodos: () => {},
  filterStatus: FilterStatus.All,
  setFilterStatus: () => {},
});

export const useTodos = () => useContext(TodosContext);
