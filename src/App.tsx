/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortFilter, setSortFilter] = useState<'All' | 'Active' | 'Completed'>(
    'All',
  );
  const [error, setError] = useState('');

  const preparedTodos = useMemo(() => {
    if (sortFilter === 'Completed') {
      return todos.filter(todo => todo.completed);
    }

    if (sortFilter === 'Active') {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  }, [todos, sortFilter]);

  const todosCounter = todos.filter(todo => !todo.completed).length;

  const CompletedCount = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(resp => {
        setTodos(resp);
      })

      .catch(() => {
        setError('Unable to load todos');
        const timer = setTimeout(() => setError(''), 3000);

        return () => clearTimeout(timer);
      });
  }, []);

  const handleSortFilterChange = (filter: 'All' | 'Active' | 'Completed') => {
    setSortFilter(filter);
  };

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

        <TodoList todos={preparedTodos} />

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosCounter} items left
            </span>

            {/* Active link should have the 'selected' class */}

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: sortFilter === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleSortFilterChange('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: sortFilter === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleSortFilterChange('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: sortFilter === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleSortFilterChange('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}

            {CompletedCount > 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />

        {error}

        {/*
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
        */}
      </div>
    </div>
  );
};
