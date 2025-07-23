/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { ErrorMessage } from './types/ErrorMessage';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorMessage | ''>('');
  const [filter, setFilter] = useState<FilterStatus>('All');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setLoading(true);
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => setError(ErrorMessage.LoadTodos))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const filteredTodos = (() => {
    switch (filter) {
      case 'Active':
        return todos.filter(t => !t.completed);
      case 'Completed':
        return todos.filter(t => t.completed);
      case 'All':
      default:
        return todos;
    }
  })();

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            <TodoForm />
            <TodoList todos={filteredTodos} />
            <Footer
              todos={todos}
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </>
        )}
      </div>

      <ErrorNotification message={error} onClear={() => setError('')} />
    </div>
  );
};
