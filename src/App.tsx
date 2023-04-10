/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { ApiError } from './types/ApiError';
import { filterTodos, FilterType } from './helpers/filterTodos';

const USER_ID = 6950;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState(ApiError.None);
  const [filterType, setFilterType] = useState(FilterType.None);

  const fetchTodos = async () => {
    try {
      const apiTodos = await getTodos(USER_ID);

      setTodos(apiTodos);
    } catch {
      setHasError(true);
      setErrorType(ApiError.Get);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filterType),
    [filterType, todos],
  );

  const getHasCompletedTodos = () => {
    return todos.some(({ completed }) => completed);
  };

  const getActiveTodosCount = () => {
    return todos.filter(({ completed }) => !completed).length;
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {!todos.length
          || (
            <Footer
              activeTodosCount={getActiveTodosCount()}
              hasCompletedTodo={getHasCompletedTodos()}
              setFilter={setFilterType}
              filterType={filterType}
            />
          )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasError && (
        <ErrorMessage errorType={errorType} />
      )}
    </div>
  );
};
