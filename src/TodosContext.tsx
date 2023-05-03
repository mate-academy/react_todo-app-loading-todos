import React, { ReactElement, useState } from 'react';
import { Todo } from './types/Todo';

type ContextProps = {
  todos:[] | Todo[],
  isMouseEnter: boolean,
  setTodos: (todosArray: Todo[]) => void,
  setIsMouseEnter: (condition: boolean) => void,
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  isMouseEnter: false,
  setTodos: () => {},
  setIsMouseEnter: () => {},
});

type ProviderProps = {
  children: ReactElement;
};

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<[] | Todo[]>([]);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const contextValue = {
    todos,
    setTodos,
    isMouseEnter,
    setIsMouseEnter,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
