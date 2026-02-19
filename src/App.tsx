import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { USER_ID, getTodos } from './api/todos';

// If your project has these components already, keep using them.
// Otherwise, just keep the existing markup in App.tsx and wire state into it.

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const [isLoading, setIsLoading] = useState(false);

  // Notification state (DON'T conditionally render; just toggle `hidden` class)
  const [errorMessage, setErrorMessage] = useState('');
  const hideErrorTimer = useRef<number | null>(null);

  const hideError = () => {
    setErrorMessage('');
    if (hideErrorTimer.current) {
      window.clearTimeout(hideErrorTimer.current);
      hideErrorTimer.current = null;
    }
  };

  const showError = (message: string) => {
    setErrorMessage(message);

    if (hideErrorTimer.current) {
      window.clearTimeout(hideErrorTimer.current);
    }

    hideErrorTimer.current = window.setTimeout(() => {
      setErrorMessage('');
      hideErrorTimer.current = null;
    }, 3000);
  };

  const loadTodos = async () => {
    // hide notification before any next request
    hideError();

    setIsLoading(true);

    try {
      const loaded = await getTodos(USER_ID);
      setTodos(loaded);
    } catch {
      showError('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();

    return () => {
      if (hideErrorTimer.current) {
        window.clearTimeout(hideErrorTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const hasTodos = todos.length > 0;

  return (
    <div className="todoapp">
      {/* Header is usually always visible (matches many specs).
          Keep your existing markup here. */}

      {/* If your template has a global loader, you can show it like this: */}
      {isLoading && (
        <div className="notification is-link is-light">Loading...</div>
      )}

      {/* Todo List */}
      <section className={classNames('main', { hidden: !hasTodos })}>
        {/* Keep existing markup for the list here.
            Render visibleTodos instead of todos. Example: */}
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames({ completed: todo.completed })}
            >
              {/* Keep your existing todo item markup */}
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={todo.completed}
                  readOnly
                />
                <label>{todo.title}</label>
                <button type="button" className="destroy" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer / Filter */}
      <footer className={classNames('footer', { hidden: !hasTodos })}>
        <span className="todo-count">
          {todos.filter(t => !t.completed).length} items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({ selected: filter === 'all' })}
              onClick={e => {
                e.preventDefault();
                setFilter('all');
              }}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={classNames({ selected: filter === 'active' })}
              onClick={e => {
                e.preventDefault();
                setFilter('active');
              }}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={classNames({ selected: filter === 'completed' })}
              onClick={e => {
                e.preventDefault();
                setFilter('completed');
              }}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>

      {/* Notification (keep it always in DOM; toggle `hidden`) */}
      <div
        className={classNames('notification is-danger is-light', {
          hidden: !errorMessage,
        })}
      >
        <button
          type="button"
          className="delete"
          onClick={hideError}
          aria-label="Close"
        />
        {errorMessage}
      </div>
    </div>
  );
};
