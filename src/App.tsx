import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './TodoList/TodoList';
import { filterSelectedTodos } from './helpers/helpers';

const USER_ID = 12057;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo []>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('All');

  const hasTodosFromServer = todos.length !== 0;

  const handleFilterType = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setFilterType(event.currentTarget.innerText);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    setError(null);
    getTodos(USER_ID)
      .then((todosFS => setTodos(todosFS)))
      .catch(() => handleError('Unable to load todos'));
  }, []);

  const todosForMap = filterSelectedTodos(filterType, todos);

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
            aria-label="Toggle All Button"
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

        {hasTodosFromServer
          && (
            <TodoList todos={todosForMap} />)}

        {/* Hide the footer if there are no todos */}
        {hasTodosFromServer
          && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                3 items left
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', {
                    selected: filterType === 'All',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={handleFilterType}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', {
                    selected: filterType === 'Active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={handleFilterType}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: filterType === 'Completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={handleFilterType}
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
          )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal', {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="hide error button"
        />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
