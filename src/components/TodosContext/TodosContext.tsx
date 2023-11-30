import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';

import { getTodos } from '../../api/todos';

import { FilterTodos } from '../../types/FilterTodos';
import { Todo } from '../../types/Todo';
import { Error } from '../../types/Error';

const USER_ID = 11986;

type DefaultCotextValue = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  filterTodos: FilterTodos,
  setFilterTodos: (filter: FilterTodos) => void,
  visibleTodos: Todo[],
  errorMessage: Error,
  setErrorMessage: (err: Error) => void,
};

export const TodosContext = createContext<DefaultCotextValue>({
  todos: [],
  setTodos: () => {},
  filterTodos: FilterTodos.All,
  setFilterTodos: () => {},
  visibleTodos: [],
  errorMessage: Error.Default,
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<FilterTodos>(FilterTodos.All);

  const [errorMessage, setErrorMessage] = useState<Error>(Error.Default);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Error.CantLoad));
  }, []);

  const visibleTodos = filterTodos === FilterTodos.All
    ? todos
    : todos.filter(todo => {
      switch (filterTodos) {
        case FilterTodos.Active:
          return !todo.completed;

        case FilterTodos.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterTodos,
    setFilterTodos,
    visibleTodos,
    errorMessage,
    setErrorMessage,
  }), [
    todos, setTodos, filterTodos, visibleTodos, errorMessage, setErrorMessage,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
