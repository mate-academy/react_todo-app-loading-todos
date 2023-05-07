/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';

import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { FilterTodo } from './components/FilterTodo';
import { getTodos } from './api/todos';

import { Todo, Status, ErrorMessage } from './types';

const USER_ID = 10238;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [queryTodo, setQueryTodo] = useState('');
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  useEffect(() => {
    setError(null);

    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
      })
      .catch((fetchingError: Error) => {
        setError(ErrorMessage.Load);
        throw new Error(fetchingError.message);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filterStatus === Status.Active) {
        return !todo.completed;
      }

      if (filterStatus === Status.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filterStatus]);

  const activeTodos = visibleTodos.some(todo => !todo.completed);
  const activeTodosCount = visibleTodos.filter(todo => !todo.completed).length;

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
            className={classnames('todoapp__toggle-all', {
              active: activeTodos,
            })}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={queryTodo}
              onChange={(event) => setQueryTodo(event.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${activeTodosCount} items left`}
              </span>

              <FilterTodo
                filterStatus={filterStatus}
                setFilterStatus={(status) => setFilterStatus(status)}
              />

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {error && (
        <div className={classnames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setError(null)}
          />
          {error}
        </div>
      )}
    </div>
  );
};
