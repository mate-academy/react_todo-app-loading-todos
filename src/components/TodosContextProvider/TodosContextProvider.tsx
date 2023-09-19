import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';

export const TodosContext = React.createContext({
  todos: [],
  setTodos: () => {},
} as TodosContextProps);

type TodosContextProps = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

type Props = {
  children: React.ReactNode,
};

export const USER_ID = 11492;

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  const initialValue = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider
      value={initialValue}
    >
      {children}
    </TodosContext.Provider>
  );
};
