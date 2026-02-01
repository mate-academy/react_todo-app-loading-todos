/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import * as todoService from './api/todos';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);

  const errorTimerId = useRef(0);

  const showError = (message: string) => {
    setErrorMessage(message);
    window.clearTimeout(errorTimerId.current);
    errorTimerId.current = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    setErrorMessage('');
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));
  }, []);

  function handleHideError() {
    setErrorMessage('');
  }

  function handleFilterChange(event: React.MouseEvent, newFilterState: Filter) {
    event.preventDefault();

    setSelectedFilter(newFilterState);
  }

  const filteredTodos = getFilteredTodos(todos, selectedFilter);

  const notConpletedCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

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

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {notConpletedCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedFilter === Filter.All,
                })}
                data-cy="FilterLinkAll"
                onClick={event => handleFilterChange(event, Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedFilter === Filter.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={event => handleFilterChange(event, Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedFilter === Filter.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={event => handleFilterChange(event, Filter.Completed)}
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
          { hidden: errorMessage === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => handleHideError()}
        />
        {errorMessage}
      </div>
    </div>
  );
};
