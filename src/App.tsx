/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

const FILTERS: Record<Filter, Filter> = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const newTodoFieldRef = useRef<HTMLInputElement>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideError = () => {
    setError('');

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
  };

  const showError = (message: string) => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    setError(message);

    errorTimerRef.current = setTimeout(() => {
      setError('');
      errorTimerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    const loadTodos = async () => {
      hideError();
      setIsLoading(true);

      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        showError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();

    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      newTodoFieldRef.current?.focus();
    }
  }, [isLoading]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: Filter,
  ) => {
    event.preventDefault();
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              ref={newTodoFieldRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!isLoading && todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    readOnly
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {!isLoading && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            {/* prettier-ignore */}
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount}{' '}
              {activeTodosCount === 1 ? 'item' : 'items'} left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${
                  filter === FILTERS.all ? 'selected' : ''
                }`}
                data-cy="FilterLinkAll"
                onClick={event => handleFilterChange(event, FILTERS.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${
                  filter === FILTERS.active ? 'selected' : ''
                }`}
                data-cy="FilterLinkActive"
                onClick={event => handleFilterChange(event, FILTERS.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${
                  filter === FILTERS.completed ? 'selected' : ''
                }`}
                data-cy="FilterLinkCompleted"
                onClick={event => handleFilterChange(event, FILTERS.completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {error}
      </div>
    </div>
  );
};
