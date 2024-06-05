/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<boolean | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');

        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const establishFilter = useCallback(
    (
      filterName: FilterType,
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      switch (filterName) {
        case FilterType.ALL: {
          setFilter(null);
          break;
        }

        case FilterType.ACTIVE: {
          setFilter(false);
          break;
        }

        case FilterType.COMPLETED: {
          setFilter(true);
          break;
        }
      }
    },
    [],
  );

  const getFormedTodos = useCallback(
    (todosItems: Todo[]) => {
      if (filter !== null) {
        return todosItems.filter(x => x.completed === filter);
      }

      return todosItems;
    },
    [filter],
  );

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

        <section className="todoapp__main" data-cy="TodoList">
          <div>
            {todos &&
              getFormedTodos(todos).map((item, index) => (
                <div
                  data-cy="Todo"
                  key={'id: ' + index}
                  className={classNames('todo', {
                    completed: item.completed,
                  })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      checked={item.completed}
                      className="todo__status"
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {item.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(x => !x.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === null,
                })}
                data-cy="FilterLinkAll"
                onClick={e => establishFilter(FilterType.ALL, e)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === false,
                })}
                data-cy="FilterLinkActive"
                onClick={e => establishFilter(FilterType.ACTIVE, e)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === true,
                })}
                data-cy="FilterLinkCompleted"
                onClick={e => establishFilter(FilterType.COMPLETED, e)}
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

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error}
        <br />
        {/* Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
