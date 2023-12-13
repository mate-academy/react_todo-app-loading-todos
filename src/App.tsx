/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { Status } from './types/Status';
import { preperedTodos } from './helpers';
import { Error } from './types/Error';
import { ErrorMessages } from './components/ErrorMessages';

const USER_ID = 12013;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.ALL);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);

  const hasCompletedTodos = todos.some(todo => todo.completed);
  const uncompletedTodos = todos.filter(todo => !todo.completed).length;

  const showError = (error: Error) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const handleSelectFilter = (status: Status) => {
    setSelectedFilter(status);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => (showError(Error.NOT_LOADED_TODO)));
  }, []);

  const visibleTodos = useMemo(() => {
    return preperedTodos(todos, selectedFilter);
  }, [selectedFilter, todos]);

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
            className={cn(
              'todoapp__toggle-all',
              { active: todos.every(todo => todo.completed) },
            )}
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

        <TodoList
          todos={visibleTodos}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${uncompletedTodos} items left`}
            </span>

            <TodosFilter
              selectedFilter={selectedFilter}
              handleSelectFilter={handleSelectFilter}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompletedTodos}
            >
              Clear completed
            </button>

          </footer>
        )}

      </div>

      <ErrorMessages
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
