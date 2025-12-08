/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const timeoutRef = useRef<number | null>(null);

  const filteredTodos = useMemo<Todo[]>(() => {
    if (filter === 'all') {
      return todos;
    }

    if (filter === 'active') {
      return todos.filter(t => !t.completed);
    }

    if (filter === 'completed') {
      return todos.filter(t => t.completed);
    }

    return todos;
  }, [todos, filter]);

  function showError(message: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = null;

    setError(message);

    timeoutRef.current = window.setTimeout(() => {
      setError(null);
      timeoutRef.current = null;
    }, 3000);
  }

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setError(null);
    setLoading(true);
    client
      .get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => showError('Unable to load todos'))
      .finally(() => setLoading(false));

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await client.post<Todo>(`/users/${USER_ID}/todos`, {
        title,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
    } catch {
      showError('Could not add todo');
    }
  };

  const handleToggle = async (todo: Todo) => {
    setLoadingId(String(todo.id));
    setError(null);
    try {
      const updated = await client.patch<Todo>(
        `/users/${USER_ID}/todos/${todo.id}`,
        { ...todo, completed: !todo.completed },
      );

      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    } catch (err) {
      showError('Could not update todo');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    setError(null);
    try {
      await client.delete(`/users/${USER_ID}/todos/${id}`);
      setTodos(prev => prev.filter(t => String(t.id) !== id));
    } catch {
      showError('Could not delete todo');
    } finally {
      setLoadingId(null);
    }
  };

  const handleClearCompleted = async () => {
    try {
      const completed = todos.filter(t => t.completed);

      await Promise.all(
        completed.map(t => client.delete(`/users/${USER_ID}/todos/${t.id}`)),
      );
      setTodos(prev => prev.filter(t => !t.completed));
    } catch {
      showError('Could not clear completed todos');
    }
  };

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onAddTodo={handleAddTodo}
          onToggleAll={() => {}}
          loading={loading}
          allCompleted={allCompleted}
        />

        <TodoList
          todos={filteredTodos}
          loading={loading}
          loadingId={loadingId}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        error={error}
        onHideError={() => {
          setError(null);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
      />
    </div>
  );
};
