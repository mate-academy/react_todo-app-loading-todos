/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Filter } from './components/Filter';

export const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    setHasError(false);

    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    if (filter === FILTERS.active) {
      return !todo.completed;
    }

    if (filter === FILTERS.completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  const allTodosCompleted = todos.length > 0 && completedTodos === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allTodosCompleted,
            })}
            data-cy="ToggleAllButton"
          />

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
              </span>

              <Filter currentFilter={filter} onFilterChange={setFilter} />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={completedTodos === 0}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !hasError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasError(false)}
        />
        Unable to load todos
      </div>
    </div>
  );
};
