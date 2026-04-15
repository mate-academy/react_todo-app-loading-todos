/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { NotificationMessage } from './types/Notifications';
import { FILTERS } from './Constants/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: NotificationMessage | null;
    visible: boolean;
  }>({ message: null, visible: false });

  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const [newTodoText, setNewTodoText] = useState<string>('');

  const notificationTimeoutRef = useRef<number | null>(null);
  const newTodoRef = useRef<HTMLInputElement | null>(null);
  const remaining = todos.filter(item => !item.completed).length;
  const hasCompleted = todos.some(item => item.completed);

  const hideNotification = useCallback(() => {
    if (notificationTimeoutRef.current) {
      window.clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }

    setNotification({ message: null, visible: false });
  }, []);

  const showNotification = useCallback(
    (message: NotificationMessage) => {
      hideNotification();
      setNotification({ message, visible: true });
      notificationTimeoutRef.current = window.setTimeout(() => {
        setNotification({ message, visible: false });
        notificationTimeoutRef.current = null;
      }, 3000);
    },
    [hideNotification],
  );

  useEffect(() => {
    async function load() {
      hideNotification();
      setLoading(true);
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (err) {
        showNotification(NotificationMessage.UnableToLoadTodos);
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      hideNotification();
    };
  }, [hideNotification, showNotification]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active': {
        return todos.filter(item => !item.completed);
      }

      case 'completed': {
        return todos.filter(item => item.completed);
      }

      default:
        return todos;
    }
  }, [todos, filter]);

  const allCompleted = todos.length > 0 && todos.every(item => item.completed);

  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    hideNotification();
    const title = newTodoText.trim();

    if (!title) {
      showNotification(NotificationMessage.TitleEmpty);
      newTodoRef.current?.focus();

      return;
    }
  }

  function handleToggleTodo(id: string) {
    hideNotification();
    void id;
  }

  function handleDeleteTodo(id: string) {
    hideNotification();
    void id;
  }

  function handleToggleAll() {
    hideNotification();
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={() => handleToggleAll()}
            disabled={loading}
          />{' '}
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              ref={newTodoRef}
              value={newTodoText}
              onChange={event => setNewTodoText(event.target.value)}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={loading}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section
            className={classNames('todoapp__main', {
              hidden: todos.length === 0,
            })}
            data-cy="TodoList"
          >
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
                    onChange={() => handleToggleTodo(todo.id)}
                    disabled={loading || todo.saving}
                  />
                </label>
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => handleDeleteTodo(todo.id)}
                  disabled={loading || todo.saving}
                >
                  ×
                </button>
                <div
                  data-cy="TodoLoader"
                  className={classNames('modal overlay', {
                    'is-active': todo.saving,
                  })}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer
            className={classNames('todoapp__footer', {
              hidden: todos.length === 0,
            })}
            data-cy="Footer"
          >
            <span className="todo-count" data-cy="TodosCounter">
              {`${remaining} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {FILTERS.map(f => (
                <a
                  key={f.value}
                  href={f.href}
                  onClick={event => {
                    event.preventDefault();
                    setFilter(f.value);
                  }}
                  className={classNames('filter__link', {
                    selected: filter === f.value,
                  })}
                  data-cy={f.dataCy}
                >
                  {f.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !notification.visible,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideNotification}
        />
        {notification.message}
      </div>
    </div>
  );
};
