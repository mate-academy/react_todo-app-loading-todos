import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

export const USER_ID = 11552;

export enum FilterOption {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export enum ErrorOption {
  FetchErr = 'Unable to load todos',
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
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setFilter: React.Dispatch<React.SetStateAction<FilterOption>>,
}

export const TodoContext = React.createContext({} as ContextValues);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.all);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('actual');
      });
  }, []);

  const filterTodos = (
    array: Todo[], selectedFilterOption: FilterOption,
  ) => {
    return array.filter(todo => {
      switch (selectedFilterOption) {
        case FilterOption.active:
          return !todo.completed;
        case FilterOption.completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  };

  const visibleTodos: Todo[] = useMemo(() => filterTodos(todos, filter),
    [todos, filter]);

  const activeTodosAmount = todos.filter((todo) => !todo.completed).length;

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
