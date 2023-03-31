/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { Filters } from './utils/enums';

const USER_ID = 6816;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hideNotification, setHideNotification] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(Filters.All);

  const loadTodosFromServer = async (userId: number) => {
    try {
      setIsLoading(true);
      setError('');
      setHideNotification(true);
      const result = await getTodos(userId);

      setTodos(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setHideNotification(false);
        setTimeout(setHideNotification, 3000, [true]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodosFromServer(USER_ID);
  }, []);

  const activeTodos = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header />

        {isLoading && (
          <Loader />
        )}

        <TodoList
          todos={todos}
          filterBy={selectedFilter}
        />

        {todos.length > 0 && (
          <Footer
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            activeTodos={activeTodos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: hideNotification },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setHideNotification(true)}
        />
        {error}
      </div>
    </div>
  );
};
