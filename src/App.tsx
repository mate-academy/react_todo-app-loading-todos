/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';

const USER_ID = 6969;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => setTodos(result))
      .catch(() => {
        setError('load');
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

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

        <TodoList todos={todos} />
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        { `Unable to ${error} a todo` }
      </div>
    </div>
  );
};
