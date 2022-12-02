import { Todo } from './Todo';
import { User } from './User';

export type ContextValue = {
    setFilter: (string: string) => void,
    loadTodos: () => void,
    filter: string,
    todosFromServer: Todo[],
    visibleTodos: Todo[],
    user: User | null,
    error: string
    setError: (string: string) => void
  };