import React, { useCallback, useEffect, useState } from 'react';
import {
  Footer, Header, Notification, TodoList,
} from './components';
import { ErrorMessage, FilterBy, Todo } from './types';
import { getTodos } from './api/todos';
import { countActiveTodos, getFilteredTodos } from './utils';

const USER_ID = 5554;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.NONE);

  const visibleTodos = getFilteredTodos(todos, filterType);
  const activeTodosCount = countActiveTodos(todos);
  const hasCompletedTodos = !!(todos.length - activeTodosCount);

  const isFooterVisible = !!todos.length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(() => {
        setHasError(true);
        setErrorMessage(ErrorMessage.LOAD);
      });
  }, []);

  const clearNotification = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main">
          <TodoList todos={visibleTodos} />
        </section>

        {isFooterVisible && (
          <Footer
            activeTodosCount={activeTodosCount}
            filterType={filterType}
            setFilter={setFilterType}
            isClearButtonVisible={hasCompletedTodos}
          />
        )}

      </div>

      <Notification
        visible={hasError}
        message={errorMessage}
        onClear={clearNotification}
      />
    </div>
  );
};
