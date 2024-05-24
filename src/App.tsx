import React, { useState, useEffect } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Errors } from './types/Errors';
import { FilterBy } from './types/FiilterBy';
import { ErrorNotification } from './ErrorNotification';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.Load);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(null), 3000);
    }
  }, [errorMessage]);

  const handleClearingError = () => setErrorMessage(null);
  const handleChangingFilterBy = (value: FilterBy) => setFilterBy(value);
  const handleClearingCompletedTodos = () =>
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));

  const visibleTodos = getFilteredTodos(todos, filterBy);

  const activeTodosCount: number = todos.filter(todo => !todo.completed).length;

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

        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              onFilterClick={handleChangingFilterBy}
              activeTodosCount={activeTodosCount}
              onClearCompleted={handleClearingCompletedTodos}
              selectedFilterBy={filterBy}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onDeleteClick={handleClearingError}
      />
    </div>
  );
};
