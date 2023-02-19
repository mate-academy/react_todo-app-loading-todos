/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/Error';
import { Error } from './types/Error';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6366;

enum Status {
  All,
  COMPLETED,
  ACTIVE,
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [error, setError] = useState<Error>(Error.NONE);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromServer = await getTodos(USER_ID)
        .catch(() => {
          setError(Error.FETCH);

          setTimeout(() => {
            setError(Error.NONE);
          }, 3000);
        });

      if (todosFromServer) {
        setTodos(todosFromServer);
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todosByStatus = status === Status.All
    ? todos
    : todos.filter(({ completed }) => (
      status === Status.COMPLETED ? completed : !completed
    ));

  const completedCount = todos.reduce((acc, todo) => (
    todo.completed ? acc : acc + 1
  ), 0);

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

        {
          todos.length !== 0 && (
            <section className="todoapp__main">
              {
                todosByStatus.map(({ id, title, completed }) => (
                  <div
                    key={id}
                    className={classNames(
                      'todo',
                      { completed },
                    )}
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
                ))
              }

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
                </form>

                <div className="modal overlay">
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
                </div>
              </div> */}
            </section>
          )
        }

        {/* Hide the footer if there are no todos */}
        {
          todos.length !== 0 && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${completedCount} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter">
                <a
                  href="#/"
                  className={classNames(
                    'filter__link',
                    { selected: status === Status.All },
                  )}
                  onClick={() => setStatus(Status.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames(
                    'filter__link',
                    { selected: status === Status.ACTIVE },
                  )}
                  onClick={() => setStatus(Status.ACTIVE)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames(
                    'filter__link',
                    { selected: status === Status.COMPLETED },
                  )}
                  onClick={() => setStatus(Status.COMPLETED)}
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          )
        }
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {
        error !== Error.NONE && (
          <ErrorMessage error={error} onDeleteClick={setError} />
        )
      }
    </div>
  );
};
