/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';

const USER_ID = 6701;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<FilterType>(FilterType.All);
  const [loadingError, setLoadingError] = useState(false);

  getTodos(USER_ID)
    .then(res => {
      setTodos(res);
    })
    .catch(() => {
      setLoadingError(true);
      setTodos([]);
    });

  const filterTodos = (filter:FilterType) => {
    switch (filter) {
      case FilterType.Active:
        return (todos.filter(todo => !todo.completed));

      case FilterType.Completed:
        return (todos.filter(todo => todo.completed));

      default:
        return [...todos];
    }
  };

  const visibleTodos:Todo[] = useMemo(
    () => filterTodos(statusFilter), [statusFilter, todos],
  );

  const clickAllHandler = () => {
    setStatusFilter(FilterType.All);
  };

  const clickActiveHandler = () => {
    setStatusFilter(FilterType.Active);
  };

  const clickCompletedHandler = () => {
    setStatusFilter(FilterType.Completed);
  };

  const deleteNotificationHandler = () => {
    setLoadingError(false);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <div className={todo.completed ? 'todo completed' : 'todo'}>
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              {/* Remove button appears only on hover */}
              <button type="button" className="todo__remove">×</button>

              {/* overlay will cover the todo while it is being updated */}
              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        <footer
          className="todoapp__footer"
          hidden={!todos}
        >
          <span className="todo-count">
            {`${filterTodos(FilterType.Active).length} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={statusFilter === FilterType.All
                ? 'filter__link selected'
                : 'filter__link'}
              onClick={clickAllHandler}
            >
              All
            </a>

            <a
              href="#/active"
              className={statusFilter === FilterType.Active
                ? 'filter__link selected'
                : 'filter__link'}
              onClick={clickActiveHandler}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={statusFilter === FilterType.Completed
                ? 'filter__link selected'
                : 'filter__link'}
              onClick={clickCompletedHandler}
            >
              Completed
            </a>
          </nav>

          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      <div
        className={loadingError
          ? 'notification is-danger is-light has-text-weight-normal'
          : 'notification is-danger is-light has-text-weight-normal hidden'}
      >
        <button
          type="button"
          className="delete"
          onClick={deleteNotificationHandler}
        />

        Unable to load a todo
      </div>
    </div>
  );
};
