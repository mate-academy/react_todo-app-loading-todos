/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';
import classNames from 'classnames';
import { filterTodos } from './use_cases/filterTodos';

export enum FilterState {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessange, setErrorMessange] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterState>(
    FilterState.All,
  );

  const errorTimerId = useRef(0);
  const showError = (message: string) => {
    setErrorMessange(message);
    window.clearTimeout(errorTimerId.current);
    errorTimerId.current = window.setTimeout(() => {
      setErrorMessange('');
    }, 3000);
  };

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));
  }, []);

  function hendleHideError() {
    setErrorMessange('');
  }

  function handleFilterChanhe(
    event: React.MouseEvent,
    newFilterState: FilterState,
  ) {
    event.preventDefault();

    setSelectedFilter(newFilterState);
  }

  const filteredTodos = useMemo(
    () => filterTodos(selectedFilter, '', todos) || [],
    [todos, selectedFilter],
  );

  const notCompletedCount = useMemo(
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

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {todos?.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {notCompletedCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedFilter === FilterState.All,
                })}
                data-cy="FilterLinkAll"
                onClick={event => handleFilterChanhe(event, FilterState.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedFilter === FilterState.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={event => handleFilterChanhe(event, FilterState.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedFilter === FilterState.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={event =>
                  handleFilterChanhe(event, FilterState.Completed)
                }
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
          { hidden: errorMessange === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => hendleHideError()}
        />

        {errorMessange}
      </div>
    </div>
  );
};
