/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Status } from './types/Status';

const USER_ID = 11983;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState(Status.ALL);

  const handleErrorClose = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case Status.ACTIVE:
        return !todo.completed;
      case Status.COMPLETED:
        return todo.completed;
      case Status.ALL:
      default:
        return true;
    }
  });

  const todosCounter = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {!!todos.length && (
          <>
            <TodoList todos={filteredTodos} />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${todosCounter} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: status === Status.ALL,
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => {
                    setStatus(Status.ALL);
                  }}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: status === Status.ACTIVE,
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => {
                    setStatus(Status.ACTIVE);
                  }}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: status === Status.COMPLETED,
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => {
                    setStatus(Status.COMPLETED);
                  }}
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorClose}
        />
        {errorMessage}
      </div>
    </div>
  );
};
