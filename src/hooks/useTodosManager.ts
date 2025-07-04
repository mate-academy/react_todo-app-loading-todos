import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { ErrorMessages } from '../components/contants';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { getActiveTodosCount, getFilteredTodos } from '../utils/todoUtils';

export const useTodosManager = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.All);

  useEffect(() => {
    setLoading(false);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessages.LOAD_TODOS))
      .finally(() => setLoading(true));
  }, []);

  const todosCounter = getActiveTodosCount(todos);
  const preparedTodos = getFilteredTodos(todos, filter);

  return {
    todos,
    loading,
    errorMessage,
    setErrorMessage,
    filter,
    setFilter,
    todosCounter,
    preparedTodos,
  };
};
