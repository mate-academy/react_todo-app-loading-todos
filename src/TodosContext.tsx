import React, {
  createContext, ReactNode, useMemo, useState,
} from 'react';
import { ErrorMessage } from './types/errorMessage';
import { Todo } from './types/Todo';

type Props = {
  children: ReactNode,
};

const deafultValue = {
  todos: [],
  setTodos: () => { },
  errorMessage: ErrorMessage.NO,
  setErrorMessage: () => { },
};

interface ITodosContext {
  todos: Todo[],
  setTodos: (t: Todo[]) => void,
  errorMessage: ErrorMessage,
  setErrorMessage: (e: ErrorMessage) => void,
}

export const TodosContext = createContext<ITodosContext>(deafultValue);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.NO);

  const value = useMemo(() => ({
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
  }), [todos, errorMessage]);

  return (
    <>
      <TodosContext.Provider value={value}>
        {children}
      </TodosContext.Provider>
    </>
  );
};
