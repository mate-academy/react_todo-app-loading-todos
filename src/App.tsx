/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/indent */

import React, { useEffect, useState, useRef } from 'react';
import { Todo } from './types/Todo';
import { getTodos, createTodo, deleteTodo, USER_ID } from './api/todos';
import { Header } from './components/Header/header';
import { TodoList } from './components/TodoList/todoList';
import { Footer } from './components/Footer/footer';
import { ErrorNotification } from './components/error/ErrorNotification';
import { FilterType } from './types/Todo';
import { UserWarning } from './UserWarning';
import { updateTodo } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [title, setTitle] = useState('');
  const [adding, setAdding] = useState(false);
  const [tempId, setTempId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingTodoIds, setLoadingTodoIds] = React.useState<
    (number | string)[]
  >([]);

  useEffect(() => {
    if (!adding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [adding]);

  useEffect(() => {
    setError('');
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const t = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(t);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filtered = todos.filter(t =>
    filter === FilterType.All
      ? true
      : filter === FilterType.Active
        ? !t.completed
        : t.completed,
  );

  const activeCount = todos.filter(
    t => !t.completed && (tempId === null || t.id !== tempId),
  ).length;
  const hasCompleted = todos.some(t => t.completed);
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  const handleToggle = async (id: number, completed: boolean) => {
    setLoadingTodoIds(prev => [...prev, id]);
    try {
      await updateTodo(id, { completed });
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
      );
    } catch {
      setError('Unable to update a todo');
    } finally {
      setLoadingTodoIds(prev => prev.filter(loadingId => loadingId !== id));
    }
  };

  const handleToggleAll = async () => {
    const newCompleted = !allCompleted;
    const toUpdate = todos
      .filter(t => t.completed !== newCompleted)
      .map(t => t.id);

    setLoadingTodoIds(prev => [...prev, ...toUpdate]);

    try {
      await Promise.all(
        toUpdate.map(id => updateTodo(id, { completed: newCompleted })),
      );
      setTodos(prev =>
        prev.map(t =>
          toUpdate.includes(t.id) ? { ...t, completed: newCompleted } : t,
        ),
      );
    } catch {
      setError('Unable to update a todo');
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => !toUpdate.includes(id)));
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const txt = title.trim();

    if (!txt) {
      setError('Title should not be empty');

      return;
    }

    const newTempId = Date.now();

    setTempId(newTempId);
    setTodos(prev => [
      ...prev,
      { id: newTempId, userId: USER_ID, title: txt, completed: false },
    ]);

    setAdding(true);

    try {
      const res = await createTodo(txt);

      setTodos(prev => prev.map(t => (t.id === newTempId ? res : t)));

      setTitle('');
    } catch {
      setTodos(prev => prev.filter(t => t.id !== newTempId));
      setError('Unable to add a todo');
    } finally {
      setAdding(false);
      setTempId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingTodoIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch {
      setError('Unable to delete a todo');
    } finally {
      setLoadingTodoIds(prev => prev.filter(loadingId => loadingId !== id));
    }
  };

  const handleClear = async () => {
    const completedIds = todos.filter(t => t.completed).map(t => t.id);
    const succeeded: number[] = [];
    const failed: number[] = [];

    for (const id of completedIds) {
      try {
        await deleteTodo(id);
        succeeded.push(id);
      } catch {
        failed.push(id);
      }
    }

    if (succeeded.length > 0) {
      setTodos(prev => prev.filter(t => !succeeded.includes(t.id)));
    }

    if (failed.length > 0) {
      setError('Unable to delete a todo');
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRename = async (id: number, newTitle: string) => {
    setLoadingTodoIds(prev => [...prev, id]);
    try {
      await updateTodo(id, { title: newTitle });
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, title: newTitle } : t)),
      );
    } catch (e) {
      setError('Unable to update a todo');
      throw e;
    } finally {
      setLoadingTodoIds(prev => prev.filter(loadingId => loadingId !== id));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {error && <div className="notification is-danger is-light">{error}</div>}

      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          onAddTodo={handleAdd}
          allCompleted={allCompleted}
          onToggleAll={handleToggleAll}
          isAdding={adding}
          inputRef={inputRef}
          showToggleAll={todos.length > 0}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filtered}
              onDelete={handleDelete}
              onToggle={handleToggle}
              loadingTodoIds={loadingTodoIds}
              tempId={tempId}
              onRename={handleRename}
            />
            <Footer
              filter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
              hasCompleted={hasCompleted}
              onClearCompleted={handleClear}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} onClose={() => setError('')} />
    </div>
  );
};
