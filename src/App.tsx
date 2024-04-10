/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { wait } from './utils/fetchClient';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [sortBy, setSortBy] = useState<Status>(Status.All);

  const titleInput = useRef<HTMLInputElement>(null);

  const isAllCompleted = todos.every(todo => todo.completed);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  let visibleTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(newTodoTitle.toLowerCase()),
  );

  switch (sortBy) {
    case Status.Active:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const handleError = (message: string) => {
    setErrorMessage(message);
    wait(3000).then(() => setErrorMessage(''));
  };

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }

    getTodos()
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              name="new-todo"
              ref={titleInput}
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: !sortBy,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSortBy(Status.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: sortBy === Status.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSortBy(Status.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: sortBy === Status.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSortBy(Status.Completed)}
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
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {!!errorMessage && errorMessage}
      </div>
    </div>
  );
};
