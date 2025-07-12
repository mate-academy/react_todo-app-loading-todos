/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { Filter } from './types/Filter';

type StatusFilter = Filter;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(Filter.All);

  const loadTodos = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      setError('Unable to load todos');

      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleFilterChange = (newFilter: Filter) => {
    setStatusFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === Filter.Active) {
      return !todo.completed;
    }

    if (statusFilter === Filter.Completed) {
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

      {loading && (
        <div data-cy="Loader" className="todoapp__loader">
          <div className="loader" />
        </div>
      )}

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            statusFilter={statusFilter}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} />
    </div>
  );
};
