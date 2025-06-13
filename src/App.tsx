/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { ErrorComponent } from './components/ErrorComponent';
import { useTodoList } from './hooks/useTodoList';
import { Footer } from './components/Footer';
import { useTodosFilter } from './hooks/useTodosFilter';

export const App: React.FC = () => {
  const {
    todos,
    isTodosLoading,
    loadTodosErrorMessage,
    setLoadTodosErrorMessage,
  } = useTodoList();
  const { statusFilter, setStatusFilter, filteredTodos } =
    useTodosFilter(todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeItemsCount = todos.filter(todo => !todo.completed).length;

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

        {!isTodosLoading && Boolean(todos.length) && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              activeTodosCount={activeItemsCount}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </>
        )}
      </div>

      <ErrorComponent
        errorMessage={loadTodosErrorMessage}
        setErrorMessage={setLoadTodosErrorMessage}
      />
    </div>
  );
};
