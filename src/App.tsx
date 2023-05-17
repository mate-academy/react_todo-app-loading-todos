/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoList } from './components/Todolist/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { Statuses } from './types/Common';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 9953;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<Statuses>(Statuses.ALL);

  const visibleTodos = todos.filter(({ completed }) => {
    switch (status) {
      case Statuses.ACTIVE:
        return completed;

      case Statuses.COMPLETED:
        return completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch((fetchedError: Error) => {
        setError(fetchedError?.message ?? 'Something went wrong');
      });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError('');
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
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

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">3 items left</span>

          <TodosFilter status={status} onStatusChange={setStatus} />

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
