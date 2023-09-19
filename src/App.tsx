/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

const USER_ID = 11470;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [error, setError] = useState('');

  const filtredTodos = useMemo(() => todos.filter(({ completed }) => {
    switch (status) {
      case Status.Active:
        return !completed;
      case Status.Completed:
        return completed;
      default:
        return true;
    }
  }), [status, todos]);

  const isOneTodoCompleted = useMemo(() => todos
    .some(({ completed }) => completed), [todos]);

  useEffect(() => {
    setError('');
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('Unable to download todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filtredTodos.map(todo => {
            const {
              title,
              completed,
              id,
            } = todo;

            return (
              <div
                className={classNames('todo', {
                  completed,
                })}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                <span className="todo__title">
                  {title}
                </span>

                {/* Remove button appears only on hover */}
                <button type="button" className="todo__remove">×</button>

                {/* overlay will cover the todo while it is being updated */}
                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}

          {/* This is a completed todo */}
          {/* <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span className="todo__title">Completed Todo</span> */}

          {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove">×</button> */}

          {/* overlay will cover the todo while it is being updated */}
          {/* <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is not completed */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* <span className="todo__title">Not Completed Todo</span>
            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is being edited */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form> */}

          {/* <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is in loadind state */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
          {/* </div> */}
        </section>

        {!!todos.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            <nav className="filter">
              {Object.keys(Status).map((key) => {
                const value = Status[key as keyof typeof Status];

                return (
                  <a
                    href={`#/${value}`}
                    className={classNames('filter__link', {
                      selected: value === status,
                    })}
                    onClick={() => setStatus(value)}
                  >
                    {key}
                  </a>
                );
              })}
            </nav>

            {isOneTodoCompleted && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}

          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        {error}

        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
