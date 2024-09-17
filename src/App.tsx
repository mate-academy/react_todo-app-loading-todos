/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosServices from './api/todos';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { TodoList } from './component/TodoList';
import { ErrorNotification } from './component/ErrorNotification';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getVisibleTodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState(Status.All);

  useEffect(() => {
    todosServices
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const visibleTodos = getVisibleTodos(todos, status);

  if (!todosServices.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!errorMessage && !!todos.length && (
          <>
            <TodoList visibleTodos={visibleTodos} />
            <Footer todos={todos} status={status} setStatus={setStatus} />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
