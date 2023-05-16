import React, { FC, PropsWithChildren, useState } from 'react';
import { Todo, ErrorMessage, Status } from '../../types';

interface TodosContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  error: ErrorMessage | null;
  setError: (error: ErrorMessage | null) => void;
  filterStatus: Status;
  setFilterStatus: (status: Status) => void;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  error: null,
  setError: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
});

export const TodosContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const contextValue = {
    todos,
    setTodos,
    error,
    setError,
    filterStatus,
    setFilterStatus,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
