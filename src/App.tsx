/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { ErrorMessages } from './components/ErrorMessages';
import { TodoItem } from './components/TodoItem';
import { StatusFilter } from './components/StatusFilter';
import React from 'react';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const {
    todosLoading,
    errorMessage,
    statusFilter,
    setStatusFilter,
    handleHideError,
    visibleFooter,
    filteredTodos,
    activeTodos,
    completedTodos,
  } = useTodos();

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
        {!todosLoading && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            {visibleFooter && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {activeTodos} items left
                </span>

                <StatusFilter
                  statusFilter={statusFilter}
                  onStatusFilter={setStatusFilter}
                />
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
          </>
        )}
      </div>
      <ErrorMessages
        errorMessage={errorMessage}
        onHideError={handleHideError}
      />
    </div>
  );
};
