/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
// import { TodoList } from './TodoList';

const USER_ID = 10995;

enum FilterOptions {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterMethod, setFilterMethod] = useState<string>('All');
  const [isHidden, setIsHidden] = useState(false);

  let visibleTodos = [...todos];

  switch (filterMethod) {
    case FilterOptions.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
      break;

    case FilterOptions.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => todo.completed !== true);
      break;

    default:
      break;
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError('Error: cannot upload todos'));
  }, []);

  useEffect(() => {
    let errorTimer: number;
    let hiddenTime: number;

    if (error) {
      hiddenTime = window.setTimeout(() => {
        setIsHidden(true);
      }, 2000);
      errorTimer = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
      clearTimeout(hiddenTime);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            disabled
          />

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
          <>
            {visibleTodos.map(todo => (
              <div className={`todo ${todo.completed && 'completed'}`} key={todo.id}>
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                <span className="todo__title">{todo.title}</span>
                <button type="button" className="todo__remove">×</button>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {todos.length}
              {' '}
              items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={`filter__link ${filterMethod === FilterOptions.ALL ? 'selected ' : ''}`}
                onClick={() => {
                  setFilterMethod(FilterOptions.ALL);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filterMethod === FilterOptions.ACTIVE ? 'selected ' : ''}`}
                onClick={() => {
                  setFilterMethod(FilterOptions.ACTIVE);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filterMethod === FilterOptions.COMPLETED ? 'selected ' : ''}`}
                onClick={() => {
                  setFilterMethod(FilterOptions.COMPLETED);
                }}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}

        {/* Notification is shown in case of any error */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        {(error) && (
          <div className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: isHidden },
          )}
          >
            <button
              type="button"
              className="delete"
              onClick={() => {
                setError(null);
              }}
            />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
