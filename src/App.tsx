/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorContext, ErrorsMessageContext } from './components/ErrorsContext';
import { ShowErrorsMessage } from './utils/fetchClient';

const USER_ID = 11969;

// 11969
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isError, setIsError } = useContext(ErrorContext);
  const { errorsMesage, setErrorsMesage } = useContext(ErrorsMessageContext);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        setIsError(false);
        setErrorsMesage('load');
      });
  }, [setErrorsMesage, setIsError]);

  return (
    <div className="todoapp">

      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header todos={todos} />
        <TodoList />

        {(todos.length > 0) && (
          <Footer todos={todos} />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        // eslint-disable-next-line max-len
        className={cn('notification is-danger is-light has-text-weight-normal', { hidden: isError })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onMouseDown={() => {
            setIsError(true);
          }}
        />
        {/* show only one message at a time */}
        {ShowErrorsMessage(errorsMesage)}
      </div>
    </div>
  );
};
