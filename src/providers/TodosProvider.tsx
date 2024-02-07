import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../utils/constants';
import { getTodos } from '../api/todos';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [] as Todo[],
  setTodos: () => {},
});

type ErrorContextType = {
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
};

export const ErrorContext = React.createContext<ErrorContextType>({
  errorMessage: '',
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const value = useMemo(() => (
    {
      todos,
      setTodos,
    }
  ), [todos, setTodos]);

  const errorValue = useMemo(() => (
    {
      errorMessage,
      setErrorMessage,
    }
  ), [errorMessage, setErrorMessage]);

  return (
    <TodosContext.Provider value={value}>
      <ErrorContext.Provider value={errorValue}>
        {children}
      </ErrorContext.Provider>
    </TodosContext.Provider>
  );
};
