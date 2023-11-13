import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

interface DefaultValue {
  todoLoadingError: boolean;
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  visibleTodos: Todo[];
  setVisibleTodos: (value: Todo[]) => void;
}

const defaultValue: DefaultValue = {
  todoLoadingError: false,
  todos: [],
  setTodos: () => {},
  visibleTodos: [],
  setVisibleTodos: () => {},
};

export const TodoContext = React.createContext(defaultValue);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [todoLoadingError, setTodoLoadingError] = useState(false);

  useEffect(() => {
    client.get<Todo[]>('/todos?userId=11819')
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      })
      .catch(setTodoLoadingError);
  }, []);

  const value = {
    todoLoadingError,
    todos,
    setTodos,
    visibleTodos,
    setVisibleTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
