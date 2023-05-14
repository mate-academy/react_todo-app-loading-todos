/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { error } from 'console';

const USER_ID = 11050;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  });

  getTodos(USER_ID)
    .then((response) => setTodos(response));

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (!error) {
    setTimeout(() => setError(null), 3000);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <section className="todoapp__main">
          {filteredTodos.map((todo: Todo) => (
            <div
              className={classNames('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onMouseOver={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onFocus={() => setIsHovered(true)}
                  onDoubleClick={() => {
                    setIsLoading(true);
                    setIsEditing(true);
                  }}
                />
              </label>

              {isEditing ? (
                <form>
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>
              ) : (
                <>
                  <span className="todo__title">{todo.title}</span>
                  <button type="button" className="todo__remove">
                    ×
                  </button>
                </>
              )}

              <div className={classNames('modal overlay',
                { 'is-active': !isLoading })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link',
                  { selected: filter === 'all' })}
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link',
                  { selected: filter === 'active' })}
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/active"
                className={classNames('filter__link',
                  { selected: filter === 'completed' })}
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {completedTodos.length > 0 && (
              <button
                type="button"
                className={classNames(
                  'todoapp__clear-completed',
                )}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div className={classNames(
        'notification',
        'isDanger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
      >
        <button
          type="button"
          className={classNames(
            'delete',
          )}
          onClick={() => setError(null)}
        />

        {error}
      </div>
    </div>
  );
};
