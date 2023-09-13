/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/FilterTodo';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterTypes';
import { TodoError } from './components/TodoError';
import { Error } from './types/Error';
import { getTodos } from './api/todos';

const USER_ID = 11204;

const getVisibleTodos = (todos: Todo[], status: FilterType) => {
  return todos.filter(todo => {
    switch (status) {
      case FilterType.Completed:
        return todo.completed;

      case FilterType.Active:
        return !todo.completed;

      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(FilterType.All);
  const [errorMessage, setErrorMessage] = useState(Error.None);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Error.Load));
  });

  const visibleTodos = useMemo(() => getVisibleTodos(todos, status),
    [todos, status]);

  const todosCount = useMemo(() => todos.filter(todo => !todo.completed).length,
    [todos]);

  const isCompletedTodos = useMemo(() => todos.some(todo => todo.completed),
    [todos]);

  const isNoTodo = useMemo(() => todos.length === 0, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {!isNoTodo && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
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

        {!isNoTodo && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todosCount} items left`}
              </span>

              <TodoFilter
                status={status}
                onStatusChange={setStatus}
              />

              {isCompletedTodos && (
                <button
                  type="button"
                  className={classNames(
                    'todoapp__clear-completed',
                    { 'todoapp__clear-completed--disabled': !isCompletedTodos },
                  )}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {
        errorMessage && (
          <TodoError
            error={errorMessage}
            onErrorChange={setErrorMessage}
          />
        )
      }
    </div>
  );
};
