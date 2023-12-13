import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { TodoList } from '../TodoList';
import { getTodos } from '../../api/todos';
import { useTodosContext } from '../store';
import { useUncomplitedTodos } from '../../helpers/useUncomplitedTodos';
import { TodoFilter } from '../TodoFilter';
import { useComplitedTodos } from '../../helpers/useComplitedTodos';

const USER_ID = 12027;

export const TodoApp: React.FC = () => {
  const { todos, reciveTodos } = useTodosContext();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('');

  const compTodosLength = useComplitedTodos().length;
  const uncompTodosLength = useUncomplitedTodos().length;

  const resetHasError = () => {
    setHasError('');
  };

  const handlerErrors = useCallback(
    (errMessage: string) => {
      setHasError(errMessage);

      setTimeout(() => resetHasError(), 3000);
    },
    [],
  );

  useEffect(() => {
    resetHasError();

    getTodos(USER_ID)
      .then(todosFS => {
        reciveTodos(todosFS);
      })
      .catch(() => handlerErrors('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, [handlerErrors, reciveTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            aria-label="toggleAll"
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
        {!isLoading && <TodoList />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${uncompTodosLength} items left`}
            </span>

            <TodoFilter />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={compTodosLength === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !hasError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          aria-label="hideErrorBtn"
          type="button"
          className="delete"
          onClick={() => resetHasError()}
        />
        {hasError}
      </div>
    </div>
  );
};
