/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  // ---------------- State ----------------

  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------- Load Todos ----------------
  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      setError('Unable to load todos');
      // Авто-скрытие ошибки через 3 секунды
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // ---------------- Filtered Todos ----------------
  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'all') {
      return true;
    }

    if (statusFilter === 'active') {
      return !todo.completed;
    }

    if (statusFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  // ---------------- Remaining Count ----------------
  // const remainingCount = todos.filter(todo => !todo.completed).length;

  // ---------------- Проверка USER_ID ----------------
  if (!USER_ID) {
    return <UserWarning />;
  }

  // ---------------- JSX ----------------
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* ---------------- Header ---------------- */}
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {/* ---------------- Main ---------------- */}
        <section className="todoapp__main" data-cy="TodoList">
          {loading && <div>Загрузка...</div>}

          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={`todo ${todo.completed ? 'completed' : ''}`}
              data-cy="Todo"
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  readOnly
                  data-cy="TodoStatus"
                />
              </label>
              <span className="todo__title" data-cy="TodoTitle">
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
              <div data-cy="TodoLoader" className="modal overlay" />
            </div>
          ))}
        </section>

        {/* ---------------- Footer ---------------- */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                data-cy="FilterLinkAll"
                className={`filter__link ${statusFilter === 'all' ? 'selected' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  setStatusFilter('all');
                }}
              >
                All
              </a>
              <a
                href="#/active"
                data-cy="FilterLinkActive"
                className={`filter__link ${statusFilter === 'active' ? 'selected' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  setStatusFilter('active');
                }}
              >
                Active
              </a>
              <a
                href="#/completed"
                data-cy="FilterLinkCompleted"
                className={`filter__link ${statusFilter === 'completed' ? 'selected' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  setStatusFilter('completed');
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}

        {/* ---------------- Error Notification ---------------- */}
        <div
          data-cy="ErrorNotification"
          className={`notification is-danger is-light has-text-weight-normal ${!error ? 'hidden' : ''}`}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setError(null)}
          />
          {error}
        </div>
      </div>
    </div>
  );
};
