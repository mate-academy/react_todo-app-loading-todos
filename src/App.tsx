import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import type { Todo } from './types/Todo';
import { Filter, FilterStatus } from './components/Filter';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const shouldShowUserWarning = !USER_ID;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const hideErrorTimeoutIdRef = useRef<number | null>(null);

  const clearErrorTimer = useCallback(() => {
    if (hideErrorTimeoutIdRef.current) {
      window.clearTimeout(hideErrorTimeoutIdRef.current);
      hideErrorTimeoutIdRef.current = null;
    }
  }, []);

  const hideError = useCallback(() => {
    clearErrorTimer();
    setErrorMessage(null);
  }, [clearErrorTimer]);

  const showError = useCallback(
    (message: string) => {
      setErrorMessage(message);
      clearErrorTimer();
      hideErrorTimeoutIdRef.current = window.setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    },
    [clearErrorTimer],
  );

  useEffect(() => {
    newTodoInputRef.current?.focus();

    (async () => {
      try {
        hideError();
        setIsLoading(true);
        const data = await getTodos();

        setTodos(data);
      } catch {
        showError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    })();

    return () => clearErrorTimer();
  }, [hideError, showError, clearErrorTimer]);

  const filteredTodos =
    filterStatus === FilterStatus.Active
      ? todos.filter(todo => !todo.completed)
      : filterStatus === FilterStatus.Completed
        ? todos.filter(todo => todo.completed)
        : todos;

  const hasTodos = todos.length > 0;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleToggleAllClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFilterChange = (nextStatus: FilterStatus) => {
    setFilterStatus(nextStatus);
  };

  const handleErrorClose = () => {
    hideError();
    newTodoInputRef.current?.focus();
  };

  const handleNewTodoFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (shouldShowUserWarning) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            data-cy="ToggleAllButton"
            className={cn('todoapp__toggle-all', {
              active: activeTodosCount === 0 && hasTodos,
            })}
            onClick={handleToggleAllClick}
            disabled
            aria-label="toggle all"
          />

          <form onSubmit={handleNewTodoFormSubmit}>
            <input
              ref={newTodoInputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={isLoading}
            />
          </form>
        </header>

        {hasTodos && <TodoList todos={filteredTodos} isLoading={isLoading} />}

        {hasTodos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <Filter value={filterStatus} onChange={handleFilterChange} />

            <button
              data-cy="ClearCompletedButton"
              className="todoapp__clear-completed"
              disabled
              type="button"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <Notification message={errorMessage} onClose={handleErrorClose} />
    </div>
  );
};
