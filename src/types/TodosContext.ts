import { Todo } from './Todo';

export type TodoContext = {
  todos: Todo[]
  setTodos: (v: Todo[] | ((n: Todo[]) => Todo[])) => void
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  filterBy: string;
  setFilterBy: (filterBy: string) => void
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
};
