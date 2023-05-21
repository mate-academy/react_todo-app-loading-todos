/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';
import { TodoList } from './TodoMain/TodoList';
import { TodoLoadingError } from './TodoLoadingError';

const USER_ID = 10397;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const [filteringBy, setFilteringBy] = useState(TodoFilter.All);

  const loadTodos = useCallback(async () => {
    setIsLoadingError(false);
    setIsLoading(true);

    try {
      const todosFromServer: Todo[] = await getTodos(USER_ID);

      setIsLoading(false);
      setTodos(todosFromServer);
    } catch (error) {
      setIsLoadingError(true);
    }
  }, []);

  useEffect(
    () => {
      loadTodos();
    },
    [],
  );

  const visibleTodos = todos.filter(({ completed }) => {
    switch (filteringBy) {
      case TodoFilter.Active:
        return !completed;

      case TodoFilter.Completed:
        return completed;

      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {!isLoading && <TodoList visibleTodos={visibleTodos} />}

        {isLoading && (
          <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}

        {isLoadingError && <TodoLoadingError />}

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link', {
                    selected: filteringBy === TodoFilter.All,
                  },
                )}
                onClick={() => setFilteringBy(TodoFilter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link', {
                    selected: filteringBy === TodoFilter.Active,
                  },
                )}
                onClick={() => setFilteringBy(TodoFilter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link', {
                    selected: filteringBy === TodoFilter.Completed,
                  },
                )}
                onClick={() => setFilteringBy(TodoFilter.Completed)}
              >
                Completed
              </a>
            </nav>

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
