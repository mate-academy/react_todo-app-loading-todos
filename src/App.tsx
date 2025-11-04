/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import type { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

const NOTIF_MESSAGES = {
  load: 'Unable to load todos',
  add: 'Unable to add a todo',
  delete: 'Unable to delete a todo',
  update: 'Unable to update a todo',
  emptyTitle: 'Title should not be empty',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const notifRef = useRef<HTMLDivElement | null>(null);
  const newTodoRef = useRef<HTMLInputElement | null>(null);

  const hideNotification = useCallback(() => {
    notifRef.current?.classList.add('hidden');
  }, []);

  const showNotification = useCallback((key: keyof typeof NOTIF_MESSAGES) => {
    const msg = NOTIF_MESSAGES[key];

    if (notifRef.current) {
      notifRef.current.classList.remove('hidden');

      notifRef.current.textContent = msg;
    }

    window.setTimeout(() => {
      hideNotification();
    }, 3000);

  }, [hideNotification] );

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');

      switch (hash) {
        case '/active':
          setFilter('active');
          break;
        case '/completed':
          setFilter('completed');
          break;
        default:
          setFilter('all');
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);

    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  useEffect(() => {
    newTodoRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    let cancelled = false;

    const loadTodos = async () => {
      hideNotification();
      setLoading(true);

      try {
        const data = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

        if (!cancelled) {
          setTodos(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          showNotification('load');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTodos();

    return () => {
      cancelled = true;
    };
  }, [showNotification, hideNotification]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const onHideError = () => {
    hideNotification();
  };

  return (
    <div className="todoapp">
      {!USER_ID ? <UserWarning /> : null}

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.length > 0 && activeCount === 0 ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            disabled={loading || todos.length === 0}
          />

          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              ref={newTodoRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={loading}
            />
          </form>
        </header>

        {todos.length > 0 && (
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
                  disabled={loading}
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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedCount === 0 || loading}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        ref={notifRef}
        className="
        notification is-danger is-light has-text-weight-normal hidden"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={onHideError}
        />
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
