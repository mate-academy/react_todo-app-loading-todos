/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { getFilteredTodos } from './utils/getFilteredTodos';

export type Status = 'all' | 'active' | 'completed';

export const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [status, setStatus] = useState<Status>('all');

  const filteredTodos = getFilteredTodos(todos, { status });

  const isNoError = !isLoadingError;

  const isAllTodosCompleted = todos.every(todo => todo.completed);
  const isAnyTodosCompleted = todos.some(todo => todo.completed);
  const notCompletedTodosCount = todos.reduce(
    (acc, { completed }) => acc + (completed ? 0 : 1),
    0,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setIsLoadingError(true))
      .finally(() => {
        setTimeout(() => {
          setIsLoadingError(false);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {filteredTodos.length !== 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: isAllTodosCompleted,
              })}
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
          {filteredTodos.map(todo => (
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

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${notCompletedTodosCount} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: status === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setStatus('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: status === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setStatus('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: status === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setStatus('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!isAnyTodosCompleted}
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
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: isNoError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsLoadingError(!isLoadingError)}
        />
        {/* show only one message at a time */}
        {isLoadingError && 'Unable to load todos'}
        {/* <br />
        Title should not be empty
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
