/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { Error } from './types/Error';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoError } from './components/TodoError';

const USER_ID = 11240;

const getVisibleTodos = (todos: Todo[], status: FilterType) => {
  return todos
    .filter(todo => {
      switch (status) {
        case FilterType.COMPLETED:
          return todo.completed;

        case FilterType.ACTIVE:
          return !todo.completed;

        default:
          return true;
      }
    });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(FilterType.ALL);
  const [error, setError] = useState(Error.None);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.Load));
  }, []);

  const visibleTodos = useMemo(() => getVisibleTodos(todos, status),
    [todos, status]);

  const todoCount = useMemo(() => todos.filter(todo => !todo.completed).length,
    [todos]);

  const areCompletedTodos = useMemo(() => todos.some(todo => todo.completed),
    [todos]);

  const areTodosEmpty = useMemo(() => visibleTodos.length === 0,
    [visibleTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

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

            {areCompletedTodos && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {error && (
        <TodoError
          error={error}
          onErrorChange={setError}
        />
      )}
    </div>
  );
};
