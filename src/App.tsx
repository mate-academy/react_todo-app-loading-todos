/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/status';
import { Emessage } from './types/Emessage';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [queryStatus, setQueryStatus] = useState(Status.all);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(Emessage.null);
  const inputRef = useRef<HTMLInputElement>(null);
  const storeTimeouts = useRef<NodeJS.Timeout[]>([]);

  const closingErrMessage = () => {
    const storeTimeout = setTimeout(() => {
      setErrMessage(Emessage.null);
    }, 500);

    storeTimeouts.current.push(storeTimeout);
  };

  const handleErrMessage = (message: Emessage) => {
    setErrMessage(message);

    const storeTimeout = setTimeout(() => {
      closingErrMessage();
    }, 2000);

    storeTimeouts.current.push(storeTimeout);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      setIsLoading(true);

      getTodos()
        .then(setTodos)
        .catch(() => handleErrMessage(Emessage.load))
        .finally(() => setIsLoading(false));
    }

    const timeouts = storeTimeouts.current;

    return () => {
      timeouts.forEach(storeTimeout => clearTimeout(storeTimeout));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkedUnchecked = (id: number) => {
    setTodos(existingTodos =>
      existingTodos?.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const todosByStatus = (query = queryStatus) => {
    return todos?.filter(todo => {
      switch (query) {
        case Status.completed:
          return todo.completed;

        case Status.active:
          return !todo.completed;

        case Status.all:
          return todo;
      }
    });
  };

  const hasCompletedTodos = () => {
    return todos.some(todo => todo.completed);
  };

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
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!isLoading && (
          <TodoList
            todosByStatus={todosByStatus}
            checkedUnchecked={checkedUnchecked}
            queryStatus={queryStatus}
          />
        )}

        {!!todos.length && (
          <Footer
            todosByStatus={todosByStatus}
            queryStatus={queryStatus}
            setQueryStatus={setQueryStatus}
            hasCompletedTodos={hasCompletedTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: errMessage === Emessage.null,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closingErrMessage}
        />
        {/* show only one message at a time */}
        {errMessage}
      </div>
    </div>
  );
};
