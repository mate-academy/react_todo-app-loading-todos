/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (USER_ID) {
      setError(null);
      getTodos()
        .then(setTodos)
        .catch(() => {
          setError('Unable to load todos');
        });
    }
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodos = todos.filter(todo => !todo.completed);

  const errorClasses = `notification is-danger is-light has-text-weight-normal ${
    !error ? 'hidden' : ''
  }`;

  return (
    <div className="todoapp">
      <h2>Todo App</h2>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
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
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => {}}
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
                    {/* prettier-ignore */}
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodos.length} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link ${
                    filter === 'all' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkAll"
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${
                    filter === 'active' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkActive"
                  onClick={() => handleFilterChange('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${
                    filter === 'completed' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkCompleted"
                  onClick={() => handleFilterChange('completed')}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!todos.some(todo => todo.completed)}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div data-cy="ErrorNotification" className={errorClasses}>
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};
