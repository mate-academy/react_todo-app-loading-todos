import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum TodoError {
  Load = 'Unable to load todos',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
  EmptyTitle = 'Title should not be empty',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [busyIds, setBusyIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;

    async function fetchTodos() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTodos();

        if (!mounted) {
          return;
        }

        setTodos(data || []);
      } catch {
        if (!mounted) {
          return;
        }

        setError(TodoError.Load);
      } finally {
        if (!mounted) {
          return;
        }

        setLoading(false);
      }
    }

    fetchTodos();

    return () => {
      mounted = false;
    };
  }, []);

  // Auto-hide error
  useEffect(() => {
    if (!error) {
      return;
    }

    const id = window.setTimeout(() => setError(null), 3000);

    return () => clearTimeout(id);
  }, [error]);

  // computed values
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'all') {
        return true;
      }

      if (filter === 'active') {
        return !todo.completed;
      }

      return todo.completed;
    });
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );

  // actions
  const handleAdd = useCallback(async (title: string) => {
    setError(null);
    try {
      const created = await client.post<Todo>('/todos', {
        title,
        completed: false,
        userId: USER_ID,
      });

      setTodos(prev => [created, ...prev]);
    } catch (event) {
      setError('Unable to add a todo');
    }
  }, []);

  const handleDelete = useCallback(async (id: Todo['id']) => {
    setBusyIds(prev => ({ ...prev, [String(id)]: true }));
    setError(null);
    try {
      await client.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (event) {
      setError('Unable to delete a todo');
    } finally {
      setBusyIds(prev => {
        const copy = { ...prev };

        delete copy[String(id)];

        return copy;
      });
    }
  }, []);

  const handleToggle = useCallback(
    async (id: Todo['id'], completed: boolean) => {
      setBusyIds(prev => ({ ...prev, [String(id)]: true }));
      setError(null);
      try {
        const updated = await client.patch<Todo>(`/todos/${id}`, { completed });

        setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
      } catch (e) {
        setError('Unable to update a todo');
      } finally {
        setBusyIds(prev => {
          const copy = { ...prev };

          delete copy[String(id)];

          return copy;
        });
      }
    },
    [],
  );

  const handleToggleAll = useCallback(async () => {
    const allCompleted = todos.length > 0 && todos.every(t => t.completed);

    setError(null);
    try {
      const promises = todos.map(t =>
        client.patch<Todo>(`/todos/${t.id}`, { completed: !allCompleted }),
      );
      const results = await Promise.all(promises);

      setTodos(prev =>
        prev.map(
          t =>
            results.find(r => r && r.id === t.id) || {
              ...t,
              completed: !allCompleted,
            },
        ),
      );
    } catch (e) {
      setError('Unable to toggle all todos');
    }
  }, [todos]);

  const clearCompleted = useCallback(async () => {
    const ids = todos.filter(t => t.completed).map(t => t.id);

    if (ids.length === 0) {
      return;
    }

    setError(null);
    try {
      await Promise.all(ids.map(id => client.delete(`/todos/${id}`)));
      setTodos(prev => prev.filter(t => !t.completed));
    } catch (e) {
      setError('Unable to clear completed todos');
    }
  }, [todos]);

  const onSetFilter = (next: Filter) => {
    setFilter(next);
  };

  const toggleAllActive = todos.length > 0 && todos.every(t => t.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          toggleAllActive={toggleAllActive}
          onToggleAll={handleToggleAll}
          onAdd={handleAdd}
        />

        <TodoList
          todos={visibleTodos}
          loading={loading}
          busyIds={busyIds}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onSetFilter={onSetFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
      <Notification error={error} onHide={() => setError(null)} />
    </div>
  );
};
