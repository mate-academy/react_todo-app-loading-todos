import React, { createContext, useState } from 'react';
import { TodoContext } from '../../types/TodoContext';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';
import { Status } from '../../types/Status';

export const TodosContext = createContext({} as TodoContext);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMassage] = useState<Errors>(Errors.noErrors);
  const [filter, setFilter] = useState<Status>(Status.all);

  const value = {
    todos,
    setTodos,
    errorMessage,
    setErrorMassage,
    filter,
    setFilter,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
