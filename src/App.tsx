/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11613;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  const displayTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      if (statusFilter === 'active' && todo.completed) {
        return false;
      }

      if (statusFilter === 'completed' && !todo.completed) {
        return false;
      }

      return true;
    });
  }, [statusFilter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoItem
          userId={USER_ID}
          todos={displayTodos}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={`filter__link ${statusFilter === 'all' ? 'selected' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${statusFilter === 'active' ? 'selected' : ''}`}
                onClick={() => setStatusFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${statusFilter === 'completed' ? 'selected' : ''}`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div className={`notification is-danger is-light has-text-weight-normal
        ${!errorMessage && 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}

      </div>
    </div>
  );
};
