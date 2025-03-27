/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID_G } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/Errors';

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const loadTodos = async (userId: number) => {
    try {
      setLoading(true);
      setError('');
      const data = await getTodos(userId);

      setTodos(data);
    } catch (err) {
      setError((err as Error).message || 'Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (USER_ID_G) {
      loadTodos(USER_ID_G);
    }
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID_G) {
    return <UserWarning />;
  }

  const handleHideError = () => {
    setError('');
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleTodoStatusChange = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {loading && <div>Loading...</div>}

      <div className="todoapp__content">
        <Header />
        <TodoList
          todos={filteredTodos}
          onTodoStatusChange={handleTodoStatusChange}
          onDelete={handleDelete}
        />
        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
