/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { ErrorType } from './types/ErrorType';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      setLoading(true);
      const data = await getTodos();

      setTodos(data);
    } catch {
      setError(ErrorType.NETWORK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'all') {
      return true;
    }

    if (statusFilter === 'active') {
      return !todo.completed;
    }

    if (statusFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} loading={loading} />

        {todos.length > 0 && (
          <Footer
            todosCount={todos.filter(todo => !todo.completed).length}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        <ErrorNotification error={error} setError={setError} />
      </div>
    </div>
  );
};
