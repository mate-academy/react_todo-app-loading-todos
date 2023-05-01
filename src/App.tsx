/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TypeOfFiltering } from './types/TypeOfFiltering';
import { Footer } from './components/Footer';
import { ErrorType } from './types/ErrorType';

const USER_ID = 9940;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<TypeOfFiltering>(
    TypeOfFiltering.All,
  );
  const [dataError, setError] = useState<string>('');

  const getTodos = () => {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  };

  let timeoutId: ReturnType<typeof setTimeout>;

  const fetchData = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      setError(ErrorType.Load);
      timeoutId = setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && <TodoList todos={todos} filterType={filterType} />}

        {(todos.length !== 0) && (
          <Footer
            todos={todos}
            setFilterType={setFilterType}
            filterType={filterType}
          />
        )}
      </div>

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
