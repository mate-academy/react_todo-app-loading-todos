/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Errors';
import { Status } from './types/Status';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorType(ErrorType.LOAD_TODOS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (errorType) {
      const timer = setTimeout(() => setErrorType(null), 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [errorType]);

  const handleCloseError = () => setErrorType(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    if (filter === Status.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {!loading && errorType && (
        <p className="notification is-danger">{errorType}</p>
      )}

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(({ id, title, completed }) => (
              <div
                key={id}
                data-cy="Todo"
                className={classNames('todo', { completed: completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>
                <span data-cy="TodoTitle" className="todo__title">
                  {title}
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
          <Footer
            filter={filter}
            setFilter={setFilter}
            activeCount={activeTodosCount}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorType ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseError}
        />
        {errorType}
      </div>
    </div>
  );
};
