/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      {!USER_ID && <UserWarning />}

      {USER_ID && (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <header className="todoapp__header">
              <button
                type="button"
                className={classNames('todoapp__toggle-all', {
                  active: todos.length > 0 && activeTodosCount === 0,
                })}
                data-cy="ToggleAllButton"
              />

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
              <>
                <section className="todoapp__main" data-cy="TodoList">
                  {visibleTodos.map(todo => (
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
                          readOnly
                        />
                      </label>

                      <span data-cy="TodoTitle" className="todo__title">
                        {todo.title}
                      </span>

                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                      >
                        ×
                      </button>

                      <div data-cy="TodoLoader" className="modal overlay">
                        <div
                          className="modal-background
                         has-background-white-ter"
                        />
                        <div className="loader" />
                      </div>
                    </div>
                  ))}
                </section>

                <footer className="todoapp__footer" data-cy="Footer">
                  <span className="todo-count" data-cy="TodosCounter">
                    {activeTodosCount} items left
                  </span>

                  <nav className="filter" data-cy="Filter">
                    <a
                      href="#/"
                      className={classNames('filter__link', {
                        selected: filter === 'all',
                      })}
                      data-cy="FilterLinkAll"
                      onClick={() => setFilter('all')}
                    >
                      All
                    </a>

                    <a
                      href="#/active"
                      className={classNames('filter__link', {
                        selected: filter === 'active',
                      })}
                      data-cy="FilterLinkActive"
                      onClick={() => setFilter('active')}
                    >
                      Active
                    </a>

                    <a
                      href="#/completed"
                      className={classNames('filter__link', {
                        selected: filter === 'completed',
                      })}
                      data-cy="FilterLinkCompleted"
                      onClick={() => setFilter('completed')}
                    >
                      Completed
                    </a>
                  </nav>

                  <button
                    type="button"
                    className="todoapp__clear-completed"
                    data-cy="ClearCompletedButton"
                    disabled={activeTodosCount === todos.length}
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
            {error}
          </div>
        </>
      )}
    </div>
  );
};
