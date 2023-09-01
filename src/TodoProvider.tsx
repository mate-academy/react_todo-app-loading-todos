import React, { useMemo, useState } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type ContextProps = {
  todos: Todo[],
  setTodos: (newTodos: Todo[]) => void,
  filterType: Filter,
  setFilterType: (newType: Filter) => void,
  errorMessage: string,
  setErrorMessage: (error: string) => void,
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  filterType: Filter.ALL,
  setFilterType: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterType,
    setFilterType,
    errorMessage,
    setErrorMessage,
  }), [todos, filterType, errorMessage]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
