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

  const filterTodos = (filter: FilterType) => {
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

  const clickFilterHandler = (filter: FilterType) => {
    setStatusFilter(filter);
  };

  const deleteNotificationHandler = () => {
    setLoadingError(false);
  };

  const numActiveTodos = filterTodos(FilterType.Active).length;

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

              <button type="button" className="todo__remove">×</button>

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
            {`${numActiveTodos} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={`filter__link ${statusFilter === FilterType.All && 'selected'}`}
              onClick={() => clickFilterHandler(FilterType.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${statusFilter === FilterType.Active && 'selected'}`}
              onClick={() => clickFilterHandler(FilterType.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${statusFilter === FilterType.Completed && 'selected'}`}
              onClick={() => clickFilterHandler(FilterType.Completed)}
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
        className={`notification is-danger is-light has-text-weight-normal ${!loadingError && 'hidden'}`}
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
