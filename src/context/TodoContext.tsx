import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

type SelectedFilter = 'all' | 'active' | 'completed';

type TodoContext = {
  todos: Todo[],
  error: string | null,
  handleCloseError: () => void;
  setNewTodoTitle: (newTodoTitle: string) => void;
  newTodoTitle: string;
  setError: (errorName: string) => void;
  handleSelectFilter: (filterType: SelectedFilter) => void;
  selectedFilter: SelectedFilter;
  handleError: (errorName: string) => void;
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  error: null,
  handleCloseError: () => { },
  setNewTodoTitle: () => '',
  newTodoTitle: '',
  setError: () => null,
  handleError: () => null,
  handleSelectFilter: () => {},
  selectedFilter: 'all',
});

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>('all');
  const USER_ID = 11526;

  const handleSelectFilter = (filterType: SelectedFilter) => {
    setSelectedFilter(filterType);
  };

  const handleError = (errorName: string) => {
    setError(errorName);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleCloseError = () => {
    setError(null);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'));
  }, []);

  return (
    <TodosContext.Provider value={{
      todos,
      error,
      setError,
      handleCloseError,
      setNewTodoTitle,
      newTodoTitle,
      handleSelectFilter,
      selectedFilter,
      handleError,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
