/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<Errors | ''>('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.LoadError);
      });
  }, []);

  const preparedTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;
      case Status.All:
        return true;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const notCompletedTodos = todos
    .filter(todo => !todo.completed).length;

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
            className="todoapp__toggle-all"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleQueryChange}
            />
          </form>
        </header>

        <TodoList todos={preparedTodos} />

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${notCompletedTodos} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href={Status.All}
                className={cn('filter__link', {
                  selected: filterStatus === Status.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterStatus(Status.All)}
              >
                All
              </a>

              <a
                href={Status.Active}
                className={cn('filter__link', {
                  selected: filterStatus === Status.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterStatus(Status.Active)}
              >
                Active
              </a>

              <a
                href={Status.Completed}
                className={cn('filter__link', {
                  selected: filterStatus === Status.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterStatus(Status.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className={cn('todoapp__clear-completed', {
                delete: !todos.some(todo => todo.completed),
              })}
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
