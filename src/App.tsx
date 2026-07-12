/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setIsErrorVisible(false);
      setErrorMessage('');

      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setErrorMessage('Unable to load todos');
        setIsErrorVisible(true);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!isErrorVisible) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setIsErrorVisible(false);
    }, 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [errorMessage, isErrorVisible]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FILTERS.active:
        return todos.filter(todo => !todo.completed);
      case FILTERS.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const areAllCompleted = todos.length > 0 && todos.every(todo => todo.completed);

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
            className={classNames('todoapp__toggle-all', {
              active: areAllCompleted,
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
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
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

                <button type="button" className="todo__remove" data-cy="TodoDelete">
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} item${activeTodosCount === 1 ? '' : 's'} left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.all,
                })}
                data-cy="FilterLinkAll"
                onClick={event => {
                  event.preventDefault();
                  setFilter(FILTERS.all);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.active,
                })}
                data-cy="FilterLinkActive"
                onClick={event => {
                  event.preventDefault();
                  setFilter(FILTERS.active);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={event => {
                  event.preventDefault();
                  setFilter(FILTERS.completed);
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isErrorVisible },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsErrorVisible(false)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
