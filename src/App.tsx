/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoType } from './types/Todo';
import { ErrorMessage } from './types/AppError';
import cn from 'classnames';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/Filter';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.Default);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    let timeoutId: number | undefined;

    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setError(ErrorMessage.LoadTodos);

        timeoutId = window.setTimeout(() => {
          setError(ErrorMessage.Default);
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: FilterType,
  ) => {
    event.preventDefault();
    setFilter(newFilter);
  };

  const hasTodos = Boolean(todos.length);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo />

        {hasTodos && <TodoList todos={visibleTodos} />}

        {/* overlay will cover the todo while it is being deleted or updated */}

        {hasTodos && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(ErrorMessage.Default)}
        />
        {error}
      </div>

      {isLoading && (
        <div className={cn('loader', { hidden: !isLoading })}></div>
      )}
    </div>
  );
};
