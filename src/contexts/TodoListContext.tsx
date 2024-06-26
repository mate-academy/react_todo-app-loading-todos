import * as React from 'react';
import { Todo } from '../types/Todo';
import { Filters } from '../types/Filters';
//
type TodoListContextType = {
  todos: Todo[];
  errorMessage: string | null;
  currentFilter: string;
  setCurrentFilter: (status: string) => void;
};

export const TodoListContext = React.createContext<TodoListContextType>({
  todos: [],
  errorMessage: null,
  currentFilter: Filters.All,
  setCurrentFilter: () => {},
});
