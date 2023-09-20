/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorType } from './types/ErrorType';
import { StatusFilter } from './types/StatusFilter';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 11465;

const getFilterTodos = (
  todos: Todo[],
  statusFilter: StatusFilter,
): Todo[] => {
  let filteredTodos: Todo[] = [];

  switch (statusFilter) {
    case StatusFilter.All: {
      filteredTodos = todos;
      break;
    }

    case StatusFilter.Active: {
      filteredTodos = todos.filter(todo => todo.completed === false);

      break;
    }

    case StatusFilter.Completed: {
      filteredTodos = todos.filter(todo => todo.completed === true);

      break;
    }

    default: filteredTodos = todos;
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadig, setIsLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>(StatusFilter.All);
  const [isShowError, setIsShowError] = useState<ErrorType | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos(USER_ID)
      .then(todoFromServer => {
        setTodos(todoFromServer);
        setIsLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
        setIsShowError(ErrorType.GetData);
        setIsLoading(false);
      });

    const timeoutId = setTimeout(() => {
      setIsShowError(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getFilterTodos(todos, status);
  const countActiveTodos = todos
    .filter(todo => todo.completed === false)
    .length;

  const handleStatusChange = (filteredKey: StatusFilter) => {
    setStatus(filteredKey);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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
        {!isLoadig && (
          <>
            <TodoList todos={visibleTodos} />

            {!!todos.length && (
              <TodoFilter
                status={status}
                handleStatusChange={handleStatusChange}
                countActiveTodos={countActiveTodos}
              />
            )}

          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isShowError && (
        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification',
            'is-danger',
            'is-light',
            'has-text-weight-normal',
            { hidden: !isShowError },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setIsShowError(null)}
          />
          {isShowError}
        </div>
      )}
    </div>
  );
};
