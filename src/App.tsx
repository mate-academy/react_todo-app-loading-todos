/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

const USER_ID = 11538;

function filterTodos(todos: Todo[], filterField: FilterType) {
  let filteredTodos = todos;

  if (filterField !== FilterType.All) {
    switch (filterField) {
      case FilterType.Completed: {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      }

      case FilterType.Active: {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      }

      default:
        throw new Error('Error');
    }
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterField, setFilterField] = useState(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodosCounter = todos.filter(
    todo => todo.completed !== true,
  ).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filterField);
  }, [todos, filterField]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {filteredTodos.length !== 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
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

        <section className="todoapp__main" data-cy="TodoList">

          {filteredTodos.map(todo => {
            const { title, id, completed } = todo;

            return (
              <div
                key={id}
                data-cy="Todo"
                className={classNames('todo', {
                  completed: completed === true,
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

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCounter} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterField === FilterType.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterField(FilterType.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterField === FilterType.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterField(FilterType.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterField === FilterType.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterField(FilterType.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            {todos.some(todo => todo.completed === true)
            && (
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
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
