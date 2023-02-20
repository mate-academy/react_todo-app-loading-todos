import React, { useState, useEffect, useMemo } from 'react';
import { getTodos } from './api/todos';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer/Footer';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorType } from './types/ErrorType';

const USER_ID = 6373;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterByStatus, setFilterByStatus] = useState(FilterStatus.All);
  const [errorType, setErrorType] = useState(ErrorType.None);
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

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filterByStatus) {
        case FilterStatus.All:
          return true;

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
        <Header activeTodos={activeTodos} />

        <TodoList todos={filterTodos} />

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
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
