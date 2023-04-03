import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterMode } from './types/FilterMode';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { ErrorMessage } from './components/ErrorMessage';
import { NewTodoForm } from './components/NewTodoForm';

const USER_ID = 6826;

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
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

  const loadTodosFromServer = async () => {
    setShouldShowError(false);

    try {
      const todosFromServer = await getTodos(USER_ID);

      setAllTodos(todosFromServer);
    } catch (error) {
      showError('Unable to load todos');
    }
  };

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

          <NewTodoForm />
        </header>

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
