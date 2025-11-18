/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import classNames from 'classnames';
import { Header } from './components/Header';
import { MainSection } from './components/MainSection';
import { Footer } from './components/Footer';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [loadTodosError, setLoadTodosError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [addTodosError, setAddTodosError] = useState('');
  const [updateTodosError, setUpdateTodosError] = useState('');
  const [deleteTodosError, setDeleteTodosError] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [errorTimerId, setErrorTimerId] = useState<number | null>(null);

  const error =
    loadTodosError ||
    titleError ||
    addTodosError ||
    updateTodosError ||
    deleteTodosError;

  const visibleTodos = (todos || []).filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      case FilterStatus.All:
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  useEffect(() => {
    const loadTodos = async () => {
      setIsAppLoading(true);
      setLoadTodosError('');

      try {
        const fetchedTodos = await client.get<Todo[]>(
          `/todos?userId=${USER_ID}`,
        );

        setTodos(fetchedTodos);
      } catch (err) {
        setLoadTodosError('Unable to load todos');
      } finally {
        setIsAppLoading(false);
      }
    };

    loadTodos();
  }, []);

  const hideError = () => {
    setLoadTodosError('');
    setTitleError('');
    setAddTodosError('');
    setDeleteTodosError('');
    setUpdateTodosError('');
  };

  useEffect(() => {
    if (error) {
      if (errorTimerId !== null) {
        clearTimeout(errorTimerId);
      }

      const newTimerId = setTimeout(() => {
        hideError();
      }, 3000) as unknown as number;

      setErrorTimerId(newTimerId);
    }

    return () => {
      if (errorTimerId !== null) {
        clearTimeout(errorTimerId);
      }
    };
  }, [error, errorTimerId]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          activeCount={activeCount}
          title={title}
          setTitle={setTitle}
          isAppLoading={isAppLoading}
        />

        {isAppLoading && (
          <p className="notification is-info is-light">Loading todos...</p>
        )}

        <MainSection todos={todos} visibleTodos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            hasCompleted={hasCompleted}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        // FIX 17: Use conditional class to hide/show the notification
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
