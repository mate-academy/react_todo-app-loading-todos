/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import cn from 'classnames';

// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';

import * as todoService from './api/todos';

export type FilterStatus = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setloading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [filter, setFilter] = useState<FilterStatus>('All');

  const haveTodos = todos.length > 0;
  const activeTodosCount = todos.filter(t => !t.completed).length;

  function handleError(message: string) {
    setError(message);

    setTimeout(() => {
      setError('');
    }, 3000);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleStatusSwitch(todoId: number, todoStatus: boolean) {}

  function handleErrorReset() {
    setError('');
  }

  useEffect(() => {
    setError('');
    setloading(true);
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'))
      .finally(() => setloading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      filter === 'All' ||
      (filter === 'Completed' && todo.completed) ||
      (filter === 'Active' && !todo.completed);

    return matchesStatus;
  });

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
          {visibleTodos.map(todo => {
            return (
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
                    onClick={() => handleStatusSwitch(todo.id, todo.completed)}
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
            );
          })}
        </section>

        {haveTodos && (
          <footer
            className={cn('todoapp__footer', { hidden: !haveTodos })}
            data-cy="Footer"
          >
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', { selected: filter === 'All' })}
                onClick={() => setFilter('All')}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === 'Active',
                })}
                onClick={() => setFilter('Active')}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === 'Completed',
                })}
                onClick={() => setFilter('Completed')}
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
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => handleErrorReset()}
        />
        {error}
        <br />
      </div>
    </div>
  );
};
