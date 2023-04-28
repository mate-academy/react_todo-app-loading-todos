/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TypeFilterin } from './types/FilterTypes';
import { Footer } from './components/Footer';
import { ErrorType } from './types/ErrorType';

const USER_ID = 9940;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    typeOfFiltering,
    setTypeOfFiltering,
  ] = useState<TypeFilterin>(TypeFilterin.All);
  const [dataError, setError] = useState<string>('');

  const getTodos = () => {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  };

  const fetchData = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      setError(ErrorType.Load);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && <TodoList todos={todos} typeOfFiltering={typeOfFiltering} />}

        {/* Hide the footer if there are no todos */}
        {todos && (
          <Footer
            todos={todos}
            setTypeOfFiltering={setTypeOfFiltering}
            typeOfFiltering={typeOfFiltering}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {(dataError.length > 0) && (
        <div className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !dataError },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setError('')}
          />
          {dataError}
        </div>
      )}
    </div>
  );
};
