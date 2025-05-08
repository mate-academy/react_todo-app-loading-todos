import React, { useState, useEffect, useMemo } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TypeFilter } from './types/TypeFilter';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<TypeFilter>(TypeFilter.All);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const todosData = await getTodos();

        setTodos(todosData);
      } catch {
        setError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const activeCount = activeTodos.length;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case TypeFilter.Active:
        return activeTodos;

      case TypeFilter.Completed:
        return completedTodos;

      default:
        return todos;
    }
  }, [filter, activeTodos, completedTodos, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoading ? (
          <div className="notification is-info">Loading...</div>
        ) : (
          todos.length > 0 && (
            <>
              <TodoList todos={filteredTodos} />

              <Footer
                activeCount={activeCount}
                currentFilter={filter}
                setCurrentFilter={setFilter}
              />
            </>
          )
        )}
      </div>

      <ErrorNotification errorMessage={error} onHide={() => setError(null)} />
    </div>
  );
};
