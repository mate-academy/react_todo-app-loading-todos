import { useEffect, useMemo, useState } from 'react';

import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { useError } from '../../hooks/useError';
import { Filter } from '../../types/common';

export const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { error, onError, clearError } = useError();
  const [filter, setFilter] = useState<Filter | null>(null);

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

  const onFilter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const value = (event.target as HTMLAnchorElement).getAttribute(
      'data-href',
    ) as Filter | null;

    setFilter(value);
  };

  return {
    todos: filteredTodos,
    filter,
    error,
    activeTodosQty,
    clearError,
    onFilter,
  };
};
