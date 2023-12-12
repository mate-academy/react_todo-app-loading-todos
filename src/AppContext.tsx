import React, { createContext, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

interface AppContextType {
  todos: Todo[],
  status: Status
  setTodos: (arg: Todo[]) => void,
  setStatus: (arg: Status) => void,
}

export const AppContext = createContext<AppContextType>({
  todos: [],
  status: Status.all,
  setTodos: () => {},
  setStatus: () => {},
});

type Props = {
  children: React.ReactNode
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.all);

  const value = useMemo(() => ({
    todos,
    status,
    setTodos,
    setStatus,
  }), [todos, status]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
