/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Status } from './types/Status';
import classNames from 'classnames';
import { Footer } from './components/Footer';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [status, setStatus] = useState<Status>(Status.All);

  const focusedInput = useRef<HTMLInputElement | null>(null);
  const timerId = useRef<null | number>(null);

  useEffect(() => {
    if (todos.length > 0) {
      return;
    }

    focusedInput.current?.focus();
  }, [todos]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);

        if (timerId.current !== null) {
          clearTimeout(timerId.current);
        }

        timerId.current = window.setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  const preperedTodos = useMemo(() => {
    return todos.filter(todo => {
      if (status === Status.Completed) {
        return todo.completed;
      }

      if (status === Status.Active) {
        return !todo.completed;
      } else {
        return todo;
      }
    });
  }, [todos, status]);

  const itemsLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const areAllTodosActive = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const isCompletedTodo = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areAllTodosActive,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={focusedInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={preperedTodos} />

        {todos.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            status={status}
            onChangeStatus={setStatus}
            isCompletedTodo={isCompletedTodo}
          />
        )}
      </div>

      <ErrorNotification
        error={errorMessage}
        onDeleteMessage={setErrorMessage}
      />
    </div>
  );
};
