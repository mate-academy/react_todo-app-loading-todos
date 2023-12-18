import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { Status } from './types/Status';
import { ErrorMsg } from './components/ErrorMsg/ErrorMsg';

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
      case Status.all: {
        return todos;
      }

      case Status.active: {
        return todos.filter(todo => !todo.completed);
      }

      case Status.completed: {
        return todos.filter(todo => todo.completed);
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
          <button
            aria-label="Toggle Button"
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

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
            <TodoList todos={filteredTodos} />

            <TodoFooter
              todos={filteredTodos}
              status={status}
              onStatus={setStatus}
            />
          </>
        )}
      </div>

      {error && <ErrorMsg error={error} onError={setError} />}

    </div>
  );
};
