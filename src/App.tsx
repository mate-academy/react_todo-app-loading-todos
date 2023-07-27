import React, { useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';

import { getTodos } from './api/todos';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { USER_ID } from './utils/constants';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setErrorMessage('Unable to upload todos');

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    })();
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, status);
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodoList todos={filteredTodos} />
            </section>

            <TodoFooter status={status} onStatusChange={setStatus} />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          error={errorMessage}
          setError={setErrorMessage}
        />
      )}
    </div>
  );
};
