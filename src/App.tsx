import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { Filter, Footer } from './components/Footer';
import { ErrorNotification, ErrorType } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('load'));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(t => {
      switch (filter) {
        case 'completed':
          return t.completed;
        case 'active':
          return !t.completed;
        case 'all':
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const handleCloseNotification = useCallback(() => setError(null), [setError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />
        <Footer todos={todos} filter={filter} setFilter={setFilter} />
      </div>
      <ErrorNotification errorType={error} onClose={handleCloseNotification} />
    </div>
  );
};
