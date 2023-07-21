import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

const USER_ID = 11098;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filterStatus, setFilterStatus] = useState(Status.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosfromserver) => {
        setTodos(todosfromserver);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    if (hasError) {
      const timeout = setTimeout(() => {
        setHasError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return () => { };
  }, [hasError]);

  const completedTodos = useMemo(() => {
    const completed = todos?.filter((todo) => todo.completed);

    return completed;
  }, [todos]);

  const uncompletedTodos = useMemo(() => {
    const uncompleted = todos?.filter((todo) => !todo.completed);

    return uncompleted;
  }, [todos]);

  const todoIsActive = todos?.find((todo) => todo.completed === false);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case Status.ACTIVE:
        return uncompletedTodos;

      case Status.COMPLETEED:
        return completedTodos;

      case Status.ALL:
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todoIsActive && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              aria-label="toggle todos"
            />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {visibleTodos.length > 0 && (
          <TodoList visibleTodos={visibleTodos} />
        )}

        {todos?.length > 0 && (
          <Footer
            completedTodos={completedTodos}
            uncompletedTodos={uncompletedTodos}
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      <div
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !hasError,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setHasError(false)}
          aria-label="delete notification"
        />
        Unable to load todos
      </div>
    </div>
  );
};
