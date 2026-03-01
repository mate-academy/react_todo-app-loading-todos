/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { NewTodoForm } from './components/NewTodoForm';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter, FILTERS } from './types/Filters';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterComponent } from './components/FilterComponent';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState<string | null>(null);

  const errorTimeoutRef = useRef<number | null>(null);

  const showError = (message: string) => {
    setError(message);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = window.setTimeout(() => {
      setError(null);
      errorTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setLoading(true);
    setError(null);

    getTodos()
      .then(response => setTodos(response))
      .catch(() => showError('Unable to load todos'))
      .finally(() => setLoading(false));

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FILTERS.active:
        return todos.filter(t => !t.completed);
      case FILTERS.completed:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all"
              data-cy="ToggleAllButton"
              disabled
            />
          )}

          <NewTodoForm onAdd={() => {}} />
        </header>

        {loading && (
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(t => !t.completed).length} items left
            </span>
            <FilterComponent current={filter} onChange={setFilter} />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(t => !t.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <ErrorNotification message={error} onClose={() => setError(null)} />
    </div>
  );
};
