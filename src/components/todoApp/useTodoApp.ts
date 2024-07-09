import { useEffect, useMemo, useState } from 'react';

import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { useError } from '../../hooks/useError';
import { useLocation } from 'react-router-dom';
import { Filter } from '../../types/common';

export const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { error, onError, clearError } = useError();
  const { pathname } = useLocation();

  const filter = useMemo(() => pathname.replace('/', '') as Filter, [pathname]);

  const activeTodosQty = useMemo(() => {
    if (!todos) {
      return 0;
    }

    const activeTodos = todos.filter(({ completed }) => !completed);

    return activeTodos.length;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (!filter) {
      return todos;
    }

    return todos.filter(({ completed }) => {
      if (filter === Filter.completed) {
        return completed;
      }

      return !completed;
    });
  }, [todos, filter]);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        onError('Unable to load todos');
      });
  }, []);

  return { todos: filteredTodos, filter, error, activeTodosQty, clearError };
};
