import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

type TodoContext = {
  todos: Todo[],
  error: string | null,
  handleCloseError: () => void;
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  error: null,
  handleCloseError: () => { },
});

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const USER_ID = 11526;

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
      handleCloseError,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
