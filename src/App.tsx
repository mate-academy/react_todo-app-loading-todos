/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoItem } from './components/TodoItem';
import { TodoFooter } from './components/TodoFooter';
import type { Todo } from './types/Todo';
import { Filter } from './types/Filter';

enum ErrorMessage {
  Load = 'Unable to load todos',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    let cancelled = false;

    getTodos()
      .then(loadedTodos => {
        if (!cancelled) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(ErrorMessage.Load);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [error]);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const completedCount = todos.length - activeCount;
  const allCompleted = todos.length > 0 && activeCount === 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              data-cy="ToggleAllButton"
              className={cn('todoapp__toggle-all', {
                active: allCompleted,
              })}
            />
          )}

          <form onSubmit={event => event.preventDefault()}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <TodoFooter
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          type="button"
          className="delete"
          data-cy="HideErrorButton"
          onClick={() => setError('')}
        />

        {error}
      </div>
    </div>
  );
};
