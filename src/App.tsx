/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

enum ErrorMessage {
  LoadTodos = 'Unable to load todos',
}

const ERROR_TIMEOUT = 3000;

interface TodoItemProps {
  todo: Todo;
}

interface TodoListProps {
  todos: Todo[];
}

interface FilterProps {
  selectedFilter: FilterStatus;
  onSelect: (filter: FilterStatus) => void;
}

interface ErrorNotificationProps {
  errorMessage: ErrorMessage | null;
  onClose: () => void;
}

const getVisibleTodos = (todos: Todo[], filter: FilterStatus) => {
  switch (filter) {
    case FilterStatus.Active:
      return todos.filter(todo => !todo.completed);

    case FilterStatus.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => (
  <div
    data-cy="Todo"
    className={classNames('todo', { completed: todo.completed })}
  >
    <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
      <input
        data-cy="TodoStatus"
        id={`todo-status-${todo.id}`}
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        disabled
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      disabled
    >
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);

const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
);

const Filter: React.FC<FilterProps> = ({ selectedFilter, onSelect }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={classNames('filter__link', {
        selected: selectedFilter === FilterStatus.All,
      })}
      data-cy="FilterLinkAll"
      onClick={() => onSelect(FilterStatus.All)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames('filter__link', {
        selected: selectedFilter === FilterStatus.Active,
      })}
      data-cy="FilterLinkActive"
      onClick={() => onSelect(FilterStatus.Active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames('filter__link', {
        selected: selectedFilter === FilterStatus.Completed,
      })}
      data-cy="FilterLinkCompleted"
      onClick={() => onSelect(FilterStatus.Completed)}
    >
      Completed
    </a>
  </nav>
);

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onClose,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !errorMessage },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onClose}
    />
    {errorMessage}
  </div>
);

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const errorTimeoutId = useRef<number | null>(null);

  const hideError = useCallback(() => {
    if (errorTimeoutId.current !== null) {
      window.clearTimeout(errorTimeoutId.current);
      errorTimeoutId.current = null;
    }

    setErrorMessage(null);
  }, []);

  const showError = useCallback((message: ErrorMessage) => {
    if (errorTimeoutId.current !== null) {
      window.clearTimeout(errorTimeoutId.current);
    }

    setErrorMessage(message);
    errorTimeoutId.current = window.setTimeout(() => {
      setErrorMessage(null);
      errorTimeoutId.current = null;
    }, ERROR_TIMEOUT);
  }, []);

  useEffect(() => {
    let isMounted = true;

    hideError();
    setIsLoadingTodos(true);

    getTodos()
      .then(loadedTodos => {
        if (isMounted) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (isMounted) {
          showError(ErrorMessage.LoadTodos);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingTodos(false);
        }
      });

    return () => {
      isMounted = false;

      if (errorTimeoutId.current !== null) {
        window.clearTimeout(errorTimeoutId.current);
      }
    };
  }, [hideError, showError]);

  const visibleTodos = getVisibleTodos(todos, selectedFilter);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const areAllTodosCompleted = todos.length > 0 && activeTodosCount === 0;

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areAllTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              aria-label="Toggle all todos"
              disabled
            />
          )}

          <form onSubmit={handleNewTodoSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <Filter
              selectedFilter={selectedFilter}
              onSelect={setSelectedFilter}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="TodoLoader"
        className={classNames('modal', {
          'is-active': isLoadingTodos,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>

      <ErrorNotification errorMessage={errorMessage} onClose={hideError} />
    </div>
  );
};

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return <TodoApp />;
};
