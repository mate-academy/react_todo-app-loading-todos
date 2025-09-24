/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  // Hooks must always be called in the same order
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const newTodoRef = useRef<HTMLInputElement | null>(null);
  const errorTimerRef = useRef<number | null>(null);
  const modalBackgroundClass = 'modal-background has-background-white-ter';

  function showError(msg: string) {
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
    }

    setError(msg);
    errorTimerRef.current = window.setTimeout(() => setError(null), 3000);
  }

  // loadTodos declared after showError to avoid use-before-define
  async function loadTodos() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodos();

      setTodos(data);
    } catch {
      showError('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const onHashChange = () => {
      const h = window.location.hash.replace('#', '') || '/';

      if (h === '/' || h === '') {
        setFilter('all');
      } else if (h.includes('active')) {
        setFilter('active');
      } else if (h.includes('completed')) {
        setFilter('completed');
      }
    };

    window.addEventListener('hashchange', onHashChange);
    onHashChange();

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    loadTodos();
    setTimeout(() => newTodoRef.current?.focus(), 0);

    return () => {
      if (errorTimerRef.current) {
        window.clearTimeout(errorTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const title = newTodoRef.current?.value?.trim() ?? '';

    if (!title) {
      showError('Title should not be empty');
      newTodoRef.current?.focus();

      return;
    }

    newTodoRef.current!.disabled = true;
    setError(null);
    try {
      const created = await addTodo(title);

      setTodos(t => [...t, created]);
      newTodoRef.current!.value = '';
      newTodoRef.current?.focus();
    } catch {
      showError('Unable to add a todo');
      newTodoRef.current?.focus();
    } finally {
      newTodoRef.current!.disabled = false;
    }
  }

  async function handleDelete(id: number) {
    setSavingIds(s => new Set(s).add(id));
    setError(null);
    try {
      await deleteTodo(id);
      setTodos(t => t.filter(x => x.id !== id));
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setSavingIds(s => {
        const copy = new Set(s);

        copy.delete(id);

        return copy;
      });
    }
  }

  async function toggleTodo(id: number, completed: boolean) {
    setSavingIds(s => new Set(s).add(id));
    setError(null);
    try {
      const updated = await updateTodo(id, { completed });

      setTodos(t => t.map(x => (x.id === id ? updated : x)));
    } catch {
      showError('Unable to update a todo');
    } finally {
      setSavingIds(s => {
        const copy = new Set(s);

        copy.delete(id);

        return copy;
      });
    }
  }

  const visibleTodos = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed,
  );

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;
  const allCompleted = todos.length > 0 && activeCount === 0;

  // Only now we can conditionally render UserWarning without breaking hooks order
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            disabled={todos.length === 0 || isLoading}
            onClick={async () => {
              const target = !allCompleted;
              const ids = todos.map(t => t.id);

              ids.forEach(id =>
                setSavingIds(s => {
                  const copy = new Set(s);

                  copy.add(id);

                  return copy;
                }),
              );
              try {
                for (const t of todos) {
                  if (t.completed !== target) {
                    // eslint-disable-next-line no-await-in-loop
                    const updated = await updateTodo(t.id, {
                      completed: target,
                    });

                    setTodos(prev =>
                      prev.map(p => (p.id === t.id ? updated : p)),
                    );
                  }
                }
              } catch {
                showError('Unable to update a todo');
              } finally {
                setSavingIds(new Set());
              }
            }}
          />

          <form onSubmit={handleAdd}>
            <input
              ref={newTodoRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={isLoading}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(t => {
              const isSaving = savingIds.has(t.id);

              return (
                <div
                  key={t.id}
                  data-cy="Todo"
                  className={`todo ${t.completed ? 'completed' : ''}`}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={t.completed}
                      onChange={e => toggleTodo(t.id, e.target.checked)}
                      disabled={isSaving}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {t.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDelete(t.id)}
                    disabled={isSaving}
                  >
                    ×
                  </button>

                  <div
                    data-cy="TodoLoader"
                    className={`modal overlay ${isSaving ? 'is-active' : ''}`}
                  >
                    <div className={modalBackgroundClass} />

                    <div className="loader" />
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${
                  filter === 'completed' ? 'selected' : ''
                }`}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedCount === 0}
              onClick={async () => {
                const completed = todos.filter(t => t.completed);

                for (const t of completed) {
                  // eslint-disable-next-line no-await-in-loop
                  await handleDelete(t.id);
                }
              }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            if (errorTimerRef.current) {
              window.clearTimeout(errorTimerRef.current);
            }

            setError(null);
          }}
        />
        {error ?? (
          <>
            Unable to load todos
            <br />
            Title should not be empty
            <br />
            Unable to add a todo
            <br />
            Unable to delete a todo
            <br />
            Unable to update a todo
          </>
        )}
      </div>
    </div>
  );
};
