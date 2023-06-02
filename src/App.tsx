/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';

const USER_ID = 10613;

enum FilterStatus {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.all);
  const [errorIsShown, setErrorIsShown] = useState(false);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setErrorIsShown(true);

      setTimeout(() => {
        setErrorIsShown(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filterStatus) {
        case FilterStatus.active:
          return !todo.completed;

        case FilterStatus.completed:
          return todo.completed;

        case FilterStatus.all:
        default:
          return todo;
      }
    });
  }, [todos, filterStatus]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrorIsShown(false);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length !== 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              className={classNames(
                'todo',
                { completed: todo.completed },
              )}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
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

          {/* This is a completed todo */}
          <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                defaultChecked
              />
            </label>

            <span className="todo__title">Completed Todo</span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is not completed */}
          <div className="todo">
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
          </div>

          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                // value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterStatus === 'all' },
                )}
                onClick={() => setFilterStatus(FilterStatus.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterStatus === 'active' },
                )}
                onClick={() => setFilterStatus(FilterStatus.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterStatus === 'completed' },
                )}
                onClick={() => setFilterStatus(FilterStatus.completed)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorIsShown },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorIsShown(false)}
        />

        {/* show only one message at a time */}
        Unable to load the todos
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
