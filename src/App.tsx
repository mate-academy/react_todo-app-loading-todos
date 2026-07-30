/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';

import { Todo } from './types/Todo';

import { Footer } from './components/footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoApp } from './components/TodoApp/TodoApp';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  //eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    client
      .get(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  //eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [isError]);
  // eslint-disable-next-line no-console

  return (
    <div className="todoapp">
      <Loader isLoading={isLoading} />
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && todos.length > 0 && (
          <TodoApp todos={todos} isLoading={isLoading} />
        )}
        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && <Footer />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification isError={isError} />
    </div>
  );
};
