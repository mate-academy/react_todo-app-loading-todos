/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10380;

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Filter>('all');

  function filterTodos() {
    switch (filterStatus) {
      case 'all':
        return todos;
      case 'completed':
        return todos?.filter(todo => todo.completed === true);
      case 'active':
        return todos?.filter(todo => todo.completed === false);
      default:
        return todos;
    }
  }

  const visibleTodos: Todo[] | null | undefined = filterTodos();

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => {
      });
  });

  const handleFilter = (status: Filter) => {
    setFilterStatus(status);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && (
          <>
            <section className="todoapp__main">
              {visibleTodos && (
                <ul>
                  {visibleTodos.map(todo => (
                    <li key={todo.id}>
                      <div
                        className={classNames(
                          'todo',
                          {
                            completed: todo.completed,
                          },
                        )}
                      >
                        <label className="todo__status-label">
                          <input
                            type="checkbox"
                            className="todo__status"
                            checked={todo.completed}
                          />
                        </label>

                        <span className="todo__title">{todo.title}</span>

                        <button
                          type="button"
                          className="todo__remove"
                        >
                          ×
                        </button>

                        <div className="modal overlay">
                          <div
                            className="
                            modal-background
                            has-background-white-ter
                            "
                          />
                          <div className="loader" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                3 items left
              </span>

              <nav className="filter">
                <a
                  href="#/"
                  className={classNames(
                    'filter__link',
                    {
                      selected: filterStatus === 'all',
                    },
                  )}
                  onClick={() => handleFilter('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames(
                    'filter__link',
                    {
                      selected: filterStatus === 'active',
                    },
                  )}
                  onClick={() => handleFilter('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames(
                    'filter__link',
                    {
                      selected: filterStatus === 'completed',
                    },
                  )}
                  onClick={() => handleFilter('completed')}
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !isError,
        },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsError(null)}
        />
        {isError === 'post' && 'Unable to add a todo'}
        {isError === 'delete' && 'Unable to delete a todo'}
        {isError === 'patch' && 'Unable to update a todo'}
      </div>
    </div>
  );
};
