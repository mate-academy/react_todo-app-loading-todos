/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { useApp } from './hooks/UseApp';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const {
    visibleTodos,
    hasTodos,
    activeCount,
    hasCompleted,
    isAllCompleted,
    filter,
    setFilter,
    errorMessage,
    clearError,
  } = useApp();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {hasTodos && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              activeCount={activeCount}
              hasCompleted={hasCompleted}
              filter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification message={errorMessage} onClose={clearError} />
    </div>
  );
};
