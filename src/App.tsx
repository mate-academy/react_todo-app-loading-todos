import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ERRORS, Todo, FilterType } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [loadingTodoIds] = useState<number[]>([]);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const isAllCompleted = todos.length > 0 && activeCount === 0;

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
          setFilter(FilterType.Active);
          break;
        case '#/completed':
          setFilter(FilterType.Completed);
          break;
        default:
          setFilter(FilterType.All);
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
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
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
