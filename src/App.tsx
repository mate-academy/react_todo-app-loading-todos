import React, { useState, useEffect } from 'react';
import { getTodosByUserId, Todo } from './api/todos';
import Loader from './components/Loader';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

const USER_ID = 1; // Replace with your actual userId

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const loadedTodos = await getTodosByUserId(USER_ID);
        setTodos(loadedTodos);
        setVisibleTodos(loadedTodos);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setFilterBy(filter);
    const filtered = todos.filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    });
    setVisibleTodos(filtered);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setVisibleTodos(filtered);
  };

  const clearQuery = () => {
    setQuery('');
    setVisibleTodos(todos);
  };

  const closeError = () => setError(null);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="app">
      <h1>Todo App</h1>

      {error && (
        <div className="notification">
          <span>{error}</span>
          <button onClick={closeError}>x</button>
        </div>
      )}

      {isLoading && <Loader />}

      <TodoFilter
        query={query}
        onQueryChange={handleQueryChange}
        onClearQuery={clearQuery}
        filterBy={filterBy}
        onFilterChange={handleFilterChange}
      />

      {visibleTodos.length > 0 ? (
        <TodoList todos={visibleTodos} />
      ) : (
        !isLoading && <p>No todos yet!</p>
      )}
    </div>
  );
};

export default App;
