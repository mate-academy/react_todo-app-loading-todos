/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { StatusFilterValue, Todo } from './types/Todo';
import { TodoList } from './TodoList/TodoList';
import classNames from 'classnames';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');

  const getPreparedTodos = () => {
    let result = [...todos];

    if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    return result;
  };

  const preparedTodos = getPreparedTodos();

  useEffect(() => {
    setShowError(false);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

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

        {preparedTodos.length > 0 && <TodoList todos={preparedTodos} />}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                onClick={e => {
                  e.preventDefault();
                  setStatusFilter('all');
                }}
                className={classNames('filter__link', {
                  selected: statusFilter === 'all',
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                onClick={e => {
                  e.preventDefault();
                  setStatusFilter('active');
                }}
                className={classNames('filter__link', {
                  selected: statusFilter === 'active',
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                onClick={e => {
                  e.preventDefault();
                  setStatusFilter('completed');
                }}
                className={classNames('filter__link', {
                  selected: statusFilter === 'completed',
                })}
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
              disabled={!completedTodos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
        {/* Hide the footer if there are no todos */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage message={error} show={showError} setShow={setShowError} />
    </div>
  );
};
