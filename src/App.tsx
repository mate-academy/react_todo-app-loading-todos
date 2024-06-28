/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

enum Status {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

enum Emessage {
  load = 'Unable to load todos',
  title = 'Title should not be empty',
  add = 'Unable to add a todo',
  delete = 'Unable to delete a todo',
  update = 'Unable to update a todo',
  null = '',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [queryStatus, setQueryStatus] = useState(Status.all);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(Emessage.null);
  const [foundError, setFoundError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closingErrMessage = () => {
    setFoundError(false);

    setTimeout(() => {
      setErrMessage(Emessage.null);
    }, 500);
  };

  const handleErrMessage = (message: Emessage, error = true) => {
    setFoundError(error);
    setErrMessage(message);

    setTimeout(() => {
      closingErrMessage();
    }, 2000);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      setIsLoading(true);

      getTodos()
        .then(setTodos)
        .catch(() => handleErrMessage(Emessage.load))
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkedUnchecked = (id: number) => {
    setTodos(existingTodos =>
      existingTodos?.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const todosByStatus = (query = queryStatus) => {
    return todos?.filter(todo => {
      switch (query) {
        case Status.completed:
          return todo.completed;

        case Status.active:
          return !todo.completed;

        case Status.all:
          return todo;
      }
    });
  };

  const hasCompletedTodos = () => {
    return todos.some(todo => todo.completed);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!isLoading && (
          <section className="todoapp__main" data-cy="TodoList">
            {todosByStatus()?.map(todo => {
              const { id, title, completed } = todo;

              return (
                <div
                  data-cy="Todo"
                  className={classNames('todo', { completed: completed })}
                  key={id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={completed}
                      onChange={() => checkedUnchecked(id)}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {title}
                  </span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  {/* 'is-active' class puts this modal on top of the todo */}
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background
                    has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosByStatus(Status.active).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: queryStatus === Status.all,
                })}
                onClick={() => setQueryStatus(Status.all)}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: queryStatus === Status.active,
                })}
                onClick={() => setQueryStatus(Status.active)}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: queryStatus === Status.completed,
                })}
                onClick={() => setQueryStatus(Status.completed)}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              disabled={!hasCompletedTodos()}
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !foundError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closingErrMessage}
        />
        {/* show only one message at a time */}
        {errMessage}
      </div>
    </div>
  );
};
