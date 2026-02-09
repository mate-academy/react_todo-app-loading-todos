import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ERRORS, FILTERS, Todo, TodoFilter } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [filter, setFilter] = useState<TodoFilter>('All');
  const [loadingTodoIds, setLoadingTodoids] = useState<number[]>([]);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const isAllCompleted = todos.length > 0 && activeCount === 0;

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ERRORS.LOAD));
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      switch (hash) {
        case '#/active':
          setFilter(FILTERS.ACTIVE);
          break;
        case '#/completed':
          setFilter(FILTERS.COMPLETED);
          break;
        default:
          setFilter(FILTERS.ALL);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FILTERS.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header allCompleted={isAllCompleted} />
        {todos.length > 0 && (
          <TodoList
            visibleTodos={visibleTodos}
            loadingTodoIds={loadingTodoIds}
          />
        )}
        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            filter={filter}
            completedCount={completedCount}
          />
        )}
        <ErrorNotification
          errorMessage={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      </div>
    </div>
  );
};
