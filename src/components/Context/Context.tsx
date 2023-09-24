import React, {
  ReactNode, createContext, useContext, useEffect, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';

const USER_ID = 11585;

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  errVisible: boolean;
  setErrVisible: React.Dispatch<React.SetStateAction<boolean>>;
  USER_ID: number;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;

}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React
  .FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [error, setError] = useState<string>('');
  const [errVisible, setErrVisible] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>('all');

  const showError = (message: string) => {
    setError(message);
    setErrVisible(true);

    setTimeout(() => {
      setError('');
      setErrVisible(false);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosData) => {
        setTodos(todosData);
      })
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  const contextValues = {
    todos,
    setTodos,
    error,
    setError,
    errVisible,
    setErrVisible,
    USER_ID,
    filter,
    setFilter,
  };

  return (
    <TodosContext.Provider value={contextValues}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
