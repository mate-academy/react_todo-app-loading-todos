/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setErrorMessage(null);
    getTodos()
      .then(todo => {
        setTodos(todo);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterStatus.All) {
      return true;
    }

    if (filter === FilterStatus.Active) {
      return todo.completed === false;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed === true;
    }
  });

  const filters = [
    { value: FilterStatus.All, label: 'All', href: '#/', cy: 'FilterLinkAll' },
    {
      value: FilterStatus.Active,
      label: 'Active',
      href: '#/active',
      cy: 'FilterLinkActive',
    },
    {
      value: FilterStatus.Completed,
      label: 'Completed',
      href: '#/completed',
      cy: 'FilterLinkCompleted',
    },
  ];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
          />

          <form>
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
              data-cy="Todo"
              key={todo.id}
              className={`todo ${todo.completed === true ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              {false ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>
              ) : (
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
              )}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={`modal overlay ${false ? 'is-active' : ''}`}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} ${activeTodosCount === 1 ? 'item' : 'items'} left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {filters.map(({ value, label, href, cy }) => (
                <a
                  key={value}
                  href={href}
                  data-cy={cy}
                  className={`filtered__link ${filter === value ? 'selected' : ''}`}
                  onClick={() => setFilter(value)}
                >
                  {label}
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

        <div
          data-cy="ErrorNotification"
          className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
