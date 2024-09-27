/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { todosContext } from './Store';
import classNames from 'classnames';
import { Footer } from './components/Footer/Footer';
import { errorText } from './constants';
import { filterTodos } from './utils/utils';

export const App: React.FC = () => {
  const { todos, setTodos, filter, errorMessage, setErrorMessage } =
    useContext(todosContext);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        if (todosFromServer) {
          setTodos(todosFromServer);
        } else {
          setTodos([]);
        }
      })
      .catch(() => {
        setErrorMessage(errorText.noTodos);
      });

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  const displayedTodos = filterTodos(todos, filter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!!todos.length && (
          <>
            <TodoList todos={displayedTodos} />
            <Footer />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
