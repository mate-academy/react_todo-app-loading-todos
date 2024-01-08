/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Content/Header/Header';
import { Footer } from './components/Header/Content/Footer/Footer';
import { client } from './utils/fetchClient';
import { TodoList } from './components/Header/Content/Main/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

const USER_ID = '/todos?user@@@Id=12151';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [error, setError] = useState(false);

  const handleStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const handleCloseNotification = () => {
    setError(false);
  };

  useEffect(() => {
    client.get<Todo[]>(USER_ID)
      .then(setTodos)
      .catch(newError => {
        setError(true);
        throw newError;
      });
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(false), 3000);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={todos}
          status={status}
        />

        {!!todos.length && (
          <Footer
            todos={todos}
            newStatus={handleStatus}
            status={status}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className={cn('delete', {
              hidden: error,
            })}
            onClick={handleCloseNotification}
          />
          {/* show only one message at a time */}
          Unable to load todos
        </div>
      )}

    </div>
  );
};
