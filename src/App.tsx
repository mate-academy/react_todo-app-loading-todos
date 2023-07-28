/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Error } from './types/Error';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoNotification } from './components/TodoNotification';

const USER_ID = 11145;

const getVisibleTodos = (todos: Todo[], status: Status) => {
  return todos
    .filter(todo => {
      switch (status) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        default:
          return true;
      }
    });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [error, setError] = useState(Error.None);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.Load));
  }, []);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, status);
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todoCount = todos.filter(todo => !todo.completed).length;

  const areComplitedTodos = todos.some(todo => todo.completed);

  const areTodosEmpty = visibleTodos.length === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!areTodosEmpty && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!areTodosEmpty && (
          <TodoList todos={visibleTodos} />
        )}

        {!areTodosEmpty && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todoCount} items left`}
            </span>

            <TodoFilter
              status={status}
              onStatusChange={setStatus}
            />

            {areComplitedTodos && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {error && (
        <TodoNotification
          error={error}
          onErrorChange={setError}
        />
      )}
    </div>
  );
};
