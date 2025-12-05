/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';

interface Todo {
  id: string;
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

  const handleToggle = async (todo: Todo) => {
    setLoadingId(todo.id);
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

  const activeCount = todos.filter(t => !t.completed).length;

  const isEmpty = todos.length === 0;

  const completedCount = todos.length - activeCount;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={`todoapp__toggle-all ${activeCount > 0 && completedCount === activeCount ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            disabled={loading}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={loading}
            />
          </form>
        </header>

        <section
          className={`todoapp__main ${isEmpty ? 'hidden' : ''} ${loading ? 'is-loading' : ''}`}
          data-cy="TodoList"
        >
          {loading && (
            <div className="global-loader" style={{ padding: '1rem' }}>
              Loading...
            </div>
          )}

          {!loading &&
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    disabled={loadingId === todo.id}
                    onChange={() => handleToggle(todo)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div
                  data-cy="TodoLoader"
                  className={`modal overlay ${loadingId === todo.id ? '' : 'hidden'}`}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={e => {
                  e.preventDefault();
                  setFilter('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={e => {
                  e.preventDefault();
                  setFilter('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={e => {
                  e.preventDefault();
                  setFilter('completed');
                }}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedCount === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        {error ?? ''}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setError(null);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
        />
      </div>
    </div>
  );
};
