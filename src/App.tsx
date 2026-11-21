import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import classNames from 'classnames';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router-dom';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.None);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(e => {
        setErrorMessage(Errors.UnableToLoadTodos);
        throw e;
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorMessage(Errors.None);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [errorMessage]);

  const { pathname } = useLocation();
  const filteredTodos = todos.filter(todo => {
    if (pathname === '/active') {
      return !todo.completed;
    }

    if (pathname === '/completed') {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header todos={todos} />

      <TodoList todos={filteredTodos} />

      <div className="todoapp__content">
        {todos.length > 0 && <Footer todos={todos} />}
      </div>

      {/* НЕ використовуйте умовне відтворення, щоб приховати сповіщення */}
      {/* Додайте клас "hidden", щоб плавно приховати повідомлення */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: errorMessage === Errors.None,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(Errors.None)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
