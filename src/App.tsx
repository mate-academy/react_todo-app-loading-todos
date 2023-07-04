/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { getTodos } from './api/todos';

import { UserWarning } from './components/UserWarning/UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';

import { Filters } from './types/Filters';
import { Todo } from './types/Todo';

const USER_ID = 10930;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filters>(Filters.ALL);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch((fetchedError: Error) => {
        setError(
          (fetchedError && fetchedError.message)
          || 'Unexpected error while fetching todos',
        );
      });
  }, []);

  useEffect(() => {
    let timeout: number;

    if (error) {
      timeout = window.setTimeout(() => setError(null), 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const nonCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filters.COMPLETED:
        return completedTodos;

      case Filters.ACTIVE:
        return nonCompletedTodos;

      default:
        return todos;
    }
  }, [todos, filter]);

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

        {todos.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${nonCompletedTodos.length} items left`}
            </span>

            <Filter filter={filter} onChangeFilter={setFilter} />

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={cn(
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
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};
