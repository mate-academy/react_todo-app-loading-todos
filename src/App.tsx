/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { FilterStatus } from './types/FilterStatus';

const USER_ID = 10999;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .catch((error) => {
        setIsError(true);
        throw new Error(error.message);
      });
  }, []);

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => {
        setIsError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return () => {};
  }, [isError]);

  const hasActiveTodo = todos?.find((todo) => todo.completed === false);
  const completedTodos = todos?.filter((todo) => todo.completed);
  const uncompletedTodos = todos?.filter((todo) => !todo.completed);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.ACTIVE:
        return uncompletedTodos;

      case FilterStatus.COMPLETED:
        return completedTodos;

      case FilterStatus.ALL:
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasActiveTodo && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos?.map((todo) => (
            <div
              key={todo.id}
              className={cn('todo', {
                completed: todo?.completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  defaultChecked={todo?.completed}
                />
              </label>

              <span className="todo__title">{todo?.title}</span>

              {/* Remove button appears only on hover */}
              <button type="button" className="todo__remove">
                ×
              </button>

              {/* overlay will cover the todo while it is being updated */}
              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos?.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">{`${uncompletedTodos?.length} items left`}</span>

            <nav className="filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.ALL,
                })}
                onClick={() => setFilterStatus(FilterStatus.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.ACTIVE,
                })}
                onClick={() => setFilterStatus(FilterStatus.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.COMPLETED,
                })}
                onClick={() => setFilterStatus(FilterStatus.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              style={{ opacity: completedTodos.length > 0 ? '1' : '0' }}
              disabled={!completedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className={cn(
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
          onClick={() => setIsError(false)}
        />
        Unable to load todos
      </div>
    </div>
  );
};
