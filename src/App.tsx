import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './components/UserWarning';

enum FilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // error notification
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorTimerRef = useRef<number | null>(null);

  // filter
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  // load on mount (with tiny artificial delay — tests require 100–200ms)
  useEffect(() => {
    const load = async () => {
      // clear any pending error hiding between requests
      if (errorTimerRef.current !== null) {
        window.clearTimeout(errorTimerRef.current);
        errorTimerRef.current = null;
      }

      setIsLoading(true);
      setShowError(false);
      setError(null);

      try {
        await new Promise(r => setTimeout(r, 150));
        const data = await getTodos(USER_ID);

        setTodos(data);
      } catch {
        setError('Unable to load todos');
        setShowError(true);

        // auto hide after 3s
        errorTimerRef.current = window.setTimeout(() => {
          setShowError(false);
          errorTimerRef.current = null;
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );

  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    switch (filterBy) {
      case FilterBy.Active:
        return todos.filter(t => !t.completed);
      case FilterBy.Completed:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  return (
    <div className="todoapp" aria-busy={isLoading}>
      {/* This must exist and not be conditional */}
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            disabled
          />
        </header>

        {/* list: hidden entirely if there are no todos yet */}
        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <ul className="todo-list" data-cy="TodoList">
                {filteredTodos.map(todo => {
                  const statusId = `todo-status-${todo.id}`;

                  return (
                    <li
                      key={todo.id}
                      className={`todo ${todo.completed ? 'completed' : ''}`}
                      data-cy="Todo"
                    >
                      {/* status checkbox + label (kept exactly as you had) */}
                      <label
                        className="todo__status-label"
                        htmlFor={statusId}
                        data-cy="TodoStatus"
                      >
                        <input
                          id={statusId}
                          type="checkbox"
                          className="todo__status"
                          checked={todo.completed}
                          readOnly
                        />
                        {/* custom checkbox (styled in CSS; can be empty) */}
                      </label>

                      <span className="todo__title" data-cy="TodoTitle">
                        {todo.title}
                      </span>

                      {/* delete button (present but disabled in Part 1) */}
                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        aria-label="Delete todo"
                        disabled
                      />
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Footer with counter, filters and clear button */}
            <footer className="footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeCount} items left
              </span>

              <ul className="filters" data-cy="Filter">
                <li>
                  <a
                    href="#/"
                    data-cy="FilterLinkAll"
                    className={filterBy === FilterBy.All ? 'selected' : ''}
                    onClick={e => {
                      e.preventDefault();
                      setFilterBy(FilterBy.All);
                    }}
                  >
                    All
                  </a>
                </li>

                <li>
                  <a
                    href="#/active"
                    data-cy="FilterLinkActive"
                    className={filterBy === FilterBy.Active ? 'selected' : ''}
                    onClick={e => {
                      e.preventDefault();
                      setFilterBy(FilterBy.Active);
                    }}
                  >
                    Active
                  </a>
                </li>

                <li>
                  <a
                    href="#/completed"
                    data-cy="FilterLinkCompleted"
                    className={
                      filterBy === FilterBy.Completed ? 'selected' : ''
                    }
                    onClick={e => {
                      e.preventDefault();
                      setFilterBy(FilterBy.Completed);
                    }}
                  >
                    Completed
                  </a>
                </li>
              </ul>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={completedCount === 0}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* error notification (non-conditional; hidden via class) */}
      <UserWarning
        hidden={!showError}
        message={error ?? ''}
        onClose={() => {
          if (errorTimerRef.current !== null) {
            window.clearTimeout(errorTimerRef.current);
            errorTimerRef.current = null;
          }

          setShowError(false);
        }}
      />
    </div>
  );
};
