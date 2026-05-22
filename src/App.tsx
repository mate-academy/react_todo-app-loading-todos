/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { FilterType } from './types/FilterType';
import { ErrorMessage } from './types/ErrorMessage';

function getFilteredTodos(todosToFilter: Todo[], filter: FilterType) {
  switch (filter) {
    case FilterType.Active:
      return todosToFilter.filter(todo => !todo.completed);
    case FilterType.Completed:
      return todosToFilter.filter(todo => todo.completed);
    default:
      return todosToFilter;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = getFilteredTodos(todos, filterBy);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);
    getTodos()
      .then(currentTodos => setTodos(currentTodos))
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToLoadTodos);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

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
              disabled={isLoading}
              ref={inputRef}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => {
                return (
                  <div
                    key={todo.id}
                    data-cy="Todo"
                    className={classNames('todo', {
                      completed: todo.completed,
                    })}
                  >
                    <label className="todo__status-label">
                      <input
                        data-cy="TodoStatus"
                        type="checkbox"
                        className="todo__status"
                        checked={todo.completed}
                      />
                    </label>

                    <span data-cy="TodoTitle" className="todo__title">
                      {todo.title}
                    </span>

                    {/* Remove button appears only on hover */}
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                    >
                      ×
                    </button>

                    {/* This form is shown instead of the title and remove button */}
                    {/* <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form> */}

                    {/* overlay will cover the todo while it is being deleted or updated */}
                    <div data-cy="TodoLoader" className="modal overlay">
                      {' '}
                      {/*is-active*/}
                      <div className="modal-background has-background-white-ter" />
                      <div className="loader" />
                    </div>
                  </div>
                );
              })}
            </section>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterBy === FilterType.All,
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterBy(FilterType.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterBy === FilterType.Active,
                  })}
                  onClick={() => setFilterBy(FilterType.Active)}
                  data-cy="FilterLinkActive"
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterBy === FilterType.Completed,
                  })}
                  onClick={() => setFilterBy(FilterType.Completed)}
                  data-cy="FilterLinkCompleted"
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={todos.filter(todo => todo.completed).length === 0}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessage === null },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
