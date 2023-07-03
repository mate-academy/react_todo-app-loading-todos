/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { Todo } from './types/Todo';
import { TodoStatusFilter } from './types/TodoStatusFilter';
import { getFilteredTodos } from './helpers';
import { getTodos } from './api/todos';

import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';

const USER_ID = 10884;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState(TodoStatusFilter.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch((errorFromServer) => {
        setError(errorFromServer.message);
      });
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, statusFilter);
  }, [statusFilter, todos]);

  const selectStatusFilter = useCallback((status: TodoStatusFilter) => {
    setStatusFilter(status);
  }, []);

  const closeError = useCallback(() => {
    setError(null);
  }, []);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const isVisibleClearCompleted = completedTodosCount > 0;
  const isVisibleTodoList = todos.length > 0;
  const isVisibleToggleAllActive = completedTodosCount === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader isVisibleToggleAllActive={isVisibleToggleAllActive} />

        {isVisibleTodoList && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter
              status={statusFilter}
              onSelectStatusFilter={selectStatusFilter}
              uncompletedTodosCount={activeTodosCount}
              isVisibleClearCompleted={isVisibleClearCompleted}
            />
          </>
        )}
      </div>

      <TodoError error={error} onCloseError={closeError} />
    </div>
  );
};
