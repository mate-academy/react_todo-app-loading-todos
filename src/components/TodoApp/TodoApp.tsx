import React, { useEffect, useState } from 'react';
import { UserWarning } from '../../UserWarning';
import { USER_ID, getTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { Header } from '../Header/Header';
import { TodoList } from '../TodoList/TodoList';
import { Footer } from '../Footer/Footer';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState(Status.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage(`Unable to load todos`);
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (errorMessage || (todos.length === 0 && !loading)) {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return;
  }, [errorMessage, todos, loading]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={todos} statusFilter={statusFilter} />

        {!!todos.length && (
          <Footer
            todos={todos}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
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
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
