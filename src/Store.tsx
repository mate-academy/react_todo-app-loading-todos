import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
type InitialCotext = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

const initialCotext = {
  todos: [],
  setTodos: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  filter: Filter.all,
  setFilter: () => {},
};

export const todosContext = React.createContext<InitialCotext>(initialCotext);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.all);
  const value: InitialCotext = {
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
    filter,
    setFilter,
  };

  return (
    <todosContext.Provider value={value}>{children}</todosContext.Provider>
  );
};
