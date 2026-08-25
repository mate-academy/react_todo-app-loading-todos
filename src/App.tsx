/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorMessages } from './types/ErrorMessages';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { filterTodos } from './utils/filterTodos';

const ERROR_DELAY = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.None,
  );

  const errorTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const showError = (message: ErrorMessages) => {
    window.clearTimeout(errorTimerRef.current);
    setErrorMessage(message);

    errorTimerRef.current = setTimeout(() => {
      setErrorMessage(ErrorMessages.None);
    }, ERROR_DELAY);
  };

  const hideError = () => {
    window.clearTimeout(errorTimerRef.current);
    setErrorMessage(ErrorMessages.None);
  };

  useEffect(() => {
    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessages.UnableToLoad));

    return () => window.clearTimeout(errorTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(todos, status),
    [todos, status],
  );

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={event => event.preventDefault()}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer todos={todos} status={status} onStatusChange={setStatus} />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} onClose={hideError} />
    </div>
  );
};
