/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo as TodoType } from './types/Todo';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

export const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
} as const;

type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .catch(() => {
        setTodos([]);
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isLoading = todos === null;
  const loadedTodos = todos || [];

  const visibleTodos = loadedTodos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  const activeTodos = loadedTodos.filter(todo => !todo.completed);
  const completedTodos = loadedTodos.filter(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: loadedTodos.length > 0 && activeTodos.length === 0,
            })}
            data-cy="ToggleAllButton"
          />

          <NewTodo />
        </header>

        {isLoading && (
          <section className="todoapp__main" data-cy="TodoList">
            <div className="todo">
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </section>
        )}

        {!isLoading && loadedTodos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {!isLoading && loadedTodos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <Filter filter={filter} setFilter={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodos.length === 0}
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
          {
            hidden: !errorMessage,
          },
        )}
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
