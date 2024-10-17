import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { getFilteredTodos } from './utils/getFilteredTodo';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterType.all);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.default,
  );

  const allIsCompleted = todos.every(todo => todo.completed);

  const handleFilterChange = useCallback((filterBy: FilterType) => {
    setFilter(filterBy);
  }, []);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter],
  );

  const handleRemoveError = () => {
    setErrorMessage(ErrorType.default);
  };

  const handleErrorMessage = useCallback((error: ErrorType) => {
    setErrorMessage(error);

    setTimeout(handleRemoveError, 3000);
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleErrorMessage(ErrorType.load));
  }, [errorMessage, handleErrorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: allIsCompleted })}
            data-cy="ToggleAllButton"
          />

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

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            filterBy={filter}
            setFilter={handleFilterChange}
            todos={todos}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage?.length,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleRemoveError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
