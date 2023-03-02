/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { USER_ID } from './utils/fetchClient';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos]
    = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos]
    = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [customError, setError] = useState({ active: false, text: '' });

  const hideError = () => {
    setError({ ...customError, active: false });
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setCompletedTodos(todosFromServer
          .filter(todo => todo.completed));
        setActiveTodos(todosFromServer.filter(todo => !todo.completed));
        setVisibleTodos(todosFromServer);
      })
      .catch(() => {
        setError({ active: true, text: 'Unable to update a todo' });
        setTimeout(hideError, 3000);
      });
  }, []);

  useEffect(() => {
    hideError();
  }, [visibleTodos]);

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
            className={classNames(
              'todoapp__toggle-all',
              { active: Boolean(activeTodos.length) },
            )}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section
          className="todoapp__main"
        >
          {visibleTodos?.map(({ id, title, completed }: Todo) => (
            <div
              key={id}
              className={classNames('todo', { completed })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                />
              </label>

              <span className="todo__title">{title}</span>

              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="
                              modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {Boolean(todos.length) && (
          <footer
            className="todoapp__footer"
          >
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: visibleTodos === todos },
                )}
                onClick={() => setVisibleTodos(todos)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: visibleTodos === activeTodos },
                )}
                onClick={() => setVisibleTodos(activeTodos)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: visibleTodos === completedTodos },
                )}
                onClick={() => setVisibleTodos(completedTodos)}
              >
                Completed
              </a>
            </nav>

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden={!customError.active}
      >
        <button
          type="button"
          className="delete"
          onClick={hideError}
        />

        <p>
          {customError.text}
        </p>
      </div>
    </div>
  );
};
