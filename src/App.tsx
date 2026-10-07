import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorMessage } from './types/ErrorMessage';

const ERROR_DISPLAY_DURATION = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.None);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    let isCancelled = false;

    setErrorMessage(ErrorMessage.None);

    getTodos()
      .then(loadedTodos => {
        if (!isCancelled) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setErrorMessage(ErrorMessage.Load);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (errorMessage === ErrorMessage.None) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorMessage(ErrorMessage.None);
    }, ERROR_DISPLAY_DURATION);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const handleCloseError = () => {
    setErrorMessage(ErrorMessage.None);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodosCount = todos.filter(({ completed }) => {
    return !completed;
  }).length;

  const hasTodos = todos.length > 0;
  const allTodosCompleted = hasTodos && activeTodosCount === 0;

  const visibleTodos = todos.filter(({ completed }) => {
    switch (status) {
      case Status.Active:
        return !completed;

      case Status.Completed:
        return completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          hasTodos={hasTodos}
          allTodosCompleted={allTodosCompleted}
          title={title}
          inputRef={inputRef}
          onTitleChange={setTitle}
        />

        {hasTodos && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              activeTodosCount={activeTodosCount}
              status={status}
              onStatusChange={setStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification message={errorMessage} onClose={handleCloseError} />
    </div>
  );
};
