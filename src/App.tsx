/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { wait } from './utils/fetchClient';
import { getFilteredTodos } from './utils/getFilteredTodos';

const USER_ID = 175;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Status.all);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(`Can't load user's list of todos`);

        return wait(3000).then(() => setErrorMessage(''));
      });
  }, []);

  const filteredTodos = getFilteredTodos(todos, filter);
  const hasCompleted = todos.some(todo => todo.completed);
  const hasActive = todos.filter(({ completed }) => {
    return !completed;
  }).length;

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
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!!todos.length && (
          <section className="todoapp__main" data-cy="TodoList">
            <ul className="todolist">
              {filteredTodos.map(({ id, title, completed }) => (
                <div
                  key={id}
                  data-cy="Todo"
                  className={classNames({
                    'todo completed': completed,
                    todo: !completed,
                  })}
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

                  {/* overlay will cover the todo while it is being deleted or updated */}
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div /* eslint-disable-next-line */
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </ul>
          </section>
        )}

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {hasActive === 1 ? '1 item left' : `${hasActive} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === Status.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(Status.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === Status.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(Status.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === Status.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(Status.completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
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
          'is - danger',
          'is - light',
          'has - text - weight - normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        Unable to load todos
      </div>
    </div>
  );
};

/* Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */
