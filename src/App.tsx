/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Progress } from './types/Progress';
import { prepareTodos } from './utils/prepareTodos';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterField, setFilterField] = useState<Progress>(Progress.All);

  const filteredTodos = prepareTodos(todos, filterField);
  const activeTodosAmount = todos.reduce((acc, cur) => {
    if (!cur.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Something went wrong');

        return wait(3000).then(() => setErrorMessage(''));
      });

    return () => {
      setErrorMessage('');
    };
  }, []);

  const handleErrorClose = () => {
    setErrorMessage('');
  };

  const handleFilterField = (status: Progress) => {
    setFilterField(status);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          {/* This form is shown instead of the title and remove button */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            <ul className="todolist">
              {filteredTodos.map(({ id, title, completed }) => (
                <li
                  key={id}
                  data-cy="Todo"
                  className={classNames('todo', { completed })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={completed}
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
                    ×
                  </button>
                  {/* 'is-active' class puts this modal on top of the todo */}
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="
                        modal-background
                        has-background-white-ter
                      "
                    />
                    <div className="loader" />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosAmount} items left`}
            </span>
            {/* Active link should have the 'selected' class */}

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterField === Progress.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterField(Progress.All)}
              >
                {Progress.All}
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterField === Progress.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterField(Progress.Active)}
              >
                {Progress.Active}
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterField === Progress.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterField(Progress.Completed)}
              >
                {Progress.Completed}
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
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorClose}
        />
        {/* show only one message at a time */}
        Unable to load todos
      </div>
    </div>
  );
};
