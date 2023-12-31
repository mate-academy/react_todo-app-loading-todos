import React, { createContext, useEffect, useState } from 'react';

import { Filter } from './types/Filter';
import { TodoError } from './types/TodoError';
import { TodoContextType } from './types/TodoContext';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

const USER_ID = 11877;

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  filteredTodos: [],
  setTodos: () => { },

  filter: Filter.All,
  setFilter: () => { },

  error: TodoError.Null,
  setError: () => { },
});

export const TodoProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState(TodoError.Null);

  useEffect(() => {
    client.get(`/todos?userId=${USER_ID}`)
      .then(data => setTodos(data as Todo[]))
      .catch(() => setError(TodoError.Load))
      .finally(() => setTimeout(() => {
        setError(TodoError.Null);
      }, 3000));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <TodoContext.Provider value={{
      todos,
      filteredTodos,
      setTodos,
      filter,
      setFilter,
      error,
      setError,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
