import {
  ReactNode,
  createContext, useContext, useEffect, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { client } from './fetchClient';

interface TodosContextInterface {
  todos: Todo[];
  setTodos(todos: Todo[]): void;
  error: boolean;
  setError(err: boolean): void;
}

export const TodosContext = createContext<TodosContextInterface>(
  {
    todos: [],
    setTodos: () => { },
    error: false,
    setError: () => { },
  },
);

export const TodosConstextProvider = (
  { children }: {
    children: ReactNode
  },
) => {
  const [error, setError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const USER_ID = 10529;
  const url = `/todos?userId=${USER_ID}`;

  if (error) {
    setTimeout(() => setError(false), 3000);
  }

  useEffect(() => {
    client.get<Todo[]>(url).then(response => {
      return setTodos(response);
    }).catch(() => setError(true));
  }, []);

  return (
    <TodosContext.Provider value={{
      todos, setTodos, error, setError,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
