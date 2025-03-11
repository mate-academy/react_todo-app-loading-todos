import React, { useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { List } from './components/List/List';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { UserWarning } from './UserWarning';

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (e) {
        setError('Unable to load todos');
        setTimeout(() => setError(null), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header isLoading={isLoading} />
        {todos.length > 0 && (
          <List todos={filteredTodos} isLoading={isLoading} />
        )}
        {todos.length > 0 && (
          <Footer
            activeCount={todos.filter(t => !t.completed).length}
            completedCount={todos.filter(t => t.completed).length}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={handleClearCompleted}
            isLoading={isLoading}
          />
        )}
      </div>
      <Error error={error} onClose={() => setError(null)} />
    </div>
  );
};
