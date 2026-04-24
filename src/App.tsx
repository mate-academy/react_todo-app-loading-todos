/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

enum ErrorMessage {
  Load = 'Unable to load todos',
}

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const getFilterFromHash = (): FilterStatus => {
  switch (window.location.hash) {
    case '#/active':
      return FilterStatus.Active;

    case '#/completed':
      return FilterStatus.Completed;

    default:
      return FilterStatus.All;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] =
    useState<FilterStatus>(getFilterFromHash());
  const hideErrorTimeoutId = useRef<number | null>(null);

  const hideError = useCallback(() => {
    setErrorMessage('');

    if (hideErrorTimeoutId.current) {
      window.clearTimeout(hideErrorTimeoutId.current);
      hideErrorTimeoutId.current = null;
    }
  }, []);

  const showError = useCallback(
    (message: ErrorMessage) => {
      hideError();
      setErrorMessage(message);
      hideErrorTimeoutId.current = window.setTimeout(hideError, 3000);
    },
    [hideError],
  );

  useEffect(() => {
    if (!USER_ID) {
      return undefined;
    }

    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.Load));

    return () => hideError();
  }, [hideError, showError]);

  useEffect(() => {
    const handleHashChange = () => {
      setFilterStatus(getFilterFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterStatus, todos]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;
  const hasTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: completedTodosCount === todos.length,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <form
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {hasTodos && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <div
                data-cy="Todo"
                className={cn('todo', {
                  completed: todo.completed,
                })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    readOnly
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {hasTodos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.All,
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.Active,
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.Completed,
                })}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!completedTodosCount}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {errorMessage}
      </div>
    </div>
  );
};
