/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

type FilterType = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filterTodos = (todosList: Todo[], filterType: FilterType) => {
    switch (filterType) {
      case 'active':
        return todosList.filter(todo => !todo.completed);
      case 'completed':
        return todosList.filter(todo => todo.completed);
      case 'all':
      default:
        return todosList;
    }
  };

  useEffect(() => {
    // Fetch todos from API and set them in state
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => setError('Unable to load todos'));
  }, []);

  // Auto-hide error after 3 seconds
  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [error]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2) as FilterType;
      // Правильно: якщо хеш порожній, встановлюємо 'all'

      setFilter((hash || 'all') as FilterType);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
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
          <button
            type="button"
            className={`todoapp__toggle-all${
              todos.length > 0 && todos.every(todo => todo.completed)
                ? ' active'
                : ''
            }`}
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
        {todos.length > 0 && (
          <>
            <TodoList todos={filterTodos(todos, filter)} />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link${filter === 'all' ? ' selected' : ''}`}
                  data-cy="FilterLinkAll"
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link${filter === 'active' ? ' selected' : ''}`}
                  data-cy="FilterLinkActive"
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link${filter === 'completed' ? ' selected' : ''}`}
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
                style={{
                  visibility: todos.some(todo => todo.completed)
                    ? 'visible'
                    : 'hidden',
                }}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`
          notification
          is-danger
          is-light
          has-text-weight-normal
          ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
