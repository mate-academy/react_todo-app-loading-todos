import { createContext } from 'react';

import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

interface ContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  errorMessage: string;
  handleErrorChange: (value: string) => void;
  handleStatusEdit: () => void;
  handleActiveTodos: number;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const Context = createContext<ContextProps>({
  todos: [],
  filteredTodos: [],
  errorMessage: '',
  handleErrorChange: () => {},
  handleStatusEdit: () => {},
  handleActiveTodos: 0,
  filter: Filter.ALL,
  setFilter: () => {},
});
