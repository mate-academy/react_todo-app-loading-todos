/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { ITodo, StatusType } from '../types';

const TodoStateContext = createContext({
  todos: [] as ITodo[],
  filter: StatusType.All,
  visibleTodos: [] as ITodo[],
  loading: false,
  error: '',
});

const SetTodoStateContext = createContext({
  setTodos: (_todos: ITodo[]) => { },
  setFilter: (_filter: StatusType) => { },
  setLoading: (_loading: boolean) => { },
  setError: (_error: string) => { },
});

export const useTodoContext = () => useContext(TodoStateContext);
export const useSetTodoContext = () => useContext(SetTodoStateContext);

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<StatusType>(StatusType.All);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const visibleTodos = useMemo<ITodo[]>(
    () => {
      switch (filter) {
        case StatusType.Active:
          return todos.filter(todo => !todo.completed);
        case StatusType.Completed:
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    }, [todos, filter],
  );

  const value = useMemo(() => ({
    todos,
    filter,
    visibleTodos,
    loading,
    error,
  }), [todos, filter, loading, error]);

  const appStatusValue = useMemo(() => ({
    setTodos,
    setFilter,
    setLoading,
    setError,
  }), []);

  return (
    <SetTodoStateContext.Provider value={appStatusValue}>
      <TodoStateContext.Provider value={value}>
        {children}
      </TodoStateContext.Provider>
    </SetTodoStateContext.Provider>
  );
};
