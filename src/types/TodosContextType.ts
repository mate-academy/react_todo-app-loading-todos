import { Dispatch, SetStateAction } from 'react';
import { Filter } from './Filter';
import { Todo } from './Todo';

export interface TodosContextType {
  todos: Todo[];
  filter: Filter;
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  query: string;
  setQuery: (query: string) => void;
  error: { message: string } | null;
  setError: Dispatch<SetStateAction<{ message: string } | null>>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
