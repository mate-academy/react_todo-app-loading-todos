/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  filter: string,
  inFilterChange: (arg: string) => void,
}
export const Content: React.FC<Props> = ({
  todos,
  filter,
  inFilterChange,
}) => {
  const handleShowAllTodo = () => {
    inFilterChange('all');
  };

  const handleShowActiveTodo = () => {
    inFilterChange('active');
  };

  const handleShowCompletedTodo = () => {
    inFilterChange('completed');
  };

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
        <section className="todoapp__main">
          {/* This is a completed todo */}
          {todos.map(todo => (
            <div
              key={todo.id}
              className={classNames('todo', {
                completed: todo.completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked
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

          {/* This todo is not completed */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span className="todo__title">Not Completed Todo</span>
            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
        </section>
      )}

      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todos.length} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'all',
            })}
            onClick={handleShowAllTodo}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'active',
            })}
            onClick={handleShowActiveTodo}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'completed',
            })}
            onClick={handleShowCompletedTodo}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
