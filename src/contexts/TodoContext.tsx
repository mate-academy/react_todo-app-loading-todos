import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { TodoInterface } from '../types/Todo';
import { getTodos } from '../api/todos';

interface TodoContextInterface {
  todosFromServer: TodoInterface[];
  refreshTodos: Dispatch<SetStateAction<TodoInterface[]>>;
  putErrorWarning: Dispatch<SetStateAction<string>>;
  currentErrorMessage: string;
}

export const TodoContext = createContext<TodoContextInterface | undefined>(
  undefined,
);

export const TodoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todosFromServer, refreshTodos] = useState<TodoInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(res => {
        const todoWithFrontEndProp = res.map(e => {
          return { ...e, ['isAwaitServer']: false };
        });

        refreshTodos(todoWithFrontEndProp);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todosFromServer: todosFromServer,
        refreshTodos: refreshTodos,
        putErrorWarning: setErrorMessage,
        currentErrorMessage: errorMessage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
