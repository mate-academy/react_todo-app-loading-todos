import { createContext } from 'react';

import { Todo } from '../types/Todo';
import { ErrorMessage } from '../types/ErrorMessage';
import { Filter } from '../types/Filter';

interface ContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  errorMessage: ErrorMessage;
  handleErrorChange: (value: ErrorMessage) => void;
  handleStatusEdit: () => void;
  handleActiveTodos: number;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const Context = createContext<ContextProps>({
  todos: [],
  filteredTodos: [],
  errorMessage: ErrorMessage.NULL,
  handleErrorChange: () => {},
  handleStatusEdit: () => {},
  handleActiveTodos: 0,
  filter: Filter.ALL,
  setFilter: () => {},
});
