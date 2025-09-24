import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import { FILTER, FilterStatus } from './types/FilterStatus';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FILTER.ALL);

  const [error, setError] = useState('');
  const errorTimerId = useRef(0);

  const handleFilterChange = (filterParam: FilterStatus) => {
    setFilter(filterParam);
  };

  useEffect(() => {
    setError('');
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        setError('Unable to load todos');
        errorTimerId.current = window.setTimeout(() => setError(''), 3000);
      }
    };

    fetchTodos();

    return () => {
      if (errorTimerId.current) {
        window.clearTimeout(errorTimerId.current);
      }
    };
  }, []);

  const filteredTodos = todos.filter(todo => {
    return filter === FILTER.ALL
      ? true
      : (filter === FILTER.COMPLETED) === todo.completed;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification errorMsg={error} onClose={setError} />
    </div>
  );
};
