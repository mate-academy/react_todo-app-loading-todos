/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodosList } from './components/TodosList/TodosList';

const USER_ID = 6937;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => {
        setHasError(true);
        setTimeout(() => {
          setHasError(false);
        }, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodosList todos={todos} />}
      </div>

      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !hasError },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => {
            setHasError(false);
          }}
        />

        Unable to load a todo
      </div>
    </div>
  );
};
