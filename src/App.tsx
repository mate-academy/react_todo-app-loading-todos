/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from './components/ErrorNotification/Index';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.noError,
  );

  useEffect(() => {
    setErrorMessage(ErrorMessage.noError);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.unableToLoad));
  }, []);

  function getVisibleTodos(): Todo[] {
    switch (status) {
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }

  const visibleTodos = getVisibleTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer todos={todos} status={status} onStatusChange={setStatus} />
          </>
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessageChange={setErrorMessage}
      />
    </div>
  );
};
