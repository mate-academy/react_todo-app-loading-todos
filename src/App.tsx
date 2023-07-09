/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 10995;

enum FilterOptions {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterMethod, setFilterMethod] = useState<string>(FilterOptions.ALL);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError('Error: cannot upload todos'));
  }, []);

  useEffect(() => {
    let errorTimer: number;
    let hiddenTime: number;

    if (error) {
      hiddenTime = window.setTimeout(() => {
        setIsHidden(true);
      }, 2000);
      errorTimer = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
      clearTimeout(hiddenTime);
    };
  }, [error]);

  const visibleTodos: Todo[] = useMemo(() => {
    switch (filterMethod) {
      case FilterOptions.ACTIVE:
        return todos.filter((todo) => todo.completed !== true);

      case FilterOptions.COMPLETED:
        return todos.filter((todo) => todo.completed === true);

      default:
        return todos;
    }
  }, [todos, filterMethod]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            disabled
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <div className={`todo ${todo.completed && 'completed'}`} key={todo.id}>
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span className="todo__title">{todo.title}</span>
              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {todos.length}
              {' '}
              items left
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={
                  cn(
                    'filter__link', {
                      selected: filterMethod === FilterOptions.ALL,
                    },
                  )
                }
                onClick={() => {
                  setFilterMethod(FilterOptions.ALL);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  cn(
                    'filter__link', {
                      selected: filterMethod === FilterOptions.ACTIVE,
                    },
                  )
                }
                onClick={() => {
                  setFilterMethod(FilterOptions.ACTIVE);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  cn(
                    'filter__link', {
                      selected: filterMethod === FilterOptions.COMPLETED,
                    },
                  )
                }
                onClick={() => {
                  setFilterMethod(FilterOptions.COMPLETED);
                }}
              >
                Completed
              </a>
            </nav>

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}

        {(error) && (
          <div className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: isHidden },
          )}
          >
            <button
              type="button"
              className="delete"
              onClick={() => {
                setError(null);
              }}
            />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
