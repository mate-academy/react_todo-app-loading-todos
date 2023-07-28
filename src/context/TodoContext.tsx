import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

export const USER_ID = 11120;

export enum StateOption {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export enum ErrorOption {
  FetchErr = 'Unable to upload todos',
  AddError = 'Unable to add a todo',
  DeleteError = 'Unable to delete a todo',
  UpdateError = 'Unable to update a todo',
}

type Props = {
  children: ReactNode;
};

interface ContextValues {
  todos: Todo[],
  visibleTodos: Todo[],
  activeTodosAmount: number,
  error: string | null,
  filter: string,
  setError: React.Dispatch<React.SetStateAction<ErrorOption | null>>,
  setFilter: React.Dispatch<React.SetStateAction<StateOption>>,
}

export const TodoContext = React.createContext({} as ContextValues);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<StateOption>(StateOption.all);
  const [error, setError] = useState<ErrorOption | null>(null);

  useEffect(() => {
    setError(null);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorOption.FetchErr));
  }, []);

  const filterTodos = (
    array: Todo[], selectedFilterOption: StateOption,
  ) => {
    const filteredArray = array.filter(todo => {
      switch (selectedFilterOption) {
        case StateOption.active:
          return !todo.completed;
        case StateOption.completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    return filteredArray;
  };

  const visibleTodos: Todo[] = useMemo(() => filterTodos(todos, filter),
    [todos, filter]);

  const activeTodosAmount = todos.filter(todo => !todo.completed).length;

  const contextValues: ContextValues = useMemo(() => ({
    todos,
    visibleTodos,
    activeTodosAmount,
    error,
    setError,
    filter,
    setFilter,
  }), [
    visibleTodos,
    activeTodosAmount,
    error,
    filter,
  ]);

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};
