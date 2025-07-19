/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { ErrorNotification } from './components/ErrorNotification';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { UserWarning } from './UserWarning';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const loadTodos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(ErrorMessage.LoadTodos);
      } finally {
        setIsLoading(false);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    let filtered = [...todos];

    if (statusFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    setVisibleTodos(filtered);
  }, [todos, statusFilter]);

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setStatusFilter(filter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoading ? (
          <div className="loader" data-cy="Loader" />
        ) : (
          <TodoList todos={visibleTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            statusFilter={statusFilter}
            onFilterChange={handleFilterChange}
            activeCount={todos.filter(todo => !todo.completed).length}
            completedCount={completedCount}
          />
        )}

        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      </div>
    </div>
  );
};
