/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './components/UseWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { filterTodos } from './utils/filterTodos';
import { TodoList } from './components/TodoList';
import { Status } from './types/FilterStatus';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 11592;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [fitlerParam, setFilterParam] = useState(Status.All);
  const [error, setError] = useState('');
  const [isErrorShown, setIsErrorShown] = useState(false);

  const showError = (newError: string) => {
    setError(newError);
    setIsErrorShown(true);

    setInterval(() => {
      setIsErrorShown(false);
      setError('');
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, fitlerParam);
  }, [todos, fitlerParam]);

  const uncompletedTodosAmount = useMemo(() => todos
    .filter(todo => !todo.completed).length, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: !uncompletedTodosAmount,
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
            />
          </form>
        </header>

        {!!todos.length && <TodoList todos={visibleTodos} />}

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {uncompletedTodosAmount === 1
                ? '1 item left'
                : `${uncompletedTodosAmount} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: fitlerParam === Status.All,
                })}
                onClick={() => setFilterParam(Status.All)}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: fitlerParam === Status.Active,
                })}
                onClick={() => setFilterParam(Status.Active)}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: fitlerParam === Status.Completed,
                })}
                onClick={() => setFilterParam(Status.Completed)}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {uncompletedTodosAmount !== todos.length && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        error={error}
        setError={setError}
        isErrorShown={isErrorShown}
        setIsErrorShown={setIsErrorShown}
      />
    </div>
  );
};
