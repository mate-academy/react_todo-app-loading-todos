/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../helper';

interface Props {
  todos: Todo[],
  filter: string,
  activeTodosQuantity: number,
  onFilterChange: (arg: FilterStatus) => void,
}
export const TodoContent: React.FC<Props> = ({
  todos,
  filter,
  activeTodosQuantity,
  onFilterChange,
}) => {
  const handleFilterChange = (status: FilterStatus) => {
    onFilterChange(status);
  };

  const filterStatuses = Object.values(FilterStatus);

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {/* this buttons is active only if there are some active todos */}
        <button
          type="button"
          className="todoapp__toggle-all active"
          aria-label=""
        />

        {/* Add a todo on form submit */}
        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="todoapp__main">
            {/* This is a completed todo */}
            {todos.map(({ id, completed, title }) => (
              <div
                key={id}
                className={classNames('todo', {
                  completed,
                })}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked
                  />
                </label>

                <span className="todo__title">{title}</span>

                {/* Remove button appears only on hover */}
                <button type="button" className="todo__remove">×</button>

                {/* overlay will cover the todo while it is being updated */}
                <div className="modal overlay">
                  <div
                    className="modal-background has-background-white-ter"
                  />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodosQuantity} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              {filterStatuses.map((status) => (
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filter === status,
                  })}
                  onClick={() => handleFilterChange(status)}
                >
                  {`${status.slice(0, 1).toUpperCase()}${status.slice(1)}`}
                </a>
              ))}
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>

        </>
      )}

    </div>
  );
};
