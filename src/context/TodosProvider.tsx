import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';

import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  filterType: string;
  messageError: string;
  query: string
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitSent: (event: React.FormEvent<HTMLFormElement>) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const USER_ID = 12060;

const ERROR_MESSAGES = [
  'Unable to load todos',
  'Title should not be empty',
  'Unable to add a todo',
  'Unable to delete a todo',
  'Unable to update a todo',
];

export const TodoProvider: React.FC<{ children: ReactNode }> = (
  { children },
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [messageError, setMessageError] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(allTodos => {
        setTodos(allTodos);
      })
      .catch(() => {
        setMessageError(ERROR_MESSAGES[0]);
      });
  }, [setTodos, setMessageError]);

  useEffect(() => {
    switch (filterType) {
      case 'All':
        setFilteredTodos(todos);
        break;
      case 'Active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'Completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        break;
    }
  }, [filterType, todos, setFilteredTodos]);

  const handleSubmitSent = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setMessageError('');
      if (!query) {
        setMessageError(ERROR_MESSAGES[1]);
      }

      setQuery('');
    },
    [setQuery, setMessageError, query],
  );

  if (messageError) {
    setTimeout(() => {
      setMessageError('');
    }, 3000);
  }

  const memoizedValue = useMemo(
    () => ({
      todos,
      filteredTodos,
      filterType,
      messageError,
      query,
      setTodos,
      setFilteredTodos,
      setFilterType,
      setMessageError,
      setQuery,
      handleSubmitSent,
    }),
    [todos, filteredTodos, filterType, messageError, query, handleSubmitSent],
  );

  return (
    <TodoContext.Provider value={memoizedValue}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
