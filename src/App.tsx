import React, { useState, useEffect, useMemo } from 'react';
import { getTodos } from './api/todos';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer/Footer';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorType } from './types/ErrorType';
import { activeTodosAmount, completedTodosAmount } from './helpers';

const USER_ID = 6373;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterByStatus, setFilterByStatus]
    = useState<FilterStatus>(FilterStatus.All);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.None);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setHasError(true);
        setErrorType(ErrorType.Load);
      }
    };

    getTodosFromServer();
  }, []);

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filterByStatus) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterByStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodosAmount={activeTodosAmount(todos)} />

        <TodoList todos={filterTodos} />

        {todos.length && (
          <Footer
            activeTodosAmount={activeTodosAmount(todos)}
            completedTodosAmount={completedTodosAmount(todos)}
            filterByStatus={filterByStatus}
            setFilterByStatus={setFilterByStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorType={errorType}
        hasError={hasError}
        onNotificationClose={() => setHasError(false)}
      />
    </div>
  );
};
