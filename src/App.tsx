/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Loader } from './components/Loader';
import { TodoHeader } from './components/TodoHeader/TodoHeader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError('');
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let timeoutId: number;

    if (error?.length) {
      timeoutId = window.setTimeout(() => setError(null), 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo => {
        switch (filter) {
          case FilterType.Active:
            return !todo.completed;
          case FilterType.Completed:
            return todo.completed;
          default:
            return true;
        }
      }),
    [todos, filter],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        {isLoading && <Loader isLoading={isLoading} />}
        <TodoList todos={filteredTodos} />
        {todos.length > 0 && (
          <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>
      <ErrorNotification error={error} />
    </div>
  );
};
