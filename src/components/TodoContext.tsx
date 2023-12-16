/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { getTodos } from '../api/todos';

const USER_ID = 12048;

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => {},
  status: Status.All,
  /* eslint-disable-next-line */
  setStatus: (_status: Status) => {},
  isError: null as string | null,
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [isError, setIsError] = useState<string | null>(null);

  const showError = () => {
    setIsError('Unable to load todos');
    setTimeout(() => setIsError(null), 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => showError());
  }, []);

  const value = {
    todos,
    setTodos,
    status,
    setStatus,
    isError,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
