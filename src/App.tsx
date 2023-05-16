/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { Footer } from './components/Footer';
// eslint-disable-next-line import/no-cycle
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 10380;

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum ErrorType {
  Get = 'get',
  Post = 'post',
  Delete = 'delete',
  Patch = 'patch',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  let visibleTodos: Todo[] | null | undefined = todos;

  const activeTodos = todos?.filter(
    todo => todo.completed === false,
  );

  function filterTodos() {
    switch (filterStatus) {
      case Filter.All:
        return todos;
      case Filter.Completed:
        return todos?.filter(todo => todo.completed === true);
      case Filter.Active:
        return todos?.filter(todo => todo.completed === false);
      default:
        return todos;
    }
  }

  visibleTodos = useMemo(
    filterTodos,
    [todos, filterStatus],
  );

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      // eslint-disable-next-line no-console
      .catch(() => {
        setError(ErrorType.Get);
        setTimeout(() => setError(null), 3000);
      });
  }, []);

  const handleFilter = (status: Filter) => {
    setFilterStatus(status);
  };

  const handleError = (type: ErrorType | null) => {
    setError(type);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && (
          <>
            <section className="todoapp__main">
              {visibleTodos && <TodoList todos={visibleTodos} />}
            </section>

            <Footer
              filterStatus={filterStatus}
              onFilterChange={handleFilter}
              numberOfTodos={activeTodos?.length}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} onError={handleError} />
    </div>
  );
};
