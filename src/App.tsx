/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { Error } from './types/Error';

import { Header } from './conponents/Header/Header';
import { TodoList } from './conponents/TodoList/TodoList';
import { Footer } from './conponents/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterBy, setFilterBy] = useState(Status.All);

  const title = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError(Error.UnableLoad))
      .finally(() => {
        setTimeout(() => {
          setError('');
        }, 3000);
      });
    title.current?.focus();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header title={title} />

        <TodoList todos={todos} filterBy={filterBy} />

        {!!todos.length && (
          <Footer todos={todos} filterBy={filterBy} setFilterBy={setFilterBy} />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
      </div>
    </div>
  );
};
