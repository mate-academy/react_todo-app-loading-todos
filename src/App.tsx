/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosApi from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { getVisibleTodos } from './utils/getVisibletodos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.All);

  useEffect(() => {
    todosApi
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const handleSetError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const visibleTodos = getVisibleTodos(todos, status);

  if (!todosApi.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!error && !!todos.length && (
          <>
            <TodoList visibleTodos={visibleTodos} />
            <Footer
              todos={todos}
              status={status}
              setStatus={handleStatusChange}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} setError={handleSetError} />
    </div>
  );
};
