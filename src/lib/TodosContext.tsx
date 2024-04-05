import React, { useState } from 'react';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface State {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  query: Status;
  setQuery: (query: Status) => void;
}

export const StateContext = React.createContext<State>({
  todos: [],
  setTodos: () => {},
  query: Status.All,
  setQuery: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState(Status.All);

  const value = {
    todos,
    setTodos: setTodos,
    query,
    setQuery: setQuery,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
