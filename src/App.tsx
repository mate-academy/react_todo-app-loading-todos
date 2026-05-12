/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Filter as FilterEnum, ErrorMessage } from './types/Enums';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.All);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const errorTimer = useRef<number | null>(null);
  const newTodoRef = useRef<HTMLInputElement | null>(null);

  function showError(text: string) {
    setError(text);
    if (errorTimer.current) {
      window.clearTimeout(errorTimer.current);
    }
    // hide after 3s
    errorTimer.current = window.setTimeout(() => setError(null), 3000);
  }

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(data => setTodos(data))
      .catch(() => showError(ErrorMessage.Load))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // focus input after load
    if (!loading && newTodoRef.current) {
      newTodoRef.current.focus();
    }
  }, [loading]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (creating) {
      return;
    }
    const input = newTodoRef.current;
    if (!input) {
      return;
    }
    const raw = input.value;
    const title = raw.trim();

    if (!title) {
      showError(ErrorMessage.TitleEmpty);
      return;
    }

    setCreating(true);
    // add temp todo
    const temp: Todo = {
      id: Math.random(),
      userId: USER_ID as number,
      title,
      completed: false,
    };

    setLoadingIds(prev => [...prev, temp.id]);
    setTodos(prev => [...prev, temp]);

    createTodo({ ...temp, id: undefined })
      .then(created => {
        setTodos(prev => prev.map(t => (t.id === temp.id ? created : t)));
        setLoadingIds(prev => prev.filter(id => id !== temp.id));
        input.value = '';
        input.focus();
      })
      .catch(() => {
        setTodos(prev => prev.filter(t => t.id !== temp.id));
        setLoadingIds(prev => prev.filter(id => id !== temp.id));
        showError(ErrorMessage.Add);
      })
      .finally(() => setCreating(false));
  }

  function handleDelete(id: number) {
    setLoadingIds(prev => [...prev, id]);
    deleteTodo(id)
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)))
      .catch(() => {
        showError(ErrorMessage.Delete);
      })
      .finally(() => setLoadingIds(prev => prev.filter(x => x !== id)));
  }

  function handleUpdate(id: number, patch: Partial<Todo>) {
    setLoadingIds(prev => [...prev, id]);
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));

    return updateTodo(id, patch)
      .catch(() => {
        showError(ErrorMessage.Update);
        // revert
        return getTodos().then(d => setTodos(d));
      })
      .finally(() => setLoadingIds(prev => prev.filter(x => x !== id)));
  }

  const visibleTodos = useMemo(() => {
    if (filter === FilterEnum.All) return todos;
    if (filter === FilterEnum.Active) return todos.filter(t => !t.completed);
    return todos.filter(t => t.completed);
  }, [todos, filter]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  if (!USER_ID) return <UserWarning />;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoRef={newTodoRef}
          creating={creating}
          onCreate={handleCreate}
          showToggleAll={!loading && todos.length > 0}
          allActive={completedCount > 0 && completedCount === todos.length}
          onToggleAll={() => {
            const allCompleted =
              todos.length > 0 && todos.every(t => t.completed);
            if (allCompleted) {
              todos.forEach(t => {
                handleUpdate(t.id, { completed: false });
              });
            } else {
              todos
                .filter(t => !t.completed)
                .forEach(t => handleUpdate(t.id, { completed: true }));
            }
          }}
        />

        <Main
          todos={todos}
          visibleTodos={visibleTodos}
          editingId={editingId}
          setEditingId={setEditingId}
          loadingIds={loadingIds}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        {!loading && todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={() => {
              const ids = todos.filter(t => t.completed).map(t => t.id);
              ids.forEach(id => handleDelete(id));
            }}
          />
        )}
      </div>

      <ErrorNotification error={error} onHide={() => setError(null)} />
    </div>
  );
};
