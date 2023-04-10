import React, { FC, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Props, Value } from './AppTodoContext.types';
import { ErrorType } from '../Error/Error.types';

export const AppTodoContext = React.createContext<Value>({
  todos: [],
  setTodos: () => {},
  todosCount: 0,
  setTodosCount: () => {},
  errorMessage: 'No error' as ErrorType,
  setErrorMessage: () => {},
});

export const AppTodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosCount, setTodosCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.NoError,
  );

  const contextValue = useMemo(() => {
    return {
      todos,
      setTodos,
      todosCount,
      setTodosCount,
      errorMessage,
      setErrorMessage,
    };
  }, [todos, errorMessage]);

  return (
    <AppTodoContext.Provider value={contextValue}>
      {children}
    </AppTodoContext.Provider>
  );
};
