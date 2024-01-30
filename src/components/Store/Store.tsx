import React, { useEffect, useMemo, useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Todo } from '../../types/Todo';
import { CompletedAll } from '../../types/CompletedAll';
import { FilterParams } from '../../types/FilterParams';

const USERS_URL = '/todos?userId=';

export const USER_ID = 50;

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<Todo[]>;
  loading: boolean;
  isCompletedAll: CompletedAll;
  setIsCompletedAll: React.Dispatch<CompletedAll>;
  filter: FilterParams;
  setFilter: React.Dispatch<FilterParams>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  loading: false,
  isCompletedAll: null,
  setIsCompletedAll: () => {},
  filter: FilterParams.All,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCompletedAll, setIsCompletedAll] = useState<CompletedAll>(null);
  const [filter, setFilter] = useState<FilterParams>(FilterParams.All);

  function loadTodos() {
    setLoading(true);

    client.get<Todo[]>(USERS_URL + USER_ID)
      .then(setTodos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(loadTodos, []);

  const value = useMemo(() => ({
    todos,
    setTodos,
    loading,
    isCompletedAll,
    setIsCompletedAll,
    filter,
    setFilter,
  }), [todos, loading, isCompletedAll, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
