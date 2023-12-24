import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Statuses } from '../types/Statuses';
import { getTodos } from '../api/todos';
import { USER_ID } from '../constants/USER_ID';
import { Errors } from '../types/Errors';

type PropsTodosContext = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Statuses;
  setFilter: (value: Statuses) => void;
  errorMessage: Errors,
  setErrorMessage: (value: Errors) => void,
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = createContext<PropsTodosContext>({
  todos: [],
  setTodos: () => { },
  filter: Statuses.All,
  setFilter: () => {},
  errorMessage: Errors.NoErrors,
  setErrorMessage: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Statuses>(Statuses.All);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.NoErrors);

  useEffect(() => {
    getTodos(+USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.LoadingError));
  }, []);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filter,
      setFilter,
      errorMessage,
      setErrorMessage,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
