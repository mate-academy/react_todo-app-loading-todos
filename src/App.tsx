/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { Status } from './types/Status';

const USER_ID = 12042;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(Status.all);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => (setError('Unable to load todos')))
      .finally(() => (
        setTimeout(() => {
          setError(null);
        }, 3000)
      ));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (status) {
      case 'all': {
        return todos;
      }

      case 'active': {
        return todos.filter(todo => todo);
      }

      case 'completed': {
        return todos.filter(todo => todo.completed === true);
      }

      default: {
        return todos;
      }
    }
  }, [todos, status]);

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
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodoList todos={filteredTodos} />
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <TodoFooter
                todos={filteredTodos}
                status={status}
                onStatus={setStatus}
              />
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* show only one message at a time */}
      {error && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => (setError(null))}
          />

          <p>{error}</p>

          {/* Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      )}

    </div>
  );
};
