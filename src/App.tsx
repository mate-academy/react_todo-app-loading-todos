/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { SelectedFiltering } from './types/SelectedType';
import { TodoList } from './TodoMain/TodoList';
import { TodoLoadingError } from './TodoLoadingError';

const USER_ID = 10397;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const [filteringBy, setFilteringBy] = useState(SelectedFiltering.All);

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
      case SelectedFiltering.Active:
        return !completed;

      case SelectedFiltering.Completed:
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
        {!isLoading && <TodoList visibleTodos={visibleTodos} />}

        {isLoading && (
          <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}

        {isLoadingError && <TodoLoadingError />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link', {
                    selected: filteringBy === SelectedFiltering.All,
                  },
                )}
                onClick={() => setFilteringBy(SelectedFiltering.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link', {
                    selected: filteringBy === SelectedFiltering.Active,
                  },
                )}
                onClick={() => setFilteringBy(SelectedFiltering.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link', {
                    selected: filteringBy === SelectedFiltering.Completed,
                  },
                )}
                onClick={() => setFilteringBy(SelectedFiltering.Completed)}
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
    </div>
  );
};
