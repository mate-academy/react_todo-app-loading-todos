/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useState, useCallback,
} from 'react';
import classNames from 'classnames';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterMode } from './types/Filter';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Loader } from './components/Loader/Loader';

const USER_ID = 7028;

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [
    currentFilterMode,
    setCurrentFilterMode,
  ] = useState<FilterMode>(FilterMode.All);

  const showError = (errorText: string) => {
    setErrorMessage(errorText);
    setShouldShowError(true);
    setTimeout(() => {
      setShouldShowError(false);
    }, 3000);
  };

  const handleErrorMessageClose = () => {
    setShouldShowError(false);
  };

  const loadTodosFromServer = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setAllTodos(todosFromServer);
    } catch {
      showError('Failed to load todos from server');
    } finally {
      setIsLoadingTodos(false);
    }
  }, [showError]);

  const visibleTodos = allTodos.filter(({ completed }) => {
    switch (currentFilterMode) {
      case FilterMode.Active:
        return !completed;

      case FilterMode.Completed:
        return completed;

      default:
        return true;
    }
  });

  const activeTodosCounter = visibleTodos.reduce((total, { completed }) => {
    return completed
      ? total
      : total + 1;
  }, 0);

  const hasCompletedTodo = visibleTodos.some(({ completed }) => completed);

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">
        todos
      </h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            aria-label="Toggle"
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              { active: activeTodosCounter },
            )}
          />

          <TodoForm />
        </header>

        {isLoadingTodos && (
          <Loader />
        )}

        {allTodos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${activeTodosCounter} items left`}
              </span>

              <TodosFilter
                currentFilterMode={currentFilterMode}
                onFilterModeChange={setCurrentFilterMode}
              />
              {hasCompletedTodo && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        shouldBeShown={shouldShowError}
        onClose={handleErrorMessageClose}
      />
    </div>
  );
};
