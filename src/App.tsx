/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

enum ErrorMessage {
  None = '',
  Load = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
}

const FILTER_LINKS: { status: Status; label: string; href: string; cy: string }[] =
  [
    { status: Status.All, label: 'All', href: '#/', cy: 'FilterLinkAll' },
    {
      status: Status.Active,
      label: 'Active',
      href: '#/active',
      cy: 'FilterLinkActive',
    },
    {
      status: Status.Completed,
      label: 'Completed',
      href: '#/completed',
      cy: 'FilterLinkCompleted',
    },
  ];

function filterTodos(todos: Todo[], status: Status): Todo[] {
  switch (status) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const errorTimer = useRef<number | undefined>(undefined);

  const showError = (message: ErrorMessage) => {
    window.clearTimeout(errorTimer.current);
    setErrorMessage(message);
    errorTimer.current = window.setTimeout(
      () => setErrorMessage(ErrorMessage.None),
      3000,
    );
  };

  useEffect(() => {
    if (!USER_ID) {
      return undefined;
    }

    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.Load));

    return () => window.clearTimeout(errorTimer.current);
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(todos, status),
    [todos, status],
  );

  const activeCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  const hasCompleted = todos.length !== activeCount;
  const allCompleted = todos.length > 0 && activeCount === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={event => event.preventDefault()}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {FILTER_LINKS.map(link => (
                <a
                  key={link.status}
                  href={link.href}
                  className={classNames('filter__link', {
                    selected: status === link.status,
                  })}
                  data-cy={link.cy}
                  onClick={event => {
                    event.preventDefault();
                    setStatus(link.status);
                  }}
                >
                  {link.label}
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

      {/* The notification is always rendered; `hidden` hides it smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.None)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
