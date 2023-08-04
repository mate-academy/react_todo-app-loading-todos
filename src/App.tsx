/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Status } from './types/Status';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 11261;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.None);

  useEffect(() => {
    getTodos(USER_ID).then(setTodos);
  }, []);

  const filterTodos = useMemo(() => {
    switch (status) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => todo.completed === false);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {activeTodos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          <TodoApp />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filterTodos} />

            <TodoFooter
              filterTodos={filterTodos}
              setStatus={setStatus}
              status={status}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <div className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: ErrorMessage.None },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage(ErrorMessage.None)}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
