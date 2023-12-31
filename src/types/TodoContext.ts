import { Todo } from './Todo';
import { Filter } from './Filter';
import { TodoError } from './TodoError';

export type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  setTodos: (newTodos: Todo[]) => void;

  filter: Filter;
  setFilter: (newfilter: Filter) => void;

  error: TodoError;
  setError: (newError: TodoError) => void;
};
