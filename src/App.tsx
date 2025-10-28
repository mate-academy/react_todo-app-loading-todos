/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos, USER_ID } from './api/todos';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { Notification } from './components/Notification';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  const inputRef = useRef<HTMLInputElement>(null);
  const errorTimerRef = useRef<number | null>(null);

  const hideError = useCallback(() => {
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
    }

    setError(null);
  }, []);

  const showError = useCallback((msg: string) => {
    setError(msg);
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
    }

    errorTimerRef.current = window.setTimeout(() => setError(null), 3000);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    setIsLoading(true);
    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'))
      .finally(() => setIsLoading(false));

    return () => {
      if (errorTimerRef.current) {
        window.clearTimeout(errorTimerRef.current);
      }
    };
  }, [hideError, showError]);

  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FilterStatus.Active:
        return todos.filter(t => !t.completed);
      case FilterStatus.Completed:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );

  const allCompleted = todos.length > 0 && activeCount === 0;

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
            disabled={todos.length === 0}
            aria-label="Toggle all"
          />

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={isLoading}
              data-cy="NewTodoField"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            <Filter filter={filter} onChange={setFilter} />

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

      <Notification message={error} onHide={hideError} />
    </div>
  );
};
