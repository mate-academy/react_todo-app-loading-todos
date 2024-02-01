import React, { useState, useMemo, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { USER_ID } from '../variables/UserID';
import { FilterStatus } from '../types/Status';
import { filterTodoByStatus } from '../utils/FilteringByStatus';

interface ContextProps {
  todos: Todo[];
  status: FilterStatus;
  error: string
  setTodos: (v: Todo[] | ((n: Todo[]) => Todo[])) => void;
  filterTodoByStatus: (todoItems: Todo[], values: FilterStatus) => Todo[];
  setError: React.Dispatch<React.SetStateAction<string>>
  setStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
}

export const TodoContext = React.createContext<ContextProps>({
  todos: [],
  status: FilterStatus.All,
  error: '',
  setError: () => {},
  setTodos: () => {},
  setStatus: () => [],
  filterTodoByStatus: () => [],
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(FilterStatus.All);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((responce) => setTodos(responce))
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  const toggleAll = (completed: boolean) => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({
      ...todo,
      completed,
    })));
  };

  const value = useMemo(() => ({
    todos,
    status,
    error,
    setError,
    setStatus,
    setTodos,
    filterTodoByStatus,
    toggleAll,
  }), [todos, status, error]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
