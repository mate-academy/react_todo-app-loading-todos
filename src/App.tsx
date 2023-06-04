import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import Footer from './components/Footer';
import TodoList from './components/TodoList';

export const userId = 10590;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');

  const fetchTodos = () => {
    client
      .get<Todo[]>(`/todos?userId=${userId}`)
      .then((receivedTodos) => {
        setTodos(receivedTodos);
      })
      .catch(() => {
        setError('Unable to fetch todos data');
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  const handleCloseError = () => {
    setError(null);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {};
  }, [error]);

  if (!userId) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            name="newTodo"
          />
        </form>

        <TodoList todos={todos} filterType={filterType} />

        <Footer
          todos={todos}
          filterType={filterType}
          onFilterChange={handleFilterChange}
        />
      </div>

      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={handleCloseError}
            aria-label="Close"
          />
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
