/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

const filterTypes = ['all', 'active', 'completed'] as const;

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [filterType, setFilterType] =
    React.useState<(typeof filterTypes)[number]>('all');

  React.useEffect(() => {
    setIsError(false);
    getTodos()
      .then(loadedTodos => setTodos(loadedTodos))
      .catch(() => setIsError(true));
  }, []);

  React.useEffect(() => {
    if (!isError) {
      return;
    }

    const timer = setTimeout(() => {
      setIsError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isError]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const visibleTodos = todos.filter(todo => {
    if (filterType === 'active') {
      return !todo.completed;
    }

    if (filterType === 'completed') {
      return todo.completed;
    }

    return true;
  });
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const areAllTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

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
            className={cn('todoapp__toggle-all', {
              active: areAllTodosCompleted,
            })}
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
          {visibleTodos.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
              key={todo.id}
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
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount}
              {` ${activeTodosCount === 1 ? 'item' : 'items'} left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterType === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterType('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterType === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterType('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterType === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterType('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !isError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError(false)}
        />
        Unable to load todos
      </div>
    </div>
  );
};
