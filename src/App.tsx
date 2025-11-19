/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo, Filter } from './types/Todo';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  // Load todos from API
  const loadTodos = async () => {
    setError('');
    setIsLoading(true);

    try {
      const data = await getTodos();

      setTodos(data);
    } catch {
      setError('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Auto-hide error after 3 seconds
  useEffect(() => {
    if (!error) {
      return;
    }

    const timeoutId = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(t => !t.completed).length;

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoHeader activeTodos={activeTodos} todosLength={todos.length} />

      <div className="todoapp__content">
        {/* Global loader overlay */}
        {isLoading && (
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}

        {/* Todo list */}
        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {/* Footer */}
        {todos.length > 0 && (
          <TodoFooter
            activeTodos={activeTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {/* Error notification */}
      <ErrorNotification error={error} clearError={() => setError('')} />
    </div>
  );
};
