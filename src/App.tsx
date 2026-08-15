/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

// 1. Creating an enum for errors
export enum ErrorMessage {
  Load = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
  None = '',
}

// 2. Creating an Enum for filtering statuses
export enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

// 3. Array for dynamic rendering of filtering links
const filterLinks = [
  { status: FilterStatus.All, text: 'All', href: '#/' },
  { status: FilterStatus.Active, text: 'Active', href: '#/active' },
  { status: FilterStatus.Completed, text: 'Completed', href: '#/completed' },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // We use our Enum to type the error state
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  // We use an enum to type the filter state
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [tempQuery, setTempQuery] = useState('');

  // Loading tasks
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.Load)); // Replaced the string with an Enum
  }, []);

  // Automatic error hiding
  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setErrorMessage(ErrorMessage.None); // Replaced the empty string with an Enum
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  // Calculation of filtered tasks
  const visibleTodos = todos.filter(todo => {
    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const hasCompletedTodos = todos.some(t => t.completed);
  const isAllCompleted = todos.length > 0 && activeTodosCount === 0;

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
              className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={e => e.preventDefault()}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={tempQuery}
              onChange={e => setTempQuery(e.target.value)}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {/* We render the links using the map() method, in accordance with the comment. */}
              {filterLinks.map(link => (
                <a
                  key={link.status}
                  href={link.href}
                  className={`filter__link ${filter === link.status ? 'selected' : ''}`}
                  data-cy={`FilterLink${link.text}`}
                  onClick={() => setFilter(link.status)}
                >
                  {link.text}
                </a>
              ))}
            </nav>

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
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          !errorMessage ? 'hidden' : ''
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.None)} // use Enum
        />
        {errorMessage}
      </div>
    </div>
  );
};
