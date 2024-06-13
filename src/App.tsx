/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum Status {
  active = 'active',
  completed = 'completed',
  all = 'all',
}

enum Message {
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
  const [errorMessage, setErrorMessage] = useState(Message.null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeErrorMessage = () => {
    setHasError(false);

    setTimeout(() => {
      setErrorMessage(Message.null);
    }, 500);
  };

  const handleErrorMessage = (message: Message, error = true) => {
    setHasError(error);
    setErrorMessage(message);

    setTimeout(() => {
      closeErrorMessage();
    }, 3000);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => handleErrorMessage(Message.load))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (id: number) => {
    setTodos(currentTodos =>
      currentTodos?.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const visiableTodos = (query = queryStatus) => {
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

  //first time load app
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

        {!loading && (
          <section className="todoapp__main" data-cy="TodoList">
            {visiableTodos()?.map(todo => {
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
                      onChange={() => handleStatusChange(id)}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    x
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

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {visiableTodos(Status.active).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: queryStatus === Status.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setQueryStatus(Status.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: queryStatus === Status.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setQueryStatus(Status.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: queryStatus === Status.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setQueryStatus(Status.completed)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
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
          // eslint-disable-next-line prettier/prettier
          { hidden: !hasError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorMessage}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
