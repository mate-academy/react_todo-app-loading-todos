import { createContext, useState } from 'react';
import { TodoContext } from '../types/TodoContext';
import { Todo } from '../types/Todo';
import { Status } from '../enums/Status';
import { Errors } from '../enums/Errors';

export const TodosContext = createContext<TodoContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.All);
  const [error, setError] = useState(Errors.Default);

  const contextValue = {
    todos,
    setTodos,
    filter,
    setFilter,
    error,
    setError,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
