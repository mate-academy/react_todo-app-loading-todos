import { useEffect, useMemo, useState } from 'react';

import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { useError } from '../../hooks/useError';
import { Filter } from '../../types/common';
import { extractFilter } from '../../utils/helpers';

export const useTodoApp = () => {
  const { hash } = window.location;
  const initialFilter = extractFilter(hash);

  const [todos, setTodos] = useState<Todo[]>([]);
  const { error, onError, clearError } = useError();
  const [filter, setFilter] = useState<Filter | null>(initialFilter);

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
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const onFilter = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const { href } = event.currentTarget;
    const selected = extractFilter(href);

    setFilter(selected);
  };

  return {
    todos: filteredTodos,
    filter,
    error,
    activeTodosQty,
    isFooterShown: !!todos.length,
    clearError,
    onFilter,
  };
};
