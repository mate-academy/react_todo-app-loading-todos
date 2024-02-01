import {
  createContext,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export type TodoContextType = {
  todos: Todo[],
  filteredTodos: Todo[],
  errorMessage: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setFilters: React.Dispatch<React.SetStateAction<{ status: TodoStatus }>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  filteredTodos: [],
  errorMessage: '',
  setTodos: () => {},
  setFilters: () => {},
  setErrorMessage: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filters, setFilters]
    = useState<{ status: TodoStatus }>({ status: 'all' });

  const value: TodoContextType = useMemo(() => ({
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
    setFilters,
    filteredTodos: todos.filter(todo => {
      switch (filters.status) {
        case 'uncompleted':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    }),
  }), [todos, errorMessage, filters]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
