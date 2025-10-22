/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import classNames from 'classnames';
import TodoHeader from './components/TodoHeader/TodoHeader';

enum ErrorMessages {
  NO_ERROR = '',
  ERROR_LOAD_TODOS = 'Unable to load todos',
}

enum StatusTodos {
  COMPLETED,
  ACTIVE,
  ALL,
}

const filtredTodos = (status: StatusTodos, todos: Todo[]): Todo[] => {
  return todos.filter(todo => {
    switch (status) {
      case StatusTodos.ACTIVE:
        return !todo.completed;
      case StatusTodos.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<StatusTodos>(
    StatusTodos.ALL,
  );

  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.NO_ERROR,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessages.ERROR_LOAD_TODOS));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(ErrorMessages.NO_ERROR);
    }, 3000);

    return () => clearInterval(timerId);
  }, [errorMessage]);

  const filterTodos = filtredTodos(filterStatus, todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filterTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterStatus === StatusTodos.ALL,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterStatus(StatusTodos.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterStatus === StatusTodos.ACTIVE,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterStatus(StatusTodos.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterStatus === StatusTodos.COMPLETED,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterStatus(StatusTodos.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed)}
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
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage.length,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessages.NO_ERROR)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
